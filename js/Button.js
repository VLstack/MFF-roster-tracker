/* global API */
function Button(options)
{
 var i, k;
 this._node = API.DOM.getById(options.renderTo).appendChild(document.createElement("span"));
 API.DOM.addLinkElement("css/button.css");
 this._node.className = "button";
 if ( options.className ) { this._node.classList.add(options.className); }
 if ( options.content )
 {
  if ( !Array.isArray(options.content) ) { options.content = [options.content]; }
  options.content.forEach(function(node)
                          {
                           if ( typeof node == "string" ) { this.innerHTML += node; }
                           else { this.appendChild(node); }
                          }, this._node);
  this._node.classList.add("content");
 }
 if ( options.fa )
 {
  this._node.classList.add("image");
  i = document.createElement("i");
  i.className = "fa fa-{0}".format(options.fa);
  if ( this._node.firstChild ) { this._node.insertBefore(i, this._node.firstChild); }
  else { this._node.appendChild(i); }
 }
 if ( options.styles ) { for ( k in options.styles ) { if ( options.styles.hasOwnProperty(k) ) { this._node.style[k] = options.styles[k]; } } }
 if ( options.callback ) { this._node.onclick = options.callback; }
 if ( options.small ) { this._node.classList.add("small"); }
 if ( options.listener ) { API.EVT.on(options.listener.method, options.listener.callback, options.listener.context || this); }
 if ( options.hide ) { this.hide(); }
 return this;
}

Button.prototype =
{
 "_node" : null,
 "setActive" : function(state) { this._node.classList[state ? "add" : "remove"]("active"); },
 "show" : function() { this._node.style.display = ""; },
 "hide" : function() { this._node.style.display = "none"; }
};

function GroupButton(options)
{
 var i,
     node = API.DOM.getById(options.renderTo).appendChild(document.createElement("node"));
 API.DOM.addLinkElement("css/button.css");
 node.className = "groupButton";
 if ( options.className ) { node.classList.add(options.className); }
 for ( i = 0; i < options.items.length; i++ )
 {
  options.items[i].renderTo = node;
  Button(options.items[i]);
 }
 return this;
}

function ImageButton(options)
{
 var img,
     node = API.DOM.getById(options.renderTo).appendChild(document.createElement("span"));
 API.DOM.addLinkElement("css/button.css");
 node.className = "imageButton";
 if ( options.className ) { node.classList.add(options.className); }
 if ( options.checked ) { node.classList.add("checked"); }
 node.onclick = function()
 {
  this.classList.toggle("checked");
  options.callback(this.classList.contains("checked"), options.type);
 };
 img = node.appendChild(document.createElement("img"));
 img.src = "images/" + options.image;
 return this;
}