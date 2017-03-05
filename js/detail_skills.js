/* global DETAIL, CHARACTERS, MFF */

DETAIL.drawSkills = function(container, character, data)
{
 var i, j, select, option,
     div = container.appendChild(document.createElement("div"));
 div.id = "skills";
 for ( i = 0; i < 5; i++ )
 {
  select = div.appendChild(document.createElement("select"));
  select.className = "skill_lvl";
  for ( j = 0; j < 7; j++ )
  {
   option = select.appendChild(document.createElement("option"));
   option.value = j;
   option.text = "{0}: #{1}".format(CHARACTERS[character].uniforms[data.uniform].skills[i], j);
  }
  select.selectedIndex = data.skills[i];
  select.dataset.skill = i;
  select.onchange = function() { MFF.saveCharacter({"mode":"skill", "skill":this.dataset.skill, "lvl":this.options[this.selectedIndex].value}); };
 }
};

