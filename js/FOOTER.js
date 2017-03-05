/*global MFF, CHARACTERS */
var FOOTER =
{
"__node":null,
"init":function()
{
 var div = document.getElementById("footer");
 if ( div ) { FOOTER.__node = div; }
 else
 {
  FOOTER.__node = document.body.appendChild(document.createElement("div"));
  FOOTER.__node.id = "footer";
 }
},
"draw":function()
{
 var span;
 FOOTER.init();
 FOOTER.__node.innerHTML = "";
 FOOTER.__computeNbTiers();
 span = FOOTER.__node.appendChild(document.createElement("span"));
 span.id = "MFFversion";
 span.className = "bgOpaque";
 span.appendChild(document.createTextNode("v.{0} for MFF v.{1}".format(MFF.version, MFF.versionMFF)));
 span.title = "Version {0} compliant with MFF version {1}".format(MFF.version, MFF.versionMFF);

},
"__computeNbTiers":function()
{
 var k, span,
     T1 = 0,
     T2 = 0,
     PT2 = 0;
 for ( k in MFF.characters )
 {
  if ( MFF.characters.hasOwnProperty(k) )
  {
   if ( MFF.characters[k].tier == 2 )
   {
    T2++;
   }
   else
   {
    T1++;
    if ( CHARACTERS[k].tiers.indexOf(2) != -1 && MFF.characters[k].gear[0][7].type && MFF.characters[k].gear[1][7].type && MFF.characters[k].gear[2][7].type && MFF.characters[k].gear[3][7].type )
    {
     PT2++;
    }
   }
  }
 }
 span = FOOTER.__node.appendChild(document.createElement("span"));
 span.id = "nbTiers";
 span.className = "bgOpaque";
 span.appendChild(document.createTextNode("T1 : {0} | T2 : {1} | Potential T2 : {2}".format(T1, T2, PT2)));
}
};