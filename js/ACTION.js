/* global MFF, Panel, Button, ImageButton, API, Dropdown */
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
    if ( MFF.axisItems.hasOwnProperty(k) && MFF.axisItems[k].disableSort !== true )
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
  }

  function listenerChart()
  {
   function fn(param) { this.setActive(param == "show"); }
   return { "method" : "globalChart", "callback" : fn };
  }

  MFF.LAYOUT.ACTION._panel = new Panel({ "id" : "panelAction" });
  container = MFF.LAYOUT.ACTION._panel.getNode();

  new Dropdown({ "renderTo" : container, "fa" : "upload",
                 "items" :
                 [
                  { "id" : "export", "content" : "Export characters", "fa" : "upload", "callback" : MFF.EXPORT.selectCharacters },
                  { "id" : "import", "content" : "Import characters", "fa" : "download", "callback" : MFF.IMPORT.pasteContent },
                 ] });
  new ImageButton({ "renderTo" : container, "type" : "combat", "title" : "Toggle combat type characters", "image" : "combat.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "speed", "title" : "Toggle speed type characters", "image" : "speed.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "blast", "title" : "Toggle blast type characters", "image" : "blast.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "universal", "title" : "Toggle universal type characters", "image" : "universal.png", "checked" : true, "callback" : MFF.toggleClass("type") });
  new ImageButton({ "renderTo" : container, "type" : "tier1", "title" : "Toggle Tier1 characters", "image" : "t1.png", "checked" : true, "callback" : MFF.toggleClass("tier") });
  new ImageButton({ "renderTo" : container, "type" : "tier2", "title" : "Toggle Tier2 characters", "image" : "t2.png", "checked" : true, "callback" : MFF.toggleClass("tier") });
  new ImageButton({ "renderTo" : container, "type" : "hero", "title" : "Toggle hero characters", "image" : "hero.png", "checked" : true, "callback" : MFF.toggleClass("side") });
  new ImageButton({ "renderTo" : container, "type" : "vilain", "title" : "Toggle vilain characters", "image" : "vilain.png", "checked" : true, "callback" : MFF.toggleClass("side") });
  new ImageButton({ "renderTo" : container, "type" : "male", "title" : "Toggle male characters", "image" : "male.png", "checked" : true, "callback" : MFF.toggleClass("gender") });
  new ImageButton({ "renderTo" : container, "type" : "female", "title" : "Toggle female characters", "image" : "female.png", "checked" : true, "callback" : MFF.toggleClass("gender") });

  input = container.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "query";
  input.placeholder = "Search";
  input.onkeyup = MFF.queryOnSearch;
  span = container.appendChild(document.createElement("i"));
  span.id = "clearQuery";
  span.className = "fa fa-close";
  span.onclick = function() { document.getElementById("query").value = ""; MFF.queryOnSearch(); };

  new Button({ "renderTo" : container, "content" : "Chart", "fa" : "line-chart", "callback" : cbChart, "listener" : listenerChart() });

  sorter(container);

  axis(container, "x");
  axis(container, "y");
 }
};