# Edge Link MD

(Joplin Plugin) When pasting URL copied from Microsoft Edge address bar, automatically convert it to a Markdown link with title and URL.

Uses the special HTML clipboard format set by Microsoft Edge when copying URL from address bar. No additional web request is generated and all the information is extracted locally.

By default the keyboard shortcut is `Ctrl+Shift+V`, but you may change it as you wish. You can also trigger the action from menu. (Tools - Paste Edge URL as Markdown link)

Note that when using `Ctrl+Shift+V`, the defualt CodeMirror paste event is prevented, which may result in conflict with other plugins. 

See [my post on Joplin Discourse](https://discourse.joplinapp.org/t/edge-link-md-when-pasting-url-copied-from-edge-address-bar-convert-it-to-a-markdown-link/23533) for more info.


---


## Building the plugin

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.

## Updating the plugin framework

To update the plugin framework, run `npm run update`.

In general this command tries to do the right thing - in particular it's going to merge the changes in package.json and .gitignore instead of overwriting. It will also leave "/src" as well as README.md untouched.

The file that may cause problem is "webpack.config.js" because it's going to be overwritten. For that reason, if you want to change it, consider creating a separate JavaScript file and include it in webpack.config.js. That way, when you update, you only have to restore the line that include your file.
