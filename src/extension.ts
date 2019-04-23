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

/**
 * Activate the extension.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "clique-header" is now active!');

	let disposable = vscode.commands.registerCommand('extension.cliqueFH', () => {
	});

	context.subscriptions.push(disposable);
}

/**
 * Deactivate the extension.
 */
export function deactivate() {}
