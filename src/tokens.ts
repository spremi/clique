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
 * Defines tokens used in header template.
 */
export class HeaderTokens {
	public static readonly Open = '%COPEN%';
	public static readonly Body = '%CBODY%';
	public static readonly Close = '%CCLOSE%';

	public static readonly Author = '%AUTHOR%';
	public static readonly Project = '%PROJECT%';
	public static readonly License = '%LICENSE%';
	public static readonly Copyright = '%COPY%';

	public static readonly TagAuthor = '%TAGAUTHOR%';
	public static readonly TagProject = '%TAGPROJECT%';
	public static readonly TagLicense = '%TAGLICENSE%';
	public static readonly TagCopy = '%TAGCOPY%';

	public static readonly Space = '%SP%';
	public static readonly InitSpace = '%ISP%';

	public static readonly Year = '%YYYY%';
}

/**
 * Defines tokens used in extension configuration.
 */
export class ConfigTokens {
	public static readonly CommentOpen = 'commentOpen';
	public static readonly CommentBody = 'commentBody';
	public static readonly CommentClose = 'commentClose';
	public static readonly InitialSpaces = 'initialSpaces';

	public static readonly UseTags = 'useTags';
	public static readonly TagProject = 'tagProject';
	public static readonly TagAuthor = 'tagAuthor';
	public static readonly TagLicense = 'tagLicense';

	public static readonly LongLicense = 'longLicense';

	public static readonly IncludeCopyright = 'includeCopyright';
	public static readonly TextCopyright = 'textCopyright';
}
