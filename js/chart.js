/* global MFF, API, CHARACTERS, Highcharts */
MFF.renderChart = function()
{
 var i, x, y, tmpX, tmpY, id, character, labelX, labelY,
     serie = [],
     xAxis = document.getElementById("XAxis").value,
     yAxis = document.getElementById("YAxis").value,
     childs = document.getElementById("allCharacters").childNodes;

 MFF.googleAnalytics("renderChart");
 document.body.className = "render_charts";
 API.DOM.flush(MFF.layout.charts);
 for ( i = 0; i < childs.length; i++ )
 {
  if ( childs[i].style.display !== "none" )
  {
   id = childs[i].id;
   character = MFF.loadCharacter(id);
   tmpX = MFF.axisItems[xAxis].callback(character, id);
   tmpY = MFF.axisItems[yAxis].callback(character, id);
   x = tmpX.percent ? API.numberToFixed(tmpX.value, 2) : parseInt(tmpX.value, 10);
   y = tmpY.percent ? API.numberToFixed(tmpY.value, 2) : parseInt(tmpY.value, 10);
   labelX = MFF.axisItems[xAxis].label;
   labelY = MFF.axisItems[yAxis].label;
   if ( xAxis == "attack" )
   {
    labelX = CHARACTERS[id].uniforms[character.uniform].attackBase == "physical" ? "Physical attack" : "Energy attack";
   }
   if ( yAxis == "attack" )
   {
    labelY = CHARACTERS[id].uniforms[character.uniform].attackBase == "physical" ? "Physical attack" : "Energy attack";
   }
   serie.push({
               "characterId":id,
               "name":CHARACTERS[id].uniforms[character.uniform].name,
               "x":x, "labelX":labelX,
               "y":y, "labelY":labelY,
               "marker":{"width":32, "height":32, "symbol":"url(images/characters/{0}/{1}.png)".format(character.uniform, id)}
              });
  }
 }
 MFF.globalChart = new Highcharts.Chart({
                                         "chart":{"renderTo":"area_charts", "type":"scatter", "zoomType":"xy", "backgroundColor":"#FFFFFF"},
                                         "credits":{"enabled":false},
                                         "title":{"text":"{0} / {1}".format(MFF.axisItems[xAxis].label, MFF.axisItems[yAxis].label)},
                                         "xAxis":
                                         {
                                          "title":{"enabled":true, "text":MFF.axisItems[xAxis].label},
                                          "startOnTick":true,
                                          "endOnTick":true,
                                          "showLastLabel":true
                                         },
                                         "yAxis":
                                         {
                                          "title":{"enabled":true, "text":MFF.axisItems[yAxis].label},
                                          "startOnTick":true,
                                          "alternateGridColor":"rgba(43, 65, 255, 0.03)"
                                         },
                                         "legend":{"enabled":false},
                                         "plotOptions":
                                         {
                                          "series":
                                          {
                                           "cursor":"pointer",
                                           "events":
                                           {
                                            "click":function(evt)
                                            {
                                             MFF.renderList();
                                             MFF.drawCharacter(evt.point.characterId, true);
                                            }
                                           }
                                          },
                                          "scatter":
                                          {
                                           "tooltip":
                                           {
                                            "headerFormat":"",
                                            "footerFormat":"",
                                            "pointFormat":"<p style=\"font:12px/16px verdana\"><b>{point.name}</b><br>{point.labelX} = {point.x}{0}<br>{point.labelY} = {point.y}{1}</p>".format(tmpX.percent ? "%" : "", tmpY.percent ? "%" : "")
                                           }
                                          }
                                         },
                                         "series":[{"data":serie}]
                                        });
};