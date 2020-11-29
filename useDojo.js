// https://dojotoolkit.org/reference-guide/1.7/dojox/json/ref.html

// http://jsfiddle.net/user/fiddles/all/
require(["dojox/json/ref"], function(){
  let me = {
      name:"Kris",
      father:{name:"Bill"},
      mother:{name:"Karen"}
  };
  let jsonMe = dojox.json.ref.toJson(me); // serialize me
  alert(jsonMe);
});
