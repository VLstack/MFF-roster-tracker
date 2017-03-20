/* global MFF, API, ToggleSwitch */
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
 "setActive" : function(uniform)
 {
  var ul = document.getElementById("uniformsLeftPanel"),
      active = ul.querySelector("li.active");
  if ( active ) { active.classList.remove("active"); }
  active = ul.querySelector("li.uniform_" + uniform);
  if ( active )
  {
   active.classList.add("active");
   MFF.UNIFORMS.draw(uniform);
  }
 },
 "list" : function(focusUniform)
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
               var rankData = MFF.UNIFORMS.getRankData(data.id, uniform.key),
                   li = left.appendChild(document.createElement("li")),
                   h1 = li.appendChild(document.createElement("h1")),
                   img = li.appendChild(document.createElement("img")),
                   h2 = li.appendChild(document.createElement("h2"));
               li.classList.add("bgOpaque waves waves-blue uniform_" + uniform.key);
               li.dataset.uniform = uniform.key;
               img.src = "images/characters/{0}/{1}.png".format(uniform.key, data.id);
               h1.innerHTML = MFF.UNIFORMS.getValue(uniform.key);
               h2.className = "rank " + rankData.rank;
               h2.innerHTML = uniform.key == MFF.CHARACTERS.DATA[data.id].uniform ?  "&nbsp;" : rankData.label;
              });
  MFF.UNIFORMS.setActive(focusUniform || data.uniform);
  left.onclick = function(e)
  {
   var li = API.EVT.getParentTarget(e, "li");
   if ( li && li.dataset.uniform ) { MFF.UNIFORMS.setActive(li.dataset.uniform); }
  };
 },
 "isSelected" : function(character, uniform)
 {
  var data = MFF.CHARACTERS.get(character);
  return data && data.uniform == uniform;
 },
 "getRank" : function(character, uniform)
 {
  var data = MFF.CHARACTERS.get(character);
  return data && data.uniforms && (uniform in data.uniforms) && ("rank" in data.uniforms[uniform]) ? data.uniforms[uniform].rank : "unowned";
 },
 "getRankData" : function(character, uniform)
 {
  var rank = MFF.UNIFORMS.getRank(character, uniform),
      obj = MFF.UNIFORMS.RANKS[rank];
  obj.rank = rank;
  return obj;
 },
 "drawRanks" : function(container, character, uniform)
 {
  var rankData = MFF.UNIFORMS.getRankData(character, uniform),
      div = container.appendChild(document.createElement("div")),
      all = Object.keys(MFF.UNIFORMS.RANKS),
      span = div.appendChild(document.createElement("span")),
      current = div.appendChild(document.createElement("h2")),
      select = div.appendChild(document.createElement("div"));
  div.className = "ranks";
  select.className = "select bgOpaque";
  select.style.display = "none";
  span.innerHTML = "Rank";
  current.className = "current rank " + rankData.rank;
  current.innerHTML = rankData.label;
  all.sort(function(a, b) { return MFF.UNIFORMS.RANKS[a].order - MFF.UNIFORMS.RANKS[b].order; });
  all.forEach(function(rank)
              {
               var h2 = select.appendChild(document.createElement("h2"));
               h2.className = "rank " + rank;
               h2.innerHTML = MFF.UNIFORMS.RANKS[rank].label;
               h2.dataset.rank = rank;
              });
  div.onclick = (function(character, uniform)
                 {
                  return function(e)
                  {
                   var target, current, rank,
                       select = this.querySelector(".select");
                   if ( select.style.display == "none" ) { select.style.display = ""; }
                   else
                   {
                    target = API.EVT.getParentTarget(e, "h2");
                    if ( target )
                    {
                     rank = target.dataset.rank;
                     current = this.querySelector(".current");
                     current.className = "current rank " + rank;
                     current.innerHTML = MFF.UNIFORMS.RANKS[rank].label;
                     MFF.saveCharacter({ "mode" : "uniformRank", "uniform" : uniform, "rank" : rank });
                     MFF.UNIFORMS.list(uniform);
                    }
                    else { select.style.display = "none"; }
                   }
                  };
                 })(character, uniform);
 },
 "draw" : function(uniform)
 {
  var table, tbody, trUp, trMiddle, trDown, th, div, h1, ul, li, p, selected,
      divDevelopment = document.createElement("div"),
      right = document.getElementById("uniformsRightPanel"),
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget),
      links = (data.id in MFF.CHARACTERS.DATA) && (uniform in MFF.CHARACTERS.DATA[data.id].uniforms) && ("links" in MFF.CHARACTERS.DATA[data.id].uniforms[uniform]) ? MFF.CHARACTERS.DATA[data.id].uniforms[uniform].links : null,
      bonus = (data.id in MFF.CHARACTERS.DATA) && (uniform in MFF.CHARACTERS.DATA[data.id].uniforms) && ("bonus" in MFF.CHARACTERS.DATA[data.id].uniforms[uniform]) ? MFF.CHARACTERS.DATA[data.id].uniforms[uniform].bonus : null,
      rankDataParent = MFF.UNIFORMS.getRankData(data.id, uniform);

  function updateDevelopmentStatus()
  {
   var bonus, h1, k, span, character, uniform, data, rankData,
       divDevelopment = document.getElementById("divDevelopment");
   if ( divDevelopment )
   {
    character = divDevelopment.dataset.character;
    uniform = divDevelopment.dataset.uniform;
    data = MFF.CHARACTERS.get(character);
    rankData = MFF.UNIFORMS.getRankData(character, uniform);
    divDevelopment.innerHTML = "";
    divDevelopment.style.display = "none";
    if ( rankData.rank != "unowned" )
    {
     divDevelopment.style.display = "";
     bonus = {
              "AA" : { "label" : "All attacks", "value" : "+{0}%".format(10 + rankData.order * 2) },
              "AD" : { "label" : "All defenses", "value" : "+{0}%".format(10 + rankData.order * 2) }
             };
     if ( (uniform in data.uniforms) && data.uniforms[uniform].options && Array.isArray(data.uniforms[uniform].options) )
     {
      data.uniforms[uniform].options.forEach(function(opt)
                                             {
                                              var k, v;
                                              if ( opt && Array.isArray(opt) && opt.length == 2 )
                                              {
                                               k = opt[0];
                                               v = opt[1];
                                               if ( v )
                                               {
                                                if ( !(k in bonus) ) { bonus[k] = { "label" : MFF.axisItems[k].label, "value" : 0 }; }
                                                bonus[k].value += v;
                                               }
                                              }
                                             });
     }
     h1 = divDevelopment.appendChild(document.createElement("h1"));
     h1.innerHTML = "Development bonus";
     for ( k in bonus )
     {
      if ( bonus.hasOwnProperty(k) )
      {
       span = divDevelopment.appendChild(document.createElement("span"));
       span.innerHTML = "{0} {1}".format(bonus[k].label, bonus[k].value);
      }
     }
    }
   }
  }
  divDevelopment.id = "divDevelopment";
  divDevelopment.dataset.character = data.id;
  divDevelopment.dataset.uniform = uniform;
  right.innerHTML = "";
  div = right.appendChild(document.createElement("div"));
  div.classList.add("bgOpaque uniformOwned");
  selected = MFF.UNIFORMS.isSelected(data.id, uniform);
  new ToggleSwitch({
                    "renderTo" : div, "content" : "Selected uniform", "id" : "selectedUniform",
                    "checked" : selected, "disabled" : selected,
                    "data" : uniform,
                    "callback" : function(checked, uniform)
                    {
                     this.setDisabled(true);
                     MFF.saveCharacter({ "mode" : "uniform", "uniform" : uniform });
                    }
                   });
  if ( bonus === null )
  {
   p = div.appendChild(document.createElement("p"));
   p.innerHTML = "Default uniform. Upgrade not available.";
  }
  else { MFF.UNIFORMS.drawRanks(div, data.id, uniform); }
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
                  var td, k, option, idx,
                      options = MFF.UNIFORMS.RANKS_OPTIONS[index],
                      div = document.createElement("div"),
                      select = div.appendChild(document.createElement("select")),
                      min = div.appendChild(document.createElement("span")),
                      current = div.appendChild(document.createElement("input")),
                      max = div.appendChild(document.createElement("span")),
                      i = document.createElement("i"),
                      img = document.createElement("img"),
                      h2 = document.createElement("h2"),
                      tmp = link.split("/"),
                      characterChild = tmp[1],
                      uniformChild = tmp[0],
                      rankDataChild = MFF.UNIFORMS.getRankData(characterChild, uniformChild);
                  // execution scope : current
                  function checkValues()
                  {
                   var cName = "invalide",
                       div = this.parentNode,
                       min = div.childNodes[1],
                       current = div.childNodes[2],
                       max = div.childNodes[3],
                       minValue = parseInt(min.innerHTML),
                       maxValue = parseInt(max.innerHTML),
                       moyValue = ( minValue + maxValue ) / 2;
                   if ( current.value == 0 ) { cName = "undef"; }
                   else if ( current.value == moyValue ) { cName = "moy"; }
                   else if ( current.value == minValue ) { cName = "min"; }
                   else if ( current.value == maxValue ) { cName = "max"; }
                   else if ( current.value < moyValue && current.value > minValue ) { cName = "inf"; }
                   else if ( current.value > moyValue && current.value < maxValue ) { cName = "sup"; }
                   current.className = cName;
                   if ( MFF.UNIFORMS.toidSave ) { MFF.UNIFORMS.toidSave = clearTimeout(MFF.UNIFORMS.toidSave); }
                   MFF.UNIFORMS.toidSave = setTimeout(function()
                                                      {
                                                       var index = div.dataset.index,
                                                           select = div.firstChild,
                                                           uniform = div.dataset.parentUniform;
                                                       MFF.saveCharacter({ "mode" : "uniformOptions", "uniform" : uniform, "index" : index, "value" : current.value, "attribute" : select.value });
                                                       updateDevelopmentStatus();
                                                      }, 500);
                  }
                  // execution scope : select
                  function setMinMax(loadFromCharacter)
                  {
                   var v,
                       div = this.parentNode,
                       delta = MFF.UNIFORMS.RANKS_PROGRESSIONS[MFF.UNIFORMS.RANKS_OPTIONS[div.dataset.index][this.value].progress][div.dataset.rank],
                       minValue = MFF.UNIFORMS.RANKS_OPTIONS[div.dataset.index][this.value].min + delta,
                       maxValue = MFF.UNIFORMS.RANKS_OPTIONS[div.dataset.index][this.value].max + delta,
                       min = div.childNodes[1],
                       current = div.childNodes[2],
                       max = div.childNodes[3];
                   min.innerHTML = minValue;
                   max.innerHTML = maxValue;
                   current.value = 0;
                   if (    loadFromCharacter === true
                        && (div.dataset.parentUniform in data.uniforms)
                        && data.uniforms[div.dataset.parentUniform].options
                        && data.uniforms[div.dataset.parentUniform].options[div.dataset.index] )
                   {
                    v = parseInt(data.uniforms[div.dataset.parentUniform].options[div.dataset.index][1]);
                    current.value = isNaN(v) ? 0 : v;
                   }
                   checkValues.call(current);
                  }
                  img.src = "images/characters/{0}.png".format(link);
                  img.dataset.link = link;
                  if ( characterChild == data.id ) { img.style.cursor = "default"; }
                  else
                  {
                   img.onclick = function()
                   {
                    var tmp = this.dataset.link.split("/"),
                        character = tmp[1],
                        uniform = tmp[0];
                    MFF.LAYOUT.DETAIL.drawCharacter(character, true, null, true, uniform);
                   };
                  }
                  div.classList.add("rankOptions");
                  div.dataset.index = index;
                  div.dataset.uniform = uniformChild;
                  div.dataset.character = characterChild;
                  div.dataset.rank = rankDataChild.rank;
                  div.dataset.parentUniform = uniform;
                  div.dataset.parentCharacter = data.id;
                  idx = 0;
                  for ( k in options )
                  {
                   if ( options.hasOwnProperty(k) )
                   {
                    option = select.appendChild(document.createElement("option"));
                    option.value = k;
                    option.text = MFF.axisItems[k].label;
                    if (    (uniform in data.uniforms)
                         && data.uniforms[uniform].options
                         && data.uniforms[uniform].options[div.dataset.index]
                         && data.uniforms[uniform].options[div.dataset.index][0] == k ) { select.selectedIndex = idx; }
                    idx++;
                   }
                  }
                  h2.className = "rank " + rankDataChild.rank;
                  h2.innerHTML = rankDataChild.label;
                  current.type = "text";
                  if ( rankDataChild.rank == "unowned" || rankDataParent.order <= index )
                  {
                   current.disabled = true;
                   select.disabled = true;
                   min.innerHTML = "n/a";
                   max.innerHTML = "n/a";
                   current.value = "n/a";
                  }
                  else
                  {
                   current.onkeyup = checkValues;
                   select.onchange = setMinMax;
                   setMinMax.call(select, true);
                  }
                  if ( index % 2 )
                  {
                   td = trDown.appendChild(document.createElement("td"));
                   td.appendChild(i);
                   td.appendChild(h2);
                   td.appendChild(img);
                   td.appendChild(div);
                   trUp.appendChild(document.createElement("td"));
                  }
                  else
                  {
                   td = trUp.appendChild(document.createElement("td"));
                   td.appendChild(div);
                   td.appendChild(img);
                   td.appendChild(h2);
                   td.appendChild(i);
                   trDown.appendChild(document.createElement("td"));
                  }
                 });
  }
  else if ( bonus !== null ) { right.innerHTML = "<p class=bgOpaque><i class=\"fa fa-exclamation\"></i> Unknown optional uniforms for upgrade.<br>If you happen to know uniforms, please submit an <a href=\"https://github.com/Mokhet/MFF-roster-tracker/issues\" target=\"blank\">issue</a></p>"; }
  if ( bonus )
  {
   div = right.appendChild(document.createElement("div"));
   div.classList.add("bgOpaque uniformBonus");
   h1 = div.appendChild(document.createElement("h1"));
   h1.innerHTML = "Uniform bonus";
   bonus.forEach(function(b)
                 {
                  var span = div.appendChild(document.createElement("span"));
                  if ( b.substr(0, 13) == "Cooldown time" ) { span.classList.add("cooldown"); }
                  span.innerHTML = b;
                 });
   div.appendChild(divDevelopment);
   updateDevelopmentStatus();
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
                       h2 = li.appendChild(document.createElement("h2")),
                       tmp = link.split("/"),
                       character = tmp[1],
                       uniform = tmp[0],
                       rankData = MFF.UNIFORMS.getRankData(character, uniform);
                   img.src = "images/characters/{0}.png".format(link);
                   img.dataset.link = link;
                   h2.className = "rank " + rankData.rank;
                   h2.innerHTML = rankData.label;
                   if ( tmp[1] == data.id ) { img.style.cursor = "default"; }
                   else
                   {
                    img.onclick = function()
                    {
                     var tmp = this.dataset.link.split("/"),
                         character = tmp[1],
                         uniform = tmp[0];
                     MFF.LAYOUT.DETAIL.drawCharacter(character, true, null, true, uniform);
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
