// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10
(function(){if(!window.WebSocket||window.WEB_SOCKET_FORCE_FLASH){var c;c=window.WEB_SOCKET_LOGGER?WEB_SOCKET_LOGGER:window.console&&window.console.log&&window.console.error?window.console:{log:function(){},error:function(){}};swfobject.getFlashPlayerVersion().major<10?c.error("Flash Player >= 10.0.0 is required."):(location.protocol=="file:"&&c.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),
WebSocket=function(a,b,e,c,f){var d=this;d.__id=WebSocket.__nextId++;WebSocket.__instances[d.__id]=d;d.readyState=WebSocket.CONNECTING;d.bufferedAmount=0;d.__events={};b?typeof b=="string"&&(b=[b]):b=[];d.__createTask=setTimeout(function(){WebSocket.__addTask(function(){d.__createTask=null;WebSocket.__flash.create(d.__id,a,b,e||null,c||0,f||null)})},0)},WebSocket.prototype.send=function(a){if(this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";
a=WebSocket.__flash.send(this.__id,encodeURIComponent(a));return a<0?true:(this.bufferedAmount+=a,false)},WebSocket.prototype.close=function(){if(this.__createTask)clearTimeout(this.__createTask),this.__createTask=null,this.readyState=WebSocket.CLOSED;else if(!(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING))this.readyState=WebSocket.CLOSING,WebSocket.__flash.close(this.__id)},WebSocket.prototype.addEventListener=function(a,b){a in this.__events||(this.__events[a]=[]);this.__events[a].push(b)},
WebSocket.prototype.removeEventListener=function(a,b){if(a in this.__events)for(var e=this.__events[a],c=e.length-1;c>=0;--c)if(e[c]===b){e.splice(c,1);break}},WebSocket.prototype.dispatchEvent=function(a){for(var b=this.__events[a.type]||[],c=0;c<b.length;++c)b[c](a);(b=this["on"+a.type])&&b.apply(this,[a])},WebSocket.prototype.__handleEvent=function(a){if("readyState"in a)this.readyState=a.readyState;if("protocol"in a)this.protocol=a.protocol;var b;if(a.type=="open"||a.type=="error")b=this.__createSimpleEvent(a.type);
else if(a.type=="close")b=this.__createSimpleEvent("close"),b.wasClean=a.wasClean?true:false,b.code=a.code,b.reason=a.reason;else if(a.type=="message")b=this.__createMessageEvent("message",decodeURIComponent(a.message));else throw"unknown event type: "+a.type;this.dispatchEvent(b)},WebSocket.prototype.__createSimpleEvent=function(a){if(document.createEvent&&window.Event){var b=document.createEvent("Event");b.initEvent(a,false,false);return b}else return{type:a,bubbles:false,cancelable:false}},WebSocket.prototype.__createMessageEvent=
function(a,b){if(document.createEvent&&window.MessageEvent&&!window.opera){var c=document.createEvent("MessageEvent");c.initMessageEvent("message",false,false,b,null,null,window,null);return c}else return{type:a,data:b,bubbles:false,cancelable:false}},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__flash=null,WebSocket.__instances={},WebSocket.__tasks=[],WebSocket.__nextId=0,WebSocket.loadFlashPolicyFile=function(a){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(a)})},
WebSocket.__initialize=function(){if(!WebSocket.__flash){if(WebSocket.__swfLocation)window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation;if(window.WEB_SOCKET_SWF_LOCATION){if(!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR&&!WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/)&&WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)){var a=RegExp.$1;location.host!=a&&c.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host ('"+location.host+"' != '"+a+"'). See also 'How to host HTML file and SWF file in different domains' section in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;")}a=
document.createElement("div");a.id="webSocketContainer";a.style.position="absolute";WebSocket.__isFlashLite()?(a.style.left="0px",a.style.top="0px"):(a.style.left="-100px",a.style.top="-100px");var b=document.createElement("div");b.id="webSocketFlash";a.appendChild(b);document.body.appendChild(a);swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:true,swliveconnect:true,allowScriptAccess:"always"},null,function(a){a.success||c.error("[WebSocket] swfobject.embedSWF failed")})}else c.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")}},
WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash");WebSocket.__flash.setCallerUrl(location.href);WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var a=0;a<WebSocket.__tasks.length;++a)WebSocket.__tasks[a]();WebSocket.__tasks=[]},0)},WebSocket.__onFlashEvent=function(){setTimeout(function(){try{for(var a=WebSocket.__flash.receiveEvents(),b=0;b<a.length;++b)WebSocket.__instances[a[b].webSocketId].__handleEvent(a[b])}catch(e){c.error(e)}},
0);return true},WebSocket.__log=function(a){c.log(decodeURIComponent(a))},WebSocket.__error=function(a){c.error(decodeURIComponent(a))},WebSocket.__addTask=function(a){WebSocket.__flash?a():WebSocket.__tasks.push(a)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return false;var a=window.navigator.mimeTypes["application/x-shockwave-flash"];return!a||!a.enabledPlugin||!a.enabledPlugin.filename?false:a.enabledPlugin.filename.match(/flashlite/i)?true:false},window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||
(window.addEventListener?window.addEventListener("load",function(){WebSocket.__initialize()},false):window.attachEvent("onload",function(){WebSocket.__initialize()})))}})();
