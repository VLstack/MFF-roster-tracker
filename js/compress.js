function compressImages(fileArray, options, oncomplete)
{
 var totalcount = fileArray.length,
     resultArray = [],
     errors = [];

 function formatSize(size, units, isdataurl)
 {
  var r = size;
  if ( isdataurl ) { r = (size - 22) * 3 / 4; }
  if ( (units = units.toLowerCase()) == "kb" ) { return r / 1024; }
  else if (units == "mb" ) { return r / 1024 / 1024; }
  return r;
 }

 if ( !options ) { options = {}; }
 options.maxWidth = "maxWidth" in options ? options.maxWidth : 99999;
 options.maxHeight = "maxHeight" in options ? options.maxHeight : 99999;
 options.maxSize = "maxSize" in options ? options.maxSize : 999;
 options.minQuality = Math.max(("minQuality" in options ? options.minQuality : 10) / 100.0, 0.1);
 options.speed = "speed" in options ? options.speed : 4;
 options.resize = "resize" in options ? options.resize : false;
 options.units = "units" in options ? options.units : "mb";
 options.adaptive = "adaptive" in options ? options.adaptive : false;

if ( !oncomplete || (typeof oncomplete != "function") ) { oncomplete = function() {}; }

 fileArray.forEach(function(file)
                   {
                    var reader = new FileReader(),
                        img = new Image(),
                        mime = file.type;
                    img.onload = function()
                    {
                     var ctx, dataUrl, originalSize, imgFileSize,
                         canvas = document.createElement("canvas"),
                         currentQuality = 0.9,
                         qualityDecrement = Math.max((0.9 - options.minQuality) / options.speed, 0.05),
                         rescaleDecrement = 0.1,
                         ratio = Math.min(Math.min(options.maxWidth / img.width, options.maxHeight / img.height), 1.0),
                         ratioception = 0.9;

                     canvas.width = img.width * ratio;
                     canvas.height = img.height * ratio;

                     ctx = canvas.getContext("2d");
                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                     dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
                     originalSize = formatSize(file.size, "mb", false);
                     imgFileSize = formatSize(dataUrl.length, "mb", true);

                     if ( options.adaptive && imgFileSize > options.maxSize * 20 ) { qualityDecrement = 0.9 - options.minQuality; }
                     else if ( options.adaptive && imgFileSize > options.maxSize * 10 ) { qualityDecrement = 0.4; }

                     while ( imgFileSize > options.maxSize && currentQuality > options.minQuality )
                     {
                      currentQuality -= qualityDecrement;
                      dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
                      imgFileSize = formatSize(dataUrl.length, "mb", true);
                     }

                     if ( options.adaptive && imgFileSize > options.maxSize * 3 )
                     {
                      ratioception = 0.7;
                      rescaleDecrement = 0.15;
                     }
                     while ( imgFileSize > options.maxSize && options.resize && ratioception > 0.1 )
                     {
                      canvas.width = img.width * ratio * ratioception;
                      canvas.height = img.height * ratio * ratioception;
                      currentQuality = 1.0;
                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                      while ( imgFileSize > options.maxSize && currentQuality > options.minQuality )
                      {
                       currentQuality -= qualityDecrement;
                       dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
                       imgFileSize = formatSize(dataUrl.length, "mb", true);
                      }
                      ratioception -= rescaleDecrement;
                     }

                     resultArray.push({
                                       "file" : file,
                                       "dataUrl" : dataUrl,
                                       "filename" : file.name,
                                       "mime" : mime,
                                       "originalSize" : formatSize(file.size, options.units, false),
                                       "finalSize" : formatSize(dataUrl.length, options.units, true),
                                       "compression" : parseFloat(((1 - imgFileSize / originalSize) * 100).toFixed(2)),
                                       "originalWidth" : img.width,
                                       "originalHeight" : img.height,
                                       "finalWidth" : canvas.width,
                                       "finalHeight" : canvas.height
                                      });
                     if ( resultArray.length === totalcount )
                     {
                      resultArray = resultArray.filter(function(val) { return val !== null; });
                      oncomplete(resultArray, errors);
                     }
                    };

                    img.onerror = function()
                    {
                     errors.push({ "file" : file.name, "error" : "Not a supported image format" });
                     resultArray.push(null);
                    };

                    reader.onload = function(event) { img.src = event.target.result; };
                    reader.readAsDataURL(file);
                   });
}