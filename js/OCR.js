/* global MFF, MODAL, FileReader, API */

"use strict";

MFF.OCR =
{
 "url" : "https://dancmc.io/mff/ocr",
 "available" : null,
 "nbCheck" : 0,
 "maxCheck" : 5,
 "files" : [],
 "getAvailabilityTag" : function()
 {
  var cName, txt,
      span = document.getElementById("OCRAvailability");
  if ( !span )
  {
   span = document.createElement("span");
   span.id = "OCRAvailability";
  }
  if ( span )
  {
   if ( MFF.OCR.available === null )
   {
    txt = "<i class=\"fa fa-spinner fa-pulse fa-fw\"></i> BETA Checking availability";
    cName = "OCRAvailabilityCheck";
   }
   else if ( MFF.OCR.available === true )
   {
    txt = "BETA";
    cName = "OCRAvailabilityTRUE";
   }
   else
   {
    txt = "BETA unavailable";
    cName = "OCRAvailabilityFALSE";
   }
   span.innerHTML = txt;
   span.className = cName;
  }
  return span;
 },
 "setAvailability" : function(state)
 {
  MFF.OCR.available = state;
  MFF.OCR.getAvailabilityTag();
 },
 "checkAvailability" : function(cb)
 {
  var xhr = new XMLHttpRequest();
  MFF.OCR.nbCheck++;
  xhr.open("POST", MFF.OCR.url, true);
  xhr.onerror = function() { MFF.OCR.setAvailability(false); };
  xhr.onload = function()
  {
   MFF.OCR.setAvailability(this.status == 200);
   if ( cb && (typeof cb == "function") ) { cb(); }
  };
  xhr.send();
 },
 "drawFilesToUpload" : function()
 {
  var i, img, div,
      recap = document.getElementById("OCRTextRecap"),
      dropArea = document.getElementById("OCRDropArea");
  API.DOM.flush(dropArea);
  div = dropArea.appendChild(document.createElement("div"));
  div.className = "text";
  div.innerHTML = "Drop images here";
  div = dropArea.appendChild(document.createElement("div"));
  div.id = "OCRList";
  for ( i = 0; i < MFF.OCR.files.length; i++ )
  {
   img = div.appendChild(document.createElement("img"));
   img.style.left = (10 + i * 40) + "px";
   img.style.zIndex = 100 + i;
   img.src = MFF.OCR.files[i].content;
  }
  recap.innerHTML = MFF.OCR.files.length === 0 ? "" : "{0} {1} ready to upload for analyze".format(MFF.OCR.files.length, MFF.OCR.files.length > 1 ? "images" : "image");
 },
 "selectScreenshots" : function()
 {
  var modalOpts,
      dropArea = document.createElement("div"),
      textRecap = document.createElement("div");

  if ( MFF.OCR.available )
  {
   MFF.LAYOUT.DETAIL.drawEmpty();
   dropArea.id = "OCRDropArea";
   dropArea.ondragover = function(evt)
   {
    evt.dataTransfer.dropEffect = "copy";
    this.classList.add("OCRDragOver");
    return false;
   };
   dropArea.ondragleave = function()
   {
    this.classList.remove("OCRDragOver");
   };
   dropArea.ondrop = function(e)
   {
    var i, fileReader, file,
        errors = [],
        files = e.dataTransfer.files;
    this.classList.remove("OCRDragOver");
    for ( i = 0; i < files.length; i++ )
    {
     file = files[i];
     if ( file.type.match("image.*") )
     {
      fileReader = new FileReader();
      fileReader.onload = (function(file)
                           {
                            return function(/*e*/)
                            {
                             MFF.OCR.files.push({ "file" : file, "content" : this.result, "state" : null });
                             if ( MFF.OCR.toid ) { MFF.OCR.toid = window.clearTimeout(MFF.OCR.toid); }
                             MFF.OCR.toid = window.setTimeout(MFF.OCR.drawFilesToUpload, 250);
                            };
                           })(file);
      fileReader.readAsDataURL(file);
     }
     else { errors.push("File \"{0}\" is not an image".format(file.name)); }
    }
    if ( errors.length ) { alert("Errors occured\n\n" + errors.join("\n")); }
    return false;
   };

   textRecap.id = "OCRTextRecap";
   textRecap.innerHTML = "No image to parse";

   MODAL.show({
               "title" : "Import - Select screenshots to analyze",
               "body" : [dropArea, textRecap],
               "buttons" : [
                            { "content" : "Clear", "fa" : "trash", "callback" : MFF.OCR.clear },
                            { "content" : "Upload for analyze", "className" : "btnExport", "fa" : "download", "callback" : MFF.OCR.doUpload }
                           ]
              });

   MFF.OCR.clear();
  }
  else
  {
   modalOpts = { "title" : "OCR service is currently down", "body" : "<p style=\"font:18px/75px arial; color:white\">Failed check attempts : {0} / {1}.</p>".format(MFF.OCR.nbCheck, MFF.OCR.maxCheck) };
   if ( MFF.OCR.nbCheck < MFF.OCR.maxCheck )
   {
    modalOpts.buttons = [{
                          "content" : "Check availability",
                          "callback" : function()
                          {
                           var btn = MODAL.buttons[0];
                           btn.setDisabled(true);
                           btn.setContent("Checking");
                           btn.setIcon("spinner fa-pulse fa-fw");
                           MFF.OCR.checkAvailability(MFF.OCR.selectScreenshots);
                          }
                         }];
   }
   MODAL.show(modalOpts);
  }
 },
 "clear" : function()
 {
  MFF.OCR.files = [];
  MFF.OCR.drawFilesToUpload();
 },
 "doApply" : function(file)
 {
  return function()
  {
   try
   {
    file.cbApply.call(file.cbContext, file);
    file.cbOnEnd.call(file.cbContext);
   }
   catch(ex) { alert("An error occured with file \"{0}\"\nPlease report the issue with the message \"{1}\" and the screenshot used pleased".format(file.name, ex)); }
  };
 },
 "doUpload" : function()
 {
  var divLoading, content, li;
  function syncLoading()
  {
   var i, div, file, btn,
       errors = 0,
       processed = 0,
       len = MFF.OCR.files.length;
   if ( (div = document.getElementById("OCRLoading")) && (div = div.firstChild) )
   {
    for ( i = 0; i < len; i++ )
    {
     file = MFF.OCR.files[i];
     if ( "state" in file )
     {
      if ( file.state != "uploading" && file.state !== null )
      {
       if ( file.state != "complete" ) { errors++; }
       processed++;
      }
     }
    }
    div.style.width = (100 * processed / len) + "%";
    if ( processed == len && (div = document.getElementById("OCRProcessRecap")) )
    {
     div.innerHTML = "Analyze completed, you can review data";
     if ( (btn = MODAL.getButtonById("OCRApplyAll")) ) { btn.setEnabled(true); }
     if ( errors > 0 && (btn = MODAL.getButtonById("OCRRemoveErrors")) )
     {
      btn.show();
      btn.setEnabled(true);
     }
    }
   }
  }
  function setStep(index, state, paramA, paramB, cbApply)
  {
   var div, btn, span, i,
       map =
       {
        "uploading" : "uploading, waiting for server answer",
        "XHRError" : "Server error, code \"{0}\" : \"{1}\"".format(paramA, paramB),
        "JSONError" : "JSON error, response is not valid",
        "successNotFound" : "Answer is valid but not well formed, the property \"success\" is not found",
        "NoSuccessUnknownError" : "Unknown error, the server did not provide an explanation",
        "NoSuccessErrorUndefined" : "Unknown error, the server answers with the error \"{0}\"".format(paramA),
        "NoSuccessError1" : "Invalid file type",
        "NoSuccessError2" : "OCR failed/not supported screenshot page",
        "NoSuccessError3" : "Aspect ratio not supported",
        "UnknownType" : "Server answer not handled for type \"{0}\"".format(paramA),
        "InvalidId" : "The character id \"{0}\" is unknown".format(paramA),
        "UndefinedId" : "The character id is not defined"
       },
       li = document.getElementById("OCRProcessFile_" + index);
   function removeLine()
   {
    var li = API.DOM.parent(this, "li"),
        idx = li.dataset.fileIndex;
    MFF.OCR.files = MFF.OCR.files.filter(function(file) { return idx != file.idx; });
    li.parentNode.removeChild(li);
    MFF.OCR.checkRemainingData();
   }
   if ( li && (div = li.firstChild) )
   {
    div.innerHTML = "";
    MFF.OCR.files[index].state = state;
    MFF.OCR.files[index].idx = index;
    if ( state == "complete" )
    {
     MFF.OCR.files[index].data = paramA;
     MFF.OCR.files[index].cbApply = cbApply;
     MFF.OCR.files[index].cbOnEnd = removeLine;
     // collapser
     i = div.appendChild(document.createElement("i"));
     i.className = "fa fa-caret-down";
     // apply
     btn = div.appendChild(document.createElement("span"));
     MFF.OCR.files[index].cbContext = btn;
     btn.innerHTML = "Apply";
     btn.className = "OCRbtn OCRapply";
     btn.onclick = MFF.OCR.doApply(MFF.OCR.files[index]);
     // ignore
     btn = div.appendChild(document.createElement("span"));
     btn.innerHTML = "Remove";
     btn.className = "OCRbtn OCRremove";
     btn.onclick = removeLine;
     // text
     span = div.appendChild(document.createElement("span"));
     if ( paramB === "ambiguous" )
     {
      span.innerHTML = "Success [ambiguous character] for image \"{0}\"".format(MFF.OCR.files[index].file.name);
     }
     else
     {
      span.innerHTML = "Success for image \"{0}\"".format(MFF.OCR.files[index].file.name);
     }

     span.style.cursor = i.style.cursor = "pointer";
     span.onclick = i.onclick = function(evt)
     {
      var p = API.EVT.getParentTarget(evt, "li"),
          i = p.firstChild.firstChild,
          collapsed = i.classList.contains("fa-caret-down");
      i.classList.remove("fa-caret-down fa-caret-right");
      i.classList.add(collapsed ? "fa-caret-right" : "fa-caret-down");
      p.lastChild.style.display = collapsed ? "none" : "";
     };
    }
    else
    {
     i = div.appendChild(document.createElement("i"));
     i.className = state == "uploading" ? "fa fa-spinner fa-pulse fa-fw" : "fa fa-exclamation-triangle";
     i.style.color = state == "uploading" ? "#999999" : "#df0000";
     if ( state != "uploading" )
     {
      // ignore
      btn = div.appendChild(document.createElement("span"));
      btn.innerHTML = "Remove";
      btn.className = "OCRbtn OCRremove";
      btn.onclick = removeLine;
     }
     // text
     span = div.appendChild(document.createElement("span"));
     span.innerHTML = "Image \"{0}\": {1}".format(MFF.OCR.files[index].file.name, map[state]);
    }
    syncLoading();
   }
  }
  function showBasics(index, data, cbApply, ambiguous)
  {
   var div, li;
   if ( !("content" in data) ) { setStep(index, "JSONError"); }
   else if ( (li = document.getElementById("OCRProcessFile_" + index)) && (div = li.lastChild) )
   {
    setStep(index, "complete", data, ambiguous, cbApply);
    div.className = "bgOpaque";
    div.style.display = "";
   }
   return div;
  }
  function showGear(index, data)
  {
   var
       cbApply = function(file)
       {
        var gear, type, gearIndex, characterId, data, pref, value,
            li = document.getElementById("OCRProcessFile_" + file.idx);
        function getValue(selector)
        {
        var v = li.querySelector(selector);
        return v ? v.value : null;
        }
        if ( li && (characterId = getValue("select[name=character]")) && (gear = (file.data.content.char_list[characterId])) )
        {
         gear = gear - 1;
         data = MFF.CHARACTERS.get(characterId);
         for ( gearIndex = 0; gearIndex < 8; gearIndex++ )
         {
          if ( (value = getValue("input[name=gear{0}]".format(gearIndex))) && (type = getValue("input[name=type{0}]".format(gearIndex))) )
          {
           pref = (data.gear[gear][gearIndex].type == "" && data.gear[gear][gearIndex].val == 0) || (data.gear[gear][gearIndex].type == type && data.gear[gear][gearIndex].pref);
           MFF.saveCharacter({ "mode" : "gear", "gear" : gear, "gearIndex" : gearIndex, "type" : type, "val" : parseFloat(value), "pref" : pref }, characterId);
          }
         }
        }
        API.EVT.dispatch("computePercentGears", characterId);
       },
       isAmbiguousCharacter = function(data)
       {
        var k,
            nb = 0;
        if ( data && ("content" in data) && ("char_list" in data.content) )
        {
         for ( k in data.content.char_list )
         {
          if ( data.content.char_list.hasOwnProperty(k) )
          {
           nb++;
           if ( nb > 1 ) { return "ambiguous"; }
          }
         }
        }
        return null;
       },
       div = showBasics(index, data, cbApply, isAmbiguousCharacter(data));

   function drawGear(div, data, characterId)
   {
    var i, j, table, tbody, tr, td, select, option, label, k, v, input,
        uniformId = MFF.CHARACTERS.DATA[characterId].uniform,
        gearIndex = parseInt(data.content.char_list[characterId], 10) - 1;
    API.DOM.flush(div);
    table = div.appendChild(document.createElement("table"));
    table.className = "OCRExtract";
    tbody = table.appendChild(document.createElement("tbody"));
    tr = tbody.appendChild(document.createElement("tr"));
    td = tr.appendChild(document.createElement("td"));
    td.rowSpan = 9;
    td.appendChild(MFF.CHARACTERS.getImageForUniform(characterId, uniformId));

    td = tr.appendChild(document.createElement("td"));
    select = td.appendChild(document.createElement("select"));
    select.name = "character";
    select.onchange = (function(div, data)
                       {
                        return function()
                        {
                         drawGear(div, data, this.value);
                        };
                       })(div, data);
    i = 0;
    for ( k in data.content.char_list )
    {
     if ( data.content.char_list.hasOwnProperty(k) )
     {
      option = select.appendChild(document.createElement("option"));
      option.value = k;
      option.text = MFF.CHARACTERS.getNameForUniform(k);
      if ( k == characterId ) { select.selectedIndex = i; }
      i++;
     }
    }

    td = tr.appendChild(document.createElement("td"));
    td.colSpan = 2;
    td.style.width = "100%";
    label = td.appendChild(document.createElement("label"));
    label.className = "gearName";
    label.innerHTML = "Gear {0} : {1}".format(gearIndex + 1, MFF.CHARACTERS.DATA[characterId].uniforms[uniformId].gears[gearIndex]);

    for ( i = 0; i < data.content.gear_val.length / 2; i++ )
    {
     tr = tbody.appendChild(document.createElement("tr"));
     for ( j = 0; j < 2; j++ )
     {
      k = data.content.gear_val[i + j * 4].type;
      v = data.content.gear_val[i + j * 4].val;
      td = tr.appendChild(document.createElement("td"));
      td.style.width = "25%";
      label = td.appendChild(document.createElement("label"));
      td = tr.appendChild(document.createElement("td"));
      td.style.width = "25%";
      if ( k in MFF.GEARS[gearIndex] )
      {
       label.innerHTML = "{0}) {1}".format(1 + i + j * 4, MFF.GEARS[gearIndex][k].name);
       input = td.appendChild(document.createElement("input"));
       input.type = "text";
       input.name = "gear" + (i + j * 4);
       input.value = v;
       input = td.appendChild(document.createElement("input"));
       input.type = "hidden";
       input.name = "type" + (i + j * 4);
       input.value = k;
      }
      else
      {
       label.innerHTML = "{0}) Invalid property \"{1}\"".format(1 + i + j * 4, k);
       label = td.appendChild(document.createElement("label"));
       label.innerHTML = v;
      }
     }
    }
   }

   if ( div )
   {
    drawGear(div, data, Object.keys(data.content.char_list)[0]);
   }
  }
  function showDetail(index, data)
  {
   var k, idx, table, tbody, tr, td, select, option, uniformId, characterId, tier1, tier2,
       map = [
              ["phys_att", "defpen", "recorate"],
              ["energy_att", "ignore_dodge", "dodge"],
              ["atkspeed", "phys_def", "movspeed"],
              ["crit_rate", "energy_def", "debuff"],
              ["critdamage", "hp", "scd"]
             ],
       cbApply = function(file)
       {
        var characterId, k, v, i,
            map = ["atkspeed", "critrate", "critdamage", "debuff", "defpen", "dodge", "hp", "ignore_dodge", "movspeed", "recorate", "scd"],
            //content = file.data.content,
            li = document.getElementById("OCRProcessFile_" + file.idx);
        function getValue(selector)
        {
         var v = li.querySelector(selector);
         return v ? v.value : null;
        }

        if ( li && (characterId = getValue("select[name=character]")) )
        {
         for ( i = 0; i < map.length; i++ )
         {
          k = map[i];
          if ( (v = getValue("input[name=" + k + "]")) ) { MFF.saveCharacter({ "mode" : "attribute", "type" : k, "value" : v }, characterId); }
         }
         k = { "mode" : "attack" };
         if ( (v = getValue("input[name=attack_physical]")) ) { k.physical = v; }
         if ( (v = getValue("input[name=attack_energy]")) ) { k.energy = v; }
         if ( ("physical" in k) || ("energy" in k) ) { MFF.saveCharacter(k, characterId); }
         k = { "mode" : "defense" };
         if ( (v = getValue("input[name=defense_physical]")) ) { k.physical = v; }
         if ( (v = getValue("input[name=defense_energy]")) ) { k.energy = v; }
         if ( ("physical" in k) || ("energy" in k) ) { MFF.saveCharacter(k, characterId); }
         if ( (v = getValue("select[name=tier]")) )
         {
          MFF.saveCharacter({ "mode" : "tier", "tier" : v }, characterId);
          if ( v == 2 ) { MFF.saveCharacter({ "mode" : "level", "level" : 60 }, characterId); }
         }
        }
       },
       div = showBasics(index, data, cbApply);

   if ( div )
   {
    if ( !data.content.id ) { setStep(index, "UndefinedId"); }
    else if ( !(data.content.id in MFF.CHARACTERS.DATA) ) { setStep(index, "InvalidId", data.content.id); }
    else
    {
     characterId = data.content.id;
     uniformId = data.content.uniform && (data.content.uniform in MFF.CHARACTERS.DATA[characterId].uniforms) ? data.content.uniform : MFF.CHARACTERS.DATA[characterId].uniform;

     table = div.appendChild(document.createElement("table"));
     table.className = "OCRExtract";
     tbody = table.appendChild(document.createElement("tbody"));
     tr = tbody.appendChild(document.createElement("tr"));
     td = tr.appendChild(document.createElement("td"));
     td.rowSpan = 6;
     td.appendChild(MFF.CHARACTERS.getImageForUniform(characterId, uniformId));

     td = tr.appendChild(document.createElement("td"));
     td.colSpan = 2;
     select = td.appendChild(document.createElement("select"));
     select.name = "character";
     option = select.appendChild(document.createElement("option"));
     option.value = characterId;
     option.text = MFF.CHARACTERS.getNameForUniform(characterId, uniformId);

     td = tr.appendChild(document.createElement("td"));
     td.colSpan = 2;
     select = td.appendChild(document.createElement("select"));
     select.name = "uniform";
     idx = 0;
     for ( k in MFF.CHARACTERS.DATA[characterId].uniforms )
     {
      if ( MFF.CHARACTERS.DATA[characterId].uniforms.hasOwnProperty(k) && (k in MFF.UNIFORMS.DATA) )
      {
       option = select.appendChild(document.createElement("option"));
       option.value = k;
       option.text = MFF.UNIFORMS.DATA[k];
       if ( uniformId == k ) { select.selectedIndex = idx; }
       idx++;
      }
     }

     td = tr.appendChild(document.createElement("td"));
     td.colSpan = 2;
     select = td.appendChild(document.createElement("select"));
     select.name = "tier";
     option = select.appendChild(document.createElement("option"));
     option.value = 0;
     option.text = "Tier unknown";
     tier1 = select.appendChild(document.createElement("option"));
     tier1.value = 1;
     tier1.text = "Tier 1";
     tier2 = select.appendChild(document.createElement("option"));
     tier2.value = 2;
     tier2.text = "Tier 2";
     select.selectedIndex = data.content.tier == 2 ? 2 : data.content.tier == 1 ? 1 : 0;
     if ( MFF.CHARACTERS.DATA[characterId].tiers[0] != 1 ) { select.removeChild(tier1); }
     if ( MFF.CHARACTERS.DATA[characterId].tiers.indexOf(2) === -1 ) { select.removeChild(tier2); }

     map.forEach(function(column)
                 {
                  var tr = tbody.appendChild(document.createElement("tr"));
                  column.forEach(function(cell)
                                 {
                                  var label, input,
                                      axisMap =
                                      {
                                       "phys_att" : "attack_physical",
                                       "energy_att" : "attack_energy",
                                       "crit_rate" : "critrate",
                                       "phys_def" : "defense_physical",
                                       "energy_def" : "defense_energy"
                                      },
                                      td = tr.appendChild(document.createElement("td"));
                                  axisMap = cell in axisMap ? axisMap[cell] : cell;
                                  label = td.appendChild(document.createElement("label"));
                                  label.innerHTML = axisMap in MFF.axisItems ? MFF.axisItems[axisMap].label : axisMap;
                                  td = tr.appendChild(document.createElement("td"));
                                  input = td.appendChild(document.createElement("input"));
                                  input.type = "text";
                                  input.name = axisMap;
                                  input.value = data.content[cell];
                                 });
                 });
    }
   }
  }
  function processFile(file, index)
  {
   var li, form, formData, xhr, div,
       content = document.getElementById("OCRProcessContent");
   if ( content )
   {
    li = content.appendChild(document.createElement("li"));
    li.id = "OCRProcessFile_" + index;
    li.dataset.fileIndex = index;
    div = li.appendChild(document.createElement("div"));
    div.className = "result";
    div = li.appendChild(document.createElement("div"));
    div.className = "content";
    div.style.display = "none";
    form = document.createElement("form");
    //form.method = "POST";
    form.enctype = "multipart/form-data";
    formData = new FormData(form);
    formData.append("mode", "single");
    formData.append("file", file.file, file.file.name);
    xhr = new XMLHttpRequest();
    xhr.open("POST", MFF.OCR.url, true);
    xhr.onerror = (function(index, setStep)
                  {
                   return function(evt)
                   {
                    setStep(index, "XHRError", evt.target.status, "Unknown fatal error");
                   };
                  })(index, setStep);
    xhr.onload = (function(index, setStep, showDetail, showGear)
                  {
                   return function(/*evt*/)
                   {
                    var response;
                    if ( this.status == 200 )
                    {
                     try { response = JSON.parse(this.responseText); }
                     catch(ex) { setStep(index, "JSONError"); }
                     if ( response )
                     {
                      if ( "success" in response )
                      {
                       // TODO : remove string "true" when fixed on API side
                       if ( response.success === true || response.success === "true" )
                       {
                        if ( response.type == "details" ) { showDetail(index, response);  }
                        else if ( response.type == "gear" ) { showGear(index, response); }
                        else { setStep(index, "UnknownType", response.type); }
                       }
                       else
                       {
                        if ( "error" in response )
                        {
                         if ( response.error == 1 || response.error == 2 || response.error == 3 ) { setStep(index, "NoSuccessError" + response.error); }
                         else { setStep(index, "NoSuccessErrorUndefined", response.error); }
                        }
                        else { setStep(index, "NoSuccessUnknownError"); }
                       }
                      }
                      else { setStep(index, "successNotFound"); }
                     }
                     else { setStep(index, "JSONError"); }
                    }
                    else { setStep(index, "XHRError", this.status, this.statusText); }
                   };
                  })(index, setStep, showDetail, showGear);
    xhr.send(formData);
    setStep(index, "uploading");
   }
  }
  if ( MFF.OCR.files.length == 0 ) { alert("There is no valid image to upload for analyze"); }
  else
  {
   divLoading = document.createElement("div");
   divLoading.id = "OCRLoading";
   divLoading.appendChild(document.createElement("div"));

   content = document.createElement("ul");
   content.id = "OCRProcessContent";
   li = content.appendChild(document.createElement("li"));
   li.id = "OCRProcessRecap";
   li.innerHTML = "<i class=\"fa fa-spinner fa-pulse fa-fw\"></i> Uploading {0} {1}".format(MFF.OCR.files.length, MFF.OCR.files.length > 1 ? "images" : "image");

   MODAL.show({
               "title" : "Import - Processing screenshots",
               "body" : [divLoading, content],
               "buttons" : [
                            { "id" : "OCRRemoveErrors", "disabled" : true, "hide" : true, "content" : "Remove errors", "callback" : MFF.OCR.removeErrors },
                            { "id" : "OCRApplyAll", "disabled" : true, "content" : "Apply all", "callback" : MFF.OCR.applyAll }
                           ]
              });
   MFF.OCR.files.forEach(processFile);
  }
 },
 "checkRemainingData" : function()
 {
  var li, btn;
  function intervalCb()
  {
   var delay,
       span = document.getElementById("OCRRemainingTimeBeforeClose");
   if ( span )
   {
    delay = parseInt(span.innerHTML) - 1;
    if ( isNaN(delay) || delay <= 1 ) { delay = "a few"; }
    span.innerHTML = delay;
   }
  }
  if ( MFF.OCR.files.length === 0 && (li = document.getElementById("OCRProcessRecap")) )
  {
   li.innerHTML = "No more data to process<br>Popup will close in <span id=\"OCRRemainingTimeBeforeClose\">5</span> seconds";
   if ( (btn = MODAL.getButtonById("OCRApplyAll")) ) { btn.hide(); }
   if ( (btn = MODAL.getButtonById("OCRRemoveErrors")) ) { btn.hide(); }
   MODAL.delayHide(5000, intervalCb, 1000);
  }
 },
 "applyAll" : function()
 {
  var toApply = MFF.OCR.files.filter(function(file) { return file.state == "complete"; });
  toApply.forEach(function(file) { MFF.OCR.doApply(file)(); });
 },
 //
 "removeErrors" : function()
 {
  var btn = MODAL.getButtonById("OCRRemoveErrors");
  if ( btn )
  {
   btn.hide();
   btn.setEnabled(false);
  }
  MFF.OCR.files = MFF.OCR.files.filter(function(file)
                                       {
                                        var isValid = file.state == "complete" || file.state == "uploading" || file.state === null,
                                            li = document.getElementById("OCRProcessFile_" + file.idx);
                                        if ( !isValid && li && li.parentNode ) { li.parentNode.removeChild(li); }
                                        return isValid;
                                       });
  MFF.OCR.checkRemainingData();
 }
};

// localhost
if ( ("" + location).indexOf("localhost") != -1 ) {  MFF.OCR.url = "php/OCRlocalhost.php"; }
// alert(MFF.OCR.url);