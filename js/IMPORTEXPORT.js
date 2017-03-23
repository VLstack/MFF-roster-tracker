/* global MFF, MODAL, API */
MFF.IMPORT =
{
 "pasteContent" : function()
 {
  var textarea = document.createElement("textarea");
  textarea.id = "textareaImportExport";
  textarea.placeholder = "Paste valid JSON here";
  MODAL.show({
              "title" : "Import characters",
              "body" : textarea,
              "buttons" : [
                           { "content" : "Replace all characters", "fa" : "download", "callback" : MFF.IMPORT.asJSON(true) },
                           { "content" : "Add to actual data", "fa" : "download", "callback" : MFF.IMPORT.asJSON(false) }
                          ]
             });
  textarea.focus();
 },
 "asJSON" : function(replace)
 {
  return function()
  {
   var k, parsed, toImport, valid,
       errors = [];
   try { parsed = JSON.parse(document.getElementById("textareaImportExport").value); }
   catch(ex) { alert("The JSON data is not well formed"); }
   if ( parsed )
   {
    toImport = replace ? {} : MFF.CHARACTERS.getAll();
    for ( k in parsed )
    {
     if ( parsed.hasOwnProperty(k) )
     {
      valid = MFF.CHARACTERS.isValidData(k, parsed[k]);
      if ( valid === true )
      {
       parsed[k].lastUpdate = (new Date()).valueOf();
       toImport[k] = parsed[k];
      }
      else { errors.push(valid); }
     }
    }
    if ( errors.length ) { alert("Import has been canceled, some errors occurs.\n\n" + errors.join("\n")); }
    else
    {
     if ( !replace || confirm("All data not defined will be permanently deleted.\nAre you sure you want to replace all data ?") )
     {
      localStorage.setItem(MFF.localStorageKey, JSON.stringify(toImport));
      MODAL.hide();
      MFF.init();
     }
    }
   }
  };
 }
};

MFF.EXPORT =
{
 "selected" : null,
 "createListCharacters" : function(characters)
 {
  var k, li, img,
      ul = document.createElement("ul");
  ul.className = "selectCharacters";
  for ( k in characters )
  {
   if ( characters.hasOwnProperty(k) )
   {
    li = ul.appendChild(document.createElement("li"));
    li.className = "checked";
    li.dataset.character = characters[k].id;
    li.dataset.type = MFF.CHARACTERS.getTypeForUniform(characters[k].id, characters[k].uniform);
    li.dataset.gender = MFF.CHARACTERS.DATA[characters[k].id].uniforms[characters[k].uniform].gender;
    li.dataset.side = MFF.CHARACTERS.DATA[characters[k].id].uniforms[characters[k].uniform].side;
    img = li.appendChild(MFF.CHARACTERS.getImageForUniform(characters[k].id, characters[k].uniform));
    if ( characters[k].tier == 2 )
    {
     img = li.appendChild(document.createElement("img"));
     img.src = "images/tier2.png";
     img.className = "tier2";
     img.title = MFF.CHARACTERS.getNameForUniform(characters[k].id, characters[k].uniform);
    }
   }
  }
  return ul;
 },
 "selectCharacters" : function()
 {
  var nbSelected,
      body = MFF.EXPORT.createListCharacters(MFF.CHARACTERS.getAll());
  function computeSelectedCharacters()
  {
   var selected = document.body.querySelectorAll("ul.selectCharacters li.checked").length;
   nbSelected.innerHTML = selected + " character{0} selected".format(selected > 1 ? "s" : "");
   MODAL.buttons.forEach(function(btn) { btn.setEnabled(selected > 0); });
  }
  function cb(test)
  {
   return function()
   {
    var i,
        all = document.body.querySelector("ul.selectCharacters").childNodes;
    this.classList.toggle("checked");
    for ( i = 0; i < all.length; i++ )
    {
     all[i].className = test.call(this, all[i]) ? "checked" : "";
    }
    computeSelectedCharacters();
   };
  }
  function btn(key, value)
  {
   var img = document.createElement("img");
   img.src = "images/" + value + ".png";
   img.className = "checked";
   img.title = "Toggle " + value + " characters";
   img.onclick = cb(function(li) { return (li.dataset[key] != value && li.className == "checked") || (li.dataset[key] == value && this.className == "checked"); });
   return img;
  }
  if ( body.childNodes && body.childNodes.length )
  {
   body.onclick = function(evt)
   {
    var target = API.EVT.getParentTarget(evt, "li");
    if ( target )
    {
     target.classList.toggle("checked");
     computeSelectedCharacters();
    }
   };
   nbSelected = document.createElement("i");
   nbSelected.id = "nbSelectedForExport";
   MFF.EXPORT.selected = null;
   MODAL.show({
               "title" : "Export - Select characters to export",
               "actions" : [
                            nbSelected,
                            btn("type", "combat"), btn("type", "speed"), btn("type", "blast"), btn("type", "universal"),
                            btn("side", "hero"), btn("side", "vilain"),
                            btn("gender", "male"), btn("gender", "female")
                           ],
               "body" : body,
               "buttons" : [
                            { "content" : "Show data", "className" : "btnExport", "fa" : "eye", "callback" : MFF.EXPORT.showAsJSON },
                            { "content" : "Download as JSON", "className" : "btnExport", "fa" : "download", "callback" : MFF.EXPORT.downloadAsJSON }
                           ]
              });
   computeSelectedCharacters();
  }
  else { alert("No character to export"); }
 },
 "getAsJson" : function()
 {
  var i, toExport, all, selected;
  if ( MFF.EXPORT.selected ) { return MFF.EXPORT.selected; }
  toExport = {};
  all = MFF.CHARACTERS.getAll();
  selected = document.body.querySelectorAll("ul.selectCharacters li.checked");
  if ( selected.length )
  {
   for ( i = 0; i < selected.length; i++ )
   {
    toExport[selected[i].dataset.character] = all[selected[i].dataset.character];
   }
  }
  return (MFF.EXPORT.selected = JSON.stringify(toExport, null, 2));
 },
 "showAsJSON" : function()
 {
  var body = document.createElement("textarea");
  body.value = MFF.EXPORT.getAsJson();
  body.id = "textareaImportExport";
  MODAL.show({
              "title" : "Export selected characters",
              "body" : body,
              "buttons" : [
                           { "content" : "Select characters", "fa" : "backward", "callback" : MFF.EXPORT.selectCharacters },
                           { "content" : "Download as JSON", "fa" : "download", "callback" : MFF.EXPORT.downloadAsJSON }
                          ]
             });
 },
 "downloadAsJSON" : function()
 {
  var form = document.body.appendChild(document.createElement("form")),
      input = form.appendChild(document.createElement("textarea"));
  form.method = "POST";
  form.action = "php/dl_json.php";
  input.value = MFF.EXPORT.getAsJson();
  input.name = "json";
  form.submit();
  document.body.removeChild(form);
 }
};