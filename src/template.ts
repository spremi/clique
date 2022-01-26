//
// [clique-header]
//
// Sanjeev Premi (spremi@ymail.com)
//
// Available under terms of the BSD-3-Clause license.
//
// Copyright (c) 2019, Sanjeev Premi.
//

import { HeaderTokens, OtherTokens } from './tokens';

/**
 * Defines various sections of the header template.
 */
export class HeaderTemplate {
	/**
	 * Opens the comment block for header.
	 */
	public static readonly Open: string[] = [
		`${HeaderTokens.Open}`,
	];

	/**
	 * Closes template block for header.
	 */
	public static readonly Close: string[] = [
		`${HeaderTokens.Close}`,
	];

	/**
	 * Project name without tag.
	 */
	public static readonly Project: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}[${HeaderTokens.Project}]`,
		`${HeaderTokens.Body}`,
	];

	/**
	 * Project name with tag.
	 */
	public static readonly ProjectTag: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.TagProject}` +
			`${HeaderTokens.Space}${HeaderTokens.Project}`,
		`${HeaderTokens.Body}`,
	];

	/**
	 * Author name without tag.
	 */
	public static readonly Author: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.Author}`,
		`${HeaderTokens.Body}`,
	];

	/**
	 * Author name with tag.
	 */
	public static readonly AuthorTag: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.TagAuthor}` +
			`${HeaderTokens.Space}${HeaderTokens.Author}`,
		`${HeaderTokens.Body}`,
	];

	/**
	 * License name without tag.
	 */
	public static readonly License: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.License} License`,
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}(${HeaderTokens.LicenseUrl})`,
	];

	/**
	 * License name with tag.
	 */
	public static readonly LicenseTag: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.TagLicense}` +
			`${HeaderTokens.Space}${HeaderTokens.License}`,
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.ContSpace}` +
			`(${HeaderTokens.LicenseUrl})`,
	];

	/**
	 * License text without tag.
	 */
	public static readonly LicenseText: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}` +
			`Available under terms of the ${HeaderTokens.License} license.`,
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}(${HeaderTokens.LicenseUrl})`,
	];

	/**
	 * License name without tag - when no license is specified.
	 */
	public static readonly NoLicense: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${OtherTokens.Unlicensed}`,
	];

	/**
	 * License text without tag - when no license is specified.
	 */
	public static readonly NoLicenseText: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}` +
			`${OtherTokens.Unlicensed} - No license specified.`,
	];

	/**
	 * Custom license text.
	 */
	public static readonly CustomLicenseText: string[] = [
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.License}`,
	];

	/**
	 * Copyright text in the header.
	 */
	public static readonly Copy: string[] = [
		`${HeaderTokens.Body}`,
		`${HeaderTokens.Body}${HeaderTokens.InitSpace}${HeaderTokens.Copyright}`,
	];
}
