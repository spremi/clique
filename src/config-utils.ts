// [clique-header]
//
// Sanjeev Premi (spremi@ymail.com)
//
// Available under terms of the BSD-3-Clause license.
//
// Copyright (c) 2019, Sanjeev Premi.
//

import * as vscode from 'vscode';

import { initExtensionCfg, IExtensionCfg } from './interfaces';
import { ConfigTokens } from './tokens';

/**
 * Read string value from the configuration.
 */
function getStr(config: vscode.WorkspaceConfiguration, opt: string): string {
	let value = config.get(opt);

	return value ? value as string : '';
}

/**
 * Read boolean value from the configuration.
 */
function getBool(config: vscode.WorkspaceConfiguration, opt: string): boolean {
	let flag = config.get(opt);

	return flag ? flag as boolean : false;
}

/**
 * Read numeric value from the configuration.
 */
function getNumber(config: vscode.WorkspaceConfiguration, opt: string): number {
	let value = config.get(opt);

	return value ? value as number : 0;
}

/**
 * Get extension configuration.
 */
export function getExtensionCfg(config: vscode.WorkspaceConfiguration): IExtensionCfg {
	let cfg: IExtensionCfg = { ...initExtensionCfg };

	cfg.comment = {
		open: getStr(config, ConfigTokens.CommentOpen),
		close: getStr(config, ConfigTokens.CommentClose),
		body: getStr(config, ConfigTokens.CommentBody),
		initSpaces: getNumber(config, ConfigTokens.InitialSpaces),
	};

	cfg.tags = {
		use: getBool(config, ConfigTokens.UseTags),
		project: getStr(config, ConfigTokens.TagProject),
		author: getStr(config, ConfigTokens.TagAuthor),
		license: getStr(config, ConfigTokens.TagLicense),
	};

	cfg.license = {
		useLong: getBool(config, ConfigTokens.LongLicense),
		custom: {
			use: getBool(config, ConfigTokens.CustomLicense),
			id: getStr(config, ConfigTokens.CustomLicenseId),
			text: getStr(config, ConfigTokens.CustomLicenseText),
		}
	};

	cfg.copy = {
		use: getBool(config, ConfigTokens.IncludeCopyright),
		text: getStr(config, ConfigTokens.TextCopyright),
	};

	return cfg;
}
