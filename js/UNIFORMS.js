/* global MFF, API */
MFF.UNIFORMS =
{
 "getValue" : function(uniform)
 {
  return uniform in MFF.UNIFORMS.DATA ? MFF.UNIFORMS.DATA[uniform] : null;
 },
 "getListForCharacter" : function(character)
 {
  var k,
      uniforms = [];
  for ( k in MFF.CHARACTERS.DATA[character].uniforms )
  {
   if ( MFF.CHARACTERS.DATA[character].uniforms.hasOwnProperty(k) )
   {
    uniforms.push({ "key" : k, "name" : MFF.UNIFORMS.getValue(k) });
   }
  }
  return uniforms;
 },
 "findLinked" : function(character, uniform)
 {
  var k, k2,
      id = uniform + "/" + character,
      all = [];
  for ( k in MFF.CHARACTERS.DATA )
  {
   if ( MFF.CHARACTERS.DATA.hasOwnProperty(k) && MFF.CHARACTERS.DATA[k].uniforms )
   {
    for ( k2 in MFF.CHARACTERS.DATA[k].uniforms )
    {
     if ( MFF.CHARACTERS.DATA[k].uniforms.hasOwnProperty(k2) && MFF.CHARACTERS.DATA[k].uniforms[k2].links )
     {
      MFF.CHARACTERS.DATA[k].uniforms[k2].links.forEach(function(link) { if ( link == id ) { all.push(k2 + "/" + k); } });
     }
    }
   }
  }
  return all;
 },
 "list" : function()
 {
  var left = document.createElement("ul"),
      right = document.createElement("div"),
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget),
      all = MFF.UNIFORMS.getListForCharacter(data.id);
  MFF.LAYOUT.DETAIL.GEARS.setCurrentTab("Uniforms");
  MFF.LAYOUT.DETAIL.GEARS._content.appendChild(left);
  MFF.LAYOUT.DETAIL.GEARS._content.appendChild(right);
  left.id = "uniformsLeftPanel";
  right.id = "uniformsRightPanel";
  all.forEach(function(uniform)
              {
               var li = left.appendChild(document.createElement("li")),
                   h1 = li.appendChild(document.createElement("h1")),
                   img = li.appendChild(document.createElement("img")),
                   h2 = li.appendChild(document.createElement("h2"));
               li.classList.add("bgOpaque waves waves-blue");
               li.dataset.uniform = uniform.key;
               img.src = "images/characters/{0}/{1}.png".format(uniform.key, data.id);
               h1.innerHTML = MFF.UNIFORMS.getValue(uniform.key);
               h2.classList.add("grade");
               h2.innerHTML = uniform.key == MFF.CHARACTERS.DATA[data.id].uniform ? "&nbsp;" : "normal";
               if ( data.uniform == uniform.key )
               {
                li.classList.add("active");
                MFF.UNIFORMS.drawLinks(uniform.key);
               }
              });
  left.onclick = function(e)
  {
   var li = API.EVT.getParentTarget(e, "li"),
       ul = li ? li.parentNode : null,
       active = ul ? ul.querySelector(".active") : null;
   if ( active ) { active.classList.remove("active"); }
   li.classList.add("active");
   MFF.UNIFORMS.drawLinks(li.dataset.uniform);
   MFF.saveCharacter({ "mode" : "uniform", "uniform" : li.dataset.uniform });
  };
 },
 "drawLinks" : function(uniform)
 {
  var table, tbody, trUp, trMiddle, trDown, th, div, h1, ul, li,
      right = document.getElementById("uniformsRightPanel"),
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget),
      links = (data.id in MFF.CHARACTERS.DATA) && (uniform in MFF.CHARACTERS.DATA[data.id].uniforms) && ("links" in MFF.CHARACTERS.DATA[data.id].uniforms[uniform]) ? MFF.CHARACTERS.DATA[data.id].uniforms[uniform].links : null,
      bonus = (data.id in MFF.CHARACTERS.DATA) && (uniform in MFF.CHARACTERS.DATA[data.id].uniforms) && ("bonus" in MFF.CHARACTERS.DATA[data.id].uniforms[uniform]) ? MFF.CHARACTERS.DATA[data.id].uniforms[uniform].bonus : null;
  right.innerHTML = "";
  if ( bonus === null ) { right.innerHTML = "<p class=bgOpaque>Default uniform.<br>Upgrade not available</p>"; }
  if ( links )
  {
   div = right.appendChild(document.createElement("div"));
   div.classList.add("bgOpaque requiredUniforms");
   h1 = div.appendChild(document.createElement("h1"));
   h1.innerHTML = "Optional uniforms for upgrade";
   table = div.appendChild(document.createElement("table"));
   tbody = table.appendChild(document.createElement("tbody"));
   trUp = tbody.appendChild(document.createElement("tr"));
   trUp.classList.add("up");
   trMiddle = tbody.appendChild(document.createElement("tr"));
   th = trMiddle.appendChild(document.createElement("th"));
   th.colSpan = 5;
   div = th.appendChild(document.createElement("div"));
   trDown = tbody.appendChild(document.createElement("tr"));
   trDown.classList.add("down");
   links.forEach(function(link, index)
                 {
                  var td,
                      i = document.createElement("i"),
                      img = document.createElement("img"),
                      tmp = link.split("/");
                  img.src = "images/characters/{0}.png".format(link);
                  img.dataset.link = link;
                  if ( tmp[1] == data.id ) { img.style.cursor = "default"; }
                  else
                  {
                   img.onclick = function()
                   {
                    var tmp = this.dataset.link.split("/");
                    MFF.LAYOUT.DETAIL.drawCharacter(tmp[1], true, null, true);
                   };
                  }
                  if ( index % 2 )
                  {
                   td = trDown.appendChild(document.createElement("td"));
                   td.appendChild(i);
                   td.appendChild(img);
                   trUp.appendChild(document.createElement("td"));
                  }
                  else
                  {
                   td = trUp.appendChild(document.createElement("td"));
                   td.appendChild(img);
                   td.appendChild(i);
                   trDown.appendChild(document.createElement("td"));
                  }
                 });
  }
  else if ( bonus !== null ) { right.innerHTML = "<p class=bgOpaque><i class=\"fa fa-exclamation\"></i> Unknown optional uniforms for upgrade.<br>If you happen to know uniforms, please submit an <a href=\"https://github.com/Mokhet/MFF-roster-tracker/issues\" target=\"blank\">issue</a></p>"; }
  if ( bonus )
  {
   div = right.appendChild(document.createElement("div"));
   div.classList.add("uniformBonus bgOpaque");
   h1 = div.appendChild(document.createElement("h1"));
   h1.innerHTML = "Uniform bonus";
   bonus.forEach(function(b)
                 {
                  var span = div.appendChild(document.createElement("span"));
                  if ( b.substr(0, 13) == "Cooldown time" ) { span.classList.add("cooldown"); }
                  span.innerHTML = b;
                 });
  }
  if ( links )
  {
   links = MFF.UNIFORMS.findLinked(data.id, uniform);
   div = right.appendChild(document.createElement("div"));
   div.classList.add("bgOpaque linkedUniforms");
   h1 = div.appendChild(document.createElement("h1"));
   h1.innerHTML = "Linked uniforms";
   ul = div.appendChild(document.createElement("ul"));
   if ( links.length )
   {
    links.forEach(function(link)
                  {
                   var li = ul.appendChild(document.createElement("li")),
                       img = li.appendChild(document.createElement("img")),
                       tmp = link.split("/");
                   img.src = "images/characters/{0}.png".format(link);
                   img.dataset.link = link;
                   if ( tmp[1] == data.id ) { img.style.cursor = "default"; }
                   else
                   {
                    img.onclick = function()
                    {
                     var tmp = this.dataset.link.split("/");
                     MFF.LAYOUT.DETAIL.drawCharacter(tmp[1], true, null, true);
                    };
                   }
                  });
   }
   else
   {
    li = ul.appendChild(document.createElement("li"));
    li.className = "noLinkedUniforms";
    li.innerHTML = "No linked uniforms";
   }
  }
 }
};
