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
  function setStep(index, state, paramA, paramB)
  {
   var span, fa, faColor,
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
   if ( li && (span = li.firstChild) )
   {
    MFF.OCR.files[index].state = state;
    if ( state == "complete" )
    {
     MFF.OCR.files[index].data = paramA;
     span.innerHTML = "<i class=\"fa fa-caret-down\"></i> Image \"{0}\": Success".format(MFF.OCR.files[index].file.name);
     span.style.cursor = "pointer";
     span.onclick = function()
     {
      var collapsed = this.firstChild.classList.contains("fa-caret-down");
      this.firstChild.classList.remove("fa-caret-down fa-caret-right");
      this.firstChild.classList.add(collapsed ? "fa-caret-right" : "fa-caret-down");
      this.nextSibling.style.display = collapsed ? "none" : "";
     };
    }
    else
    {
     fa = state == "uploading" ? "fa-spinner fa-pulse fa-fw" : "fa-exclamation-triangle";
     faColor = state == "uploading" ? "#999999" : "#df0000";
     span.innerHTML = "<i class=\"fa {0}\" style=\"color:{1}\"></i> Image \"{2}\": {3}".format(fa, faColor, MFF.OCR.files[index].file.name, map[state]);
    }
    syncLoading();
   }
  }
  function showBasics(index, data)
  {
   var div, li;
   if ( !data.id ) { setStep(index, "UndefinedId"); }
   else if ( !(data.id in MFF.CHARACTERS.DATA) ) { setStep(index, "UndefinedId", data.id); }
   else if ( (li = document.getElementById("OCRProcessFile_" + index)) && (div = li.lastChild) )
   {
    setStep(index, "complete", data);
    div.className = "bgOpaque";
    div.style.display = "";
   }
   return div;
  }
  function showGear(index, data)
  {
   var div = showBasics(index, data);
   if ( div )
   {
    div.innerHTML = "gear";
    console.dir(data);
   }
  }
  function showDetail(index, data)
  {
   var i,
       map = ["phys_att", "energy_att", "atkspeed", "crit_rate", "critdamage", "defpen", "ignore_dodge", "phys_def", "energy_def", "hp", "recorate", "dodge", "movspeed", "debuff", "scd"],
       div = showBasics(index, data);

// "tier" => 2, "uniform" => "",
//                                 "" => 12060, "" => 6239,
//                                 "id" => "warwolf", "" => 5729,
//                                 "" => 32.92, "" => 24225,
//                                 "" => 5293, ", " => 109.69,
//                                 "" => 4.83, "" => 69.83,
//                                 "" => 14.3, "" => 212.25,
//                                 "scd" => 24.9, "" => 166.86,
//                                 "" => 10.0, "" => 100.0

   if ( div )
   {
    div.innerHTML = "detail";
    console.dir(data);
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
    li.appendChild(document.createElement("span"));
    div = li.appendChild(document.createElement("div"));
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
                            { "id" : "OCRApplyAll", "disabled" : true, "content" : "Apply all" }
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
 "removeErrors" : function()
 {
  var btn = MODAL.getButtonById("OCRRemoveErrors");
  if ( btn )
  {
   btn.hide();
   btn.setEnabled(false);
  }
  MFF.OCR.files = MFF.OCR.files.filter(function(file, index)
                                       {
                                        var isValid = file.state == "complete" || file.state == "uploading" || file.state === null,
                                            li = document.getElementById("OCRProcessFile_" + index);
                                        if ( !isValid && li && li.parentNode ) { li.parentNode.removeChild(li); }
                                        return isValid;
                                       });
  MFF.OCR.checkRemainingData();
 }
};

// localhost
if ( ("" + location).indexOf("localhost") != -1 ) {  MFF.OCR.url = "php/OCRlocalhost.php"; }
// alert(MFF.OCR.url);