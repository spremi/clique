//
// [clique-header]
//
// Sanjeev Premi (spremi@ymail.com)
//
// Available under terms of the BSD-3-Clause license.
//
// Copyright (c) 2019, Sanjeev Premi.
//

import * as vscode from 'vscode';

import { IExtensionCfg, IPackageInfo, ITagCfg } from './interfaces';
import { getExtensionCfg } from './config-utils';
import { getPackageInfo } from './package-utils';
import { HeaderTemplate } from './template';
import { HeaderTokens, OtherTokens } from './tokens';

const REGEX_HEADER_OPEN = new RegExp(`${HeaderTokens.Open}`, 'g');
const REGEX_HEADER_BODY = new RegExp(`${HeaderTokens.Body}`, 'g');
const REGEX_HEADER_CLOSE = new RegExp(`${HeaderTokens.Close}`, 'g');

const REGEX_PROJECT_TAG = new RegExp(`${HeaderTokens.TagProject}${HeaderTokens.Space}`, 'g');
const REGEX_AUTHOR_TAG = new RegExp(`${HeaderTokens.TagAuthor}${HeaderTokens.Space}`, 'g');
const REGEX_LICENSE_TAG = new RegExp(`${HeaderTokens.TagLicense}${HeaderTokens.Space}`, 'g');

const REGEX_PROJECT = new RegExp(`${HeaderTokens.Project}`, 'g');
const REGEX_AUTHOR = new RegExp(`${HeaderTokens.Author}`, 'g');
const REGEX_LICENSE = new RegExp(`${HeaderTokens.License}`, 'g');

const REGEX_COPY = new RegExp(`${HeaderTokens.Copyright}`, 'g');

const REGEX_INIT_SPACES = new RegExp(`${HeaderTokens.InitSpace}`, 'g');

const REGEX_YEAR = new RegExp(`${HeaderTokens.Year}`, 'g');

const WARN_TPL = 'clique: Unable to generate header template. Check configuration.';
const WARN_TXT = 'clique: Unable to process header template. Check configuration.';

/**
 * Returns a string containing spaces.
 *
 * @param len Required length of the string.
 */
function spaceStr(len: number): string {
	let space = '';

	for (let i = 0; i < len; i++) {
		space += ' ';
	}

	return space;
}

/**
 * Get length of longest tag.
 */
function maxTagLength(cfg: ITagCfg): number {
	let max = 0;

	for (let tag in cfg) {
		const len = tag.length;

		if (len > max) {
			max = len;
		}
	}

	return max;
}

/**
 * Get header template.
 */
function getHeaderTemplate(cfg: IExtensionCfg, license: string, eol: string): string | undefined {
	let tpl: string[];

	tpl = HeaderTemplate.Open.concat([]);

	if (!cfg.copy || !cfg.license || !cfg.tags) {
		return;
	}

	if (cfg.tags.use) {
		tpl = tpl.concat(HeaderTemplate.ProjectTag)
			.concat(HeaderTemplate.AuthorTag)
			.concat(HeaderTemplate.LicenseTag);
	} else {
		tpl = tpl.concat(HeaderTemplate.Project)
			.concat(HeaderTemplate.Author);

		if (license === OtherTokens.Unlicensed) {
			if (cfg.license.useLong) {
				tpl = tpl.concat(HeaderTemplate.NoLicenseText);
			} else {
				tpl = tpl.concat(HeaderTemplate.NoLicense);
			}
		} else {
			if (cfg.license.useLong) {
				tpl = tpl.concat(HeaderTemplate.LicenseText);
			} else {
				tpl = tpl.concat(HeaderTemplate.License);
			}
		}
	}

	if (cfg.copy.use) {
		tpl = tpl.concat(HeaderTemplate.Copy);
	}

	tpl = tpl.concat(HeaderTemplate.Close);

	return tpl.join(eol) + eol + eol;
}

/**
 * Get header text after appropriate substitution.
 */
function getHeaderText(tpl: string, cfg: IExtensionCfg, pkg: IPackageInfo): string | undefined {
	let header = tpl;

	if (!cfg.comment || !cfg.copy || !cfg.tags) {
		return;
	}

	if (!pkg || !pkg.project || !pkg.author || !pkg.license) {
		return;
	}

	header = header.replace(REGEX_HEADER_OPEN, cfg.comment.open);
	header = header.replace(REGEX_HEADER_BODY, cfg.comment.body);
	header = header.replace(REGEX_HEADER_CLOSE, cfg.comment.close);

	if (cfg.tags.use) {
	  //
	  // Calculate the column where the values start.
	  //
	  const TagStop: number = Math.floor((cfg.comment.body.length + cfg.comment.initSpaces + maxTagLength(cfg.tags) + 8) / 4) * 4;

	  const TagLength = TagStop - cfg.comment.body.length - cfg.comment.initSpaces;

	  let delta = TagLength - cfg.tags.project.length;
		header = header.replace(REGEX_PROJECT_TAG, cfg.tags.project + spaceStr(delta));

	  delta = TagLength - cfg.tags.author.length;
		header = header.replace(REGEX_AUTHOR_TAG, cfg.tags.author + spaceStr(delta));

	  delta = TagLength - cfg.tags.license.length;
		header = header.replace(REGEX_LICENSE_TAG, cfg.tags.license + spaceStr(delta));
	}

	if (cfg.copy.use) {
		header = header.replace(REGEX_COPY, cfg.copy.text);
	}

	header = header.replace(REGEX_PROJECT, pkg.project);
	header = header.replace(REGEX_AUTHOR, pkg.author);
	header = header.replace(REGEX_LICENSE, pkg.license);

	header = header.replace(REGEX_INIT_SPACES, spaceStr(cfg.comment.initSpaces));

	const now = new Date();

	header = header.replace(REGEX_YEAR, now.getFullYear().toString());

	return header;
  }

/**
 * Insert header into current file.
 */
function insertHeader(editor: vscode.TextEditor, header: string) {
	editor.edit((editBuilder) => {
		editBuilder.insert(new vscode.Position(0,0), header);
	});
}

/**
 * Activate the extension.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "clique-header" is now active!');

	let disposable = vscode.commands.registerCommand('extension.cliqueFH', () => {
		const config = vscode.workspace.getConfiguration('clique');
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const eol = (editor.document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n');

		const extnCfg = getExtensionCfg(config);

		const packageInfo = getPackageInfo();

		if (!packageInfo ||
			!packageInfo.project ||
			!packageInfo.author ||
			!packageInfo.license) {
			return;
		}

		const headerTpl = getHeaderTemplate(extnCfg, packageInfo.license, eol);

		if (!headerTpl) {
			vscode.window.showWarningMessage(WARN_TPL);
			return;
		}

		const headerTxt = getHeaderText(headerTpl, extnCfg, packageInfo);

		if (!headerTxt) {
			vscode.window.showWarningMessage(WARN_TXT);
			return;
		}

		insertHeader(editor, headerTxt);
	});

	context.subscriptions.push(disposable);
}

/**
 * Deactivate the extension.
 */
export function deactivate() {}
