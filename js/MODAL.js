/* global API, Button */
var MODAL =
{
 "_node":null,
 "show":function(options)
 {
  var wrapper, header, body, footer, closer, i;
  API.DOM.addLinkElement("modal.css");
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
  body = wrapper.appendChild(document.createElement("div"));
  body.id = "modalBody";
  if ( options.body ) { body.innerHTML = options.body; }
  footer = wrapper.appendChild(document.createElement("div"));
  footer.id = "modalFooter";
  if ( options.buttons )
  {
   for ( i = 0; i < options.buttons.length; i++ )
   {
    options.buttons[i].renderTo = footer;
    new Button(options.buttons[i]);
   }
  }
 },
 "hide":function()
 {
  if ( MODAL._node ) { MODAL._node.parentNode.removeChild(MODAL._node); }
  MODAL._node = null;
 }
};