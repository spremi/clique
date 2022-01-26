// [clique-header]
//
// Sanjeev Premi (spremi@ymail.com)
//
// Available under terms of the BSD-3-Clause license.
//
// Copyright (c) 2019, Sanjeev Premi.
//

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { IPackageInfo } from './interfaces';
import { LicenseIdentifiers } from './licenses';
import { OtherTokens } from './tokens';

const JSON_PACKAGE = 'package.json';
const JSON_CLIQUE = '.clique.json';

const WARN_NO_WORKSPACE = 'clique: No active workspace!';
const WARN_NO_PACKAGE = 'clique: Neither "package.json" nor ".clique.json" found!';
const WARN_PACKAGE_PARSE = `clique: Unable to parse file "${JSON_PACKAGE}".`;
const WARN_CLIQUE_PARSE = `clique: Unable to parse file "${JSON_CLIQUE}".`;

const WARN_PROJECT = 'clique: Project name is missing in "package.json".';
const WARN_AUTHOR = 'clique: Author information is missing in "package.json".';

const WARN_LICENSE = 'clique: Unrecognized license. Only OSI supported licenses are supported.';

/**
 * Read contents of package.json or .clique.json (in order of priority) as JSON.
 */
function readPackageJson(): any {
	let data = {};

	if (vscode.workspace.workspaceFolders &&
		vscode.workspace.workspaceFolders.length > 0) {
		const PackagePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const PackageFile = path.join(PackagePath, JSON_PACKAGE);
		const CliqueFile = path.join(PackagePath, JSON_CLIQUE);

		let pkg: string = '';
		let usePkgJson = true;

		if (fs.existsSync(PackageFile)) {
			pkg = fs.readFileSync(PackageFile, 'utf-8');
		}

		if (pkg === '' && fs.existsSync(CliqueFile)) {
			usePkgJson = false;
			pkg = fs.readFileSync(CliqueFile, 'utf-8');
		}

		if (pkg === '') {
			vscode.window.showWarningMessage(WARN_NO_PACKAGE);
			return;
		}

		try {
			data = JSON.parse(pkg);
		} catch (e) {
			if (usePkgJson) {
				vscode.window.showWarningMessage(WARN_PACKAGE_PARSE);
			} else {
				vscode.window.showWarningMessage(WARN_CLIQUE_PARSE);
			}
			return;
		}
	} else {
		vscode.window.showWarningMessage(WARN_NO_WORKSPACE);
		return;
	}

	return data;
}

/**
 * Get package information.
 */
export function getPackageInfo(): IPackageInfo | undefined {
	const pkgJson = readPackageJson();

	if (!pkgJson) {
		return;
	}

	let project;
	let author;
	let license;

	if (pkgJson.hasOwnProperty('name')) {
		project = pkgJson.name;
	} else {
		vscode.window.showWarningMessage(WARN_PROJECT);
		return;
	}


	if (pkgJson.hasOwnProperty('author')) {
		if (typeof pkgJson.author === 'string' && pkgJson.author) {
			//
			// Remove URL, if it exists.
			//
			const REGEX_EMAIL_URL = new RegExp('(.*?)\\s*<(.*?)>\\s*\\((.*?)\\)\\s*$');
			const match = pkgJson.author.match(REGEX_EMAIL_URL);
			if (match) {
				author = match[1] + ' <' + match[2] + '>';
			} else {
				author = pkgJson.author;
			}
		} else {
			if (pkgJson.author.hasOwnProperty('name') && pkgJson.author.name) {
				author = pkgJson.author.name;

				if (pkgJson.author.hasOwnProperty('email') && pkgJson.author.email) {
					author += ' <' + pkgJson.author.email + '>';
				}
			}
		}
	} else {
		vscode.window.showWarningMessage(WARN_AUTHOR);
		return;
	}

	if (pkgJson.hasOwnProperty('license') && pkgJson.license) {
		if (LicenseIdentifiers.find(x => x === pkgJson.license)) {
			license = pkgJson.license;
		} else {
			vscode.window.showWarningMessage(WARN_LICENSE);
			return;
		}
	} else {
		license = OtherTokens.Unlicensed;
	}

	const pkgInfo: IPackageInfo = {
		project: project,
		author: author,
		license: license,
	};

	return pkgInfo;
}
