/* global MFF, API */
MFF.LAYOUT =
{
 "init" : function()
 {
  API.EVT.reset();
  API.DOM.flush(document.body);
  MFF.LAYOUT.ACTION.init();
  MFF.LAYOUT.DETAIL.init();
  MFF.LAYOUT.LIST.init();
  MFF.LAYOUT.FOOTER.init();
  MFF.LAYOUT.CHARTS.init();
 }
};