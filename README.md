# clique-header

This extension adds file header based on project information in `package.json`.

## Features

* Generate headers with / without documentation tags.
* Include custom copyright text, if enabled.
  * Useful in corporate environments.
* Custom characters for opening & closing the comment characters.
* Use custom licence identifier & text, if enabled.

## Requirements

The workspace must contain `package.json` based on specification
[here](https://docs.npmjs.com/files/package.json).

## Shortcut key

With cursor in text editor, press: **``Alt + Shift + Q``**.

## Extension Settings

This extension contributes the following settings:

| Setting | Description |
| --- | --- |
| `clique.commentOpen` | Character(s) to open file header.
| `clique.commentClose` | Character(s) to close file header.
| `clique.commentBody` | Character(s) to start each line in file header body. |
| `clique.initialSpaces` | Number of empty spaces after start of comment body. |
| `clique.includeCopyright` | Include copyright message? |
| `clique.useTags` | Use documentation tags? |
| `clique.tagAuthor` | Docmentation tag to be used for author name. |
| `clique.tagProject` | Docmentation tag to be used for project name. |
| `clique.tagLicense` | Docmentation tag to be used for license name. |
| `clique.textCopyright` | Copyright text to be used, if enabled. |
| `clique.longLicense` | Use long license text?<br/>_Ignored when documentation tags are used._ |
| `clique.customLicense` | Use custom license information?<br/>_Applies only when no license is specified in ``package.json``_. |
| `clique.customLicenseId` | Short identifier for custom license. |
| `clique.customLicenseText` | One line text for custom license. |

## Examples

### Without Docmentation Tags (Option "Use Tags" is not selected)

#### A.1
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// MIT License
//
```

#### A.2
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |
| `clique.longLicense` | Selected |

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// Available under terms of the MIT license.
//
```

#### A.3
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `/**` |
| `clique.commentBody` | ` *` (Notice a space before asterix) |
| `clique.commentClose` | ` */` (Notice a space before asterix) |

```ts
/**
 * [my-project]
 *
 * Smart Developer (smart.developer@work.home)
 *
 * BSD-3-Clause License
 */
```
#### A.4
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |
| `clique.longLicense` | Selected |
... but no license specified in `package.json`.

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// UNLICENSED - No license specified.
//
```

#### A.5
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |
| `clique.customLicense` | Selected |
... but no license specified in `package.json`.

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// Licensed under CUSTOM terms described in the file LICENSE.TXT.
//
```

### With Docmentation Tags (Option "Use Tags" is selected)

#### B.1
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |
| `clique.includeCopyright` | Selected |

```ts
//
// @project     my-project
//
// @author      Smart Developer (smart.developer@work.home)
//
// @license     MIT
//
// Copyright (c) 2019. Smart Company Incorporated.
//
```

#### B.2
| Setting | Value |
| --- | --- |
| `clique.commentOpen` | `//` |
| `clique.commentBody` | `//` |
| `clique.commentClose` | `//` |
| `clique.includeCopyright` | Selected |
... and no license specified in `package.json`.

```ts
//
// @project     my-project
//
// @author      Smart Developer (smart.developer@work.home)
//
// @license     UNLICENSED
//
// Copyright (c) 2019. Smart Company Incorporated.
//
```

## Known Issues

1. The generated header varies with change in extension settings.
   * Presence of file header is not checked.
   * New header is added each time the command is executed.
1. Old ways of specifying **license** as object or **licenses** property are not supported.
   * Update your `package.json` to latest specifications.

## Planned features

* Include URL to SPDX licenses.
* Wrap license in custom text - when documentation tags aren't used.

## Release Notes

### 0.0.2
* Add shortcut key.
* Update README for better readability.

### 0.0.1
Initial release of the extension.

## License
BSD-3-Clause
