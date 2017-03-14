(function()
{
 "use strict";
 var Effect,
     isInit = false,
     Waves =
     {
      "duration" : 1000,
      "init" : function()
      {
       if ( "ontouchstart" in window ) { return ; }
       if ( typeof document.body.getBoundingClientRect === typeof undefined ) { return ; }
       if ( isInit === false )
       {
        isInit = true;
        document.body.addEventListener("click", Effect.click, false);
       }
      }
     };

 function offset(elem)
 {
  var box = typeof elem.getBoundingClientRect !== typeof undefined ? elem.getBoundingClientRect() : { "top" : 0, "left" : 0 },
      doc = elem && elem.ownerDocument,
      docElem = doc.documentElement,
      getWindow = function(elem)
      {
       function isWindow(obj) { return obj !== null && obj === obj.window; }
       return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
      },
      win = getWindow(doc);
  return {
          "top" : box.top + win.pageYOffset - docElem.clientTop,
          "left" : box.left + win.pageXOffset - docElem.clientLeft
         };
 }

 Effect =
 {
  "click" : function(e)
  {
   var element = Effect.getWavesElement(e);
   if ( element !== null )
   {
    if ( element.disabled || element.getAttribute("disabled") || element.classList.contains("disabled")) { return ; }
    Effect.show(e, element);
    element.addEventListener("mouseup", Effect.hide, false);
    element.addEventListener("mouseleave", Effect.hide, false);
   }
  },
  "getWavesElement" : function(e)
  {
   var element = null,
       target = e.target || e.srcElement;
   while ( target.parentElement )
   {
    if ( (!(target instanceof SVGElement)) && target.classList.contains("waves") )
    {
     element = target;
     break;
    }
    target = target.parentElement;
   }
   return element;
  },
  "getDuration" : function(element)
  {
   var duration = NaN;
   if ( "wavesDuration" in element.dataset ) { duration = parseInt(element.dataset.wavesDuration, 10); }
   if ( isNaN(duration) ) { duration = Waves.duration; }
   return duration;
  },
  "show" : function(e, element)
  {
   var pos, scale, translate,
       relativeX = 0,
       relativeY = 0,
       ripple = document.createElement("div");
   element = element || this;
   ripple.className = "waves-ripple waves-rippling";
   element.appendChild(ripple);

   if ( "wavesBackground" in element.dataset ) { ripple.style.background = element.dataset.wavesBackground; }

   pos = offset(element);
   relativeY = e.pageY - pos.top;
   relativeX = e.pageX - pos.left;

   relativeX = relativeX >= 0 ? relativeX : 0;
   relativeY = relativeY >= 0 ? relativeY : 0;

   scale = "scale(" + ((element.clientWidth / 100) * 3) + ")";
   translate = "translate(0,0)";

   ripple.dataset.hold = Date.now();
   ripple.dataset.x = relativeX;
   ripple.dataset.y = relativeY;
   ripple.dataset.scale = scale;
   ripple.dataset.translate = translate;

   ripple.classList.add("waves-notransition");
   ripple.style.top = relativeY + "px";
   ripple.style.left = relativeX + "px";
   ripple.classList.remove("waves-notransition");
   ripple.style.transform = scale + " " + translate;
   ripple.style.opacity = 1;
   ripple.style.transitionDuration = Effect.getDuration(element) + "ms";
  },
  "removeRipple" : function(e, el, ripple)
  {
   var relativeX, relativeY, scale, translate, diff, delay, duration;
   if ( !ripple ) { return ; }
   ripple.classList.remove("waves-rippling");
   relativeX = ripple.dataset.x;
   relativeY = ripple.dataset.y;
   scale     = ripple.dataset.scale;
   translate = ripple.dataset.translate;
   diff = Date.now() - Number(ripple.dataset.hold);
   delay = 350 - diff;
   if ( delay < 0 ) { delay = 0; }
   duration = Effect.getDuration(el);
   setTimeout(function()
              {
               ripple.style.top = relativeY + "px";
               ripple.style.left = relativeX + "px";
               ripple.style.opacity = 0;
               ripple.style.transitionDuration = duration + "ms";
               ripple.style.transform = scale + " " + translate;
               setTimeout(function()
                          {
                           try { el.removeChild(ripple); }
                           catch (e) { return false; }
                          }, duration);

              }, delay);
  },
  "hide" : function(e, element)
  {
   var i, len, ripples;
   element = element || this;
   ripples = element.getElementsByClassName("waves-rippling");
   for ( i = 0, len = ripples.length; i < len; i++ ) { Effect.removeRipple(e, element, ripples[i]); }
  }
 };

 window.Waves = Waves;
})();
