/**
 * 
 * @fileoverview A simple plugin that inserts an image on command. This
 * plugin is intended to be used only until Google releases their own
 * image plugin.
 *
 */

goog.provide('goog.editor.plugins.ImagePlugin');
goog.provide('goog.editor.plugins.ImagePlugin.COMMAND');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.editor.Plugin');
goog.require('goog.ui.Bubble');
goog.require('goog.style');
/**
 * Plugin to insert the Image into an editable field.
 * @constructor
 * @extends {goog.editor.Plugin}
 */
goog.editor.plugins.ImagePlugin = function() {
  goog.editor.Plugin.call(this);
};
goog.inherits(goog.editor.plugins.ImagePlugin, goog.editor.Plugin);


/** @inheritDoc */
goog.editor.plugins.ImagePlugin.prototype.getTrogClassId = function() {
  return 'ImagePlugin';
};


/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
goog.editor.plugins.ImagePlugin.COMMAND = {
  IMAGE_PLUGIN: '+ImagePlugin'
};


/** @inheritDoc */
goog.editor.plugins.ImagePlugin.prototype.isSupportedCommand = function(command) {
  return command == goog.editor.plugins.ImagePlugin.COMMAND.IMAGE_PLUGIN;
};

/**
 * @type {string}
 */
goog.editor.plugins.ImagePlugin.CLASS_NAME = 'ImagePluginClass';

/**
 * @param {string} command Command to execute.
 * @override
 * @protected
 */
goog.editor.plugins.ImagePlugin.prototype.execCommandInternal = function(
    command) {
  var domHelper = this.fieldObject.getEditableDomHelper();
  var range = this.fieldObject.getRange();
  range.removeContents();
  var newNode =
      domHelper.createDom(goog.dom.TagName.SPAN, goog.editor.plugins.ImagePlugin.CLASS_NAME, 'Hello World!');
  range.insertNode(newNode, false);
};

var defaultTimeout = 10000;
    var bubble = null;
    function createBubble(anchor,domHelper) {
	  if (bubble) {
        bubble.dispose();
        bubble = null;
      }

// Create any number of DOM elems you want here: This is an example of a div which resizes(in the bubble)
 
	  var buttonCreate = goog.dom.createDom('div', {
		'id': 'btnResize',
		'class': 'btnResize',
		'style': 'float:right; cursor: pointer; color: #E89372;'
	  }, 'Resize');

      var addChildToBubble = goog.dom.createDom(
			goog.dom.TagName.SPAN, "image_bubble_span", "Options to modify this Image:",
			goog.dom.createDom(goog.dom.TagName.HR, {
				'style': 'color: #CCCCFF;'
			}),
			buttonCreate
		);
	  var detectMargin = goog.style.getSize(anchor).width;
      bubble = new goog.ui.Bubble(addChildToBubble, {
			bubbleWidth: 147,
			marginShift: detectMargin,
			cssBubbleFont: goog.getCssName('goog-bubble-font'),
		    cssCloseButton: goog.getCssName('goog-bubble-close-button'),
	        cssBubbleTopRightAnchor: goog.getCssName('goog-bubble-top-no-anchor'),
		    cssBubbleTopLeftAnchor: goog.getCssName('goog-bubble-top-no-anchor'),
		    cssBubbleTopNoAnchor: goog.getCssName('goog-bubble-top-no-anchor'),
		    cssBubbleBottomRightAnchor:	goog.getCssName('goog-bubble-bottom-no-anchor'),
  			cssBubbleBottomLeftAnchor: goog.getCssName('goog-bubble-bottom-no-anchor'),
  			cssBubbleBottomNoAnchor: goog.getCssName('goog-bubble-bottom-no-anchor'),
  			cssBubbleLeft: goog.getCssName('goog-bubble-left'),
  			cssBubbleRight: goog.getCssName('goog-bubble-right')
			});
      bubble.setAutoHide(true);
	
      bubble.setPosition(new goog.positioning.AnchoredPosition(anchor, null));
      bubble.render();
      bubble.attach(anchor);
      bubble.setVisible(true);

		goog.events.listen(goog.dom.getElement('btnResize'), 'click', function() {
			anchor.style.position = 'relative';
			goog.style.setSize(anchor, '100px', '100px');
			createBubble(anchor,domHelper);
		});		
				
			
		try {	
		goog.events.listen(goog.dom.getElement('btnResize'), ['mouseover', 'mouseout'], function(e) {
			if(e.type == 'mouseover') {
				this.style.textDecoration = 'underline';
			} else {
				this.style.textDecoration = 'none';
			}
		})}	
		catch(err) {
			// DO NOTHING!!
		}

    }
	function removeButton() {
  		bubble.setVisible(false);
	}	
	
// This handles the selection Change inside the Editor. ( i.e. Detects which element is selected)

try {
goog.editor.plugins.ImagePlugin.prototype.handleSelectionChange = function(opt_e) {
	var dom = this.fieldObject.doFieldSizingGecko();
	var domHelper = this.fieldObject.getEditableDomHelper(), selectedElt, selectedEltCover;
	var range = this.fieldObject.getRange();

	 if(opt_e) {
	 	selectedElt = opt_e.target;
	 } else {
	 	var range = this.fieldObject.getRange();
	 	selectedElt = range && range.getContainerElement();
	 }
	
	if(selectedElt.nodeName == goog.dom.TagName.IMG) {
		createBubble(selectedElt,dom);
	} else {
		try {
			removeButton();
		} catch(e) {
			//DO NOTHING!!
		}
	}
}
		} catch(err) {
			// DO NOTHING!!
		}

// This needs to be called if the bubbles are not removed after calling makeUneditable() on the editor.
// This should be called before making the editor uneditable.
// ISSUE: The bubble is absolutely positioned even after the editor has been made uneditable.
// TODO: Come up with a cleaner solution. (move from using goog.ui.Bubble to the link bubble provided by Google in rev157).
try {
goog.editor.plugins.ImagePlugin.removeAllBubbles = function() {
	try {
		removeButton();
	} catch(e) {
		//DO NOTHING!!
	}
}
		} catch(err) {
			// DO NOTHING!!
		}
