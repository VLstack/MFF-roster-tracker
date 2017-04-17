/* global API, Button */
var MODAL =
{
 "buttons" : [],
 "show" : function(options)
 {
  var wrapper, header, actions, body, footer, closer, i;
  MODAL.hide();
  MODAL._node = document.body.appendChild(document.createElement("div"));
  MODAL._node.id = "modalBackground";
  wrapper = MODAL._node.appendChild(document.createElement("div"));
  wrapper.id = "modalWrapper";
  header = wrapper.appendChild(document.createElement("h1"));
  header.id = "modalHeader";
  closer = header.appendChild(document.createElement("span"));
  closer.className = "fa fa-times";
  closer.onclick = MODAL.hide;
  header.appendChild(document.createTextNode(options.title || " "));
  if ( options.actions )
  {
   actions = wrapper.appendChild(document.createElement("h2"));
   actions.id = "modalAction";
   options.actions.forEach(function(action) { this.appendChild(action); }, actions);
   wrapper.classList.add("withActionBar");
  }
  body = wrapper.appendChild(document.createElement("div"));
  body.id = "modalBody";
  if ( options.body )
  {
   if ( typeof options.body == "string" ) { body.innerHTML = options.body; }
   else if ( Array.isArray(options.body) ) { options.body.forEach(function(node) { this.appendChild(node); }, body); }
   else { body.appendChild(options.body); }
  }
  footer = wrapper.appendChild(document.createElement("div"));
  footer.id = "modalFooter";
  MODAL.buttons = [];
  if ( options.buttons )
  {
   for ( i = 0; i < options.buttons.length; i++ )
   {
    options.buttons[i].renderTo = footer;
    MODAL.buttons.push(new Button(options.buttons[i]));
   }
  }
 },
 "getButton" : function(idx) { return MODAL.buttons[idx]; },
 "getButtonById" : function(id)
 {
  var i;
  for ( i = MODAL.buttons.length; i--; )
  {
   if ( MODAL.buttons[i].getId() == id ) { return MODAL.buttons[i]; }
  }
  return null;
 },
 "toidHide" : null,
 "intervalHide" : null,
 "clearDelayHide" : function()
 {
  if ( MODAL.toidHide ) { clearTimeout(MODAL.toidHide); }
  if ( MODAL.intervalHide ) { clearInterval(MODAL.intervalHide); }
  MODAL.toidHide = null;
  MODAL.intervalHide = null;
 },
 "delayHide" : function(ms, intervalCb, intervalMs)
 {
  MODAL.clearDelayHide();
  ms = parseInt(ms);
  if ( isNaN(ms) || !ms ) { ms = 5000; }
  if ( intervalCb )
  {
   intervalMs = parseInt(intervalMs);
   if ( isNaN(intervalMs) || !intervalMs ) { intervalMs = 1000; }
   MODAL.intervalHide = setInterval(intervalCb, intervalMs);
  }
  MODAL.toidHide = setTimeout(MODAL.hide, ms);
 },
 "hide" : function()
 {
  MODAL.clearDelayHide();
  if ( MODAL._node ) { MODAL._node.parentNode.removeChild(MODAL._node); }
  MODAL._node = null;
 }
};