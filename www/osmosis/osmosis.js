if (typeof spider === 'undefined') { var spider = {}; }
spider.windowTheme = "flat";
spider.gadgetTheme = "flat";
var _S2=" seconds";
var _S4="Osmosis";
var _S3="You became the largest in ";
var _S5="bigblue.png";
var _S1="You got absorbed in ";
var _S7="player.png";
var _S6="bigblue1.png";
var _S8="osmosis.png";
var so_runworld$v_tmass=0;
var so_runworld$v_sum=0;
var so_runworld$v_time=0;
var so_loading$v_nbloadedelements=0;
function s_integer() {
this._i=0;
this.copy = function(dest) { var k;
dest._i=this._i;
};
}
function s_ball() {
this._x=0;
this._vx=0;
this._y=0;
this._vy=0;
this._r=0;
this._mass=0;
this._type=0;
this._bcollide=0;
this._sprite=0;
this.copy = function(dest) { var k;
dest._x=this._x;
dest._vx=this._vx;
dest._y=this._y;
dest._vy=this._vy;
dest._r=this._r;
dest._mass=this._mass;
dest._type=this._type;
dest._bcollide=this._bcollide;
dest._sprite=this._sprite;
};
}
var a_sp=new spider_SysArray();
var t_bodies;
var t_del;
var v_bottom=0;
var v_left=0;
var v_ang=0;
var v_right=0;
var v_sp=0;
var v_st=0;
var v_time=0;
var p_player=0;
var v_top=0;
if("undefined"==typeof Spider)var Spider={};spider.systembase={localFiles:null,getLocalFile:function(a){for(var b=0;b<this.localFiles.length;b++)if(1==spider.systembase.localFilesType){if(this.localFiles[b][google.picker.Document.ID]===a)return this.localFiles[b]}else if(this.localFiles[b].name===a)return this.localFiles[b];return null}};function spider_BankerRound(a){return 0>a?Math.ceil(a-0.5):Math.floor(a+0.5)}function spider_CastByte(a){a&=255;return 127<a?-(256-a):a}
function spider_CastCharacter(a){return a&65535}function spider_CastAscii(a){return a&255}function spider_CastUnicode(a){return a&65535}function spider_CastWord(a){a&=65535;return 32767<a?-(65536-a):a}function spider_CastLong(a){a&=4294967295;return 2147483647<a?-(4294967296-a):a}function spider_CastQuad(a){return 0<=a?Math.floor(a):Math.ceil(a)}function spider_XOr(a,b){return(a||b)&&!(a&&b)}function spider_AssignFixedString(a,b){return b<a.length?a.substring(0,b):a}
function spider_SysArray(){this.structure=null;this.nbDimensions=0;this.type=this.dimensions=null}function spider_SysList(){this.type=this.current=this.last=this.first=null;this.index=0;this.isIndexInvalid=!1;this.field="";this.nbElements=0;this.isNative=!1}function spider_SysMap(){this.map={};this.current=null;this.currentIndex=-1;this.type=this.keys=this.currentKey=null;this.isNative=!1};

if("undefined"===typeof spider)var spider={};
spider.object=function(c){return{map:{},dynamicCounter:1E5,Allocate:function(a){var b={};-1==a?(b.id=this.dynamicCounter,b.resultId=b.id,this.dynamicCounter++):(c&&c(a),b.id=a,b.resultId=b);return this.map[b.id]=b},Get:function(a){return this.map.hasOwnProperty(a)?this.map[a]:null},Remove:function(a){delete this.map[a]},EnumerateAll:function(a){for(var b in this.map)this.map.hasOwnProperty(b)&&a(b,this.map[b])},CleanAll:function(){if(c)for(var a in this.map)this.map.hasOwnProperty(a)&&c(a)},Is:function(a){return this.map.hasOwnProperty(a)?
1:0}}};

if("undefined"===typeof spider)var spider={};function spider_PeekB(a,b){return a.view8[b]}function spider_PeekA(a,b){return a.viewu8[b]}function spider_PeekW(a,b){return a.view.getInt16(b,!0)}function spider_PeekU(a,b){return a.view.getUint16(b,!0)}function spider_PeekC(a,b){return a.view.getUint16(b,!0)}function spider_PeekL(a,b){return a.view.getInt32(b,!0)}function spider_PeekF(a,b){return a.view.getFloat32(b,!0)}function spider_PeekD(a,b){return a.view.getFloat64(b,!0)}var spider_Memory_CharacterReadOffset;
function spider_Memory_ReadUTF8Character(a,b){var c;c=a[b];return 0===(c&128)?(spider_Memory_CharacterReadOffset=1,c):192==(c&224)?(spider_Memory_CharacterReadOffset=2,(c&31)<<6|a[b+1]&63):224==(c&240)?(spider_Memory_CharacterReadOffset=3,(c&15)<<12|(a[b+1]&63)<<6|(a[b+2]&63)<<0):0}
function spider_Memory_ReadCharacter(a,b,c){switch(c){case 24:return spider_Memory_CharacterReadOffset=1,a[b];case 25:return spider_Memory_CharacterReadOffset=2,a[b+1]<<8|a[b];default:return spider_Memory_ReadUTF8Character(a,b)}}
function spider_PeekS(a,b,c,d){"undefined"===typeof d&&(d=2);"undefined"===typeof c&&(c=-1);d&=31;var e,f="";0===d&&(d=25);if(-1<=c)for(;c;){e=spider_Memory_ReadCharacter(a.viewu8,b,d);if(0===e)break;f+=String.fromCharCode(e);b+=spider_Memory_CharacterReadOffset;c--}return f}function spider_PokeB(a,b,c){a.view8[b]=c}function spider_PokeA(a,b,c){a.viewu8[b]=c}function spider_PokeW(a,b,c){a.view.setInt16(b,c,!0)}function spider_PokeU(a,b,c){a.view.setUint16(b,c,!0)}
function spider_PokeC(a,b,c){a.view.setUint16(b,c,!0)}function spider_PokeL(a,b,c){a.view.setInt32(b,c,!0)}function spider_PokeF(a,b,c){a.view.setFloat32(b,c,!0)}function spider_PokeD(a,b,c){a.view.setFloat64(b,c,!0)}function spider_Memory_WriteUTF8Character(a,b,c){return 128>c?(a[b]=c,1):2048>c?(a[b]=192|c>>6,a[b+1]=128|c&63,2):55296>c||57344<=c?(a[b]=224|c>>12,a[b+1]=128|c>>6&63,a[b+2]=128|c&63,3):0}
function spider_Memory_WriteCharacter(a,b,c,d){switch(d){case 24:return a[b]=c,1;case 25:return a[b]=c,a[b+1]=c>>8,2;default:return spider_Memory_WriteUTF8Character(a,b,c)}}function spider_PokeS(a,b,c,d,e){"undefined"===typeof e&&(e=2);"undefined"===typeof d&&(d=-1);var f=c.length;if(-1==d||d>f)d=f;var f=b,g=e&31;0===g&&(g=25);for(var h=0;h<d;h++)b+=spider_Memory_WriteCharacter(a.viewu8,b,c.charCodeAt(h),g);0===(e&256)&&(a.viewu8[b]=0,25==g&&(a.viewu8[b+1]=0));return b-f}
function spider_AllocateMemory(a,b){var c=new ArrayBuffer(a);c.view8=new Int8Array(c);c.viewu8=new Uint8Array(c);c.view=new DataView(c);return c}function spider_ReAllocateMemory(a,b,c){if(a){if(b==a.byteLength)return a;if(b<a.byteLength)return a.slice(0,b);b=spider_AllocateMemory(b,c);b.view8.set(a.view8,0,a.byteLength);return b}return spider_ReAllocateMemory(b,c)}function spider_FreeMemory(a){}
function spider_CompareMemory(a,b,c,d,e){a=new Int8Array(a,b,e);c=new Int8Array(c,d,e);for(d=0;d!=e;d++)if(a[d]!=c[d])return 0;return 1}function spider_MemorySize(a){return a.byteLength}function spider_AllocateStructure(a,b){return new a}function spider_FreeStructure(a){}function spider_ClearStructure(a,b){$.extend(!0,a,new b)}function spider_CopyStructure(a,b,c){$.extend(!0,b,a)};

