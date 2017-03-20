Array.prototype.contains = function(O/*bject*/)
{
 return this.indexOf(O) != -1;
};

if ( !Array.isArray )
{
  Array.isArray = function(arg) { return Object.prototype.toString.call(arg) === "[object Array]"; };
}