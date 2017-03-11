/* global API */
function Button(options)
{
 var /*i, */k;

 this._node = API.DOM.getById(options.renderTo).appendChild(document.createElement("span"));
 API.DOM.addLinkElement("css/button.css");
 this._node.className = "button";
 if ( options.id ) { this._id = options.id; }
 if ( options.noHover ) { this._node.classList.add("noHover"); }
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
 if ( options.fa ) { this.setIcon(options.fa); }
 // {
 //  this._node.classList.add("image");
 //  i = document.createElement("i");
 //  i.className = "fa fa-{0}".format(options.fa);
 //  if ( this._node.firstChild ) { this._node.insertBefore(i, this._node.firstChild); }
 //  else { this._node.appendChild(i); }
 // }
 if ( options.styles ) { for ( k in options.styles ) { if ( options.styles.hasOwnProperty(k) ) { this._node.style[k] = options.styles[k]; } } }
 if ( options.callback ) { this._node.onclick = (function(btn, cb) { return function() { cb.call(btn); }; })(this, options.callback); }
 if ( options.small ) { this._node.classList.add("small"); }
 if ( options.listener ) { API.EVT.on(options.listener.method, options.listener.callback, options.listener.context || this); }
 if ( options.hide ) { this.hide(); }
 if ( options.active ) { this.setActive(options.active); }
 return this;
}

Button.prototype =
{
 "_node" : null,
 "_nodeIcon" : null,
 "_id" : null,
 "setActive" : function(state) { this._node.classList[state ? "add" : "remove"]("active"); },
 "isActive" : function() { return this._node.classList.contains("active"); },
 "toggle" : function() { this.setActive(!this.isActive()); },
 "show" : function() { this._node.style.display = ""; },
 "hide" : function() { this._node.style.display = "none"; },
 "getId" : function() { return this._id; },
 "setIcon" : function(icon)
 {
  this.removeIcon();
  this._node.classList.add("image");
  this._nodeIcon = document.createElement("i");
  this._nodeIcon.className = "fa fa-{0}".format(icon);
  if ( this._node.firstChild ) { this._node.insertBefore(this._nodeIcon, this._node.firstChild); }
  else { this._node.appendChild(this._nodeIcon); }
 },
 "removeIcon" : function()
 {
  if ( this._nodeIcon ) { this._node.removeChild(this._nodeIcon); }
  this._nodeIcon = null;
  this._node.classList.remove("image");
 }
};

// TODO : inherit from Button
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