if("undefined"==typeof Spider)var Spider={};function spider_Asc(a){return""===a?0:a.charCodeAt(0)}function spider_Bin(a,b){"undefined"===typeof b&&(b=13);switch(b){case 1:case 24:a&=255;break;case 3:case 25:a&=65535;break;case 5:return spider_Right(a.toString(2),32)}return a.toString(2)}function spider_Chr(a){return String.fromCharCode(a)}function spider_LCase(a){return a.toLowerCase()}function spider_UCase(a){return a.toUpperCase()}
function spider_CountString(a,b){if(0>=b.length)return a.length+1;for(var c=0,d=0,e=b.length;;)if(d=a.indexOf(b,d),0<=d)c++,d+=e;else break;return c}function spider_FindString(a,b,c,d){"undefined"===typeof c&&(c=1);"undefined"===typeof d&&(d=0);return a&&b&&""!==a&&""!==b?0===d?a.indexOf(b,c-1)+1:a.toUpperCase().indexOf(b.toUpperCase(),c-1)+1:0}function spider_InsertString(a,b,c){1>c?c=1:c>a.length+1&&(c=a.length+1);return a.substr(0,c-1)+b+a.substr(c-1)}
function spider_Space(a){if(0>=a)return"";for(var b=a/2,c=" ";c.length<=b;)c+=c;return c+c.substring(0,a-c.length)}function spider_Str(a){return""+a}function spider_StrD(a,b){var c;c="undefined"===typeof b?a.toString():a.toFixed(b);"Infinity"==c&&(c="+Infinity");return c}function spider_StrF(a,b){return spider_StrD(a,b)}function spider_StrU(a,b){"undefined"===typeof b&&(b=13);switch(b){case 1:case 24:a&=255;break;case 3:case 25:a&=65535}return a.toString(10)}
function spider_Val(a){for(var b=0,c=a.length-1,d=0;d<=c&&(" "==a.charAt(d)||"t"==a.charAt(d));)d++;c=a.charAt(d);"-"==c&&(d++,b=1,c=a.charAt(d));a="%"==c?parseInt(spider_Right(a,a.length-d-1),2):"$"==c?parseInt(spider_Right(a,a.length-d-1),16):parseInt(spider_Right(a,a.length-d),10);isNaN(a)&&(a=0);return b?-a:a}function spider_ValF(a){a=parseFloat(a,10);isNaN(a)&&(a=0);return a}function spider_ValD(a){a=parseFloat(a,10);isNaN(a)&&(a=0);return a}
function spider_Right(a,b){var c=a.length;return a.substring(c-b,c)}function spider_Left(a,b){return a.substring(0,b)}function spider_Mid(a,b,c){"undefined"===typeof c&&(c=a.length);1>b&&(b=1);return a.substring(b-1,b+c-1)}function spider_LTrim(a,b){"undefined"===typeof b&&(b=" ");for(var c=0,d=a.length-1;c<=d&&a.charAt(c)==b;)c++;return a.substr(c)}function spider_RTrim(a,b){"undefined"===typeof b&&(b=" ");for(var c=a.length-1;0<c&&a.charAt(c)==b;)c--;return a.substr(0,c-0+1)}
function spider_Trim(a,b){"undefined"===typeof b&&(b=" ");for(var c=0,d=a.length-1;c<=d&&a.charAt(c)==b;)c++;for(;d>c&&a.charAt(d)==b;)d--;return a.substr(c,d-c+1)}function spider_Len(a){return a.length}function spider_Hex(a,b){"undefined"===typeof b&&(b=13);switch(b){case 1:case 24:a&=255;break;case 3:case 25:a&=65535;break;case 5:a&=4294967295}return a.toString(16).toUpperCase()}
function spider_ReplaceString(a,b,c,d,e,f){"undefined"===typeof d&&(d=0);"undefined"===typeof e&&(e=1);"undefined"===typeof f&&(f=-1);if(a&&b)for(e-=1,1==d&&(b=b.toUpperCase());f;){e=1==d?a.toUpperCase().indexOf(b,e):a.indexOf(b,e);if(-1==e)break;a=a.substring(0,e)+c+a.substring(e+b.length);e+=c.length;f--}return a}function spider_RemoveString(a,b,c,d,e){return spider_ReplaceString(a,b,"",c,d,e)}function spider_ReverseString(a){var b="",c;for(c=a.length-1;0<=c;c--)b+=a.charAt(c);return b}
function spider_RSet(a,b,c){"undefined"===typeof c&&(c=" ");var d=b-a.length;if(a.length>b)return a.substring(0,b);if(0<d){b=c;for(d--;d;)d--,b+=c;return b+a}return a}function spider_LSet(a,b,c){"undefined"===typeof c&&(c=" ");var d=b-a.length;if(a.length>b)return a.substring(0,b);if(0<d){b=c;for(d--;d;)d--,b+=c;return a+b}return a}function spider_StringField(a,b,c){return""===c?a:1<=b&&(a=a.split(c),a.length>=b)?a[b-1]:""};

function spider_Date(a,e,b,d,k,f){if("undefined"===typeof a)return a=new XDate,a.getTime()/1E3-60*a.getTimezoneOffset();a=new XDate(a,e-1,b,d,k,f,!0);return a.getTime()/1E3}function spider_Year(a){return-1==a?0:(new XDate(1E3*a,!0)).getFullYear()}function spider_Month(a){return-1==a?0:(new XDate(1E3*a,!0)).getMonth()+1}function spider_Day(a){return-1==a?0:(new XDate(1E3*a,!0)).getDate()}function spider_DayOfWeek(a){return-1==a?0:(new XDate(1E3*a,!0)).getDay()}
function spider_DayOfYear(a){if(-1==a)return 0;a=new XDate(1E3*a,!0);for(var e=0,b=a.getFullYear(),d=0;d<a.getMonth();d++)e+=XDate.getDaysInMonth(b,d);return e+=a.getDate()}function spider_Hour(a){return-1==a?0:(new XDate(1E3*a,!0)).getHours()}function spider_Minute(a){return-1==a?0:(new XDate(1E3*a,!0)).getMinutes()}function spider_Second(a){return-1==a?0:(new XDate(1E3*a,!0)).getSeconds()}
function spider_AddDate(a,e,b){a=new XDate(1E3*a,!0);switch(e){case 0:a.addYears(b,!0);break;case 1:a.addMonths(b,!0);break;case 2:a.addWeeks(b);break;case 3:a.addDays(b);break;case 4:a.addHours(b);break;case 5:a.addMinutes(b);break;case 6:a.addSeconds(b)}return a.getTime()/1E3}
function spider_FormatDate(a,e){var b=new XDate(1E3*e,!0),d=spider_ReplaceString(a,"%yyyy",""+b.getFullYear()),d=spider_ReplaceString(d,"%yy",spider_Right(""+b.getFullYear(),2)),d=spider_ReplaceString(d,"%mm",spider_RSet(""+(b.getMonth()+1),2,"0")),d=spider_ReplaceString(d,"%dd",spider_RSet(""+b.getDate(),2,"0")),d=spider_ReplaceString(d,"%hh",spider_RSet(""+b.getHours(),2,"0")),d=spider_ReplaceString(d,"%ii",spider_RSet(""+b.getMinutes(),2,"0"));return d=spider_ReplaceString(d,"%ss",spider_RSet(""+
b.getSeconds(),2,"0"))}
function spider_ParseDate(a,e){var b=0,d,k,f=1970,l=1,m=1,n=0,p=0,q=0,g,h=function(a){for(g=0;$.isNumeric(a.charAt(g))&&g<a.length;)g++;return spider_Val(a)};if(a&&e){for(var c=0;c<a.length;)if(d=a.charAt(c),k=e.charAt(b),"%"==d)if(c++,"yyyy"==a.substring(c,c+4)){f=h(e.substring(b,b+4));if(-1==f)return-1;b+=g;c+=4}else if("yy"==a.substring(c,c+2)){f=h(e.substring(b,b+2));if(-1==f)return-1;f=70<=f?f+1900:f+2E3;b+=g;c+=2}else if("mm"==a.substring(c,c+2)){l=h(e.substring(b,b+2));if(-1==l)return-1;b+=
g;c+=2}else if("dd"==a.substring(c,c+2)){m=h(e.substring(b,b+2));if(-1==m)return-1;b+=g;c+=2}else if("hh"==a.substring(c,c+2)){n=h(e.substring(b,b+2));if(-1==n)return-1;b+=g;c+=2}else if("ii"==a.substring(c,c+2)){p=h(e.substring(b,b+2));if(-1==p)return-1;b+=g;c+=2}else if("ss"==a.substring(c,c+2)){q=h(e.substring(b,b+2));if(-1==q)return-1;b+=g;c+=2}else b++,c++;else{if(d!=k)return-1;c++;b++}if(b==e.length)return spider_Date(f,l,m,n,p,q)}return-1};

if("undefined"===typeof spider)var spider={};if("undefined"===typeof document)var document={};if("undefined"===typeof window)var window={};function spider_FinishDirectory(a){-1==a?spider.filesystem.objects.CleanAll():spider.filesystem.objects.Get(a)&&spider.filesystem.objects.Remove(a)}spider.filesystem={objects:new spider.object(spider_FinishDirectory),fs:null,cwd:null};function spider_RequestFileSystem(a,b,c){window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem}
function spider_ExamineDirectory(a,b,c,d){spider.filesystem.objects.Allocate(a)}function spider_GetExtensionPart(a){a=a.split(".");return 1===a.length||""===a[0]&&2===a.length?"":a.pop()};

if("undefined"===typeof spider)var spider={};function spider_InitImageDecoder(){};

