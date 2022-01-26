//
// [clique-header]
//
// Sanjeev Premi (spremi@ymail.com)
//
// Available under terms of the BSD-3-Clause license.
//
// Copyright (c) 2019, Sanjeev Premi.
//

/**
 * Describes information extracted from package.json.
 */
export interface IPackageInfo {
	/** Project name. */
	project: string | undefined;
	/** Author name. */
	author: string | undefined;
	/** Project license. */
	license: string | undefined;
}

/**
 * Describes extension configuration related to comments.
 */
export interface ICommentCfg {
	/** Character(s) to open comment. */
	open: string;
	/** Character(s) to close comment. */
	close: string;
	/** Character(s) to start continuation lines in comment. */
	body: string;
	/** Number of empty spaces after start of comment body. */
	initSpaces: number;
}

/**
 * Describes extension configuration related to documentation tags.
 */
export interface ITagCfg {
	/** Should documentation tags be used? */
	use: boolean;
	/** Documentation tag for project. */
	project: string;
	/** Documentation tag for author. */
	author: string;
	/** Documentation tag for license. */
	license: string;
}

/**
 * Describes extension configuration related to copyright text.
 */
export interface ICopyCfg {
	/** Include copyright text? */
	use: boolean;
	/** Copyright text. */
	text: string;
}

/**
 * Describes extension configuration related to custom license.
 */
export interface ICustomLicenseCfg {
	/** Use custom license? */
	use: boolean;
	/** Short identifier. */
	id: string;
	/** Long license text. */
	text: string;
}

/**
 * Describes extension configuration related to license text.
 */
export interface ILicenseCfg {
	/** Use longish license text? */
	useLong: boolean;
	/** Show license URL? */
	showUrl: boolean;
	/** Custom license information. */
	custom: ICustomLicenseCfg | undefined;
}

/**
 * Describes the overall extension configuration.
 */
export interface IExtensionCfg {
	/** Comment related configuration. */
	comment: ICommentCfg | undefined;
	/** Documentation tag related configuration. */
	tags: ITagCfg | undefined;
	/** Copyright related configuration. */
	copy: ICopyCfg | undefined;
	/** License related configuration. */
	license: ILicenseCfg | undefined;
	/** End-of-line character. (Derived at runtime). */
	eol: string;
}

/**
 * Initializer for extension configuration.
 */
export const initExtensionCfg: IExtensionCfg = {
	comment: undefined,
	tags: undefined,
	copy: undefined,
	license: undefined,
	eol: '',
};
