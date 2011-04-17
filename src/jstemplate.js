var jstemplate = new function(){
  var xhttp;
  var xmlns = 'http://www.w3.org/1999/xhtml';
  var ns = 'http://thegoog.net/things/jstemplate';
  function traverseDOM(dom,fun){
    fun(dom);
    for (var i = 0; i < dom.childNodes.length; i++) {
      traverseDOM(dom.childNodes[i],fun);
    }
  }
  if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest();
  }else{
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  this.load = function(src){
    var xml;
    xhttp.open("GET",src,false);
    xhttp.send();
    xml = xhttp.responseXML;
    return new function(){
      this.inflate = function(){
        return new function(){
          var fragment = xml.documentElement.cloneNode(true);
          var idmap = {};

          // Setup fp:id map
          traverseDOM(fragment,function(node){
              var attr;
              if(node.getAttributeNS){
                attr = node.getAttributeNS(ns,'id');
                if(attr != ''){
                  idmap[attr] = node;
                  node.removeAttributeNS(ns,'id');
                }
                node.removeAttribute('xmlns:template');
                node.removeAttribute('xmlns');
              }
              });

          this.getElementById = function(id){
            return idmap[id];
          };

          this.toHTML = function(){
            return fragment;
          };
        }
      }
    }
  };
};