spider.nbModules++;require(["filesaver.min","canvas-toBlob.min"],function(){spider.nbLoadedModules++;SpiderMain()});function spider_InitImage(){spider.image.div=document.createElement("div");$(spider.image.div).hide()}function spider_FreeImage(a){var b;if(-1==a)spider.image.objects.CleanAll();else if(b=spider.image.objects.Get(a))spider.image.div.removeChild(b.image),spider.image.objects.Remove(a)}
spider.image={objects:new spider.object(spider_FreeImage),counter:0,div:null,GetCSS:function(a){if(!a)return null;a.spiderCounter||(this.counter++,a.spiderCounter=this.counter);var b="spiderimage_"+a.spiderCounter;if(!a.css){a.css=!0;var c={};c["."+b]={"background-image":"url("+a.toDataURL()+")","background-repeat":"no-repeat",width:""+a.width+"px",height:""+a.height+"px"};$.injectCSS(c)}return b},GetGrayedCSS:function(a){a.spiderCounter||(this.counter++,a.spiderCounter=this.counter);var b="spiderimagegrayed_"+
a.spiderCounter;if(!a.grayedCss){a.grayedCss=!0;var c={},e="."+b,d;d=document.createElement("canvas");var f=d.getContext("2d");d.width=a.width;d.height=a.height;f.drawImage(a,0,0);for(var g=f.getImageData(0,0,d.width,d.height),l=0;l<g.height;l++)for(var p=0;p<g.width;p++){var m=4*l*g.width+4*p,r=(g.data[m]+g.data[m+1]+g.data[m+2])/3;g.data[m]=r;g.data[m+1]=r;g.data[m+2]=r}f.putImageData(g,0,0,0,0,g.width,g.height);d=d.toDataURL();c[e]={"background-image":"url("+d+")","background-repeat":"no-repeat",
width:""+a.width+"px",height:""+a.height+"px"};$.injectCSS(c)}return b},downscaleCanvas:function(a,b,c,e){var d=a.width,f=a.height;b=Math.round(b);c=Math.round(c);for(var g=d/b,l=f/c,p=Math.ceil(g/2),m=Math.ceil(l/2),r=a.getContext("2d"),n=r.getImageData(0,0,d,f),t=r.createImageData(b,c),n=n.data,s=t.data,k=0;k<c;k++)for(var q=0;q<b;q++){for(var w=4*(q+k*b),h=0,v=0,A=0,B=0,C=0,D=0,E=0,F=(k+0.5)*l,x=Math.floor(k*l),G=Math.ceil((k+1)*l);x<G;x++)for(var y=Math.abs(F-(x+0.5))/m,H=(q+0.5)*g,y=y*y,z=Math.floor(q*
g),I=Math.ceil((q+1)*g);z<I;z++)if(h=Math.abs(H-(z+0.5))/p,h=Math.sqrt(y+h*h),!(1<=h)){var h=2*h*h*h-3*h*h+1,u=4*(z+x*d),E=E+h*n[u+3],A=A+h;255>n[u+3]&&(h=h*n[u+3]/250);B+=h*n[u];C+=h*n[u+1];D+=h*n[u+2];v+=h}s[w]=B/v;s[w+1]=C/v;s[w+2]=D/v;s[w+3]=E/A}!0===e?(a.width=b,a.height=c):r.clearRect(0,0,d,f);r.putImageData(t,0,0)}};
function spider_LoadImage(a,b,c){"undefined"===typeof c&&(c=0);var e=spider.image.objects.Allocate(a),d=document.createElement("canvas");e.image=d;spider.image.div.appendChild(d);var f=new Image;$(f).on({load:function(){d.width=f.width;d.height=f.height;d.getContext("2d").drawImage(f,0,0);var a=spider_GetExtensionPart(b).toLowerCase();"jpg"==a||"jpeg"==a?e.originalFormat=1195724874:"png"==a?e.originalFormat=4673104:"bmp"==a&&(e.originalFormat=5262658);spider.event.SendLoading(18,1,b,e.id)},error:function(){spider.event.SendLoading(19,
1,b,e.id)}});c&65536?(a=spider.systembase.getLocalFile(b))?(c=new FileReader,$(c).on({load:function(a){f.src=a.target.result},error:function(){spider.event.SendLoading(19,1,b,e.id)}}),c.readAsDataURL(a)):spider.event.SendLoading(19,1,b,e.id):f.src=b;return e.resultId}
function spider_CopyImage(a,b){var c,e=spider.image.objects.Allocate(b);if(c=spider.image.objects.Get(a)){var d=document.createElement("canvas");d.width=c.image.width;d.height=c.image.height;e.image=d;spider.image.div.appendChild(d);d.getContext("2d").drawImage(c.image,0,0)}return e.resultId}
function spider_CreateImage(a,b,c,e,d){"undefined"===typeof d&&(d=0);a=spider.image.objects.Allocate(a);e=document.createElement("canvas");e.width=b;e.height=c;a.image=e;spider.image.div.appendChild(e);-1!=d&&(e=e.getContext("2d"),e.fillStyle=spider_helper_ColorToHtml(d),e.fillRect(0,0,b,c));return a.resultId}
function spider_GrabImage(a,b,c,e,d,f){b=spider.image.objects.Allocate(b);if(a=spider.image.objects.Get(a)){var g=document.createElement("canvas");g.width=d;g.height=f;b.image=g;spider.image.div.appendChild(g);g.getContext("2d").drawImage(a.image,c,e,d,f,0,0,d,f)}return b.resultId}function spider_ImageOutput(a){return(a=spider.image.objects.Get(a))?(a.image.css=!1,a.image.grayedCss=!1,{image:a,canvas:a.image,context:a.image.getContext("2d"),stopDrawingCallback:null}):0}
function spider_ImageVectorOutput(a,b){"undefined"===typeof b&&(b=1);var c;return(c=spider.image.objects.Get(a))?(c.image.css=!1,c.image.grayedCss=!1,{image:c,canvas:c.image,inputUnit:1,outputUnit:b,stopDrawingCallback:null}):0}function spider_EncodeImage(a,b,c){"undefined"===typeof b&&(b=4673104);"undefined"===typeof c&&(c=7);var e;return(e=spider.image.objects.Get(a))?1195724874==b?e.image.toDataURL("image/jpeg",c/10):e.image.toDataURL("image/png"):""}
function spider_ExportImage(a,b,c){"undefined"===typeof c&&(c=4673104);return(a=spider.image.objects.Get(a))?(a.image.toBlob(function(a){saveAs(a,b)},1195724874==c?"image/jpeg":"image/png"),1):0}function spider_ImageDepth(a){return spider.image.objects.Get(a)?32:0}function spider_ImageFormat(a){var b;return(b=spider.image.objects.Get(a))?b.originalFormat?b.originalFormat:0:0}function spider_ImageWidth(a){var b;return(b=spider.image.objects.Get(a))?b.image.width:0}
function spider_ImageHeight(a){var b;return(b=spider.image.objects.Get(a))?b.image.height:0}
function spider_ResizeImage(a,b,c,e){"undefined"===typeof e&&(e=0);if(a=spider.image.objects.Get(a)){var d=document.createElement("canvas");-65535==b&&(b=a.image.width);-65535==c&&(c=a.image.height);d.width=b;d.height=c;a.image.css=!1;a.image.grayedCss=!1;var f=d.getContext("2d");if(1==e)if(f.webkitImageSmoothingEnabled||f.mozImageSmoothingEnabled||f.imageSmoothingEnabled)f.webkitImageSmoothingEnabled=!1,f.mozImageSmoothingEnabled=!1,f.imageSmoothingEnabled=!1,f.drawImage(a.image,0,0,a.image.width,
a.image.height,0,0,b,c);else{var g=a.image.getContext("2d");e=a.image.width;for(var l=a.image.height,p=g.getImageData(0,0,e,l),g=f.createImageData(b,c),p=p.data,m=g.data,r=e/b,l=l/c,n=0;n<c;n++)for(var t=n*b,s=(n*l|0)*e,k=0;k<b;k++){var q=k*r|0;m[4*(t+k)+0]=p[4*(s+q)+0];m[4*(t+k)+1]=p[4*(s+q)+1];m[4*(t+k)+2]=p[4*(s+q)+2];m[4*(t+k)+3]=p[4*(s+q)+3]}f.putImageData(g,0,0)}else f.drawImage(a.image,0,0,a.image.width,a.image.height,0,0,b,c);spider.image.div.removeChild(a.image);a.image=d;spider.image.div.appendChild(d);
return 1}return 0}function spider_ImageID(a){var b;return(b=spider.image.objects.Get(a))?b.image:null}function spider_IsImage(a){return spider.image.objects.Is(a)};

function spider_Init2DDrawing(){}spider.drawing={output:null,context:null,frontColor:0,backColor:0,mode:0,stopDrawingCallback:null};function spider_helper_ColorToHtml(a){var b=a>>24&255;return 0===b?"rgb("+(a&255)+","+(a>>8&255)+","+(a>>16&255)+")":"rgba("+(a&255)+","+(a>>8&255)+","+(a>>16&255)+","+b/255+")"}
function spider_2ddrawing_getTextHeight(a){a=$("<span>Hg</span>").css("font",a);var b=$('<div style="display: inline-block; width: 1px; height: 0px;"></div>'),d=$("<div></div>");d.append(a,b);$("body").append(d);var f={};try{b.css({verticalAlign:"baseline"}),f.ascent=Math.ceil(b.offset().top-a.offset().top),b.css({verticalAlign:"bottom"}),f.height=Math.ceil(b.offset().top-a.offset().top),f.descent=Math.ceil(f.height-f.ascent)}finally{d.remove()}return f}
function spider_StartDrawing(a){spider.drawing.output=a;spider.drawing.context=a.context;spider.drawing.stopDrawingCallback=a.stopDrawingCallback;spider.drawing.frontColor=0;spider.drawing.backColor=16777215;spider.drawing.mode=0;spider.drawing.context.lineWidth=1;spider.drawing.context.font="12pt arial";return a.context}
function spider_Box(a,b,d,f,c){"undefined"===typeof c&&(c=spider.drawing.frontColor);var e=spider.drawing.context;4==spider.drawing.mode?(e.beginPath(),e.rect(a+0.5,b+0.5,d-0.5,f-0.5),e.strokeStyle=spider_helper_ColorToHtml(c),e.stroke()):(e.fillStyle=spider_helper_ColorToHtml(c),e.fillRect(a,b,d,f))}function spider_DrawAlphaImage(a,b,d,f){"undefined"===typeof f&&(f=255);var c=spider.drawing.context,e=c.globalAlpha;c.globalAlpha=f/255;c.drawImage(a,b,d);c.globalAlpha=e}
function spider_DrawImage(a,b,d,f,c){var e=spider.drawing.context;"undefined"===typeof f?e.drawImage(a,b,d):e.drawImage(a,0,0,a.width,a.height,b,d,f,c)}function spider_Plot(a,b,d){"undefined"===typeof d&&(d=spider.drawing.frontColor);var f=spider.drawing.context;f.fillStyle=spider_helper_ColorToHtml(d);f.fillRect(a,b,1,1)}function spider_Point(a,b){var d=spider.drawing.context.getImageData(a,b,1,1).data;return d[0]|d[1]<<8|d[2]<<16|d[3]<<24}function spider_OutputDepth(){return 32}
function spider_OutputWidth(){return spider.drawing.context.canvas.width}function spider_OutputHeight(){return spider.drawing.context.canvas.height}function spider_Line(a,b,d,f,c){"undefined"===typeof c&&(c=spider.drawing.frontColor);var e=spider.drawing.context;e.beginPath();e.moveTo(a+0.5,b+0.5);e.lineTo(a+0.5+d-1,b+f-1+0.5);e.strokeStyle=spider_helper_ColorToHtml(c);e.stroke()}
function spider_LineXY(a,b,d,f,c){"undefined"===typeof c&&(c=spider.drawing.frontColor);var e=spider.drawing.context;e.beginPath();e.moveTo(a+0.5,b+0.5);e.lineTo(d+0.5,f+0.5);e.strokeStyle=spider_helper_ColorToHtml(c);e.stroke()}
function spider_DrawText(a,b,d,f,c){"undefined"===typeof f&&(f=spider.drawing.frontColor);"undefined"===typeof c&&(c=spider.drawing.backColor);var e=spider.drawing.context,g=Math.ceil(e.measureText(d).width);if(!(spider.drawing.mode&1)){var h=spider_TextHeight(d);e.fillStyle=spider_helper_ColorToHtml(c);e.fillRect(a,b,g,h)}e.fillStyle=spider_helper_ColorToHtml(f);e.fillText(d,a,b+spider_2ddrawing_getTextHeight(spider.drawing.context.font).ascent);return a+g}
function spider_Circle(a,b,d,f){"undefined"===typeof f&&(f=spider.drawing.frontColor);var c=spider.drawing.context;4==spider.drawing.mode?(c.beginPath(),c.arc(a,b,d-1,0,2*Math.PI,!1),c.strokeStyle=spider_helper_ColorToHtml(f),c.stroke()):(c.beginPath(),c.arc(a,b,d,0,2*Math.PI,!1),c.fillStyle=spider_helper_ColorToHtml(f),c.fill())}
function spider_Ellipse(a,b,d,f,c){function e(a,d,f,b,c){var e=b/2*0.5522848,k=c/2*0.5522848,g=d+b,l=f+c;b=d+b/2;c=f+c/2;a.beginPath();a.moveTo(d,c);a.bezierCurveTo(d,c-k,b-e,f,b,f);a.bezierCurveTo(b+e,f,g,c-k,g,c);a.bezierCurveTo(g,c+k,b+e,l,b,l);a.bezierCurveTo(b-e,l,d,c+k,d,c);a.closePath()}"undefined"===typeof c&&(c=spider.drawing.frontColor);var g=spider.drawing.context;4==spider.drawing.mode?(e(g,a-d,b-f,2*d,2*f),g.strokeStyle=spider_helper_ColorToHtml(c),g.stroke()):(e(g,a-d,b-f,2*d,2*f),g.fillStyle=
spider_helper_ColorToHtml(c),g.fill())}function spider_DrawingFont(a){spider.drawing.context.font=a.name}function spider_DrawingMode(a){spider.drawing.mode=a}function spider_StopDrawing(){spider.drawing.stopDrawingCallback&&spider.drawing.stopDrawingCallback(spider.drawing.output)}
function spider_RoundBox(a,b,d,f,c,e,g){function h(a,b,c,d,f,e){"undefined"===typeof e&&(e=5);a.beginPath();a.moveTo(b+e,c);a.lineTo(b+d-e,c);a.quadraticCurveTo(b+d,c,b+d,c+e);a.lineTo(b+d,c+f-e);a.quadraticCurveTo(b+d,c+f,b+d-e,c+f);a.lineTo(b+e,c+f);a.quadraticCurveTo(b,c+f,b,c+f-e);a.lineTo(b,c+e);a.quadraticCurveTo(b,c,b+e,c);a.closePath()}e=spider.drawing.context;4==spider.drawing.mode?(h(e,a+0.5,b+0.5,d,f,c),e.strokeStyle=spider_helper_ColorToHtml(g),e.stroke()):(h(e,a+0.5,b+0.5,d,f,c),e.fillStyle=
spider_helper_ColorToHtml(g),e.fill())}function spider_RGB(a,b,d){return d<<16|b<<8|a}function spider_RGBA(a,b,d,f){return(f<<24|d<<16|b<<8|a)>>>0}function spider_Red(a){return a&255}function spider_Green(a){return a>>8&255}function spider_Blue(a){return a>>16&255}function spider_Alpha(a){return a>>24&255}function spider_BackColor(a){return spider.drawing.backColor=a}function spider_FrontColor(a){return spider.drawing.frontColor=a}
function spider_TextHeight(a){a=spider_2ddrawing_getTextHeight(spider.drawing.context.font);return a.ascent+a.descent}function spider_TextWidth(a){return Math.ceil(spider.drawing.context.measureText(a).width)};

