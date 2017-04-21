/* NUMBER */

Number.isInteger = Number.isInteger || function(value)
{
 return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

Number.isNumeric = function(n) { return Number(n) + "" === n; };

/* ARRAY */

Array.prototype.contains = function(O/*bject*/)
{
 return this.indexOf(O) != -1;
};

Array.isArray = Array.isArray || function(arg)
{
 return Object.prototype.toString.call(arg) === "[object Array]";
};

if ( !Array.prototype.find )
{
 Object.defineProperty(Array.prototype,
                       "find",
                       {
                        "value" : function(predicate)
                        {
                         var o, len, thisArg, k, kValue;
                         if ( this == null ) { throw new TypeError("\"this\" is null or not defined"); }
                         o = Object(this);
                         len = o.length >>> 0;
                         if ( typeof predicate !== "function" ) { throw new TypeError("predicate must be a function"); }
                         thisArg = arguments[1];
                         k = 0;
                         while ( k < len )
                         {
                          kValue = o[k];
                          if ( predicate.call(thisArg, kValue, k, o) ) { return kValue; }
                          k++;
                         }
                         return undefined;
                        }
                       });
}

/* STRING */

if ( !String.prototype.format )
{
 String.prototype.format = function()
 {
  var i, regexp,
      formatted = this;

  for ( i = 0; i < arguments.length; i++ )
  {
   regexp = new RegExp("\\{" + i + "\\}", "gi");
   formatted = formatted.replace(regexp, arguments[i]);
  }

  return formatted;
 };
}

if ( !String.prototype.trim )
{
 String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""); };
}


String.__camel = String.__hyphen = {};
String.prototype.toCamel = function()
{
 var i, m/*axLength*/, a/*rray*/, r/*etour*/;

 if ( String.__camel[this] ) { return String.__camel[this]; }

 a = this.split("-");
 m = a.length;

 if ( m == 1 ) { return a[0]; }
 r = this.indexOf("-") === 0 ? a[0].charAt(0).toUpperCase() + a[0].substring(1) : a[0];

 for ( i = 1; i < m; i++ )
 {
  r += a[i].charAt(0).toUpperCase() + a[i].substring(1);
 }

 String.__camel[this] = r;
 String.__hyphen[r] = this;
 return r;
};

String.prototype.toHyphen = function()
{
 var i, m/*axLength*/,
     r/*etour*/ = "";

 if ( String.__hyphen[this] ) { return String.__hyphen[this]; }

 for ( i = 0, m = this.length; i < m; ++i )
 {
  if ( this.charAt(i) == this.charAt(i).toUpperCase() )
  {
   r += "-" + this.charAt(i).toLowerCase();
  }
  else { r += this.charAt(i); }
 }

 String.__hyphen[this] = r;
 String.__camel[r] = this;
 return r;
};
