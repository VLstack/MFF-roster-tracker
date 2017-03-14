/*global MFF, Panel, API */
MFF.LAYOUT.FOOTER =
{
 "init" : function()
 {
  var span;
  MFF.LAYOUT.FOOTER._panel = new Panel({ "id" : "panelFooter" });
  API.EVT.on("updateTier", MFF.LAYOUT.FOOTER._updateTier);
  MFF.LAYOUT.FOOTER._updateTier();
  span = MFF.LAYOUT.FOOTER._panel.appendChild(document.createElement("span"));
  span.id = "MFFversion";
  span.className = "bgOpaque";
  span.innerHTML = "v.{0} for MFF v.{1}".format(MFF.version, MFF.versionMFF);
  span.title = "Version {0} compliant with MFF version {1}".format(MFF.version, MFF.versionMFF);
  if ( ("" + location).indexOf("MFF-beta") != -1 ) { span.classList.add("beta"); }
  else if ( ("" + location).indexOf("localhost") != -1 ) { span.classList.add("localhost"); }
 },
 "_updateTier" : function()
 {
  var k,
      span = document.getElementById("nbTiers"),
      all = MFF.CHARACTERS.getAll(),
      T1 = 0,
      T2 = 0,
      PT2 = 0;
  if ( all )
  {
   for ( k in all )
   {
    if ( all.hasOwnProperty(k) )
    {
     if ( all[k].tier == 2 )
     {
      T2++;
     }
     else
     {
      T1++;
      if ( MFF.CHARACTERS.DATA[k].tiers.indexOf(2) != -1 && all[k].gear[0][7].type && all[k].gear[1][7].type && all[k].gear[2][7].type && all[k].gear[3][7].type )
      {
       PT2++;
      }
     }
    }
   }
  }
  if ( !span )
  {
   span = MFF.LAYOUT.FOOTER._panel.appendChild(document.createElement("span"));
   span.id = "nbTiers";
   span.className = "bgOpaque";
  }
  span.innerHTML = "T1 : {0} | T2 : {1} | T2 ready : {2}".format(T1, T2, PT2);
 }
};