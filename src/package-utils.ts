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
import { OtherTokens } from './tokens';

const WARN_NO_WORKSPACE = 'clique: No active workspace!';
const WARN_NO_PACKAGE = 'clique: File "package.json" not found!';
const WARN_PACKAGE_PARSE = 'clique: Unable to parse file "package.json".';

const WARN_PROJECT = 'clique: Project name is missing in "package.json".';
const WARN_AUTHOR = 'clique: Author information is missing in "package.json".';

/**
 * Read contents of package.json or .clique.json (in order of priority) as JSON.
 */
function readPackageJson(): any {
	let data = {};

	if (vscode.workspace.workspaceFolders &&
		vscode.workspace.workspaceFolders.length > 0) {
		const PackagePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const PackageFile = path.join(PackagePath, 'package.json');
		const CliqueFile = path.join(PackagePath, '.clique.json');

		let pkg: string = '';

		if (fs.existsSync(PackageFile)) {
			pkg = fs.readFileSync(PackageFile, 'utf-8');
		}

		if (pkg === '' && fs.existsSync(CliqueFile)) {
			pkg = fs.readFileSync(CliqueFile, 'utf-8');
		}

		if (pkg === '') {
			vscode.window.showWarningMessage(WARN_NO_PACKAGE);
			return;
		}

		try {
			data = JSON.parse(pkg);
		} catch (e) {
			vscode.window.showWarningMessage(WARN_PACKAGE_PARSE);
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
		license = pkgJson.license;
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
