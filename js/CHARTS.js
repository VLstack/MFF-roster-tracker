/* global MFF, Highcharts, Panel, API */
MFF.LAYOUT.CHARTS =
{
 "init" : function()
 {
  MFF.LAYOUT.CHARTS._panel = new Panel({ "id" : "panelGlobalChart", "hide" : true });
  API.EVT.on("globalChart", function(param) { MFF.LAYOUT.CHARTS[param == "show" ? "showGlobal" : "hideGlobal"](); });
  API.EVT.on("detailChart", function(param) { MFF.LAYOUT.CHARTS[param == "show" ? "showDetail" : "hideDetail"](); });
  API.EVT.on("refreshPercentSkills", function(characterId)
                                     {
                                      if ( MFF.LAYOUT.DETAIL.GEARS._btnDetailCharts.isActive() && characterId == MFF.currentCharacter )
                                      {
                                       MFF.LAYOUT.CHARTS.renderDetail();
                                      }
                                     });
 },
 "hideGlobal" : function()
 {
  MFF.LAYOUT.CHARTS._panel.hide();
  MFF.googleAnalytics("hide-global-chart");
 },
 "showGlobal" : function()
 {
  var i, x, y, tmpX, tmpY, id, character, labelX, labelY,
      serie = [],
      xAxis = document.getElementById("XAxis").value,
      yAxis = document.getElementById("YAxis").value,
      childs = document.getElementById("panelListContent").childNodes;
  for ( i = 0; i < childs.length; i++ )
  {
   if ( childs[i].style.display !== "none" )
   {
    id = childs[i].id;
    character = MFF.CHARACTERS.get(id);
    tmpX = MFF.axisItems[xAxis].callback(character);
    tmpY = MFF.axisItems[yAxis].callback(character);
    x = tmpX.percent ? API.numberToFixed(tmpX.value, 2, true) : parseInt(tmpX.value, 10);
    y = tmpY.percent ? API.numberToFixed(tmpY.value, 2, true) : parseInt(tmpY.value, 10);
    labelX = MFF.axisItems[xAxis].label;
    labelY = MFF.axisItems[yAxis].label;
    if ( xAxis == "attack" )
    {
     labelX = MFF.CHARACTERS.isAttackBaseForUniformIsPhysical(id, character.uniform) ? "Physical attack" : "Energy attack";
    }
    if ( yAxis == "attack" )
    {
     labelY = MFF.CHARACTERS.isAttackBaseForUniformIsPhysical(id, character.uniform) ? "Physical attack" : "Energy attack";
    }
    serie.push({
                "characterId" : id,
                "name" : MFF.CHARACTERS.getNameForUniform(id, character.uniform),
                "x" : x, "labelX" : labelX,
                "y" : y, "labelY" : labelY,
                "marker" : { "width" : 32, "height" : 32, "symbol" : "url(images/characters/{0}/{1}.png)".format(character.uniform, id) }
               });
   }
  }

  if ( !serie.length ) { tmpX = tmpY = function() { return ""; } ; }

  MFF.LAYOUT.CHARTS._panel.show();
  MFF.LAYOUT.CHARTS._panel.flush();
  new Highcharts.Chart({
                        "chart" : { "renderTo" : MFF.LAYOUT.CHARTS._panel.getNode(), "type" : "scatter", "zoomType" : "xy", "backgroundColor" : "#efefef" },
                        "credits" : { "enabled" : false },
                        "title" : { "text" : "{0} / {1}".format(MFF.axisItems[xAxis].label, MFF.axisItems[yAxis].label) },
                        "xAxis" :
                        {
                         "title" : { "enabled" : true, "text" : MFF.axisItems[xAxis].label },
                         "startOnTick" : true,
                         "endOnTick" : true,
                         "showLastLabel" : true
                        },
                        "yAxis" :
                        {
                         "title" : { "enabled" : true, "text" : MFF.axisItems[yAxis].label },
                         "startOnTick" : true,
                         "alternateGridColor" : "rgba(43, 65, 255, 0.03)"
                        },
                        "legend" : { "enabled" : false },
                        "plotOptions" :
                        {
                         "series" :
                         {
                          "cursor" : "pointer",
                          "events" :
                          {
                           "click" : function(evt)
                           {
                            MFF.LAYOUT.CHARTS.hideGlobal();
                            MFF.LAYOUT.DETAIL.drawCharacter(evt.point.characterId, true, null, true);
                           }
                          }
                         },
                         "scatter" :
                         {
                          "tooltip" :
                          {
                           "headerFormat" : "",
                           "footerFormat" : "",
                           "pointFormat" : "<p style=\"font:12px/16px verdana\"><b>{point.name}</b><br>{point.labelX} = {point.x}{0}<br>{point.labelY} = {point.y}{1}</p>".format(tmpX.percent ? "%" : "", tmpY.percent ? "%" : "")
                          }
                         }
                        },
                        "series" : [{ "data" : serie }]
                       });
  MFF.googleAnalytics("show-global-chart");
  MFF.googleAnalytics("set-global-chart-xaxis-" + xAxis);
  MFF.googleAnalytics("set-global-chart-yaxis-" + yAxis);
 },
 "renderDetail" : function()
 {
  var i, j, k, val, nb, div, id, color, serie, categories, min, max,
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget),
      container = MFF.LAYOUT.DETAIL.GEARS._content.getNode();
  MFF.LAYOUT.DETAIL.GEARS._content.flush();
  for ( i = 0; i < MFF.GEARS.length; i++ )
  {
   id = "detail_charts_gear{0}".format(i + 1);
   div = container.appendChild(document.createElement("div"));
   div.id = id;
   div.className = "chart bgOpaque";
   categories = [];
   serie = [];
   for ( k in MFF.GEARS[i] )
   {
    if ( MFF.GEARS[i].hasOwnProperty(k) )
    {
     val = 0; nb = 0;
     categories.push(MFF.GEARS[i][k].name);
     for ( j = 0; j < MFF.GEARS[i][k].range.length; j++ )
     {
      if ( data.gear[i][j].type == k && data.gear[i][j].pref )
      {
       nb++;
       min = MFF.GEARS[i][data.gear[i][j].type].range[j].min;
       max = MFF.GEARS[i][data.gear[i][j].type].range[j].max;
       val += MFF.PERCENT.individual(data.gear[i][j].val, min, max);
      }
     }
     val = val / nb;
     if ( isNaN(val) ) { val = 0; }
     else { val = parseInt(val); }
     if ( val == 100 ) { color = "#00FF00"; }
     else if ( val > 50 ) { color = "#CCFFCC"; }
     else if ( val == 50 ) { color = "#99CCFF"; }
     else { color = "#FFCCCC"; }
     serie.push({ "y" : val, "color" : color });
    }
   }
   new Highcharts.Chart({
                         "chart" : { "polar" : true, "renderTo" : id, "type" : "bar", "backgroundColor" : null },
                         "pane" : { "background" : { "backgroundColor" : "rgba(255, 255, 255, 0.5)", "outerRadius" : "100%" } },
                         "title" : { "useHTML" : true, "text" : MFF.UNIFORMS.getGearName(data.id, data.uniform, i) },
                         "xAxis" : { "categories" : categories, "lineWidth" : 0, "labels" : { "style" : { "color" : "#FFFFFF" } } },
                         "yAxis" : { "gridLineInterpolation" : "circle", "lineWidth" : 0, "min" : 0, "max" : 100, "labels" : { "enabled" : false }, "tickInterval" : 25 },
                         "credits" : { "enabled" : false },
                         "tooltip" : { "pointFormat" : "{point.y:,.2f}%" },
                         "legend" : { "enabled" : false },
                         "series" : [{ "name" : "Current", "data" : serie }]
                        });
  }
  categories = MFF.CHARACTERS.DATA[MFF.currentCharacter || MFF.lastTarget].uniforms[data.uniform].skills;
  id = "detail_charts_skill";
  div = container.appendChild(document.createElement("div"));
  div.id = id;
  div.className = "chart bgOpaque";
  new Highcharts.Chart({
                        "chart" : { "polar" : true, "renderTo" : id, "type" : "area", "backgroundColor" : null },
                        "pane" : { "background" : { "backgroundColor" : "rgba(255, 255, 255, 0.5)", "outerRadius" : "100%" } },
                        "title" : { "useHTML" : true, "text" : "Skills" },
                        "xAxis" : { "categories" : categories, "lineWidth" : 0, "labels" : { "style" : { "color" : "#FFFFFF" } } },
                        "yAxis" : { "gridLineInterpolation" : "polygon", "lineWidth" : 0, "min" : 0, "max" : 6, "labels" : { "enabled" : false }, "tickInterval" : 1 },
                        "credits" : { "enabled" : false },
                        "tooltip" : { "pointFormat" : "level {point.y}" },
                        "legend" : { "enabled" : false },
                        "plotOptions" : { "series" : { "color" : "#1b25e4" } },
                        "series" : [{ "name" : "Skills", "data" : data.skills }]
                       });
  MFF.LAYOUT.CHARTS.fixHighchartsTitles();
  MFF.googleAnalytics("show-character-chart");
 },
 "fixHighchartsTitles" : function()
 {
  var i,
      all = document.querySelectorAll("span.highcharts-title");
  for ( i = 0; i < all.length; i++ )
  {
   all[i].style.top = 0;
   all[i].style.left = 0;
   all[i].style.right = 0;
   all[i].style.width = "100%";
   all[i].style.padding = "2px 0";
   all[i].style.color = "#fff";
   all[i].style.background = "linear-gradient(to bottom, #666e92 0%, #3c4460 50%, #12192b 100%)";
   all[i].style.textAlign = "center";
   all[i].style.overflow = "hidden";
   all[i].style.borderTopLeftRadius = "4px";
   all[i].style.borderTopRightRadius = "4px";
   all[i].style.font = "100 12px/24px verdana";
  }
 }
};