if("undefined"==typeof Spider)var Spider={};if("undefined"==typeof $)var $={};function spider_InitArray(){}function spider_ArraySize(a,b){"undefined"===typeof b&&(b=1);return a.array?a.dimensions[b-1]:-1}function spider_FreeArray(a){for(var b=a.array.length=0;b<a.nbDimensions;b++)a.dimensions[b]=-1}function spider_CopyArray(a,b){$.extend(!0,b,a)}
function spider_CreateMultiArray(a,b){var c=null;try{b++;var c=Array(b||0),d=b;if(2<arguments.length){var e=Array.prototype.slice.call(arguments,0);for(e.splice(1,1);d--;)c[b-1-d]=spider_CreateMultiArray.apply(this,e)}else for(d=0;d<b;d++)c[d]=8==a.type?"":a.structure?new a.structure:0}catch(f){}return c}
function spider_Dim(a,b,c,d){a.structure=d;a.nbDimensions=c.length;a.dimensions=c;a.type=b;b=Array(a.nbDimensions+1);b[0]=a;for(d=0;d<a.nbDimensions;d++)b[d+1]=c[d];a.array=spider_CreateMultiArray.apply(this,b)}function spider_ReDim(a,b){var c;if(1==a.nbDimensions){a.array.length=b+1;if(b>a.dimensions[0])for(c=a.dimensions[0]+1;c<=b;c++)a.array[c]=8==a.type?"":a.structure?new a.structure:0;a.dimensions[0]=b}else a.dimensions[a.nbDimensions-1]=b;return a.array};

spider.desktop={mouseX:-1,mouseY:-1};function spider_DesktopWidth(a){return $(window).width()}function spider_DesktopHeight(a){return $(window).height()}function spider_DesktopFrequency(a){return 0}function spider_InitDesktop(){$(document).on({mouseout:function(a){spider.desktop.mouseX=-1;spider.desktop.mouseY=-1},mouseenter:function(a){spider.desktop.mouseX=a.clientX;spider.desktop.mouseY=a.clientY},mousemove:function(a){spider.desktop.mouseX=a.clientX;spider.desktop.mouseY=a.clientY}})}
function spider_DesktopMouseX(){return spider.desktop.mouseX}function spider_DesktopMouseY(){return spider.desktop.mouseY}function spider_DesktopX(a){return 0}function spider_DesktopY(a){return 0}function spider_ExamineDesktops(){return 1}function spider_DesktopDepth(a){return screen.colorDepth}function spider_DesktopName(a){return navigator.userAgent};

function spider_InitMap(){}function spider_NewMap(a,b){var c=new spider_SysMap;c.type=a;c.isNative=b;return c}function spider_GetMapElement(a,b){return a.map.hasOwnProperty(b)?a.map[b]:0}function spider_CreateMapElement(a,b){return a.map.hasOwnProperty(b)?a.map[b]:(a.current=new a.type,a.currentKey=b,a.map[b]=a.current)}function spider_AddMapElement(a,b){a.current=new a.type;a.currentKey=b;return a.map[b]=a.current}
function spider_ResetMap(a){a.keys=Object.keys(a.map);a.currentIndex=-1;a.currentKey=null}function spider_NextMapElement(a){a.currentIndex<a.keys.length-1?(a.currentIndex++,a.currentKey=a.keys[a.currentIndex],a.current=a.map[a.currentKey]):(a.currentIndex=-1,a.current=null,a.currentKey=null);return a.current}function spider_MapKey(a){return a.currentKey?a.currentKey:""}function spider_MapSize(a){return Object.keys(a.map).length}
function spider_DeleteMapElement(a,b){"undefined"===typeof b?a.currentKey&&delete a.map[a.currentKey]:a.map.hasOwnProperty(b)&&delete a.map[b]}function spider_FindMapElement(a,b){return a.map.hasOwnProperty(b)?(a.current=a.map[b],a.currentKey=b,a.current):0}function spider_CopyMap(a,b){var c=Object.keys(a.map);b.map={};for(var d=0;d<c.length;d++){var e=c[d],f=new a.type;a.map[e].copy(f);b.map[e]=f}b.currentIndex=-1;b.current=null;b.currentKey=null}function spider_ClearMap(a){a.map={}}
function spider_FreeMap(a){spider_ClearMap(a)}function spider_PushMapPosition(a){a.stack||(a.stack=[]);a.stack.push(a.currentIndex)}function spider_PopMapPosition(a){a.stack&&0<a.stack.length&&(a.currentIndex=a.stack.pop(),a.keys=Object.keys(a.map))};

if("undefined"===typeof spider)var spider={};function spider_Event_Init(){window.addEventListener("resize",function(){spider.event.Send(21)})}
spider.event={map:{},eventWindow:0,eventObject:0,eventType:0,eventData:0,MakeKey:function(a,c,b,d){return a.toString()+"_"+c.toString()+"_"+b.toString()+"_"+d.toString()},SendGeneric:function(a,c,b,d){a=spider.event.MakeKey(a,c,b,d);if(a=spider.event.map[a])for(var e in a)a[e]()},SendLoading:function(a,c,b,d){a=spider.event.MakeKey(a,-1,-1,-1);if(a=spider.event.map[a])for(var e in a)a[e](c,b,d)},Send:function(a,c,b,d){"undefined"===typeof c&&(c=0);"undefined"===typeof b&&(b=0);"undefined"===typeof d&&
(d=0);this.eventWindow=c;this.eventObject=b;this.eventType=d;this.SendGeneric(a,c,b,d);this.SendGeneric(a,c,b,-1);this.SendGeneric(a,c,-1,-1);this.SendGeneric(a,-1,-1,-1)}};function spider_BindEvent(a,c,b,d,e){"undefined"===typeof b&&(b=-1);"undefined"===typeof d&&(d=-1);"undefined"===typeof e&&(e=-1);a=spider.event.MakeKey(a,b,d,e);spider.event.map[a]||(spider.event.map[a]={});spider.event.map[a][c]=c}
function spider_UnbindEvent(a,c,b,d,e){"undefined"===typeof b&&(b=-1);"undefined"===typeof d&&(d=-1);"undefined"===typeof e&&(e=-1);a=spider.event.MakeKey(a,b,d,e);if(a=spider.event.map[a])for(var f in a)f==c&&delete a[c]}function spider_PostEvent(a,c,b,d,e){"undefined"===typeof c&&(c=-2);"undefined"===typeof b&&(b=-2);"undefined"===typeof d&&(d=-2);"undefined"===typeof e&&(e=0);spider.event.eventData=e;spider.event.Send(a,c,b,d)}function spider_EventWindow(){return spider.event.eventWindow}
function spider_EventMenu(){return spider.event.eventObject}function spider_EventGadget(){return spider.event.eventObject}function spider_EventTimer(){return spider.event.eventObject}function spider_EventType(){return spider.event.eventType}function spider_EventData(){return spider.event.eventData};

