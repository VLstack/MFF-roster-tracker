define("DSx/Toggle", ["UWA/Controls/Abstract", "DSx/css"], function(Abstract)
{

var loadCSS = function()
{
  var DSxCSS = require("DSx/css");
  DSxCSS.insertLink("https://mywidgetfactory/resources/styles/DSx/Toggle.css", "DSxToggleCSS");
  loadCSS = function() {};
};

var Toggle =
{
 "init" : function(options)
 {
  loadCSS();
  this._parent(options);
  this.getContent();
 },
 "getContent" : function()
 {
  if ( !this.elements.container ) { this.buildSkeleton(); /*this.syncInput();*/ }
  return this.elements.container;
 },
 "buildSkeleton" : function()
 {
  this.elements.container = UWA.createElement("label", { "class" : "DSxToggle" });
  this.elements.input = UWA.createElement("input").inject(this.elements.container);
  this.elements.slider = UWA.createElement("div", { "class" : "slider" }).inject(this.elements.container);
  if ( this.options.square ) { this.elements.container.addClassName("square"); }
  if ( this.options.small ) { this.elements.container.addClassName("small"); }
  else if ( this.options.large ) { this.elements.container.addClassName("large"); }
  this.elements.input.type = this.options.type == "radio" ? "radio" : "checkbox";
  this.elements.input.checked = !!this.options.checked;
  if ( this.options.name ) { this.elements.input.name = this.options.name; }
  if ( this.options.id ) { this.elements.input.id = this.options.id; }
  if ( this.options.callback ) { this.elements.input.onchange = (function(that) { return function() { that.options.callback.call(that, that.elements.input.checked, that.options.data || null); }; })(this); }
  this.setDisabled(!!this.options.disabled);
 },
 "setDisabled" : function(state)
 {
  this.elements.container[state ? "addClassName" : "removeClassName"]("disabled");
  this.elements.input.disabled = state;
 }
};

return Abstract.extend(Toggle);
});