/* global MFF, API */
MFF.PERCENT =
{
 "all" : null,
 "map" :
 {
  "gears" : { "key" : "percent_gears", "label" : "Gears", "compute" : "computePercentGears", "refresh" : "refreshPercentGears" },
  "skills" : { "key" : "percent_skills", "label" : "Skills", "compute" : "computePercentSkills", "refresh" : "refreshPercentSkills" },
  "uniform" : { "key" : "percent_uniform", "label" : "Uniform", "compute" : "computePercentUniform", "refresh" : "refreshPercentUniform" }
 },
 "isActive" : function(key) { return localStorage.getItem(MFF.PERCENT.map[key].key) === "N" ? false : true; },
 "setActive" : function(key, state) {localStorage.setItem(MFF.PERCENT.map[key].key, state ? "Y" : "N"); },
 "init" : function(characterId)
 {
  if ( MFF.PERCENT.all === null )
  {
   API.EVT.on("computePercentGlobal", function(characterId) { MFF.PERCENT.compute(characterId); });
   API.EVT.on("computePercentGears", function(characterId) { MFF.PERCENT.computeGears(characterId); });
   API.EVT.on("computePercentSkills", function(characterId) { MFF.PERCENT.computeSkills(characterId); });
   API.EVT.on("computePercentUniform", function(characterId) { MFF.PERCENT.computeUniform(characterId); });
   MFF.PERCENT.all = {};
  }
  MFF.PERCENT.all[characterId] = {
                                  "global" : 0,
                                  "gears" : 0,
                                  "skills" : 0,
                                  "uniform" : 0,
                                  "uru" : 0,
                                  "obelisk" : 0
                                 };
  MFF.PERCENT.computeGears(characterId, true);
  MFF.PERCENT.computeSkills(characterId, true);
  MFF.PERCENT.computeUniform(characterId, true);
  MFF.PERCENT.compute(characterId, true);
 },
 "recomputeAll" : function(key, exceptCharacter)
 {
  var k;
  for ( k in MFF.PERCENT.all )
  {
   if ( MFF.PERCENT.all.hasOwnProperty(k) && k != exceptCharacter )
   {
    API.EVT.dispatch(MFF.PERCENT.map[key].compute, k);
   }
  }
 },
 "compute" : function(characterId, preventDispatch)
 {
  var map = ["gears", "skills", "uniform"],
      nb = 0,
      total = 0;
  map.forEach(function(item)
              {
               if ( MFF.PERCENT.isActive(item) && MFF.PERCENT.all[characterId][item] !== null )
               {
                nb++;
                total += MFF.PERCENT.all[characterId][item];
               }
              });
  MFF.PERCENT.all[characterId].global = nb ? total / nb : 0;
  if( preventDispatch !== true )
  {
   API.EVT.dispatch("refreshPercentGlobal", characterId);
  }
 },
 "individual" : function(val, min, max, fixed)
 {
  var v = 0;
  if ( val > 0 )
  {
   if ( val < min ) { val = min; }
   else if ( val > max ) { val = max; }
   v = ((val - min) / (max - min)) * 100;
  }
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "get" : function(characterId, fixed)
 {
  var v = MFF.PERCENT.all[characterId].global;
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "getGears" : function(characterId, fixed)
 {
  var v = MFF.PERCENT.all[characterId].gears;
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "getSkills" : function(characterId, fixed)
 {
  var v = MFF.PERCENT.all[characterId].skills;
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "getUniform" : function(characterId, fixed, nullOnNull)
 {
  var v = MFF.PERCENT.all[characterId].uniform;
  if ( nullOnNull && v === null ) { return null; }
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "getUru" : function(characterId, fixed)
 {
  var v = MFF.PERCENT.all[characterId].uru;
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "getObelisk" : function(characterId, fixed)
 {
  var v = MFF.PERCENT.all[characterId].obelisk;
  return fixed ? API.numberToFixed(v, 2) : v;
 },
 "computeGears" : function(characterId, preventDispatch)
 {
  var i, j, type, cur, min, max,
      total = 0,
      maxi = 0,
      data = MFF.CHARACTERS.get(characterId);
  for ( i = 0; i < data.gear.length; i++ )
  {
   for ( j = 0; j < data.gear[i].length; j++ )
   {
    maxi += 100;
    if ( data.gear[i][j].pref )
    {
     type = data.gear[i][j].type;
     cur = data.gear[i][j].val || 0;
     min = MFF.GEARS[i][type].range[j].min;
     max = MFF.GEARS[i][type].range[j].max;
     if ( cur < min ) { cur = min; }
     else if ( cur > max ) { cur = max; }
     total += MFF.PERCENT.individual(cur, min, max);
    }
   }
  }
  MFF.PERCENT.all[characterId].gears = maxi ? total * 100 / maxi : 0;
  if ( preventDispatch !== true )
  {
   MFF.PERCENT.compute(characterId);
   API.EVT.dispatch("refreshPercentGears", characterId);
  }
 },
 "computeSkills" : function(characterId, preventDispatch)
 {
  var i,
      total = 0,
      maxi = 0,
      data = MFF.CHARACTERS.get(characterId);
  for ( i = 0; i < data.skills.length; i++ )
  {
   maxi += 100;
   total += MFF.PERCENT.individual(data.skills[i], 0, 6);
  }
  MFF.PERCENT.all[characterId].skills = maxi ? total * 100 / maxi : 0;
  if ( preventDispatch !== true )
  {
   MFF.PERCENT.compute(characterId);
   API.EVT.dispatch("refreshPercentSkills", characterId);
  }
 },
 "computeUniform" : function(characterId, preventDispatch)
 {
  var i, cur, delta, min, max, type,
      total = null,
      data = MFF.CHARACTERS.get(characterId),
      rankData = MFF.UNIFORMS.getRankData(characterId, data.uniform);
  if ( rankData.rank == "unowned" ) { total = null; }
  else
  {
   total = rankData.percent; // normal is 10%, mythical is 50%
   for ( i = 0; i < data.uniforms[data.uniform].options.length; i++ )
   {
    if ( data.uniforms[data.uniform].options[i] )
    {
     type = data.uniforms[data.uniform].options[i][0];
     cur = data.uniforms[data.uniform].options[i][1];
     delta = MFF.UNIFORMS.RANKS_PROGRESSIONS[MFF.UNIFORMS.RANKS_OPTIONS[i][type].progress].normal,
     min = MFF.UNIFORMS.RANKS_OPTIONS[i][type].min + delta,
     delta = MFF.UNIFORMS.RANKS_PROGRESSIONS[MFF.UNIFORMS.RANKS_OPTIONS[i][type].progress].mythical,
     max = MFF.UNIFORMS.RANKS_OPTIONS[i][type].max + delta,
     total += MFF.PERCENT.individual(cur, min, max) / 10; // each upgrade option is 10%
    }
   }
  }
  MFF.PERCENT.all[characterId].uniform = total;
  if ( preventDispatch !== true )
  {
   MFF.PERCENT.compute(characterId);
   API.EVT.dispatch("refreshPercentUniform", characterId);
  }
 }
};