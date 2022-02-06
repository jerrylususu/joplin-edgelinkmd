
function plugin(CodeMirror) {

	CodeMirror.defineOption('preventDefaultCtrlShiftVPaste', [], function(cm, value, prev) {

		cm.on('paste', function (codemirror_instance, event) {
			// prevent default paste behavior
			event.preventDefault();
        })
    });
}

module.exports = {
	default: function(_context) { 
		return {
			plugin: plugin,
			codeMirrorOptions: {'preventDefaultCtrlShiftVPaste': true},
		}
	},
}
