/* global MFF, Panel, Button, ImageButton, GroupButton, API */
MFF.LAYOUT.ACTION =
{
 "_panel" : null,
 "init" : function()
 {
  var span, input, container;

  function axis(container, type)
  {
   var option, select, k, i,
       defSelected = type == "x" ? "attack_total" : "completion",
       storageKey = type == "x" ? "XAxis" : "YAxis",
       selected = localStorage.getItem(storageKey) || defSelected;
   select = document.createElement("select");
   select.id = storageKey;
   i = 0;
   for ( k in MFF.axisItems )
   {
    if ( MFF.axisItems.hasOwnProperty(k) )
    {
     option = select.appendChild(document.createElement("option"));
     option.value = k;
     option.text = MFF.axisItems[k].label;
     if ( k == selected )
     {
      select.selectedIndex = i;
     }
    }
    i++;
   }
   select.onchange = (function(storageKey)
                      {
                       return function()
                       {
                        localStorage.setItem(storageKey, this.value);
                        MFF.renderChart();
                       };
                      })(storageKey);
   new Button({ "renderTo" : container, "content" : [type == "x" ? "X-Axis " : "Y-Axis ", select], "hide" : true });
  }

  function cbSort(by) { return function() { API.EVT.dispatch("sortList", by); }; }

  MFF.LAYOUT.ACTION._panel = new Panel({ "id" : "panelAction" });
  container = MFF.LAYOUT.ACTION._panel.getNode();
  MFF.layout.action = container;

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

  new GroupButton({
                   "renderTo" : container, "className" : "sorter",
                   "items" : [
                              { "content" : "Sort by name <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback" : cbSort("sortByName"), "className" : "sortByName" },
                              { "content" : "by percent <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback" : cbSort("sortByPercent"), "className" : "sortByPercent" },
                              { "content" : "by level <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback" : cbSort("sortByLevel"), "className" : "sortByLevel" },
                              { "content" : "by attack <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback" : cbSort("sortByAttack"), "className" : "sortByAttack" }
                             ]
                  });

  new Button({ "renderTo" : container, "content" : "Chart", "fa" : "line-chart", "callback" : MFF.renderChart, "className" : "showCharts" });
  new Button({ "renderTo" : container, "content" : "List", "fa" : "bars", "callback" : MFF.renderList, "className" : "showList", "hide" : true });

  axis(container, "x");
  axis(container, "y");
 }
};