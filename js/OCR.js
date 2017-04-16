/* global MFF, MODAL, FileReader, API */

MFF.OCR =
{
 "files" : [],
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
  var dropArea = document.createElement("div"),
      textRecap = document.createElement("div");

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
                            MFF.OCR.files.push({ "file" : file, "content" : this.result });
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
 },
 "clear" : function()
 {
  MFF.OCR.files = [];
  MFF.OCR.drawFilesToUpload();
 },
 "doUpload" : function()
 {
  if ( MFF.OCR.files.length == 0 ) { alert("There is no valid image to upload for analyze"); }
  else
  {

  }
 }
};