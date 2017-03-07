/* global MFF, API */
MFF.LAYOUT =
{
 "init" : function()
 {
  API.DOM.flush(document.body);
  MFF.LAYOUT.ACTION.init();
  MFF.LAYOUT.DETAIL.init();
  MFF.LAYOUT.LIST.init();
  MFF.layout.charts = document.body.appendChild(document.createElement("div"));
  MFF.layout.charts.id = "area_charts";
  MFF.layout.detail_charts = document.body.appendChild(document.createElement("div"));
  MFF.layout.detail_charts.id = "area_detail_charts";
  MFF.LAYOUT.FOOTER.init();
 }
};