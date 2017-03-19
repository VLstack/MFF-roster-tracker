/* global API */
function Button(options)
{
 var /*i, */k;

 this._node = API.DOM.getById(options.renderTo).appendChild(document.createElement("span"));
 API.DOM.addLinkElement("css/button.css");
 this._node.className = "button waves";
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
 node.className = "imageButton waves";
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

function ToggleSwitch(options)
{
 var div;
 this._node = API.DOM.getById(options.renderTo).appendChild(document.createElement("label"));
 this._input = this._node.appendChild(document.createElement("input"));
 this._input.type = "checkbox";
 this._input.checked = !!options.checked;
 div = this._node.appendChild(document.createElement("div"));
 div.className = "slider";
 API.DOM.addLinkElement("css/button.css");
 this._node.className = "switch";
 if ( options.content )
 {
  this._label = API.DOM.getById(options.renderTo).appendChild(document.createElement("label"));
  this._label.classList.add("labelSwitch");
  if ( options.id ) { this._label.htmlFor = options.id; }
  this._label.appendChild(document.createTextNode(options.content));
 }
 if ( options.large ) { this._node.classList.add("large"); }
 if ( options.id )
 {
  this._id = options.id;
  this._input.id = options.id;
 }
 if ( options.callback ) { this._node.onchange = (function(toggleSwitch, cb, data) { return function() { cb.call(toggleSwitch, toggleSwitch._input.checked, data || null); }; })(this, options.callback, options.data); }
 this.setDisabled(!!options.disabled);
}

ToggleSwitch.prototype =
{
 "_node" : null,
 "_input" : null,
 "_label" : null,
 "show" : function() { this._node.style.display = ""; this._label.style.display = ""; },
 "hide" : function() { this._node.style.display = "none"; this._label.style.display = "none"; },
 "setDisabled" : function(state) { this._input.disabled = state; }
};