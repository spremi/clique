# clique-header

This extension adds file header based on project information in `package.json`.

## Features

* Generate headers with / without documentation tags.
* Include custom copyright text, if enabled.
  * Useful in corporate environments.
* Custom characters for opening & closing the comment characters.

## Requirements

The workspace must contain `package.json` based on specification
[here](https://docs.npmjs.com/files/package.json).

## Extension Settings

This extension contributes the following settings:

* `clique.commentOpen`: Character(s) to open file header.
* `clique.commentClose`: Character(s) to close file header.
* `clique.commentBody`: Character(s) to start each line in file header body.
* `clique.initialSpaces`: Number of empty spaces after start of comment body.
* `clique.includeCopyright`: Include copyright message?
* `clique.useTags`: Use documentation tags?
* `clique.tagAuthor`: Docmentation tag to be used for author name.
* `clique.tagProject`: Docmentation tag to be used for project name.
* `clique.tagLicense`: Docmentation tag to be used for license name.
* `clique.textCopyright`: Copyright text to be used, if enabled.
* `clique.longLicense`: Use long license text?
  * Applies only when documentation tags aren't used.

### Examples

#### 1
With `clique.commentOpen`, `clique.commentClose` and `clique.commentBody` set
to `//`:

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// MIT License
//
```

#### 2
With `clique.commentOpen`, `clique.commentClose`, `clique.commentBody` set
to `//` and `clique.longLicense` selected:

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// Available under terms of the MIT license.
//
```

#### 3
With `clique.commentOpen` = `/**`, `clique.commentClose` = ` */` and
`clique.commentBody` = ` *`:

```ts
/**
 * [my-project]
 *
 * Smart Developer (smart.developer@work.home)
 *
 * BSD-3-Clause License
 */
```

#### 4
With `clique.commentOpen`, `clique.commentClose` and `clique.commentBody` set
to `//`, `clique.includeCopyright` selected, custom copyright text specified
in `clique.textCopyright` but no license specified in `package.json`:

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

When no license is specified in `package.json`, header shows 'UNLICENSED'.

#### 5
With `clique.commentOpen`, `clique.commentClose` and `clique.commentBody` set
to `//`, `clique.longLicense` selected but no license specified in `package.json`:

```ts
//
// [my-project]
//
// Smart Developer (smart.developer@work.home)
//
// UNLICENSED - No license specified.
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
* Custom license text, when no license is specified in `package.json`.

## Release Notes

### 0.0.1
Initial release of the extension.

## License
BSD-3-Clause
