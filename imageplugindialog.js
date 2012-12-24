/**
 * @fileoverview An simple Image dialog plugin.
 *
 *
 */

goog.provide('goog.editor.plugins.ImageDialogPlugin');
goog.provide('goog.editor.plugins.ImageDialogPlugin.Command');

goog.require('goog.editor.plugins.ImageDialog');
goog.require('goog.dom.TagName');
goog.require('goog.editor.plugins.AbstractDialogPlugin');
goog.require('goog.editor.range');
goog.require('goog.functions');
goog.require('goog.ui.editor.AbstractDialog.EventType');


// *** Public interface ***************************************************** //

/**
 * A plugin that opens the Image dialog.
 * @constructor
 * @extends {goog.editor.plugins.AbstractDialogPlugin}
 */
goog.editor.plugins.ImageDialogPlugin = function() {
  goog.editor.plugins.AbstractDialogPlugin.call(this,
      goog.editor.plugins.ImageDialogPlugin.Command.IMAGE_PLUGIN_DIALOG);
};
goog.inherits(goog.editor.plugins.ImageDialogPlugin,
              goog.editor.plugins.AbstractDialogPlugin);

/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
goog.editor.plugins.ImageDialogPlugin.Command = {
  IMAGE_PLUGIN_DIALOG: 'ImageDialog'
};

/** @inheritDoc */
goog.editor.plugins.ImageDialogPlugin.prototype.getTrogClassId =
    goog.functions.constant('ImageDialog');


// *** Protected interface ************************************************** //

/**
 * Creates a new instance of the dialog and registers for the relevant events.
 * @param {goog.dom.DomHelper} dialogDomHelper The dom helper to be used to
 *     create the dialog.
 * @return {goog.editor.plugins.ImageDialog} The dialog.
 * @override
 * @protected
 */
goog.editor.plugins.ImageDialogPlugin.prototype.createDialog = function(
    dialogDomHelper) {
  var dialog = new goog.editor.plugins.ImageDialog(dialogDomHelper);
  dialog.addEventListener(goog.ui.editor.AbstractDialog.EventType.OK,
                          this.handleOk_,
                          false,
                          this);
  return dialog;
};

// *** Private implementation *********************************************** //

/**
 * Handles the OK event from the dialog by inserting the Image
 * into the field.
 * @param {goog.editor.plugins.ImageDialog.OkEvent} e OK event object.
 * @private
 */
goog.editor.plugins.ImageDialogPlugin.prototype.handleOk_ = function(e) {
	// Notify the editor that we are about to make changes.
	this.fieldObject.dispatchBeforeChange();
	
	// Create the image to insert.
	var image = this.getFieldDomHelper().createElement(goog.dom.TagName.IMG);
	
	// Grab the url of the image off of the event.
	image.src = e.message;

    // Set empty "alt" attribute.
    image.alt = '';

	// We want to insert the image in place of the user's selection.
	// So we restore it first, and then use it for insertion.
	this.restoreOriginalSelection();
	var range = this.fieldObject.getRange();
	image = range.replaceContentsWithNode(image);
	
	// Done making changes, notify the editor.
	this.fieldObject.dispatchChange();
	
	// Put the user's selection right after the newly inserted image.
	goog.editor.range.placeCursorNextTo(image, false);
	
	// Dispatch selection change event since we just moved the selection.
	this.fieldObject.dispatchSelectionChangeEvent();
};