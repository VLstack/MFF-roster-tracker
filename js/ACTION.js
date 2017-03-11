/* global MFF, Panel, Button, ImageButton, GroupButton, API */
MFF.LAYOUT.ACTION =
{
 "init" : function()
 {
  var span, input, container;

  function listener(state)
  {
   function fn(param) { this[state == param ? "show" : "hide"](); }
   return { "method" : "globalChart", "callback" : fn };
  }

  function axis(container, type)
  {
   var option, k, i,
       defSelected = type == "x" ? "attack_total" : "completion",
       storageKey = type == "x" ? "XAxis" : "YAxis",
       selected = localStorage.getItem(storageKey) || defSelected,
       select = document.createElement("select");
   select.id = storageKey;
   i = 0;
   for ( k in MFF.axisItems )
   {
    if ( MFF.axisItems.hasOwnProperty(k) )
    {
     if ( !MFF.axisItems[k].disableChart )
     {
      option = select.appendChild(document.createElement("option"));
      option.value = k;
      option.text = MFF.axisItems[k].label;
      if ( k == selected ) { select.selectedIndex = i; }
      i++;
     }
    }
   }
   select.onchange = (function(storageKey)
                      {
                       return function()
                       {
                        localStorage.setItem(storageKey, this.value);
                        API.EVT.dispatch("globalChart", "show");
                       };
                      })(storageKey);
   new Button({ "renderTo" : container, "content" : [type == "x" ? "X-Axis " : "Y-Axis ", select], "hide" : true, "listener" : listener("show"), "noHover" : true });
  }

  function sorter(container)
  {
   var option, k, i,
       attribute = MFF.LAYOUT.LIST.getSortAttribute(),
       direction = MFF.LAYOUT.LIST.getSortDirection(),
       select = document.createElement("select");
   function cbDirection()
   {
    var direction = this._nodeIcon.classList.contains("fa-chevron-down") ? "desc" : "asc";
    this.setIcon(direction == "asc" ? "chevron-down" : "chevron-up");
    MFF.LAYOUT.LIST.setSortDirection(direction);
    API.EVT.dispatch("sortList");
   }
   i = 0;
   for ( k in MFF.axisItems )
   {
    if ( MFF.axisItems.hasOwnProperty(k) )
    {
     option = select.appendChild(document.createElement("option"));
     option.value = k;
     option.text = MFF.axisItems[k].label;
     if ( k == attribute )
     {
      select.selectedIndex = i;
     }
    }
    i++;
   }
   select.style.marginLeft = "10px";
   select.onchange = function()
                     {
                      MFF.LAYOUT.LIST.setSortAttribute(this.value);
                      API.EVT.dispatch("sortList");
                     };
   new Button({ "renderTo" : container, "content" : ["Sort by", select], "listener" : listener("hide"), "noHover" : true });
   new Button({ "renderTo" : container, "callback" : cbDirection, "fa" : direction == "asc" ? "chevron-down" : "chevron-up", "className" : "sorterDirection", "listener" : listener("hide") });
  }

  function cbChart()
  {
   API.EVT.dispatch("globalChart", this.isActive() ? "hide" : "show");
   this.toggle();
  }

  MFF.LAYOUT.ACTION._panel = new Panel({ "id" : "panelAction" });
  container = MFF.LAYOUT.ACTION._panel.getNode();

  new Button({ "renderTo" : container, "content" : "Import / Export", "fa" : "upload", "callback" : MFF.cbImportExport, "styles" : { "float" : "right" } });
  new ImageButton({ "renderTo" : container, "type" : "combat", "image" : "combat.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "speed", "image" : "speed.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "blast", "image" : "blast.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "universal", "image" : "universal.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "hero", "image" : "hero.png", "checked" : true, "callback" : MFF.toggleClass("side") });
  new ImageButton({ "renderTo" : container, "type" : "vilain", "image" : "vilain.png", "checked" : true, "callback" : MFF.toggleClass("side") });
  new ImageButton({ "renderTo" : container, "type" : "male", "image" : "male.png", "checked" : true, "callback" : MFF.toggleClass("gender") });
  new ImageButton({ "renderTo" : container, "type" : "female", "image" : "female.png", "checked" : true, "callback" : MFF.toggleClass("gender") });

  input = container.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "query";
  input.placeholder = "Search";
  input.onkeyup = MFF.queryOnSearch;
  span = container.appendChild(document.createElement("i"));
  span.id = "clearQuery";
  span.className = "fa fa-close";
  span.onclick = function() { document.getElementById("query").value = ""; MFF.queryOnSearch(); };

  new Button({ "renderTo" : container, "content" : "Chart", "fa" : "line-chart", "callback" : cbChart });

  sorter(container);

  axis(container, "x");
  axis(container, "y");
 }
};