function spider_FreeSprite(a){var c;if(-1==a)spider.sprite.objects.CleanAll();else if(c=spider.sprite.objects.Get(a))c.texture&&c.texture.destroy(),spider.sprite.objects.Remove(a)}
spider.sprite={objects:new spider.object(spider_FreeSprite),cache:{},nbDisplayedSprite:0,scaleMode:0,NewFrame:function(){for(var a=0;a<this.nbDisplayedSprite;a++)this.cache[a].visible=!1;this.nbDisplayedSprite=0},Reset:function(){this.cache={};this.nbDisplayedSprite=0;spider_FreeSprite(-1);for(var a=spider.screen.stage.children.length-1;0<=a;a--)spider.screen.stage.removeChild(spider.screen.stage.children[a])}};function spider_InitSprite(){spider_SpriteQuality(0);return 1}
function spider_sprite_GetTexturePixels(a,c,d){var e=spider.screen.renderer.gl,b=a.texture.baseTexture;spider.screen.renderer.updateTexture(b);a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,b._glTextures[0],0);b=new Uint8Array(c*d*4);e.readPixels(0,0,c,d,e.RGBA,e.UNSIGNED_BYTE,b);e.deleteFramebuffer(a);return b}
function spider_sprite_UpdateCollisionMask(a){if(a.flags&4){var c=spider_sprite_GetTexturePixels(a,a.width,a.height);if(c){var d=new Uint8Array(a.width*a.height);a.pixelCollisionMask=d;for(var e=0;e<a.height;e++)for(var b=e*a.width,g=0;g<a.width;g++)d[b+g]=255==c[4*(b+g)+3]?1:0}}}function spider_sprite_InitializeSprite(a){var c=a.texture.baseTexture.height;a.width=a.texture.baseTexture.width;a.height=c;a.rotation=0;spider_sprite_UpdateCollisionMask(a)}
function spider_CreateSprite(a,c,d,e){"undefined"===typeof e&&(e=0);a=spider.sprite.objects.Allocate(a);a.flags=e;a.clip=!1;a.clipFrame={x:0,y:0,width:0,height:0};var b=document.createElement("canvas");b.width=c;b.height=d;0===(e&8)&&(e=b.getContext("2d"),e.fillStyle="#000000",e.fillRect(0,0,c,d));a.texture=PIXI.Texture.fromCanvas(b);spider_sprite_InitializeSprite(a);return a.resultId}
function spider_CopySprite(a,c,d){"undefined"===typeof d&&(d=0);if(a=spider.sprite.objects.Get(a)){c=spider.sprite.objects.Allocate(c);a.flags=d;a.clip=!1;a.clipFrame={x:0,y:0,width:0,height:0};var e=document.createElement("canvas");e.width=a.width;e.height=a.height;var b=e.getContext("2d");0===(d&8)&&(b.fillStyle="#000000",b.fillRect(0,0,e.width,e.height));b.drawImage(a.texture.baseTexture.source,0,0);c.texture=PIXI.Texture.fromCanvas(e);spider_sprite_InitializeSprite(c);return c.resultId}return 0}
function spider_LoadSprite(a,c,d){"undefined"===typeof d&&(d=0);var e=spider.sprite.objects.Allocate(a);e.flags=d;e.clip=!1;e.clipFrame={x:0,y:0,width:0,height:0};e.texture=null;(new PIXI.loaders.Loader).add(c).load(function(a,d){d[c].error?spider.event.SendLoading(19,3,c,e.id):(e.texture=d[c].texture,spider_sprite_InitializeSprite(e),spider.event.SendLoading(18,3,c,e.id))});return e.resultId}
function spider_sprite_GenericDisplaySprite(a,c,d){var e=spider.sprite.nbDisplayedSprite,b;(b=spider.sprite.cache[e])||(b=new PIXI.Sprite(a.texture),spider.sprite.cache[e]=b,b.anchor.x=0,b.anchor.y=0,spider.screen.stage.addChild(b));a.clippedRectangle?(b.clippedBaseTexture!=a.texture.baseTexture&&(b.texture=new PIXI.Texture(a.texture.baseTexture),b.clippedBaseTexture=a.texture.baseTexture),b.texture.frame=a.clippedRectangle):(b.clippedBaseTexture=null,b.texture=a.texture);b.tint=a.color;b.width=a.width;
b.height=a.height;b.visible=!0;b.mask=null;b.alpha=a.alpha;b.texture.baseTexture.scaleMode=spider.sprite.scaleMode;a.rotation?(b.rotation=a.rotation*Math.PI/180,b.pivot.x=b.texture.width/2,b.pivot.y=b.texture.height/2,b.position.x=c+b.width/2,b.position.y=d+b.height/2):(b.rotation=0,b.pivot.x=0,b.pivot.y=0,b.position.x=c,b.position.y=d);spider.sprite.nbDisplayedSprite++}
function spider_ClipSprite(a,c,d,e,b){if(a=spider.sprite.objects.Get(a)){var g=a.texture.width,f=a.texture.height;-1==c&&(c=0);-1==d&&(d=0);-1==e&&(e=g);-1==b&&(b=f);0===c&&0===d&&e==g&&b==f?a.clippedRectangle=null:(c>g&&(c=g),d>f&&(d=f),c+e>g&&(e=g-c),d+b>f&&(b=f-d),a.clippedRectangle=new PIXI.Rectangle(c,d,e,b));a.clipX=c;a.clipY=d;a.width=e;a.height=b}}function spider_DisplaySprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.alpha=1,a.color=-1,spider_sprite_GenericDisplaySprite(a,c,d)}
function spider_DisplayTransparentSprite(a,c,d,e,b){"undefined"===typeof e&&(e=255);"undefined"===typeof b&&(b=16777215);if(a=spider.sprite.objects.Get(a))a.alpha=e/255,a.color=b>>16&255|b<<16&16711680|b&65280,spider_sprite_GenericDisplaySprite(a,c,d)}function spider_RotateSprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.rotation=1==d?a.rotation+c:c}function spider_ZoomSprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.width=-1==c?a.texture.width:c,a.height=-1==d?a.texture.height:d}
function spider_SpriteDepth(a){return spider.sprite.objects.Get(a)?32:0}function spider_SpriteWidth(a){var c;return(c=spider.sprite.objects.Get(a))?c.width:0}function spider_SpriteHeight(a){var c;return(c=spider.sprite.objects.Get(a))?c.height:0}
function spider_SpriteOutput(a){var c,d;return(c=spider.sprite.objects.Get(a))?(a=c.texture.baseTexture.source,a instanceof HTMLCanvasElement?(d=a,a=d.getContext("2d")):(d=document.createElement("canvas"),d.width=c.width,d.height=c.height,a=d.getContext("2d"),a.drawImage(c.texture.baseTexture.source,0,0)),{sprite:c,canvas:d,context:a,stopDrawingCallback:function(){c.texture=PIXI.Texture.fromCanvas(d);spider.screen.renderer.updateTexture(c.texture);spider_sprite_UpdateCollisionMask(c)}}):null}
function spider_SpriteCollision(a,c,d,e,b,g){var f,h;return(f=spider.sprite.objects.Get(a))&&(h=spider.sprite.objects.Get(e))&&b<c+f.width&&b+h.width>c&&g+h.height>d&&g<d+f.height?1:0}
function spider_SpritePixelCollision(a,c,d,e,b,g){var f,h,k,l,p,q,r,s,m,n;if((f=spider.sprite.objects.Get(a))&&(h=spider.sprite.objects.Get(e))&&0!==(f.flags&4)&&0!==(h.flags&4)&&b<c+f.width&&b+h.width>c&&g+h.height>d&&g<d+f.height)if(c<b?(c=b-c,e=0,a=f.width-c,a>h.width&&(a=h.width)):(e=c-b,c=0,a=h.width-e,a>f.width&&(a=f.width)),d<g?(k=g-d,l=0,b=f.height-k,b>h.height&&(b=h.height)):(l=d-g,k=0,b=h.height-l,b>f.height&&(b=f.height)),f.clippedRectangle&&(c+=f.clipX,k+=f.clipY),h.clippedRectangle&&
(e+=h.clipX,l+=h.clipY),f.height!=f.texture.baseTexture.height||f.width!=f.texture.baseTexture.width||h.height!=h.texture.baseTexture.height||h.width!=h.texture.baseTexture.width)for(p=f.width/f.width,q=f.height/f.height,r=h.width/h.width,s=h.height/h.height,g=0;g<b;g++)for(m=((g+k)*q|0)*f.width,n=((g+l)*s|0)*h.width,d=0;d<a;d++){if(f.pixelCollisionMask[m+((d+c)*p|0)]&&h.pixelCollisionMask[n+((d+e)*r|0)])return 1}else for(g=0;g<b;g++)for(m=(g+k)*f.width,n=(g+l)*h.width,d=0;d<a;d++)if(f.pixelCollisionMask[m+
(d+c)]&&h.pixelCollisionMask[n+(d+e)])return 1;return 0}function spider_SpriteQuality(a){spider.sprite.scaleMode=1==a?PIXI.SCALE_MODES.LINEAR:PIXI.SCALE_MODES.NEAREST}function spider_IsSprite(a){return spider.sprite.objects.Is(a)};

spider.nbModules++;require(["pixi.min"],function(){spider.nbLoadedModules++;SpiderMain()});spider.screen={stage:null,renderer:null,view:null,window:null,width:0,height:0,isActive:0,frameDurationMS:1E3/60,lastFrameDate:Date.now()};
function spider_CloseScreen(){spider.screen.isOpened&&(spider.screen.window?(spider.screen.div.removeChild(spider.screen.renderer.view),spider.screen.window.content.removeChild(spider.screen.div)):document.body.removeChild(spider.screen.renderer.view),spider.sprite.Reset(),spider.screen.isOpened=!1)}
function spider_screen_OpenScreenGeneric(a,b,d){spider_CloseScreen();spider.screen.renderer?spider.screen.renderer.resize(a,b):(PIXI.utils._saidHello=!0,spider.screen.stage=new PIXI.Container,spider.screen.renderer=PIXI.autoDetectRenderer(a,b));return spider.screen.renderer?(spider.screen.view=spider.screen.renderer.view,spider.screen.view.setAttribute("tabIndex",1),$(spider.screen.view).on({focus:function(){spider.screen.isActive=1},blur:function(){spider.screen.isActive=0},mousedown:function(a){switch(a.button){case 0:case 1:spider.screen.view.focus()}},
touchstart:function(a){spider.screen.view.focus()}}),spider.screen.width=a,spider.screen.height=b,spider.screen.isOpened=!0,1):0}function spider_OpenScreen(a,b,d,c,e,g){"undefined"===typeof e&&(e=0);return spider_screen_OpenScreenGeneric(a,b,e)?(document.body.appendChild(spider.screen.renderer.view),spider.screen.window=null,spider.screen.view.focus(),1):0}
function spider_OpenWindowedScreen(a,b,d,c,e,g,h,k,f){"undefined"===typeof f&&(f=0);return spider_screen_OpenScreenGeneric(c,e,f)?(c=document.createElement("div"),c.appendChild(spider.screen.renderer.view),c.style.position="absolute",c.style.left=b+"px",c.style.top=d+"px",a.content.appendChild(c),spider.screen.window=a,spider.screen.div=c,a.closeScreen=spider_CloseScreen,spider.screen.view.focus(),1):0}
function spider_ResizeScreen(a,b){spider.screen.renderer&&(spider.screen.renderer.resize(a,b),spider.screen.width=a,spider.screen.height=b)}function spider_ClearScreen(a){spider.screen.renderer.backgroundColor=a>>16&255|a&65280|a<<16&16711680}
function spider_FlipBuffers(){function a(){var b=Date.now(),d=spider.screen.frameDurationMS|0,c=b-spider.screen.lastFrameDate;c>=d||16==d?(spider.screen.lastFrameDate=b-c%d,b=spider.screen.stage,spider.sprite.NewFrame(),spider.event.Send(17,0,0,0),spider.screen.renderer.render(b)):requestAnimationFrame(a)}requestAnimationFrame(a)}function spider_ScreenWidth(){return spider.screen.width}function spider_ScreenHeight(){return spider.screen.height}
function spider_ScreenDepth(){return spider.screen.depth}function spider_SetFrameRate(a){spider.screen.frameDurationMS=1E3/a}function spider_IsScreenActive(){return spider.screen.isActive};

