!function(t){function e(e){for(var r,i,u=e[0],c=e[1],s=e[2],f=0,p=[];f<u.length;f++)i=u[f],o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(l&&l(e);p.length;)p.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={0:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/stackbots/";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var s=0;s<u.length;s++)e(u[s]);var l=c;a.push([153,1]),n()}({152:function(t,e,n){function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=n(363),i=function(){function t(e){var n=e.code;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.bots=[new a({code:n,id:0})]}var e,n,i;return e=t,(n=[{key:"runTick",value:function(){for(var t=this.bots.length,e=0;e<t;e++)this.bots[e].runTick(this)}},{key:"addBot",value:function(t){this.bots.push(new a(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}({},t,{id:this.bots.length})))}},{key:"updateCode",value:function(t,e){this.bots.find(function(e){return e.id==t}).updateCode(e)}},{key:"reset",value:function(){this.bots=this.bots.filter(function(t){return!t.isTemp}).map(function(t){return t.resetBot(),t})}},{key:"toJSON",value:function(){return{botCount:this.bots.length}}}])&&o(e.prototype,n),i&&o(e,i),t}();t.exports=i},153:function(t,e,n){n(154),t.exports=n(365)},363:function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=n(364),a=function(){function t(e){var n=e.id,r=e.code,o=e.room,a=e.x,i=e.stack,u=e.i,c=e.deathMessage,s=e.isTemp;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=n,this.code=r||"",this.x=a||0,this.room=o||0,this.stack=i||[],this.i=u||0,this.ticks=0,this.deathMessage=c||"",this.isDead=!1,this.isTemp=s||!1,this.parseCode(),this.validateCode()}var e,n,a;return e=t,(n=[{key:"resetBot",value:function(){this.x=0,this.room=0,this.i=0,this.ticks=0,this.isDead=!1,this.deathMessage="",this.stack=[]}},{key:"updateCode",value:function(t){this.code=t||"",this.parseCode(),this.validateCode()}},{key:"runTick",value:function(t){var e=this;if(!this.isDead){var n=this.codeArray.find(function(t){return t.line==e.i+1});if(n){this.ticks++;var r=o[n.cmd].mutator({bot:this,args:n.args,world:t});r&&this.die(r)}else this.die("Out of instructions")}}},{key:"toJSON",value:function(){return{id:this.id,code:this.code,x:this.x,room:this.room,stack:this.stack,i:this.i,ticks:this.ticks,deathMessage:this.deathMessage,isDead:this.isDead,isTemp:this.isTemp,codeArray:this.codeArray}}},{key:"die",value:function(t){this.isDead=!0,this.deathMessage=t,console.log("BOT DIED",t)}},{key:"validateCode",value:function(){var t=this;this.codeArray=this.codeArray.map(function(e){return e.valid=t.validateLine(e),e})}},{key:"validateLine",value:function(t){if("blank"==t.type)return!0;var e=o[t.cmd];if(!e)return!1;if(!e.argNums.includes(t.args.length))return!1;var n=!0;return e.args.map(function(e,r){var o=!1,a=t.args[r];e.optional||a?e.optional&&!a||(e.match.map(function(t){1==t(a)&&(o=!0)}),o||(n=!1)):vaild=!1}),n}},{key:"parseCode",value:function(){var t=0;this.codeArray=this.code.split("\n").map(function(e,n){if(""==(e=e.trim().toUpperCase())||e.startsWith(";"))return{type:"blank"};t++;var r=(e=function(t){if(t.startsWith("TEST")&&(t.includes("<")||t.includes(">")||t.includes("=")||t.includes("!="))){var e="",n="";t.includes("<")&&(n="<",e="TLT"),t.includes(">")&&(n=">",e="TGT"),t.includes("=")&&(n="=",e="TEQ"),t.includes("!=")&&(n="!=",e="TNE");var r=t.split(" ").filter(function(t){return""!=t});return r[3]?e+" "+r[1]+" "+r[3]:r[1].split(n)[0]&&r[1].split(n)[1]?e+" "+r[1].split(n)[0]+" "+r[1].split(n)[1]:t}if("FLIP"==t)return"SWAP";if(t.startsWith("REPL"))return t.replace("REPL","FORK");return t}(e=e.split(";")[0].trim())).split(" ");return{type:"code",cmd:r[0],text:e,args:r.slice(1)||[],line:t}})}}])&&r(e.prototype,n),a&&r(e,a),t}();t.exports=a},364:function(t,e){function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={X:function(t){return"X"==t},NUM:function(t){return a(t)},TOP:function(t){return"TOP"==t},POP:function(t){return"POP"==t},EXP:function(t){return t.includes("&gt;")||t.includes("=")||t.includes(">")||t.includes("!=")},MARK:function(t){var e="abcdefghijklmnopqrstuvwxyz0123456789".toUpperCase().split("");return t.split("").map(function(t){return e.includes(t)}).reduce(function(t,e){return t&&e})}},o={PUSH:{cmd:"PUSH",argNums:[1],args:[{match:[r.X,r.TOP,r.POP,r.NUM]}],mutator:function(t){var e=t.bot,n=t.args,r=(t.world,e.x);if(a(n[0]))r=parseInt(n[0]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[0]?"TOP"!=n[0]||(r=e.stack[e.stack.length-1]):r=e.stack.pop()}e.stack.push(r),e.i++}},POP:{cmd:"POP",argNums:[0,1],args:[{match:[r.X],optional:!0}],mutator:function(t){var e=t.bot,n=t.args;t.world;if(0==e.stack.length)return"Can't pop empty stack";n[0]?e.x=e.stack.pop():e.stack.pop(),e.i++}},TOP:{cmd:"TOP",argNums:[1],args:[{match:[r.X]}],mutator:function(t){var e=t.bot;t.args,t.world;if(0==e.stack.length)return"Can't read from empty stack.";e.x=e.stack[e.stack.length-1],e.i++}},LINE:{cmd:"LINE",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;e.stack.push(e.i+1),e.i++}},TEQ:{cmd:"TEQ",argNums:[0,2],args:[{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]},{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]}],mutator:function(t){var e=t.bot,n=t.args;t.world;n[0]||(n[0]="POP",n[1]="POP");var r=null,o=null;if("X"!=n[0])if(a(n[0]))r=parseInt(n[0]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[0]?"TOP"!=n[0]||(r=e.stack[e.stack.length-1]):r=e.stack.pop()}else r=e.x;if("X"!=n[1])if(a(n[1]))o=parseInt(n[1]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[1]?"TOP"!=n[1]||(o=e.stack[e.stack.length-1]):o=e.stack.pop()}else o=e.x;e.stack.push(r==o?1:0),e.i++}},TNE:{cmd:"TNE",argNums:[0,2],args:[{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]},{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]}],mutator:function(t){var e=t.bot,n=t.args;t.world;n[0]||(n[0]="POP",n[1]="POP");var r=null,o=null;if("X"!=n[0])if(a(n[0]))r=parseInt(n[0]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[0]?"TOP"!=n[0]||(r=e.stack[e.stack.length-1]):r=e.stack.pop()}else r=e.x;if("X"!=n[1])if(a(n[1]))o=parseInt(n[1]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[1]?"TOP"!=n[1]||(o=e.stack[e.stack.length-1]):o=e.stack.pop()}else o=e.x;e.stack.push(r==o?0:1),e.i++}},TLT:{cmd:"TLT",argNums:[0,2],args:[{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]},{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]}],mutator:function(t){var e=t.bot,n=t.args;t.world;n[0]||(n[0]="POP",n[1]="POP");var r=null,o=null;if("X"!=n[0])if(a(n[0]))r=parseInt(n[0]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[0]?"TOP"!=n[0]||(r=e.stack[e.stack.length-1]):r=e.stack.pop()}else r=e.x;if("X"!=n[1])if(a(n[1]))o=parseInt(n[1]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[1]?"TOP"!=n[1]||(o=e.stack[e.stack.length-1]):o=e.stack.pop()}else o=e.x;e.stack.push(r<o?1:0),e.i++}},TGT:{cmd:"TGT",argNums:[0,2],args:[{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]},{optional:!0,match:[r.X,r.TOP,r.POP,r.NUM]}],mutator:function(t){var e=t.bot,n=t.args;t.world;n[0]||(n[0]="POP",n[1]="POP");var r=null,o=null;if("X"!=n[0])if(a(n[0]))r=parseInt(n[0]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[0]?"TOP"!=n[0]||(r=e.stack[e.stack.length-1]):r=e.stack.pop()}else r=e.x;if("X"!=n[1])if(a(n[1]))o=parseInt(n[1]);else{if(0==e.stack.length)return"Can not read from empty stack.";"POP"!=n[1]?"TOP"!=n[1]||(o=e.stack[e.stack.length-1]):o=e.stack.pop()}else o=e.x;e.stack.push(r>o?1:0),e.i++}},NOOP:{cmd:"NOOP",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;e.i++}},SWAP:{cmd:"SWAP",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for swapping.";var n=e.stack.pop(),r=e.stack.pop();e.stack.push(n),e.stack.push(r),e.i++}},FORK:{cmd:"FORK",argNums:[1],args:[{match:[r.MARK]}],mutator:function(t){var e,r,o=t.bot,a=t.args,i=t.world,u=a[0];if(!(r=o.codeArray.filter(function(t){return"blank"!=t.type}).find(function(t){return t.args[0]==u})))return"MARK not found.";i.addBot((n(e={code:o.code,x:o.x,room:o.room,stack:o.stack.slice(),i:r.line},"x",o.x),n(e,"isTemp",!0),e)),o.i++}},JUMP:{cmd:"JUMP",argNums:[1],args:[{match:[r.MARK]}],mutator:function(t){var e,n=t.bot,r=t.args,o=(t.world,r[0]);if(!(e=n.codeArray.filter(function(t){return"blank"!=t.type}).find(function(t){return t.args[0]==o})))return"MARK not found.";n.i=e.line}},CALL:{cmd:"CALL",argNums:[1],args:[{match:[r.MARK]}],mutator:function(t){var e,n=t.bot,r=t.args,o=(t.world,r[0]);if(!(e=n.codeArray.filter(function(t){return"blank"!=t.type}).find(function(t){return"MARK"==t.cmd&&t.args[0]==o})))return"MARK not found.";n.stack.push(n.i+1),n.i=e.line}},RET:{cmd:"RET",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(0==e.stack.length)return"Nowhere to return to.";var n=e.stack.pop();e.i=n}},TJMP:{cmd:"TJMP",argNums:[1],args:[],mutator:function(t){var e=t.bot,n=t.args;t.world;if(0==e.stack.length)return"Can not read from empty stack";if(0!=e.stack[e.stack.length-1]){var r,o=n[0];if(!(r=e.codeArray.filter(function(t){return"blank"!=t.type}).find(function(t){return t.args[0]==o})))return"MARK not found.";e.i=r.line}else e.i++}},FJMP:{cmd:"FJMP",argNums:[1],args:[],mutator:function(t){var e=t.bot,n=t.args;t.world;if(0===e.stack.length||0==e.stack[e.stack.length-1]){var r,o=n[0];if(!(r=e.codeArray.filter(function(t){return"blank"!=t.type}).find(function(t){return t.args[0]==o})))return"MARK not found.";e.i=r.line}else e.i++}},ADDI:{cmd:"ADDI",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for math.";var n=e.stack.pop(),r=e.stack.pop();if(!a(n)||!a(r))return"Can't do maths on string.";e.stack.push(n+r),e.i++}},MULI:{cmd:"MULI",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for math.";var n=e.stack.pop(),r=e.stack.pop();if(!a(n)||!a(r))return"Can't do maths on string.";e.stack.push(n*r),e.i++}},SUBI:{cmd:"SUBI",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for math.";var n=e.stack.pop(),r=e.stack.pop();if(!a(n)||!a(r))return"Can't do maths on string.";e.stack.push(n-r),e.i++}},DIVI:{cmd:"DIVI",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for math.";var n=e.stack.pop(),r=e.stack.pop();if(!a(n)||!a(r))return"Can't do maths on string.";e.stack.push(Math.floor(n/r)),e.i++}},MODI:{cmd:"MODI",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(e.stack.length<2)return"Not enough items for math.";var n=e.stack.pop(),r=e.stack.pop();if(!a(n)||!a(r))return"Can't do maths on string.";e.stack.push(n%r),e.i++}},DUPL:{cmd:"DUPL",argNums:[0],args:[],mutator:function(t){var e=t.bot;t.args,t.world;if(0==e.stack.length)return"Can't read from empty stack.";e.stack.push(e.stack[e.stack.length-1]),e.i++}},MARK:{cmd:"MARK",argNums:[1],args:[{match:[r.MARK]}],mutator:function(t){var e=t.bot;t.args,t.world;e.i++}}};function a(t){return t=t.toString(),Number(parseFloat(t))==t&&!t.split("").includes("E")&&!t.split("").includes(".")}t.exports=o},365:function(t,e,n){"use strict";n.r(e);var r={};n.r(r),n.d(r,"setUserObject",function(){return P}),n.d(r,"setUsername",function(){return _}),n.d(r,"asnycDemo",function(){return w});var o={};n.r(o),n.d(o,"setBots",function(){return N}),n.d(o,"addBot",function(){return T}),n.d(o,"updateBot",function(){return S}),n.d(o,"runTick",function(){return E}),n.d(o,"run10",function(){return j}),n.d(o,"resetBots",function(){return C});var a={};n.r(a),n.d(a,"user",function(){return St});var i={};n.r(i),n.d(i,"bots",function(){return Ct});var u=n(0),c=n.n(u),s=n(74),l=n.n(s),f=n(60),p=n.n(f),m=n(54),d="SET_USER_OBJECT",y="SET_USERNAME",b="SET_BOTS",h="ADD_BOT",v="UPDATE_BOT",g="RUN_TICK",O="RESET_BOTS",k="RUN_10";function P(t){return{type:d,payload:t}}function _(t){return{type:y,payload:t}}function w(t){return function(e,n){setTimeout(function(){e(_(t))},1e3)}}function N(t){return{type:b,payload:t}}function T(t){return{type:h,payload:t}}function S(t,e){return{type:v,payload:{id:t,code:e}}}function E(){return{type:g}}function j(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return{type:k,payload:t}}function C(){return{type:O}}var x=Object.assign({},o,r),M=n(13);n(366);n(371);var I=n(37);n(373),n(375),n(377);function A(t){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function R(t,e){return!e||"object"!==A(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var L=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),R(this,B(e).apply(this,arguments))}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(e,c.a.Component),n=e,(r=[{key:"render",value:function(){return c.a.createElement("div",{className:"Spacer__mCvPQ",style:{width:this.props.w||0,height:this.props.h||0}})}}])&&D(n.prototype,r),o&&D(n,o),e}(),J=n(147),X=n.n(J);n(379);function K(t){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function W(t,e){return!e||"object"!==K(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function G(t){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Q(t,e){return(Q=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var z=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),W(this,G(e).apply(this,arguments))}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Q(t,e)}(e,c.a.Component),n=e,(r=[{key:"render",value:function(){var t=this.props.bot;return c.a.createElement("div",{className:"BotData__2adJ-"},c.a.createElement("div",{className:"row__hobll"},c.a.createElement("div",{className:"key__3Tu1C"},"X"),c.a.createElement("div",{className:"value__1LF1j",title:t.x},t.x)),c.a.createElement("div",{className:"row__hobll noFlex__2Y1Lu"},c.a.createElement("div",{className:"key__3Tu1C"},"Stack"),c.a.createElement("div",{className:"stack__1Kz6o value__1LF1j",title:t.x},t.stack.slice().reverse().map(function(t,e){return c.a.createElement("div",{key:e+":"+t},t)}))))}}])&&F(n.prototype,r),o&&F(n,o),e}();function H(t){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var V={style:{BotDisplay:"BotDisplay__ORyTn",code:"code__xeD25",codeWrap:"codeWrap__2bNcI",lineNum:"lineNum__3PcSy",lineNums:"lineNums__1STtN",currentIns:"currentIns__1I8GG",error:"error__1Pbcj"}};function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function q(t,e){return!e||"object"!==H(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Z(t){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function $(t,e){return($=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var tt=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),q(this,Z(e).apply(this,arguments))}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&$(t,e)}(e,c.a.PureComponent),n=e,(r=[{key:"render",value:function(){var t=this,e=this.props.bot,n=e.i,r=e.codeArray.map(function(t,e){return"blank"==t.type?c.a.createElement("div",{key:"line"+e,className:p()("lineNum",V,{handleMissingStyleName:"warn"})}," "):c.a.createElement("div",{key:"line"+e,className:p()("lineNum",V,{handleMissingStyleName:"warn"})},t.line,t.valid&&t.line-1==n&&c.a.createElement("div",{className:"currentIns__1I8GG"}),!t.valid&&c.a.createElement("div",{className:"error__1Pbcj"}))});return c.a.createElement("div",{className:"BotDisplay__ORyTn"},c.a.createElement("div",{className:""},"Bot #",e.id," (",this.props.ticks,")"),c.a.createElement(L,{h:4}),c.a.createElement("div",{className:"codeWrap__2bNcI"},c.a.createElement("div",{className:"lineNums__1STtN"},r),c.a.createElement(X.a,{onChange:function(n){t.props.updateBot(e.id,n.target.value)},className:"code__xeD25",value:e.code}),c.a.createElement(z,{bot:e})),e.isDead&&c.a.createElement("div",{className:""},e.deathMessage))}}])&&Y(n.prototype,r),o&&Y(n,o),e}(),et=n(148),nt=n.n(et);function rt(t){return(rt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function ot(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function at(t,e){return!e||"object"!==rt(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function it(t){return(it=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ut(t,e){return(ut=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var ct=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),at(this,it(e).apply(this,arguments))}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ut(t,e)}(e,c.a.Component),n=e,(r=[{key:"doTick",value:function(){var t=this;clearInterval(this.int),this.int=setInterval(function(){t.props.runTick()},100)}},{key:"render",value:function(){var t=this;return c.a.createElement("div",{className:"BotList__2ut7p"},c.a.createElement("button",{onClick:function(){clearInterval(t.int),t.props.runTick()}},"Run tick / Pause"),c.a.createElement("button",{onClick:function(){clearInterval(t.int),t.props.run10()}},"Run 10"),c.a.createElement("button",{onClick:function(){t.doTick()}},"Run ticks"),c.a.createElement("button",{onClick:function(){clearInterval(t.int),t.props.resetBots()}},"Reset"),c.a.createElement("button",{onClick:function(){t.props.addBot()}},"Add new bot"),c.a.createElement(L,{h:12}),Object.values(this.props.bots.bots).map(function(e){return c.a.createElement(tt,{key:e.id,updateBot:t.props.updateBot,bot:e,ticks:e.ticks,i:e.i})}))}}])&&ot(n.prototype,r),o&&ot(n,o),e}();var st,lt,ft=Object(m.b)(function(t){return{bots:t.bots}},function(t){return Object(M.b)(x,t)})(nt()(ct,1e3/60,{leading:!0,maxWait:125}));function pt(t){return(pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var mt={style:{app:"app__2-NKO",main:"main__1Qz2V"}};function dt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function yt(t,e){return!e||"object"!==pt(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function bt(t){return(bt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ht(t,e){return(ht=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var vt,gt=(st=Object(m.b)(function(t){return{user:t.user}},function(t){return Object(M.b)(x,t)}),Object(I.d)(lt=st(lt=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=yt(this,bt(e).call(this,t))).state={},n}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ht(t,e)}(e,u["Component"]),n=e,(r=[{key:"componentDidMount",value:function(){this.props.setBots()}},{key:"render",value:function(){return c.a.createElement("div",{className:p()("main",mt,{handleMissingStyleName:"warn"})},c.a.createElement(ft,null))}}])&&dt(n.prototype,r),o&&dt(n,o),e}())||lt)||lt),Ot=n(105),kt=n(150),Pt=n(151);function _t(t,e){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,r=arguments.length>1?arguments[1]:void 0;return e.hasOwnProperty(r.type)?e[r.type](n,r):n}}function wt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){Nt(t,e,n[e])})}return t}function Nt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Tt,St=_t({username:"Anon"},(Nt(vt={},d,function(t,e){return wt({},e.payload)}),Nt(vt,y,function(t,e){return wt({},t,{username:e.payload})}),vt));function Et(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var jt=new(n(152))({code:";FIBONACCI\nPUSH 0\nDUPL\nPOP X\nPUSH 1\n\nMARK LOOP\nDUPL\nPUSH X\nADDI\nSWAP\nDUPL\nPOP X\nSWAP\nJUMP LOOP"}),Ct=_t({world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})},(Et(Tt={},b,function(t,e){return t}),Et(Tt,O,function(t,e){return jt.reset(),{world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})}}),Et(Tt,h,function(t,e){return jt.addBot(),{world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})}}),Et(Tt,v,function(t,e){return jt.updateCode(e.payload.id,e.payload.code),{world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})}}),Et(Tt,g,function(t,e){return jt.runTick(),{world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})}}),Et(Tt,k,function(t,e){for(var n=0;n<e.payload;n++)jt.runTick();return{world:jt.toJSON(),bots:jt.bots.map(function(t){return t.toJSON()})}}),Tt));var xt=Object(M.c)(Object.assign({},a,i)),Mt=Object(Pt.createLogger)({predicate:function(t,e){return!1}});var It,At,Dt,Rt=(It={},At=Object(M.d)(Object(M.a)(kt.a,Mt)),Object(M.e)(xt,It,At));Dt=gt,l.a.render(c.a.createElement(m.a,{store:Rt},c.a.createElement(Ot.a,null,c.a.createElement(Dt,null))),document.getElementById("app"))},366:function(t,e){t.exports={InputField:"InputField__2iVjL"}},371:function(t,e){t.exports={main:"main__1Qz2V"}},373:function(t,e){t.exports={BotList:"BotList__2ut7p"}},375:function(t,e){t.exports={BotDisplay:"BotDisplay__ORyTn",code:"code__xeD25",codeWrap:"codeWrap__2bNcI",lineNum:"lineNum__3PcSy",lineNums:"lineNums__1STtN",currentIns:"currentIns__1I8GG",error:"error__1Pbcj"}},377:function(t,e){t.exports={Spacer:"Spacer__mCvPQ"}},379:function(t,e){t.exports={BotData:"BotData__2adJ-",row:"row__hobll",noFlex:"noFlex__2Y1Lu",key:"key__3Tu1C",value:"value__1LF1j",stack:"stack__1Kz6o"}}});
//# sourceMappingURL=main-09b75ef36d9f4f8e1db5.js.map