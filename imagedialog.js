/**
 * @fileoverview An simple dialog for the Image Plugin.
 * This need not be referenced while instantiating the editor.
 * Use goog.require('goog.editor.plugins.ImageDialogPlugin') instead.
 */

goog.provide('goog.editor.plugins.ImageDialog');
goog.provide('goog.editor.plugins.ImageDialog.OkEvent');

goog.require('goog.dom.TagName');
goog.require('goog.events.Event');
goog.require('goog.string');
goog.require('goog.ui.editor.AbstractDialog');
goog.require('goog.ui.editor.AbstractDialog.Builder');
goog.require('goog.ui.editor.AbstractDialog.EventType');


// *** Public interface ***************************************************** //

/**
 * Creates a dialog to let the user enter a URL of an image to insert.
 * @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
 * dialog's DOM structure.
 * @constructor
 * @extends {goog.ui.editor.AbstractDialog}
 */
goog.editor.plugins.ImageDialog = function(domHelper) {
  goog.ui.editor.AbstractDialog.call(this, domHelper);
};
goog.inherits(goog.editor.plugins.ImageDialog,
              goog.ui.editor.AbstractDialog);


// *** Event **************************************************************** //

/**
 * OK event object for the Image Plugin dialog.
 * @param {string} message Customized image URL chosen by the user.
 * @constructor
 * @extends {goog.events.Event}
 */
goog.editor.plugins.ImageDialog.OkEvent = function(message) {
  this.message = message;
};
goog.inherits(goog.editor.plugins.ImageDialog.OkEvent, goog.events.Event);

/**
 * Event type.
 * @type {goog.ui.editor.AbstractDialog.EventType}
 * @override
 */
goog.editor.plugins.ImageDialog.OkEvent.prototype.type =
    goog.ui.editor.AbstractDialog.EventType.OK;

/**
 * Customized Image URL chosen by the user.
 * @type {string}
 */
goog.editor.plugins.ImageDialog.OkEvent.prototype.message;


// *** Protected interface ************************************************** //

/** @inheritDoc */
goog.editor.plugins.ImageDialog.prototype.createDialogControl = function() {
  var builder = new goog.ui.editor.AbstractDialog.Builder(this);
  /** @desc Title of the Image Plugin dialog. */
  var MSG_IMAGE_TITLE = goog.getMsg('Insert an IMAGE by typing in the URL');
  builder.setTitle(MSG_IMAGE_TITLE).
      setContent(this.createContent_());
  return builder.build();
};

/**
 * Creates and returns the event object to be used when dispatching the OK
 * event to listeners, or returns null to prevent the dialog from closing.
 * @param {goog.events.Event} e The event object dispatched by the wrapped
 *     dialog.
 * @return {goog.editor.plugins.ImageDialog.OkEvent} The event object to be
 *     used when dispatching the OK event to listeners.
 * @protected
 * @override
 */
goog.editor.plugins.ImageDialog.prototype.createOkEvent = function(e) {
  var message = this.getMessage_();
  if (message &&
      goog.editor.plugins.ImageDialog.isValidImage_(message)) {
    return new goog.editor.plugins.ImageDialog.OkEvent(message);
  } else {
    /** @desc Error message telling the user why their message was rejected. */
    var MSG_IMAGE_PLUGIN_DIALOG_ERROR =
        goog.getMsg('Your message must contain the complete URL. Forgot to insert "http://" ?');
    this.dom.getWindow().alert(MSG_IMAGE_PLUGIN_DIALOG_ERROR);
    return null; // Prevents the dialog from closing.
  }
};


// *** Private implementation *********************************************** //

/**
 * Input element where the user will type their Image URL.
 * @type {Element}
 * @private
 */
goog.editor.plugins.ImageDialog.prototype.input_;


/**
 * Creates the DOM structure that makes up the dialog's content area.
 * @return {Element} The DOM structure that makes up the dialog's content area.
 * @private
 */
goog.editor.plugins.ImageDialog.prototype.createContent_ = function() {
  /** @desc Sample Image URL with leading http:// to prepopulate the dialog with. */
  var MSG_IMAGE_PLUGIN_DIALOG_SAMPLE = goog.getMsg('http://');
  this.input_ = this.dom.$dom(goog.dom.TagName.INPUT,
      {size: 25, value: MSG_IMAGE_PLUGIN_DIALOG_SAMPLE});
  /** @desc Prompt telling the user to enter a Image URL. */
  var MSG_IMAGE_PLUGIN_DIALOG_PROMPT =
      goog.getMsg('Enter the URL to the image');
  return this.dom.$dom(goog.dom.TagName.DIV,
                       null,
                       [MSG_IMAGE_PLUGIN_DIALOG_PROMPT, this.input_]);
};

/**
 * Returns the Image URL currently typed into the dialog's input.
 * @return {?string} The Image URL currently typed into the dialog's
 *     input, or null if called before the input is created.
 * @private
 */
goog.editor.plugins.ImageDialog.prototype.getMessage_ = function() {
  return this.input_ && this.input_.value;
};


/**
 * Returns whether or not the given message contains the string "http://".
 * @param {string} message The message to be checked.
 * @return {boolean} Whether or not the given message contains the string "http://".
 * @private
 */
goog.editor.plugins.ImageDialog.isValidImage_ = function(message) {
  message = message.toLowerCase();
  return goog.string.contains(message, 'http://');
};