if("undefined"===typeof spider)var spider={};spider.mouse={initialized:!1,x:0,y:0,deltaX:0,deltaY:0,wheel:0,leftButton:!1,rightButton:!1,middleButton:!1,locked:!1,pointerLockChange:function(){spider.mouse.locked=document.pointerLockElement===spider.screen.view||document.mozPointerLockElement===spider.screen.view||document.webkitPointerLockElement===spider.screen.view?!0:!1}};function spider_InitMouse(b){"undefined"===typeof b&&(b=0);spider.mouse.lockMode=b;return!0}
function spider_ExamineMouse(){var b=spider.screen.view,a=spider.mouse;a.initialized||($(b).on({mousemove:function(c){var d=c.originalEvent,e=d.movementX||d.mozMovementX||d.webkitMovementX||0,d=d.movementY||d.mozMovementY||d.webkitMovementY||0;a.deltaX+=e;a.deltaY+=d;var f=b.getBoundingClientRect();a.locked?(e=a.x+e,c=a.y+d):(e=c.clientX-f.left,c=c.clientY-f.top);0>e?e=0:e>=spider.screen.width&&(e=spider.screen.width-1);0>c?c=0:c>=spider.screen.height&&(c=spider.screen.height-1);a.x=e;a.y=c},mousedown:function(b){switch(b.button){case 0:a.leftButton=
!0;break;case 1:a.middleButton=!0;break;case 2:a.rightButton=!0}},mouseup:function(c){switch(c.button){case 0:0!==a.lockMode||a.locked||(b.requestPointerLock=b.requestPointerLock||b.mozRequestPointerLock||b.webkitRequestPointerLock,b.requestPointerLock());a.leftButton=!1;break;case 1:a.middleButton=!1;break;case 2:a.rightButton=!1}},mouseleave:function(b){a.leftButton=!1;a.middleButton=!1;a.rightButton=!1},wheel:function(b){a.wheel=0<b.originalEvent.deltaY?a.wheel+1:a.wheel-1}}),$(document).on({pointerlockchange:a.pointerLockChange,
mozpointerlockchange:a.pointerLockChange,webkitpointerlockchange:a.pointerLockChange}),a.initialized=!0);return!0}function spider_MouseX(){return spider.mouse.x|0}function spider_MouseY(){return spider.mouse.y|0}function spider_MouseDeltaX(){var b=spider.mouse.deltaX;spider.mouse.deltaX=0;return b|0}function spider_MouseDeltaY(){var b=spider.mouse.deltaY;spider.mouse.deltaY=0;return b|0}
function spider_MouseButton(b){switch(b){case 1:return spider.mouse.leftButton;case 2:return spider.mouse.rightButton;case 3:return spider.mouse.middleButton}return 0}function spider_MouseWheel(){var b=spider.mouse.wheel;spider.mouse.wheel=0;return b}function spider_MouseLocate(b,a){spider.mouse.x=b;spider.mouse.y=a}
function spider_ReleaseMouse(b){spider.mouse.locked&&b&&(document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,document.exitPointerLock())};

if("undefined"===typeof spider)var spider={};spider.keyboard={initialized:!1,lastChar:"",keys:{},keysReleased:{}};function spider_InitKeyboard(){return!0}
function spider_ExamineKeyboard(){spider.keyboard.initialized||($(document).on({keydown:function(a){spider.screen.isActive&&(spider.keyboard.keys[a.keyCode]=!0,116!=a.keyCode&&a.preventDefault())},keyup:function(a){spider.screen.isActive&&(a=a.keyCode,spider.keyboard.keys[a]=!1,spider.keyboard.keysReleased[a]=2,47<a&&58>a||32==a||64<a&&91>a||95<a&&112>a||185<a&&193>a||218<a&&223>a)&&(spider.keyboard.lastChar=String.fromCharCode(a))}}),spider.keyboard.initialized=!0);for(var b=Object.keys(spider.keyboard.keysReleased),
c=0;c<b.length;c++){var d=b[c];0<spider.keyboard.keysReleased[d]&&spider.keyboard.keysReleased[d]--}return spider.screen.isActive}function spider_KeyboardPushed(b){if(-1===b){for(var c in spider.keyboard.keys)if(!0===spider.keyboard.keys[c])return 1;return 0}return!0===spider.keyboard.keys[b]?1:0}
function spider_KeyboardReleased(b){var c=0;if(-1===b)for(var d in spider.keyboard.keysReleased)spider.keyboard.keysReleased[d]&&(spider.keyboard.keysReleased[d]=!1,c=1);else spider.keyboard.keysReleased[b]&&(spider.keyboard.keysReleased[b]=!1,c=1);return c}function spider_KeyboardMode(b){}function spider_KeyboardInkey(){var b=spider.keyboard.lastChar;spider.keyboard.lastChar="";return b};

function spider_InitList(){}function spider_NewList(a,b,c){var d=new spider_SysList;d.type=a;d.field=b;d.isNative=c;return d}
function spider_AddElement(a){var b=new a.type;a.nbElements++;if(a.current){b.previous=a.current;if(b.next=a.current.next)a.current.next.previous=b;a.current.next=b;a.current=b;a.index++}else a.first&&(a.first.previous=b),a.current=b,b.next=a.first,b.previous=0,a.index=0,a.isIndexInvalid=!1;a.current.previous||(a.first=a.current);a.current.next||(a.last=a.current);return b}
function spider_InsertElement(a){var b=new a.type;a.nbElements++;if(a.current){b.next=a.current;if(b.previous=a.current.previous)a.current.previous.next=b;a.current.previous=b;a.current=b}else a.first&&(a.first.previous=b),a.current=b,a.current.next=a.first,a.current.previous=0,a.index=0,a.isIndexInvalid=!1;a.current.previous||(a.first=a.current);a.current.next||(a.last=a.current);return b}
function spider_ListIndex(a){if(a.isIndexInvalid){var b=-1,c=a.current;if(c){for(;c;)b++,c=c.previous;a.index=b;a.isIndexInvalid=!1}return b}return a.index}function spider_LastElement(a){a.current=a.last;return a.current?(a.isIndexInvalid=!1,a.index=a.nbElements-1,a.current):0}
function spider_MergeLists(a,b,c){"undefined"===typeof c&&(c=2);if(a.first){3!=c||b.current&&b.current!=b.first?4!=c||b.current&&b.current!=b.last||(c=2):c=1;if(b.first)switch(c){case 3:a.first.previous=b.current.previous;b.current.previous.next=a.first;b.current.previous=a.last;a.last.next=b.current;b.isIndexInvalid=!0;break;case 4:b.current.next.previous=a.last;a.last.next=b.current.next;a.first.previous=b.current;b.current.next=a.first;break;case 1:a.last.next=b.first;b.first.previous=a.last;b.first=
a.first;b.isIndexInvalid=!0;break;default:a.first.previous=b.last,b.last.next=a.first,b.last=a.last}else b.first=a.first,b.last=a.last;b.nbElements+=a.nbElements;a.current=0;a.first=0;a.last=0;a.nbElements=0;a.isIndexInvalid=!0}}
function spider_MoveElement(a,b,c){function d(a){a.current.previous&&(a.current.previous.next=a.current.next);a.current.next&&(a.current.next.previous=a.current.previous);a.current==a.first&&(a.first=a.current.next);a.current==a.last&&(a.last=a.current.previous)}var e;if(e=a.current)switch(b){case 1:e!=a.first&&(d(a),e.previous=0,e.next=a.first,a.first.previous=e,a.first=e,a.index=0,a.isIndexInvalid=0);break;case 2:e!=a.last&&(d(a),e.previous=a.last,e.next=0,a.last.next=e,a.last=e,a.index=a.nbElements-
1,a.isIndexInvalid=0);break;case 3:c&&e!=c&&(d(a),e.next=c,e.previous=c.previous,c.previous=e,e.previous&&(e.previous.next=e),c==a.first&&(a.first=e),a.isIndexInvalid=1);break;case 4:c&&e!=c&&(d(a),e.previous=c,e.next=c.next,c.next=e,e.next&&(e.next.previous=e),c==a.last&&(a.last=e),a.isIndexInvalid=1)}}function spider_NextElement(a){var b;if(a.current){if(b=a.current.next)a.current=b,a.index++}else b=a.first,a.current=b,a.index=0;return b}
function spider_PushListPosition(a){a.stack||(a.stack=[]);a.stack.push(a.current)}function spider_PopListPosition(a){a.stack&&0<a.stack.length&&(a.isIndexInvalid=!0,a.current=a.stack.pop())}function spider_PreviousElement(a){var b;a.current&&(b=a.current.previous)&&(a.current=b,a.index--);return b}function spider_ResetList(a){a.isIndexInvalid=!0;a.current=0}function spider_ListSize(a){return a.nbElements}function spider_ChangeCurrentElement(a,b){a.isIndexInvalid=!0;a.current=b}
function spider_CopyList(a,b){spider_ClearList(b);var c,d;for(c=a.first;c;)d=spider_AddElement(b),c.copy(d),c=c.next}function spider_ClearList(a){a.current=0;a.first=0;a.last=0;a.nbElements=0;a.isIndexInvalid=!0}
function spider_DeleteElement(a,b){"undefined"===typeof b&&(b=0);if(a.current){a.nbElements--;var c=a.current.previous,d=a.current.next;c||d?c?(d?(c.next=d,d.previous=c,a.current=c):(c.next=0,a.current=c,a.last=c),a.index--):(d.previous=0,a.current=0,a.first=d,b&1?(a.current=d,a.index=0,a.isIndexInvalid=!1):(a.current=0,a.isIndexInvalid=!0)):(a.current=0,a.first=0,a.last=0,a.isIndexInvalid=!0)}}function spider_FreeList(a){a&&spider_ClearList(a)}
function spider_FirstElement(a){a.current=a.first;return a.current?(a.isIndexInvalid=!1,a.index=0,a.current):0}
function spider_SelectElement(a,b){var c,d;d=a.index;a.index=b;if(0>b||b>=a.nbElements)c=0;else if(a.isIndexInvalid)if(b<a.nbElements/2)for(c=a.first;c&&0<b;)c=c.next,b--;else for(c=a.last,b=a.nbElements-1-b;c&&0<b;)c=c.previous,b--;else if(b>d)if(c=a.current,b-d<a.nbElements-b)for(b-=d;c&&0<b;)c=c.next,b--;else for(c=a.last,b=a.nbElements-1-b;c&&0<b;)c=c.previous,b--;else if(d-b<b)for(c=a.current,b=d-b;c&&0<b;)c=c.previous,b--;else for(c=a.first;c&&0<b;)c=c.next,b--;if(a.current=c)return a.isIndexInvalid=
!1,c;a.isIndexInvalid=!0;return 0}function spider_SplitList(a,b,c){var d,e=0;spider_ClearList(b);if(a.current){c?c=a.current.next:(c=a.current,a.current.previous?(a.current=a.current.previous,a.index--):(a.current=0,a.isIndexInvalid=1));if(c)for(d=a.last,c.previous&&(c.previous.next=0),a.first==c&&(a.first=0),a.last=c.previous,b.first=c,b.last=d,c.previous=0,d.next=0;c;)e++,c=c.next;a.nbElements-=e;b.nbElements=e}}
function spider_SwapElements(a,b,c){var d,e;b!=c&&(a.isIndexInvalid=1,d=c.next,e=c.previous,b.next==c?(c.next=b,c.previous=b.previous,b.next=d,b.previous=c,c.previous?c.previous.next=c:a.first=c,b.next?b.next.previous=b:a.last=b):b.previous==c?(c.next=b.next,c.previous=b,b.next=c,b.previous=e,c.next?c.next.previous=c:a.last=c,b.previous?b.previous.next=b:a.first=b):(b.next?b.next.previous=c:a.last=c,c.next=b.next,b.previous?b.previous.next=c:a.first=c,c.previous=b.previous,d?d.previous=b:a.last=b,
b.next=d,e?e.next=b:a.first=b,b.previous=e))};

