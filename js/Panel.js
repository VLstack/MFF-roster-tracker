function Panel(options)
{
 this._node = (options.parent || document.body).appendChild(document.createElement(options.tag || "div"));
 this._node.id = options.id;
 this._node.className = "{0} {1}".format(options.relative ? "panelRelative" : "panel", options.className ? options.className : "");
 if ( options.hide ) { this.hide(); }
 return this;
}

Panel.prototype =
{
 "_node" : null,
 "getNode" : function() { return this._node; },
 "setHTML" : function(html) { this._node.innerHTML = html; },
 "flush" : function() { this._node.innerHTML = ""; },
 "appendChild" : function(child) { return this._node.appendChild(child); },
 "removeClass" : function(cName) { this._node.classList.remove(cName); },
 "addClass" : function(cName) { this._node.classList.add(cName); },
 "show" : function() { this._node.style.display = ""; },
 "hide" : function() { this._node.style.display = "none"; },
 "isShown" : function() { return this._node.style.display != "none"; }
};