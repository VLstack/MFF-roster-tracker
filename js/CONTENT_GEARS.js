/* global MFF, Panel, Button, API */
MFF.LAYOUT.DETAIL.GEARS =
{
 "currentTab" : "Gears",
 "init" : function(container)
 {
  var node;

  function cb(format) { return function() { API.EVT.dispatch("switchDetail", format); }; }
  function listener(format)
  {
   function fn(param) { this.setActive(format == param); }
   return { "method" : "switchDetail", "callback" : fn };
  }

  MFF.LAYOUT.DETAIL.GEARS._tab = new Panel({ "id" : "panelDetailGearsTab", "parent" : container, "hide" : true, "relative" : true });
  MFF.LAYOUT.DETAIL.GEARS._content = new Panel({ "id" : "panelDetailGearsContent", "parent" : container, "hide" : true, "relative" : true });
  node = MFF.LAYOUT.DETAIL.GEARS._tab.getNode();
  MFF.LAYOUT.DETAIL.GEARS._btnGears = new Button({ "small" : true, "renderTo" : node, "fa" : "tasks", "content" : "Gears", "callback" : cb("Gears"), "listener" : listener("Gears") });
  MFF.LAYOUT.DETAIL.GEARS._btnUniforms = new Button({ "small" : true, "renderTo" : node, "fa" : "black-tie", "content" : "Uniforms", "callback" :  cb("Uniforms"), "listener" : listener("Uniforms") });
  MFF.LAYOUT.DETAIL.GEARS._btnDetailCharts = new Button({ "small" : true, "renderTo" : node, "fa" : "line-chart", "content" : "Chart", "callback" : cb("DetailChart"), "listener" : listener("DetailChart") });

  API.EVT.on("switchDetail", function(params)
                             {
                              MFF.LAYOUT.DETAIL.GEARS._tab.show();
                              MFF.LAYOUT.DETAIL.GEARS._content.show();
                              if ( params == "Gears" ) { MFF.LAYOUT.DETAIL.GEARS.drawGears(); }
                              else if ( params == "DetailChart" ) { MFF.LAYOUT.DETAIL.GEARS.drawChart(); }
                              else if ( params == "Uniforms" ) { MFF.UNIFORMS.list(); }
                             });


 },
 "synchroCurrentTab" : function()
 {
  API.EVT.dispatch("switchDetail", MFF.LAYOUT.DETAIL.GEARS.currentTab);
 },
 "setCurrentTab" : function(tab)
 {
  MFF.LAYOUT.DETAIL.GEARS._content.flush();
  MFF.LAYOUT.DETAIL.GEARS.currentTab = tab;
  MFF.LAYOUT.DETAIL.GEARS.sizer();
},
 "sizer" : function()
 {
  var containerSize, nodeSize,
      container = MFF.LAYOUT.DETAIL._panel.getNode(),
      node = MFF.LAYOUT.DETAIL.GEARS._content.getNode();
  node.style.width = "";
  node.style.height = "";
  containerSize = container.getBoundingClientRect();
  nodeSize = node.getBoundingClientRect();
  node.style.height = (containerSize.height + containerSize.top - nodeSize.top) + "px";
 },
 "drawGears" : function()
 {
  var i, j, k, div, table, tbody, tr, td2, input, select, option, idx, curStat,
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget);

  function getMin(select) { return parseFloat(select.options[select.selectedIndex].dataset.rangeMin); }

  function getMax(select) { return parseFloat(select.options[select.selectedIndex].dataset.rangeMax); }

  function checkValues(tr, save)
  {
   var div, gear, type, pref,
       select = tr.childNodes[1].firstChild,
       cur = tr.childNodes[2].firstChild.value,
       min = getMin(select),
       max = getMax(select),
       cName = "invalide",
       moy = (min + max) / 2,
       curPercent = tr.childNodes[8];
   if ( cur == 0 ) { cName = "undef"; }
   else if ( cur == moy ) { cName = "moy"; }
   else if ( cur == min ) { cName = "min"; }
   else if ( cur == max ) { cName = "max"; }
   else if ( cur < moy && cur > min ) { cName = "inf"; }
   else if ( cur > moy && cur < max ) { cName = "sup"; }
   curPercent.innerHTML = "({0}%)".format(parseInt(MFF.getIndividualPercent(cur, min, max)));
   tr.className = cName;
   if ( save )
   {
    div = API.DOM.parent(tr, "div", "gear");
    gear = div.dataset.gearIndex;
    type = select.options[select.selectedIndex].value;
    pref = tr.childNodes[0].firstChild.checked;
    MFF.saveCharacter({ "mode" : "gear", "gear" : gear, "gearIndex" : tr.dataset.gearIndex, "type" : type, "val" : parseFloat(cur), "pref" : pref, "percent" : MFF.getIndividualPercent(cur, min, max) });
   }
  }

  function changeMinMax(evt)
  {
   var min, moy, max,
       tr = this.parentNode.parentNode,
       cur = tr.childNodes[2].firstChild,
       minSpan = tr.childNodes[3],
       moySpan = tr.childNodes[5],
       maxSpan = tr.childNodes[7];
   min = getMin(this);
   max = getMax(this);
   moy = API.numberToFixed((min + max) / 2, 2);
   minSpan.innerHTML = min;
   moySpan.innerHTML = moy;
   maxSpan.innerHTML = max;
   if ( evt !== null ) { cur.value = 0; }
   checkValues(tr, false);
  }

  MFF.LAYOUT.DETAIL.GEARS.setCurrentTab("Gears");

  for ( i = 0; i < MFF.GEARS.length; i++ )
  {
   div = MFF.LAYOUT.DETAIL.GEARS._content.appendChild(document.createElement("div"));
   div.className = "gear";
   div.dataset.gearIndex = i;
   table = div.appendChild(document.createElement("table"));
   tbody = table.appendChild(document.createElement("tbody"));
   for ( j = 0; j < 8; j++ )
   {
    tr = tbody.appendChild(document.createElement("tr"));
    tr.dataset.gearIndex = j;
    td2 = tr.appendChild(document.createElement("td"));
    input = td2.appendChild(document.createElement("input"));
    input.type = "checkbox";
    input.title = "Set as favorite statistic once checked";
    input.setAttribute("tabindex", -1);
    input.onchange = function() { checkValues(API.DOM.parent(this, "tr"), true); };
    input.checked = data.gear[i][j].pref;
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.width = "100%";
    select = td2.appendChild(document.createElement("select"));
    select.style.width = "100%";
    select.setAttribute("tabindex", -1);
    select.onchange = changeMinMax;
    select.title = "Statistic";
    option = select.appendChild(document.createElement("option"));
    option.value = "";
    option.text = "";
    option.dataset.rangeMin = 0;
    option.dataset.rangeMax = 0;
    option.dataset.statType = "";
    select.selectedIndex = 0;
    idx = 1;
    for ( k in MFF.GEARS[i] )
    {
     if ( MFF.GEARS[i].hasOwnProperty(k) )
     {
      option = select.appendChild(document.createElement("option"));
      option.value = k;
      if ( k == data.gear[i][j].type ) { select.selectedIndex = idx; }
      idx++;
      option.text = MFF.GEARS[i][k].name;
      option.dataset.rangeMin = MFF.GEARS[i][k].range[j].min;
      option.dataset.rangeMax = MFF.GEARS[i][k].range[j].max;
      option.dataset.statType = MFF.GEARS[i][k].type;
     }
    }
    td2 = tr.appendChild(document.createElement("td"));
    curStat = td2.appendChild(document.createElement("input"));
    curStat.title = "Current value";
    curStat.type = "text";
    curStat.style.width = "40px";
    curStat.value = data.gear[i][j].val;
    curStat.onkeyup = function()
    {
     var that = this;
     if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
     MFF.toid = setTimeout(function()
                           {
                            checkValues(API.DOM.parent(that, "tr"), true);
                           }, 250);
    };
    curStat.onchange = function()
    {
     if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
     checkValues(API.DOM.parent(this, "tr"), true);
    };
    // min
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Minimum value";
    // >
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.innerHTML = "&gt;";
    // moy
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Average value";
    // >
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.innerHTML = "&gt;";
    // max
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Maximum value";
    // (XX%)
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Progression from current value to maximum value";

    changeMinMax.call(select, null);
   }
  }
  MFF.googleAnalytics("show-character-gears-" + data.id);
 },
 "drawChart" : function()
 {
  MFF.LAYOUT.DETAIL.GEARS.setCurrentTab("DetailChart");
  MFF.LAYOUT.CHARTS.renderDetail();
 }

};