spider.nbModules++;require(["seedrandom.min"],function(a){spider.nbLoadedModules++;SpiderMain()});function spider_Abs(a){return Math.abs(a)}function spider_ACos(a){return Math.acos(a)}function spider_ACosH(a){return Math.log(a+Math.sqrt(a*a-1))}function spider_ASin(a){return Math.asin(a)}function spider_ASinH(a){return Math.log(a+Math.sqrt(a*a+1))}function spider_ATan(a){return Math.atan(a)}function spider_ATan2(a,b){return Math.atan2(b,a)}
function spider_ATanH(a){return 0.5*Math.log((1+a)/(1-a))}function spider_CosH(a){return(Math.exp(a)+Math.exp(-a))/2}function spider_Degree(a){return 180/Math.PI*a}function spider_Radian(a){return Math.PI/180*a}function spider_Log(a){return Math.log(a)}function spider_Log10(a){return Math.log(a)/2.302585092994046}function spider_Exp(a){return Math.exp(a)}function spider_Mod(a,b){return a%b}function spider_Infinity(){return Number.POSITIVE_INFINITY}function spider_NaN(){return NaN}
function spider_IsInfinity(a){return a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY?1:0}function spider_Sqr(a){return Math.sqrt(a)}function spider_Cos(a){return Math.cos(a)}function spider_Round(a,b){switch(b){case 1:return Math.ceil(a);case 2:return 0<a?Math.floor(a+0.5):Math.ceil(a-0.5);default:return Math.floor(a)}}function spider_Sign(a){return a?0>a?-1:1:0}function spider_Sin(a){return Math.sin(a)}function spider_SinH(a){return(Math.exp(a)-Math.exp(-a))/2}
function spider_Tan(a){return Math.tan(a)}function spider_TanH(a){return(Math.exp(a)-Math.exp(-a))/(Math.exp(a)+Math.exp(-a))}function spider_Pow(a,b){return Math.pow(a,b)}function spider_Int(a){return a|0}function spider_IntQ(a){return 0<=a?Math.floor(a):Math.ceil(a)}function spider_IsNAN(a){return isNaN(a)?1:0}function spider_Random(a,b){"undefined"===typeof b&&(b=0);return b+Math.floor(Math.random()*(a-b+1))}function spider_RandomSeed(a){Math.seedrandom(a)};

if("undefined"==typeof Spider)var Spider={};spider.system={batteryEventRegistered:0,batteryLevel:-1,defaultBrightness:0.5};function spider_InitSystem(){window.cordova&&cordova.plugins.brightness.getBrightness(function(a){spider.system.defaultBrightness=a;console.log("night: "+a)})}function spider_ElapsedMilliseconds(){return(new Date).getTime()}function spider_CountProgramParameters(){var a=location.search.substring(1);return 0<a.length?spider_CountString(a,"&")+1:0}
function spider_ProgramParameter(a){var d=location.search.substring(1);return 0<=a&&a<spider_CountProgramParameters()?decodeURI(spider_StringField(d,a+1,"&")):""}function spider_BatteryLevel(){window.cordova&&!spider.system.batteryEventRegistered&&(spider.system.batteryEventRegistered=1,window.addEventListener("batterystatus",function(a){spider.system.batteryLevel=a.isPlugged?-2:a.level},!1));return spider.system.batteryLevel}
function spider_DeviceInfo(a){if(window.cordova)switch(a){case 0:return device.model;case 1:return device.platform;case 2:return device.uuid;case 3:return device.version;case 4:return device.manufacturer;case 5:return device.serial}return""}function spider_VibrateDevice(a){window.cordova&&navigator.vibrate(a)}function spider_DeviceBrightness(a){window.cordova&&(-1===a?cordova.plugins.brightness.setBrightness(spider.system.defaultBrightness):cordova.plugins.brightness.setBrightness(a/100))}
function spider_DeviceAlwaysOn(a){window.cordova&&cordova.plugins.brightness.setKeepScreenOn(0!==a)}function spider_LoadScript(a,d,b){"undefined"==typeof b&&(b=0);var c="text";0===b&&(c="script");$.ajax({url:a,dataType:c}).done(function(c,f,e){1==b&&$("<style></style>").appendTo("head").html(c);d(a,1)}).fail(function(b,c,e){d(a,0)})};

