'use strict';

var client = angular.module('lelylan.basicAuth', ['ngResource'])

client.factory('BasicAuth', [function() {
  var basicAuth = {};
  var auth = {};

  basicAuth.get = function() { return auth };
  basicAuth.set = function(params) { angular.extend(auth, params) };

  return basicAuth;
}]);

client.factory('Base64', [function() {
  var base64 = {};
  var cb64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  base64.encode = function(str) {
    var tmpvar,i,str,j;
    var resultstr;
    i=str.length;
    j=0;
    resultstr="";
    while(i>0){
      if (i>2){
        tmpvar=str.substr(j,3)
        resultstr = resultstr + encodeBlock(tmpvar,3);
      }else{
        tmpvar=str.substr(j,i)
        resultstr = resultstr + encodeBlock(tmpvar,i);
      }
      i-=3;
      j+=3;
    }
    return resultstr;
  };

  var encodeBlock = function(instr, len) {
    var out=new Array(4);
    var in0,in1,in2,in3;
    in0=instr.charCodeAt(0);
    out[0]=cb64.charAt(in0 >> 2);
    if (len < 2){
      in1=0;
      in2=0;
      in3=0;
    }else{
      in1=instr.charCodeAt(1);
      if (len<3){
        in2=0;
        in3=0;
      }else{
        in2=instr.charCodeAt(2);
        in3=instr.charCodeAt(3);
      }
    }
    out[1]=cb64.charAt( ((in0 & 0x03) << 4)| ((in1 & 0xf0) >> 4));
    if (len>1){
      out[2] = cb64.charAt( ((in1 & 0x0f) << 2) | ((in2 & 0xc0) >> 6) );
    }else{
      out[2] = '=';
    }
    if (len>2){
      out[3] = cb64.charAt(in2 & 0x3f);
    }else{
      out[3] = '=';
    }
    return(out[0] + out[1] + out[2] + out[3]);
  }

  return base64;
}]);

