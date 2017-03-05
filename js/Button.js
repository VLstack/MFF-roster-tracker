/* global API */
function Button(options)
{
 var i, k,
     node = API.DOM.getById(options.renderTo).appendChild(document.createElement("span"));
 API.DOM.addLinkElement("css/button.css");
 node.className = "button";
 if ( options.className ) { node.classList.add(options.className); }
 if ( options.fa )
 {
  i = node.appendChild(document.createElement("i"));
  i.className = "fa fa-{0}".format(options.fa);
 }
 node.innerHTML = options.label;
 if ( options.styles ) { for ( k in options.styles ) { if ( options.styles.hasOwnProperty(k) ) { node.style[k] = options.styles[k]; } } }
 node.onclick = options.callback;
 return this;
}

function GroupButton(options)
{
 var i,
     node = API.DOM.getById(options.renderTo).appendChild(document.createElement("node"));
 API.DOM.addLinkElement("button.css");
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
 API.DOM.addLinkElement("button.css");
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