function f_start() {
spider_ClearScreen(0);
spider_BindEvent(17,f_runworld);
f_reset();
spider_FlipBuffers();
return 0;
}
function f_loadingerror(v_type,v_filename$) {
return 0;
}
function f_newcell(v_mass) {
var v_x=0;
var v_y=0;
var v_nx=0;
var v_ny=0;
var v_dx=0;
var v_dy=0;
var v_dist=0;
;;;;;;
v_dx=(p_player._x-p_player._vx);
v_dy=(p_player._y-p_player._vy);
v_dist=spider_Sqr(((v_dx*v_dx)+(v_dy*v_dy)));
v_nx=((v_dx/v_dist));
v_ny=((v_dy/v_dist));
v_x=(p_player._x-((v_nx*p_player._r)));
v_y=(p_player._y-((v_ny*p_player._r)));
spider_AddElement(t_bodies);
t_bodies.current._x=v_x;
t_bodies.current._y=v_y;
t_bodies.current._vx=(v_x+v_dx);
t_bodies.current._vy=(v_y+v_dy);
t_bodies.current._mass=v_mass;
t_bodies.current._r=spider_Sqr(((v_mass/3.141593)));
t_bodies.current._sprite=a_sp.array[1];
return 0;
};function f_reset() {
var v_a=0;
var v_r=0;
var v_s=0;
var v_vx=0;
var v_vy=0;
spider_ClearList(t_bodies);
v_a=1;
for (;100>=v_a;v_a+=1) {
spider_AddElement(t_bodies);
if (v_a==1) {
v_r=18;
p_player=t_bodies.current;
} else {
v_r=spider_Random(20,3);
}
v_vx=(((spider_Random(2)+-1))*0.5);
v_vy=(((spider_Random(2)+-1))*0.5);
t_bodies.current._x=spider_Random((v_right-v_r),v_r);
t_bodies.current._y=spider_Random((v_bottom-v_r),v_r);
t_bodies.current._vx=(t_bodies.current._x+v_vx);
t_bodies.current._vy=(t_bodies.current._y+v_vy);
t_bodies.current._r=v_r;
t_bodies.current._mass=((3.1415926535897931*v_r)*v_r);
v_s=spider_Random(1,0);
if (v_a==1) {
v_s=2;
}
t_bodies.current._sprite=a_sp.array[v_s];
}
v_st=spider_ElapsedMilliseconds();
v_time=0;
return 0;
};function f_loading(v_type,v_filename$) {
so_loading$v_nbloadedelements=(so_loading$v_nbloadedelements+1);
if (so_loading$v_nbloadedelements==4) {
f_start();
}
return 0;
}
function f_displaymessage(v_x,v_y,v_msg) {
var v_timg=0;
var v_sp=0;
var v_fh=0;
var v_fw=0;
;;;
v_sp=spider_CreateSprite(-1,300,40);
spider_StartDrawing(spider_SpriteOutput(v_sp));
spider_DrawText(0,0,v_msg,spider_RGB(0,255,0));
spider_StopDrawing();
spider_DisplaySprite(v_sp,v_x,v_y);
spider_FreeSprite(v_sp);
return 0;
}
function f_updatebodies() {
var v_dx=0;
var v_dy=0;
;
spider_ResetList(t_bodies); while (spider_NextElement(t_bodies)) {
v_dx=((t_bodies.current._x-t_bodies.current._vx));
v_dy=((t_bodies.current._y-t_bodies.current._vy));
t_bodies.current._vx=t_bodies.current._x;
t_bodies.current._vy=t_bodies.current._y;
t_bodies.current._x=(t_bodies.current._x+v_dx);
t_bodies.current._y=(t_bodies.current._y+v_dy);
if ((t_bodies.current._x-t_bodies.current._r)<=v_left) {
t_bodies.current._vx=(v_left+t_bodies.current._r);
t_bodies.current._x=t_bodies.current._vx;
t_bodies.current._x=(t_bodies.current._x-v_dx);
} else if ((t_bodies.current._x+t_bodies.current._r)>v_right) {
t_bodies.current._vx=(v_right-t_bodies.current._r);
t_bodies.current._x=t_bodies.current._vx;
t_bodies.current._x=(t_bodies.current._x-v_dx);
}
if ((t_bodies.current._y-t_bodies.current._r)<=v_top) {
t_bodies.current._vy=(v_top+t_bodies.current._r);
t_bodies.current._y=t_bodies.current._vy;
t_bodies.current._y=(t_bodies.current._y-v_dy);
} else if ((t_bodies.current._y+t_bodies.current._r)>=v_bottom) {
t_bodies.current._vy=(v_bottom-t_bodies.current._r);
t_bodies.current._y=t_bodies.current._vy;
t_bodies.current._y=(t_bodies.current._y-v_dy);
}
}
return 0;
};function f_mydisplaytransparentsprite(v_spriteid,v_x,v_y,v_intensity,v_color) {
  var sprite;

  if ((sprite = spider.sprite.objects.Get(v_spriteid)))
  {
sprite.alpha = 1.0 / 255 *  v_intensity ;
    sprite.color = v_color ;
    var nbDisplayedSprite = spider.sprite.nbDisplayedSprite;
     var displayedSprite;
  }
  if ((displayedSprite = spider.sprite.cache[nbDisplayedSprite]))
  {
      // use the cached instance, just update the texture
      displayedSprite.setTexture(sprite.texture);
   }
   else 
   {
      displayedSprite = new PIXI.Sprite(sprite.texture);
      spider.sprite.cache[nbDisplayedSprite] = displayedSprite;

      // one time set, As SpiderBasic doesn't allow anchor change
      displayedSprite.anchor.x = 0.5;
      displayedSprite.anchor.y = 0.5;
    
      displayedSprite.clipFrame = {}; // create the clipframe object
    
       spider.screen.stage.addChild(displayedSprite);
    }
  
      // Debug("uv " + displayedSprite.uvs[0]);
  
  if (sprite.clip)
  {
    displayedSprite.clip = true;
    displayedSprite.clipFrame.x = sprite.clipFrame.x;
    displayedSprite.clipFrame.y = sprite.clipFrame.y;
    displayedSprite.clipFrame.width = sprite.clipFrame.width;
    displayedSprite.clipFrame.height = sprite.clipFrame.height;
  }
  else
  {
    displayedSprite.clip = false;
  }

  displayedSprite.anchor.x = 0.5;
  displayedSprite.anchor.y = 0.5;
  displayedSprite.width  = sprite.width;
  displayedSprite.height = sprite.height;

  displayedSprite.visible = true; // ensure it's visible
  
  displayedSprite.mask = null;
  
  displayedSprite.alpha = sprite.alpha;
  
  // displayedSprite.texture.baseTexture.filter = spider.sprite.filtering;

  if (sprite.rotation) // Apply the rotation If any
  {
    displayedSprite.rotation = sprite.rotation*Math.PI/180;
        
    displayedSprite.pivot.x = 0;//displayedSprite.width/2;
    displayedSprite.pivot.y = 0;//displayedSprite.height/2;
    displayedSprite.position.x = v_x ;//+ displayedSprite.width/2;
    displayedSprite.position.y = v_y ;//+ displayedSprite.height/2;
   }
  else
  {
    displayedSprite.rotation = 0;
    displayedSprite.pivot.x = 0;
    displayedSprite.pivot.y = 0;
    
    displayedSprite.position.x = v_x;
    displayedSprite.position.y = v_y;
  }
  
  spider.sprite.nbDisplayedSprite++;
return 0;
};function f_runworld() {
var v_numfpsshown=0;
var v_a=0;
var v_numfps=0;
var v_r=0;
var v_result=0;
var v_rt=0;
var p_bodyptr=0;
var v_timer=0;
var v_ev=0;
var v_ft=0;
;;;;;;;
v_ang=(v_ang+0.01);
spider_FirstElement(t_bodies);
p_player=t_bodies.current;
spider_ExamineKeyboard();
if (spider_KeyboardPushed(38)) {
t_bodies.current._y=(t_bodies.current._y+-0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
so_runworld$v_tmass=(so_runworld$v_tmass+1);
} else if (spider_KeyboardPushed(40)) {
t_bodies.current._y=(t_bodies.current._y+0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
so_runworld$v_tmass=(so_runworld$v_tmass+1);
}
if (spider_KeyboardPushed(37)) {
t_bodies.current._x=(t_bodies.current._x+-0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
so_runworld$v_tmass=(so_runworld$v_tmass+1);
} else if (spider_KeyboardPushed(39)) {
t_bodies.current._x=(t_bodies.current._x+0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
so_runworld$v_tmass=(so_runworld$v_tmass+1);
} else if (spider_KeyboardPushed(82)) {
f_reset();
so_runworld$v_sum=0;
so_runworld$v_tmass=0;
so_runworld$v_time=0;
} else if (spider_KeyboardPushed(77)) {
t_bodies.current._mass=(t_bodies.current._mass+300);
t_bodies.current._r=spider_Sqr(((t_bodies.current._mass/3.141593)));
} else if (spider_KeyboardPushed(27)) {
window.close();
}
if (so_runworld$v_tmass>30) {
t_bodies.current._mass=(t_bodies.current._mass-((t_bodies.current._mass*0.02)));
f_newcell((t_bodies.current._mass*0.02));
so_runworld$v_tmass=0;
}
v_a=1;
for (;5>=v_a;v_a+=1) {
f_updatebodies();
spider_ResetList(t_bodies); while (spider_NextElement(t_bodies)) {
p_bodyptr=t_bodies.current;
while (spider_NextElement(t_bodies)) {
v_result=f_circletocircle(t_bodies.current,p_bodyptr);
if (v_result) {
if (t_bodies.current._r>=p_bodyptr._r) {
t_bodies.current._mass=(t_bodies.current._mass+2);
p_bodyptr._mass=(p_bodyptr._mass+-2);
} else {
p_bodyptr._mass=(p_bodyptr._mass+2);
t_bodies.current._mass=(t_bodies.current._mass+-2);
}
t_bodies.current._r=spider_Sqr(((t_bodies.current._mass/3.141593)));
p_bodyptr._r=spider_Sqr(((p_bodyptr._mass/3.141593)));
}
}
spider_ChangeCurrentElement(t_bodies,p_bodyptr);
}
}
spider_ClearScreen(0);
spider_ZoomSprite(a_sp.array[12],(v_right*4),(v_bottom*4));
spider_RotateSprite(a_sp.array[12],0.01,1);
spider_DisplayTransparentSprite(a_sp.array[12],(-(v_right)),(-(v_right)));
so_runworld$v_sum=(-(p_player._mass));
spider_ResetList(t_bodies); while (spider_NextElement(t_bodies)) {
v_r=spider_BankerRound(t_bodies.current._r);
if (t_bodies.current._mass>0) {
so_runworld$v_sum=(so_runworld$v_sum+t_bodies.current._mass);
spider_ZoomSprite(t_bodies.current._sprite,spider_BankerRound((t_bodies.current._r*2)),spider_BankerRound((t_bodies.current._r*2)));
spider_ZoomSprite(a_sp.array[2],spider_BankerRound((t_bodies.current._r*1.8)),spider_BankerRound((t_bodies.current._r*1.8)));
spider_RotateSprite(a_sp.array[2],(t_bodies.current._x-t_bodies.current._vx),1);
v_rt=spider_BankerRound((t_bodies.current._r*0.90000000000000002));
f_mydisplaytransparentsprite(a_sp.array[2],spider_BankerRound(t_bodies.current._x),spider_BankerRound(t_bodies.current._y),127,0);
f_mydisplaytransparentsprite(t_bodies.current._sprite,spider_BankerRound(t_bodies.current._x),spider_BankerRound(t_bodies.current._y),127,0);
} else {
if (p_player==t_bodies.current) {
if (!(so_runworld$v_time)) {
so_runworld$v_time=((((spider_ElapsedMilliseconds()-v_st))/1000)|0);
}
f_displaymessage(30,30,_S1+spider_Str(so_runworld$v_time)+_S2);
} else {
spider_DeleteElement(t_bodies);
}
}
}
if (p_player._mass>so_runworld$v_sum) {
if (!(so_runworld$v_time)) {
so_runworld$v_time=((((spider_ElapsedMilliseconds()-v_st))/1000)|0);
}
f_displaymessage(30,30,_S3+spider_Str(so_runworld$v_time)+_S2);
}
spider_FlipBuffers();
return 0;
}
function f_circletocircle(p_b,p_b1) {
var v_y0=0;
var v_y1=0;
var v_m0=0;
var v_m1=0;
var v_p=0;
var v_t=0;
var v_nx=0;
var v_ny=0;
var v_dx=0;
var v_dy=0;
var v_dist=0;
var v_fd=0;
var v_x0=0;
var v_x1=0;
var v_frac=0;
;;;;;;;;;;;;;;
v_dx=(p_b._x-p_b1._x);
v_dy=(p_b._y-p_b1._y);
v_dist=spider_Sqr(((v_dx*v_dx)+(v_dy*v_dy)));
v_t=(p_b._r+p_b1._r);
if (v_dist<v_t) {
v_fd=((((v_dist-v_t))/v_dist));
v_m0=p_b._mass;
v_m1=p_b1._mass;
v_x0=(p_b._x-p_b._vx);
v_x1=(p_b1._x-p_b1._vx);
v_y0=(p_b._y-p_b._vy);
v_y1=(p_b1._y-p_b1._vy);
v_dx=(p_b._x-p_b1._x);
v_dy=(p_b._y-p_b1._y);
v_nx=((v_dx/v_t));
v_ny=((v_dy/v_t));
v_p=((((((2*(((v_x0*v_nx)+(v_y0*v_ny))))-(((v_x1*v_nx)+(v_y1*v_ny)))))/((v_m0+v_m1))))*(0.15915494309189535));
v_dx=(v_x0-(((v_p*v_m1)*v_nx)));
v_dy=(v_y0-(((v_p*v_m1)*v_ny)));
p_b._vx=(p_b._x-v_dx);
p_b._vy=(p_b._y-v_dy);
v_dx=(v_x1+(((v_p*v_m0)*v_nx)));
v_dy=(v_y1+(((v_p*v_m0)*v_ny)));
p_b1._vx=(p_b1._x-v_dx);
p_b1._vy=(p_b1._y-v_dy);
if (1) return 1;
}
return 0;
};//
SpiderLaunch = function() {
 spider_InitFunctions();;;;;;;;;;
t_bodies=spider_NewList(s_ball,"object",false);;
t_del=spider_NewList(s_integer,"_i",true);;
spider_Dim(a_sp,21,[12],null);;
spider_BindEvent(18,f_loading);
spider_BindEvent(19,f_loadingerror);
spider_ExamineDesktops();
v_left=0;
v_right=spider_DesktopWidth(0);
v_top=0;
v_bottom=spider_DesktopHeight(0);
spider_OpenScreen(v_right,v_bottom,32,_S4);
a_sp.array[0]=spider_LoadSprite(-1,_S5,8);
a_sp.array[1]=spider_LoadSprite(-1,_S6,8);
a_sp.array[2]=spider_LoadSprite(-1,_S7,8);
a_sp.array[12]=spider_LoadSprite(-1,_S8);

}


function spider_InitFunctions() {
spider_InitImageDecoder();
spider_InitImage();
spider_Init2DDrawing();
spider_InitArray();
spider_InitDesktop();
spider_InitMap();
spider_Event_Init();
spider_InitList();
spider_InitSystem();
}


spider.nbLoadedModules++
