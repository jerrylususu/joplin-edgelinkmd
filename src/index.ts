import joplin from 'api';
import { ContentScriptType, MenuItemLocation } from 'api/types';
import { registerSettings, settingValue } from './settings';

joplin.plugins.register({
	onStart: async function () {

		await registerSettings();
		const shortcut = await settingValue('triggerShortcut');

		const shortcutIsCtrlShiftV = shortcut.split("+").map(it => it.toLowerCase()).sort().join("+") === "ctrl+shift+v";
		
		if (shortcutIsCtrlShiftV) {
			// need to prevent default paste behavior
			await joplin.contentScripts.register(
				ContentScriptType.CodeMirrorPlugin,
				'cmconfig',
				'./cmconfig.js'
			);
			console.log("default Ctrl+Shift+V paste behavior prevented.");
		}

		await joplin.commands.register({
			name: 'edgeLinkMd',
			label: 'Paste Edge URL as Markdown link',
			execute: async () => {
				const clipboard = (joplin as any).clipboard;

				var clipboardText = await clipboard.readText();
				const clipboardHTML = await clipboard.readHtml();
				const clipboardImage = await clipboard.readImage();

				// parse link if possible
				if (clipboardHTML) {
					const linkRegex = /<a href="(.*)">(.*)<\/a>/gm;
					const linkMatchResult = linkRegex.exec(clipboardHTML);
					// length 3: full text, url, title
					if (linkMatchResult !== null && linkMatchResult.length == 3) {
						const linkURL = linkMatchResult[1];
						const linkTitle = linkMatchResult[2];
						clipboardText = `[${linkTitle}](${linkURL})`;
					}
				}

				if (clipboardText) {
					const selectedText = await joplin.commands.execute('selectedText');

					if (selectedText) {
						await joplin.commands.execute('replaceSelection', clipboardText);
					} else {
						await joplin.commands.execute('insertText', clipboardText);
					}
				} else {
					alert(`unsupported!`);
					console.error(`clipboardText: ${clipboardText} \n clipboardHTML: ${clipboardHTML} \n clipboardImage: ${clipboardImage}`);
				}

			},
		});

		await joplin.views.menuItems.create('edgeLinkMdButton', 'edgeLinkMd', MenuItemLocation.Tools, {
			accelerator: shortcut,
		});
	},
});
