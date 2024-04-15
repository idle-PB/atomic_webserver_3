if (typeof spider === 'undefined') { var spider = {}; }
spider.windowTheme = "flat";
spider.gadgetTheme = "flat";
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
var _S4=" loaded";
var _S2=" seconds";
var _S6="Osmosis";
var _S5=": loading error";
var _S3="You became the largest in ";
var _S7="bigblue.png";
var _S1="You got absorbed in ";
var _S9="bloom.png";
var _S8="bigblue1.png";
var _S10="osmosis.png";
var a_sp=new spider_SysArray();
var t_bodies;
var t_del;
var so_loading$v_nbloadedelements=0;
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
function spider_Memory_ReadCharacter(a,b,c){switch(c){case 24:return spider_Memory_CharacterReadOffset=1,a[b];case 25:return spider_Memory_CharacterReadOffset=2,a[b]<<8|a[b+1];default:return spider_Memory_ReadUTF8Character(a,b)}}
function spider_PeekS(a,b,c,d){"undefined"===typeof d&&(d=2);"undefined"===typeof c&&(c=-1);d&=31;var e,f="";0===d&&(d=25);if(-1<=c)for(;c;){e=spider_Memory_ReadCharacter(a.viewu8,b,d);if(0===e)break;f+=String.fromCharCode(e);b+=spider_Memory_CharacterReadOffset;c--}return f}function spider_PokeB(a,b,c){a.view8[b]=c}function spider_PokeA(a,b,c){a.viewu8[b]=c}function spider_PokeW(a,b,c){a.view.setInt16(b,c,!0)}function spider_PokeU(a,b,c){a.view.setUint16(b,c,!0)}
function spider_PokeC(a,b,c){a.view.setUint16(b,c,!0)}function spider_PokeL(a,b,c){a.view.setInt32(b,c,!0)}function spider_PokeF(a,b,c){a.view.setFloat32(b,c,!0)}function spider_PokeD(a,b,c){a.view.setFloat64(b,c,!0)}function spider_Memory_WriteUTF8Character(a,b,c){return 128>c?(a[b]=c,1):2048>c?(a[b]=192|c>>6,a[b+1]=128|c&63,2):55296>c||57344<=c?(a[b]=224|c>>12,a[b+1]=128|c>>6&63,a[b+2]=128|c&63,3):0}
function spider_Memory_WriteCharacter(a,b,c,d){switch(d){case 24:return a[b]=c,1;case 25:return a[b]=c>>8,a[b+1]=c,2;default:return spider_Memory_WriteUTF8Character(a,b,c)}}function spider_PokeS(a,b,c,d,e){"undefined"===typeof e&&(e=2);"undefined"===typeof d&&(d=-1);var f=c.length;if(-1==d||d>f)d=f;var f=b,g=e&31;0===g&&(g=25);for(var h=0;h<d;h++)b+=spider_Memory_WriteCharacter(a.viewu8,b,c.charCodeAt(h),g);0===(e&256)&&(a.viewu8[b]=0,25==g&&(a.viewu8[b+1]=0));return b-f}
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
function spider_Box(a,b,d,f,c){"undefined"===typeof c&&(c=spider.drawing.frontColor);var e=spider.drawing.context;4==spider.drawing.mode?(e.beginPath(),e.rect(a+0.5,b+0.5,d,f),e.strokeStyle=spider_helper_ColorToHtml(c),e.stroke()):(e.fillStyle=spider_helper_ColorToHtml(c),e.fillRect(a,b,d,f))}function spider_DrawAlphaImage(a,b,d,f){"undefined"===typeof f&&(f=255);var c=spider.drawing.context,e=c.globalAlpha;c.globalAlpha=f/255;c.drawImage(a,b,d);c.globalAlpha=e}
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

(function(){function x(b){var a;if(-1==b)spider.window.a.CleanAll();else if(a=spider.window.a.Get(b)){for(var c in a.d)clearInterval(a.d[c]);spider.gadget.freeWindowGadgets(b);a.id==spider.window.b&&(spider.window.b=-1);null!==a.parentId?s(a.parentId):-1!==a.m&&s(a.m);a.p&&a.p();a.window.parentNode.removeChild(a.window);spider.window.a.Remove(b)}}function y(b){var a="";b&131072&&(a+="ctrl+");b&65536&&(a+="shift+");b&262144&&(a+="alt+");b&524288&&(a+="mod+");switch(b){case 8:a+="backspace";break;case 9:a+=
"tab";break;case 13:a+="enter";break;case 0:a+="capslock";break;case 27:a+="escape";break;case 32:a+="space";break;case 11:a+="pageup";break;case 12:a+="pagedown";break;case 4:a+="end";break;case 1:a+="home";break;case 28:a+="left";break;case 30:a+="up";break;case 29:a+="right";break;case 31:a+="down";break;case 5:a+="ins";break;case 127:a+="del";break;case 43:a+="plus";break;default:a=201<=b&&212>=b?a+("f"+(b-201+1)):a+spider_Chr(b&-983041)}return a}function k(b){t()==b.id&&(Mousetrap.reset(),Mousetrap.bindGlobal(Object.keys(b.f),
z))}function z(b,a){var c,e=t();if(-1!=e&&(c=spider.window.a.Get(e)))return spider.event.Send(2,c.id,c.f[a]),!1}function t(){return spider.window.b}function s(b){if(b=spider.window.a.Get(b))b.c&4096?(spider.window.b=b.id,k(b)):b.element.style.zIndex!=spider.window.k&&(b.q?(b.element.style.zIndex=spider.window.l,spider.window.l++):(b.element.style.zIndex=spider.window.k,spider.window.k++),spider.window.b=b.id,k(b))}function p(b){return b.c&4608?0:$(b.contentFrame).cssValue("marginRight")+$(b.contentFrame).cssValue("marginLeft")+
$(b.contentFrame).cssValue("borderRightWidth")+$(b.contentFrame).cssValue("borderLeftWidth")}function m(b){return b.c&4608?0:$(b.contentFrame).cssValue("marginTop")+$(b.contentFrame).cssValue("marginBottom")+$(b.contentFrame).cssValue("borderTopWidth")+$(b.contentFrame).cssValue("borderBottomWidth")}function u(b,a,c,e,v){if(b=spider.window.a.Get(b))-65535!=a&&(b.element.style.left=a+"px"),-65535!=c&&(b.element.style.top=c+"px"),-65535!=e&&$(b.element).width(e+p(b)),-65535!=v&&$(b.element).height(v+
m(b))}function A(b,a){var c,e;if(e=spider.window.a.Get(b))a&1?(c=spider_DesktopWidth(0)/2-q(b,0)/2,e=spider_DesktopHeight(0)/2-w(b,0)/2,u(b,c,e,-65535,-65535)):a&2&&null!==e.parentId&&(c=B(e.parentId)+(q(e.parentId,0)-q(b,0))/2,e=C(e.parentId)+(w(e.parentId,0)-w(b,0))/2,u(b,c,e,-65535,-65535))}function B(b){var a;return(a=spider.window.a.Get(b))?a.element.getBoundingClientRect().left:0}function C(b){var a;return(a=spider.window.a.Get(b))?a.element.getBoundingClientRect().top:0}function q(b,a){"undefined"===
typeof a&&(a=1);var c;return(c=spider.window.a.Get(b))?c.c&4608?$(c.element).width():1==a?$(c.element).width()-p(c):$(c.element).width()+2:0}function w(b,a){"undefined"===typeof a&&(a=1);var c;return(c=spider.window.a.Get(b))?c.c&4608?$(c.element).height()-$(c.content).cssValue("top"):1==a?$(c.element).height()-m(c):$(c.element).height()-m(c)+$(c.title).height()+9:0}spider.nbModules++;require(["mousetrap.min"],function(){require(["mousetrap-global-bind.min"],function(){spider.nbLoadedModules++;SpiderMain()})});
spider.window={a:new spider.object(x),b:-1,k:100,l:500,currentWindowId:-1,gadgetList:null};spider.window.o=function(){return{e:null,i:0,stack:{},get:function(){return this.e},set:function(b){this.e=b},push:function(b){this.stack[this.i]=this.e;this.i++;this.e=b},pop:function(){this.i--;this.e=this.stack[this.i]}}};spider.window.gadgetList=new spider.window.o;window.spider_InitWindow=function(){};window.spider_CloseWindow=x;window.spider_DisableWindow=function(b,a){var c;if(c=spider.window.a.Get(b))a?
c.disabled||($(c.window).fadeTo(200,0.6),$(c.window).find("*").prop("disabled",!0),$(c.contentFrame).block({message:null,r:{opacity:0,cursor:"default"}}),c.disabled=1):c.disabled&&($(c.window).fadeTo(200,1),$(c.window).find("*").prop("disabled",!1),$(c.contentFrame).unblock(),c.disabled=0)};window.spider_OpenWindow=function(b,a,c,e,v,f,g,r){"undefined"===typeof g&&(g=16);"undefined"===typeof r&&(r=null);var d=spider.window.a.Allocate(b);d.g=-1;d.h=-1;d.color=-1;d.n=0;d.f=[];d.d=[];d.parentId=r?r.id:
null;d.m=t();b=document.getElementById("spiderbody");r=document.createElement("div");var h=document.createElement("div"),m=document.createElement("div"),k=document.createElement("div");g&256&&(h.style.visibility="hidden");g&4096?(c=a=0,e=spider_DesktopWidth(0),v=spider_DesktopHeight(0),document.title=f,h.style.zIndex=80,h.className="spiderwindow-background sbNoSelect",g&=-49,$(window).resize(function(){u(d.id,0,0,spider_DesktopWidth(0),spider_DesktopHeight(0));spider.event.Send(7,d.id,0,0)})):g&512?
(h.className="spiderwindow-background sbNoSelect",g&=-49):(h.className="spiderwindow sbNoSelect",k.innerHTML=f,k.className="spiderwindow-title",m.appendChild(k),g&16&&(f=document.createElement("div"),f.className="spiderwindow-closebutton",$(f).on("click",function(){spider.event.Send(4,d.id,0,0)}),m.appendChild(f)));var n=document.createElement("div");n.className="spiderwindow-content";$(n).on({mouseover:function(a){var b=n.getBoundingClientRect();d.g=a.clientX-b.left|0;d.h=a.clientY-b.top|0},mouseout:function(){d.g=
-1;d.h=-1},mousemove:function(a){var b=n.getBoundingClientRect();d.g=a.clientX-b.left|0;d.h=a.clientY-b.top|0},click:function(){spider.event.Send(14,spider.window.b)},dblclick:function(){spider.event.Send(15,spider.window.b)},mouseup:function(a){3===a.which&&spider.event.Send(13,spider.window.b)}});var p=document.createElement("div");p.className="spiderwindow-menubar";var q=document.createElement("div"),l=document.createElement("div");f=document.createElement("div");d.window=r;d.element=h;d.contentFrame=
n;d.content=l;d.menu=p;d.toolBar=q;d.statusBar=f;d.title=m;d.j=k;d.c=g;s(d.id);r.appendChild(h);h.appendChild(m);h.appendChild(n);l.style.position="absolute";l.style.top="0px";l.style.left="0px";$(l).css("overflow","hidden");$(l).css("width","100%");$(l).css("height","100%");l.window=d;n.appendChild(p);n.appendChild(q);n.appendChild(l);n.appendChild(f);h.style.position="absolute";b.appendChild(r);g&32&&($(h).resizable({handles:"n, e, s, w, ne, se, sw, nw",containment:"body",ghost:!1,resize:function(){spider.event.Send(7,
d.id,0,0)},start:function(){$(".sbWebGadget").each(function(){$(this).css("pointer-events","none")})},stop:function(){$(".sbWebGadget").each(function(){$(this).css("pointer-events","auto")})}}),$(".ui-icon-gripsmall-diagonal-se").css("background-image","url('')"),g&16&&($(h).resizable("option","minWidth",80),$(h).resizable("option","minHeight",40)));g&4608||$(h).draggable({cancel:".spiderwindow-closebutton, .spiderwindow-content",drag:function(){spider.event.Send(6,d.id,0,0)},start:function(){$(".sbWebGadget").each(function(){$(this).css("pointer-events",
"none")})},stop:function(){$(".sbWebGadget").each(function(){$(this).css("pointer-events","auto")})}});$(h).on("mousedown",function(){spider.window.b!=d.id&&(-1!=spider.window.b&&spider.event.Send(16,spider.window.b,0,0),document.activeElement.blur(),spider.event.Send(8,d.id,0,0),s(d.id))});d.AdjustContent=function(){$(l).css("top",$(p).height()+$(q).height())};u(d.id,a,c,e,v);A(d.id,g);0===(g&1024)&&spider.window.gadgetList.set(l);spider.window.currentWindowId=d.id;return d.resultId};window.spider_AddKeyboardShortcut=
function(b,a,c){var e;if(e=spider.window.a.Get(b))if(a=y(a))e.f[a]=c,t()==b&&Mousetrap.bindGlobal(a,z)};window.spider_RemoveKeyboardShortcut=function(b,a){var c;if(c=spider.window.a.Get(b))if(-1==a)c.f=[],k(c);else if(a=y(a))delete c.f[a],k(c)};window.spider_AddWindowTimer=function(b,a,c){var e;if(e=spider.window.a.Get(b))e.d[""+a]=setInterval(function(){spider.event.Send(12,e.id,a,0)},c)};window.spider_RemoveWindowTimer=function(b,a){var c;if(c=spider.window.a.Get(b)){var e=""+a;c.d[e]&&(clearInterval(c.d[e]),
delete c.d[e])}};window.spider_HideWindow=function(b,a){var c;if(c=spider.window.a.Get(b))c.element.style.visibility=0===a?"visible":"hidden"};window.spider_GetWindowTitle=function(b){if(b=spider.window.a.Get(b)){if(b.c&4096)return document.title;if(b.j)return b.j.innerHTML}return""};window.spider_SetWindowTitle=function(b,a){var c;if(c=spider.window.a.Get(b))c.c&4096?document.title=a:c.j&&(c.j.innerHTML=a)};window.spider_GetWindowData=function(b){var a;return(a=spider.window.a.Get(b))?a.n:0};window.spider_SetWindowData=
function(b,a){var c;if(c=spider.window.a.Get(b))c.n=a};window.spider_GetActiveWindow=t;window.spider_SetActiveWindow=s;window.spider_GetWindowColor=function(b){var a;return(a=spider.window.a.Get(b))?a.color:-1};window.spider_SetWindowColor=function(b,a){var c;if(c=spider.window.a.Get(b))-1==a?c.color=-1:(c.color=a,$(c.content).css("background-color",spider_helper_ColorToHtml(a)))};window.spider_StickyWindow=function(b,a){var c;if(c=spider.window.a.Get(b))c.q=a,s(c.id)};window.spider_ResizeWindow=
u;window.spider_WindowBounds=function(b,a,c,e,k){var f;(f=spider.window.a.Get(b))&&f.c&32&&(-65535!=a&&$(f.element).resizable("option","minWidth",a+p(f)),-65535!=c&&$(f.element).resizable("option","minHeight",c+m(f)),-65535!=e&&$(f.element).resizable("option","maxWidth",e+p(f)),-65535!=k&&$(f.element).resizable("option","maxHeight",k+m(f)))};window.spider_WindowX=B;window.spider_WindowY=C;window.spider_WindowWidth=q;window.spider_WindowHeight=w;window.spider_WindowMouseX=function(b){var a;return(a=
spider.window.a.Get(b))?a.g:0};window.spider_WindowMouseY=function(b){var a;return(a=spider.window.a.Get(b))?a.h:0};window.spider_WindowID=function(b){var a;return(a=spider.window.a.Get(b))?a:null};window.spider_IsWindow=function(b){return spider.window.a.Is(b)};window.spider_window_Center=A})();

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

spider.nbModules++;require(["paper-full.min"],function(){spider.nbLoadedModules++;SpiderMain()});spider.vectordrawing={output:null,isPathEmpty:1,sourceColor:0,states:[],path:null};function spider_ResetPath(){spider.vectordrawing.path=new paper.CompoundPath;spider.vectordrawing.isPathEmpty=1}function spider_SaveVectorState(){var a={};a.matrix=spider.vectordrawing.path.matrix.clone();a.sourceColor=spider.vectordrawing.sourceColor;spider.vectordrawing.states.push(a)}
function spider_RestoreVectorState(){var a=spider.vectordrawing.states.pop();spider.vectordrawing.path.matrix=a.matrix;spider.vectordrawing.sourceColor=a.sourceColor}function spider_StartVectorDrawing(a){if(a){spider.vectordrawing.output=a;var b=document.createElement("canvas");b.width=a.canvas.width;b.height=a.canvas.height;b.getContext("2d").drawImage(a.canvas,0,0);paper.clear();paper.setup(a.canvas);paper.settings.applyMatrix=!1;spider_ResetPath();spider_DrawVectorImage(b)}return a}
function spider_StopVectorDrawing(){spider_FillPath(0)}function spider_IsPathEmpty(){return spider.vectordrawing.isPathEmpty}function spider_vectordrawing_ConvertPoint(a,b,c,d){a=new paper.Point(a,b);return 0===c&&2===d?spider.vectordrawing.path.matrix.inverseTransform(a):2===c&&0===d?spider.vectordrawing.path.matrix.transform(a):{x:-1,y:-1}}function spider_ConvertCoordinateX(a,b,c,d){"undefined"===typeof c&&(c=2,d=1);return spider_vectordrawing_ConvertPoint(a,b,c,d).x}
function spider_ConvertCoordinateY(a,b,c,d){"undefined"===typeof c&&(c=2,d=1);return spider_vectordrawing_ConvertPoint(a,b,c,d).y}function spider_MovePathCursor(a,b,c){"undefined"===typeof c&&(c=0);c&1?spider.vectordrawing.path.moveBy(new paper.Point(a,b)):spider.vectordrawing.path.moveTo(new paper.Point(a,b))}
function spider_AddPathEllipse(a,b,c,d,e,g,f){"undefined"===typeof f&&(f=0);a=f&1?new paper.Point(spider_PathCursorX()+a-c,spider_PathCursorY()+b-d):new paper.Point(a-c,b-d);c=new paper.Rectangle(a,new paper.Size(2*c,2*d));c=new paper.Path.Ellipse(c);c.transform(spider.vectordrawing.path.matrix);spider.vectordrawing.path.addChild(c);spider.vectordrawing.isPathEmpty=0}
function spider_AddPathCurve(a,b,c,d,e,g,f){"undefined"===typeof f&&(f=0);f&1?spider.vectordrawing.path.cubicCurveBy(new paper.Point(a,b),new paper.Point(c,d),new paper.Point(e,g)):spider.vectordrawing.path.cubicCurveTo(new paper.Point(a,b),new paper.Point(c,d),new paper.Point(e,g))}
function spider_AddPathArc(a,b,c,d,e,g){"undefined"===typeof g&&(g=0);var f,k,l,h,m;f=spider_PathCursorX();k=spider_PathCursorY();g&1&&(a+=f,b+=k,c+=f,d+=k);g=a-f;l=b-k;c=a-c;d=b-d;h=(Math.atan2(l,g)-Math.atan2(d,c))/2;0===e||f==a&&k==b||0===h?spider_AddPathLine(a,b,0):(m=Math.abs(Math.tan(h)),f=e/m,h=Math.sqrt(g*g+l*l),f>h&&(f=h,e=h*m),k=Math.sqrt(c*c+d*d),f>k&&(f=k,e=k*m),g=a-g*f/h,l=b-l*f/h,c=a-c*f/k,d=b-d*f/k,m=a-g+(a-c),k=b-l+(b-d),h=Math.sqrt(m*m+k*k),f=Math.sqrt(f*f+e*e),a-=m*f/h,b-=k*f/h,
f=Math.atan2(l-b,g-a),c=Math.atan2(d-b,c-a),spider_AddPathLine(g,l,0),spider_AddPathCircle(a,b,e,180/Math.PI*f,180/Math.PI*c,2,!0))}
function spider_AddPathCircle(a,b,c,d,e,g,f){var k,l;"undefined"===typeof d&&(d=0);"undefined"===typeof e&&(e=359.9);"undefined"===typeof g&&(g=0);if(g&4){var h=e;e=d+360;d=h}var h=d*Math.PI/180,m=(e-d)*Math.PI/180;k=a+c*Math.cos(h);l=b+c*Math.sin(h);d=a+c*Math.cos(h+m/2);e=b+c*Math.sin(h+m/2);a+=c*Math.cos(h+m);b+=c*Math.sin(h+m);g&2?spider_AddPathLine(k,l,g):spider_MovePathCursor(k,l,g);g&1?spider.vectordrawing.path.arcBy(d,e,a,b):spider.vectordrawing.path.arcTo(d,e,a,b);f&&spider_MovePathCursor(a,
b)}function spider_AddPathLine(a,b,c){"undefined"===typeof c&&(c=0);c&1?spider.vectordrawing.path.lineBy(new paper.Point(a,b)):spider.vectordrawing.path.lineTo(new paper.Point(a,b));spider.vectordrawing.isPathEmpty=0}
function spider_AddPathBox(a,b,c,d,e){"undefined"===typeof e&&(e=0);e&2?(spider_AddPathLine(a,b,e),spider_AddPathLine(c,0,e|1),spider_AddPathLine(0,d,e|1),spider_AddPathLine(-c,0,e|1),spider_AddPathLine(0,-d,e|1)):(spider_MovePathCursor(a,b,e),spider_AddPathLine(c,0,e|1),spider_AddPathLine(0,d,e|1),spider_AddPathLine(-c,0,e|1),spider_ClosePath())}function spider_vectordrawing_ToPaperColor(a){return new paper.Color((a&255)/255,(a>>8&255)/255,(a>>16&255)/255,(a>>24&255)/255)}
function spider_VectorSourceColor(a){spider.vectordrawing.sourceColor=spider_vectordrawing_ToPaperColor(a)}function spider_VectorSourceLinearGradient(a,b,c,d){spider.vectordrawing.sourceColor={gradient:{stops:[]},origin:new paper.Point(a,b),destination:new paper.Point(c,d)}}function spider_VectorSourceCircularGradient(a,b,c){spider.vectordrawing.sourceColor={gradient:{stops:[],radial:!0},origin:new paper.Point(a,b),destination:new paper.Point(a+c,b)}}
function spider_VectorSourceGradientColor(a,b){spider.vectordrawing.sourceColor.gradient.stops.push([spider_vectordrawing_ToPaperColor(a),b])}function spider_ClosePath(){spider.vectordrawing.path.closePath(!0)}
function spider_VectorDrawing_GenericStrokePath(a,b){"undefined"===typeof b&&(b=0);spider.vectordrawing.path.strokeColor=spider.vectordrawing.sourceColor;spider.vectordrawing.path.strokeWidth=a;spider.vectordrawing.path.strokeCap=b&16?"round":b&32?"square":"butt";spider.vectordrawing.path.strokeJoin=b&64?"round":b&128?"bevel":"miter";paper.view.draw();if(0===(b&8)){var c=spider.vectordrawing.path.matrix;spider_ResetPath();spider.vectordrawing.path.matrix=c}}
function spider_StrokePath(a,b){"undefined"===typeof b&&(b=0);spider.vectordrawing.path.dashArray=null;spider_VectorDrawing_GenericStrokePath(a,b)}function spider_CustomDashPath(a,b,c,d){"undefined"===typeof c&&(c=0);b=b.array.slice(0);for(d=0;d<b.length;d+=2)0===b[d]&&(b[d]=a);spider.vectordrawing.path.dashArray=b;spider_VectorDrawing_GenericStrokePath(a,c)}
function spider_DashPath(a,b,c,d){"undefined"===typeof c&&(c=0);spider.vectordrawing.path.dashArray=[b,b];spider_VectorDrawing_GenericStrokePath(a,c)}function spider_DotPath(a,b,c,d){"undefined"===typeof c&&(c=0);spider.vectordrawing.path.dashArray=[1,b+a];spider_VectorDrawing_GenericStrokePath(a,c|16)}function spider_AddPathSegments(a,b){var c=new paper.Path(a);return spider.vectordrawing.path.addChild(c)}function spider_PathSegments(){return spider.vectordrawing.path.pathData}
function spider_FillPath(a){"undefined"===typeof a&&(a=0);spider.vectordrawing.path.fillColor=spider.vectordrawing.sourceColor;spider.vectordrawing.path.fillRule="evenodd";spider_VectorDrawing_GenericStrokePath(0,a)}
function spider_BeginVectorLayer(a){"undefined"===typeof a&&(a=255);spider.vectordrawing.previousLayer=paper.project.activeLayer;spider.vectordrawing.previousPath=spider.vectordrawing.path;spider.vectordrawing.layer=new paper.Layer;spider.vectordrawing.layer.activate();spider.vectordrawing.layer.opacity=a/255;spider_ResetPath();spider.vectordrawing.path.matrix=spider.vectordrawing.previousPath.matrix}
function spider_EndVectorLayer(){spider.vectordrawing.path=spider.vectordrawing.previousPath;spider.vectordrawing.previousLayer.activate()}function spider_FillVectorOutput(){spider_AddPathBox(0,0,spider_VectorOutputWidth(),spider_VectorOutputHeight());spider.vectordrawing.path.fillColor=spider.vectordrawing.sourceColor;spider.vectordrawing.path.strokeColor=null;spider_VectorDrawing_GenericStrokePath(0)}
function spider_IsInsidePath(a,b,c){return spider.vectordrawing.path.contains(new paper.Point(a,b))?1:0}function spider_IsInsideStroke(a,b,c){return spider.vectordrawing.path.hitTest(new paper.Point(a,b))?1:0}function spider_PathBoundsX(){return spider.vectordrawing.path.bounds.x}function spider_PathBoundsY(){return spider.vectordrawing.path.bounds.y}function spider_PathBoundsWidth(){return spider.vectordrawing.path.bounds.width}
function spider_PathBoundsHeight(){return spider.vectordrawing.path.bounds.height}function spider_PathLength(){return spider.vectordrawing.path.lastChild.length}function spider_PathPointX(a){return spider.vectordrawing.path.lastChild.getPointAt(a).x}function spider_PathPointY(a){return spider.vectordrawing.path.lastChild.getPointAt(a).y}function spider_PathPointAngle(a){return spider.vectordrawing.path.lastChild.getTangentAt(a).angle}
function spider_VectorFont(a,b){"undefined"===typeof b&&(b=-1);var c={};$.extend(c,a);-1!=b&&(c.size=b+"px");spider.vectordrawing.font=c}
function spider_drawing_CreateVectorText(a){var b=spider_PathCursorX(),c=spider_PathCursorY();spider.vectordrawing.font&&(c+=spider_Val(spider.vectordrawing.font.size)/1.2);b=new paper.PointText(new paper.Point(b,c));b.justification="left";b.fillColor=spider.vectordrawing.sourceColor;b.content=a;b.transform(spider.vectordrawing.path.matrix);spider.vectordrawing.font&&(spider.vectordrawing.font.flags&2&&(b.fontWeight="bold"),b.fontFamily=spider.vectordrawing.font.family,b.fontSize=spider.vectordrawing.font.size);
return b}function spider_DrawVectorText(a){spider_drawing_CreateVectorText(a)}function spider_VectorTextWidth(a,b){"undefined"===typeof b&&(b=0);if(b&4)return 0;var c=spider_drawing_CreateVectorText(a),d=c.bounds.width;c.remove();return d}function spider_VectorTextHeight(a,b){"undefined"===typeof b&&(b=0);if(b&4)return 0;var c=spider_drawing_CreateVectorText(a),d=c.bounds.height;b&8&&(d/=1.4);c.remove();return d}function spider_VectorUnit(){return spider.vectordrawing.output.outputUnit}
function spider_DrawVectorImage(a,b,c,d){"undefined"===typeof b&&(b=255);"undefined"===typeof c&&(c=-1);if(-1==c)c=a.width,d=a.height,a=new paper.Raster(a);else if(c<a.width&&d<a.height){var e=document.createElement("canvas");e.width=a.width;e.height=a.width;e.getContext("2d").drawImage(a,0,0);spider.image.downscaleCanvas(e,c,d,!0);a=new paper.Raster(e)}else a=new paper.Raster(a);a.opacity=b/255;a.size=new paper.Size(c,d);a.position=new paper.Point(spider_PathCursorX()+c/2,spider_PathCursorY()+d/
2);a.transform(spider.vectordrawing.path.matrix);spider_FillPath()}function spider_PathCursorX(){return spider.vectordrawing.path.lastChild?spider.vectordrawing.path.lastChild.position.x:0}function spider_PathCursorY(){return spider.vectordrawing.path.lastChild?spider.vectordrawing.path.lastChild.position.y:0}function spider_FlipCoordinatesX(a,b){spider.vectordrawing.path.scale(-1,1)}function spider_ResetCoordinates(){spider.vectordrawing.path.matrix.reset()}
function spider_RotateCoordinates(a,b,c,d){spider.vectordrawing.path.rotate(c,new paper.Point(a,b))}function spider_ScaleCoordinates(a,b,c){spider.vectordrawing.path.scale(a,b)}function spider_TranslateCoordinates(a,b,c){spider.vectordrawing.path.translate(new paper.Point(a,b))}function spider_SkewCoordinates(a,b,c){spider.vectordrawing.path.skew(a,b)}function spider_VectorOutputWidth(){return spider.vectordrawing.path.view.viewSize.width}
function spider_VectorOutputHeight(){return spider.vectordrawing.path.view.viewSize.height}function spider_VectorResolutionX(){return spider.vectordrawing.path.view.resolution}function spider_VectorResolutionY(){return spider.vectordrawing.path.view.resolution};

var dijit,dojox;
(function(){function D(e){var f;if(-1==e)spider.gadget.objects.CleanAll();else if(f=spider.gadget.objects.Get(e))f.Free?f.Free():(f.div.parentNode&&f.div.parentNode.removeChild(f.div),f.gadget instanceof dijit._WidgetBase&&f.gadget.destroy()),spider.gadget.objects.Remove(e)}function s(e,f,g,k,n){e.style.position="absolute";e.style.left=f+"px";e.style.top=g+"px";e.style.width=k+"px";e.style.height=n+"px"}function r(e,f){e.isDisabled||spider.event.Send(1,e.windowId,e.id,f)}function v(e,f,g,k,n){e.domNode.style.position=
"absolute";e.domNode.style.left=f+"px";e.domNode.style.top=g+"px";e.domNode.style.width=k+"px";e.domNode.style.height=n+"px"}function u(e){var f=$(e).cssValue("paddingLeft")+$(e).cssValue("paddingRight")+$(e).cssValue("borderLeftWidth")+$(e).cssValue("borderRightWidth");e=$(e).cssValue("paddingTop")+$(e).cssValue("paddingBottom")+$(e).cssValue("borderTopWidth")+$(e).cssValue("borderBottomWidth");return{x:f,y:e}}function y(e,f,g){var k=spider.gadget.context;f||(e=$(spider_WindowID(e.windowId).contentFrame),
f=$(e).css("fontSize")+" "+$(e).css("fontFamily"));k.font=f;e=spider_2ddrawing_getTextHeight(k.font);e=e.ascent+e.descent;return{width:Math.ceil(k.measureText(g).width),height:e}}function A(e,f,g){var k;$(e).find(f).each(function(){if(-1<$(this).attr("class").search(g))return k=this,!1});return k}function C(e,f,g,k){k?($(f).css("background-color",""),$(g).css("color","")):(e.backColor&&-1!=e.backColor&&e.SetColor(2,e.backColor),e.frontColor&&-1!=e.frontColor&&e.SetColor(1,e.frontColor));e.gadget.set("disabled",
k?!0:!1)}function B(e,f,g,k,n){switch(k){case 2:e.gadget.get("disabled")||$(f).css("background-color",spider_helper_ColorToHtml(n));e.backColor=n;break;case 1:e.gadget.get("disabled")||$(g).css("color",spider_helper_ColorToHtml(n)),e.frontColor=n}}function F(e){e.gadget instanceof dijit._WidgetBase&&e.gadget.set("_onChangeActive",!1)}function G(e){e.gadget instanceof dijit._WidgetBase&&e.gadget.set("_onChangeActive",!0)}function H(e,f){var g;if(g=spider.gadget.objects.Get(e))F(g),g.SetText&&g.SetText(f),
G(g)}function I(e,f){null===f&&(f=0);var g;if(g=spider.gadget.objects.Get(e))if(g.GadgetHeight)g.GadgetHeight(f);else if(1!=f)return $(g.div).height();return 0}function J(e,f){null===f&&(f=0);var g;if(g=spider.gadget.objects.Get(e))if(g.GadgetWidth)g.GadgetWidth(f);else if(1!=f)return $(g.div).width();return 0}function K(e,f){"undefined"===typeof f&&(f=0);var g,k;return(g=spider.gadget.objects.Get(e))?1==f?(k=g.div.getBoundingClientRect(),k.left+window.scrollX|0):2==f?(k=g.div.getBoundingClientRect(),
(k.left+window.scrollX|0)-spider_WindowX(g.windowId)):parseInt($(g.div).css("left"),10):null}function L(e,f){"undefined"===typeof f&&(f=0);var g,k;return(g=spider.gadget.objects.Get(e))?1==f?(k=g.div.getBoundingClientRect(),k.top+window.scrollY|0):2==f?(k=g.div.getBoundingClientRect(),(k.top+window.scrollY|0)-spider_WindowY(g.windowId)):parseInt($(g.div).css("top"),10):null}spider.nbModules++;require("dijit/dijit dojo/store/Memory dojo/store/Observable dojo/_base/declare dojo/aspect dojo/_base/lang dgrid/OnDemandGrid dgrid/Selection dgrid/Keyboard dgrid/extensions/ColumnResizer dstore/Memory dstore/Trackable cbtree/store/Hierarchy dijit/tree/ObjectStoreModel cbtree/model/ForestStoreModel dijit/focus dijit/registry dijit/form/SimpleTextarea dijit/form/Button dijit/form/ToggleButton dijit/form/RadioButton dijit/form/ComboBox dijit/form/Select dijit/form/CheckBox dijit/form/Textarea dijit/form/SimpleTextarea dijit/form/NumberTextBox dijit/form/HorizontalSlider dijit/form/VerticalSlider dijit/ProgressBar dijit/Tooltip dijit/layout/TabContainer dijit/form/NumberSpinner dijit/form/DateTextBox dijit/Tree dijit/tree/ObjectStoreModel dijit/Calendar dijit/Toolbar dijit/ToolbarSeparator dijit/Menu dijit/MenuItem dijit/MenuSeparator dijit/DropDownMenu dijit/MenuBar dijit/PopupMenuBarItem dijit/PopupMenuItem dijit/layout/ContentPane dijit/layout/BorderContainer dojo/dom-style dojo/data/ItemFileWriteStore dgrid/Grid dgrid/extensions/ColumnReorder dojo/domReady!".split(" "),
function(e,f,g,k,n,m,c,d,b,h,a,l,q,p,w,t,x,r){spider.nbLoadedModules++;dijit=e;spider.StoreMemory=f;spider.StoreObservable=g;spider.DojoBaseDeclare=k;spider.DojoAspect=n;spider.DojoBaseLang=m;spider.DGridOnDemandGrid=c;spider.DGridSelection=d;spider.DGridKeyboard=b;spider.DGridColumnResizer=h;spider.DStoreMemory=a;spider.DStoreTrackable=l;spider.CBTreeStoreHierarchy=q;spider.TreeObjectStoreModel=p;spider.CBTreeModelForestStoreModel=w;spider.DigitFocus=t;spider.DigitRegistry=x;spider.DojoDomStyle=
r;SpiderMain()});spider.gadget={defaultFont:null,objects:new spider.object(D),optionGroupCount:0,lastType:null,register:function(e,f,g,k){this.lastType=f;e.type=f;e.div=g;e.gadget=k;e.windowId=spider.window.currentWindowId;e.userData=0;k.spiderId=e.id;spider.window.gadgetList.get().appendChild(g)},freeWindowGadgets:function(e){this.objects.EnumerateAll(function(f,g){g.windowId==e&&D(f)})}};window.spider_InitGadget=function(){};window.spider_AddGadgetColumn=function(e,f,g,k){var n;(n=spider.gadget.objects.Get(e))&&
n.AddColumn&&n.AddColumn(f,g,k)};window.spider_AddGadgetItem=function(e,f,g,k,n){"undefined"===typeof k&&(k=null);"undefined"===typeof n&&(n=0);var m;(m=spider.gadget.objects.Get(e))&&m.AddItem&&m.AddItem(f,g,k,n)};window.spider_BindGadgetEvent=function(e,f,g){"undefined"===typeof g&&(g=-1);var k;(k=spider.gadget.objects.Get(e))&&spider_BindEvent(1,f,k.windowId,k.id,g)};window.spider_ButtonGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b=new (c&
16?dijit.form.ToggleButton:dijit.form.Button)({label:m,showLabel:!0,onClick:function(){r(d,0)}}),h=document.createElement("div");h.appendChild(b.domNode);c&16?(b.attr("iconClass","dijitCheckBoxIcon"),$(b.focusNode).css("display","table-cell")):$(b.containerNode).css("display","table-cell");c&8&&$(b.containerNode).css("white-space","normal");c&2?($(b.containerNode).css("text-align","left"),$(b.containerNode).css("padding-left","5px")):c&1&&($(b.containerNode).css("text-align","right"),$(b.containerNode).css("padding-right",
"5px"));d.GetText=function(){return b.get("label")};d.SetText=function(a){b.set("label",a)};d.GetState=function(){return c&16?b.get("checked")?1:0:0};d.SetState=function(a){c&16&&b.set("checked",a)};d.GetRequiredSize=function(){var a=$(h).css("fontSize")+" "+$(h).css("fontFamily"),a=y(d,a,d.GetText());a.width+=16;a.height+=8;return a};d.Resize=function(a,d,e,p){s(h,a,d,e,p);a=A(h,"span","dijitButtonNode");a=u(a);$(b.titleNode).width(e-a.x);$(b.titleNode).height(p-a.y);0===(c&16)&&($(b.containerNode).width(e-
a.x),$(b.containerNode).height(p-a.y))};spider.gadget.register(d,1,h,b);d.Resize(f,g,k,n);return d.resultId};window.spider_ButtonImageGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b=new (c&16?dijit.form.ToggleButton:dijit.form.Button)({label:"",showLabel:!1,iconClass:spider.image.GetCSS(m),onClick:function(){r(d,0)}});d.image=m;var h=document.createElement("div");h.appendChild(b.domNode);$(b.titleNode).css("display","table-cell");d.GetState=function(){return c&
16?b.get("checked")?1:0:0};d.SetState=function(a){c&16&&b.set("checked",a)};d.GetAttribute=function(a){switch(a){case 1:return d.image?d.image:0}return 0};d.SetAttribute=function(a,c){switch(a){case 1:b.attr("iconClass",spider.image.GetCSS(c)),d.image=c}};d.Resize=function(a,c,d,e){s(h,a,c,d,e);a=A(h,"span","dijitButtonNode");a=u(a);$(b.titleNode).width(d-a.x);$(b.titleNode).height(e-a.y)};spider.gadget.register(d,19,h,b);d.Resize(f,g,k,n);return d.resultId};window.spider_CalendarGadget=function(e,
f,g,k,n,m,c){function d(a){return new Date(spider_Year(a),spider_Month(a)-1,spider_Day(a))}function b(a){return spider_Date(a.getFullYear(),a.getMonth()+1,a.getDate(),0,0,0)}"undefined"===typeof m&&(m=spider_Date());"undefined"===typeof c&&(c=0);var h=spider.gadget.objects.Allocate(e),a=new dijit.Calendar({constraints:{min:new Date(1970,0,0),max:new Date(2035,0,0)},isDisabledDate:function(b){if(a&&!h.isDisabled){var c=a.attr("constraints");return!(b>=c.min&&b<=c.max)}return!0},onChange:function(){r(h,
9)}}),l=document.createElement("div");l.spiderId=h.id;l.appendChild(a.domNode);h.Disable=function(b){h.isDisabled=b;a._populateGrid()};h.GetState=function(){var c=a.get("value");return b(c)};h.SetState=function(b){a.set("value",d(b))};h.GetAttribute=function(c){switch(c){case 1:return b(a.attr("constraints").min);case 2:return b(a.attr("constraints").max)}return 0};h.SetAttribute=function(b,c){var h=a.attr("constraints");switch(b){case 1:h.min=d(c);a.attr("constraints",h);a._populateGrid();break;
case 2:h.max=d(c),a.attr("constraints",h),a._populateGrid()}};h.SetActive=function(){var a=A(l,"span","dijitDownArrowButton");spider.DigitFocus.focus(a)};h.GetRequiredSize=function(){return{width:180,height:230}};h.Resize=function(b,c,d,h){var e=u(a.domNode);s(l,b,c,d,h);v(a,0,0,d-e.x,h-e.y)};spider.gadget.register(h,2,l,a);h.Resize(f,g,k,n);h.SetState(m);a._populateGrid();return h.resultId};window.spider_CanvasGadget=function(e,f,g,k,n,m){"undefined"===typeof m&&(m=0);var c=spider.gadget.objects.Allocate(e),
d=document.createElement("canvas");c.canvas=d;c.mouseX=0;c.mouseY=0;c.mouseWheelDelta=0;c.buttons=0;c.lastKey=0;c.lastInput=0;c.modifiers=0;m&4&&d.setAttribute("tabindex","0");$(d).on({click:function(){r(c,0)},dblclick:function(){r(c,2)},mouseover:function(b){r(c,65537)},mouseout:function(b){r(c,65538)},mousemove:function(b){var a=d.getBoundingClientRect();c.mouseX=b.clientX-a.left;c.mouseY=b.clientY-a.top;r(c,65539)},mousedown:function(b){var a;0===b.button?(a=65540,c.buttons|=1):1===b.button?(a=
65544,c.buttons|=4):2===b.button&&(a=65542,c.buttons|=2);r(c,a);if(1===b.button)return!1},mouseup:function(b){var a;0===b.button?(a=65541,c.buttons&=-2):1===b.button?(a=65545,c.buttons&=-5):2===b.button&&(r(c,1),2===b.originalEvent.detail&&r(c,3),a=65543,c.buttons&=-3);r(c,a)},focus:function(){r(c,7)},blur:function(){r(c,8)},wheel:function(b){b=b.originalEvent;c.mouseWheelDelta=0>b.deltaY?1:-1;r(c,65546);return!1},keydown:function(b){c.lastKey=b.keyCode;16==b.keyCode&&(c.modifiers|=1);17==b.keyCode&&
(c.modifiers|=4);18==b.keyCode&&(c.modifiers|=2);r(c,65547)},keyup:function(b){c.lastKey=b.keyCode;16==b.keyCode&&(c.modifiers&=-2);17==b.keyCode&&(c.modifiers&=-5);18==b.keyCode&&(c.modifiers&=-3);r(c,65548)},keypress:function(b){c.lastInput=b.which;c.lastInput&&r(c,65549)}});var b=document.createElement("div");b.appendChild(d);m&1&&$(b).addClass("sbCanvasBorder");c.Disable=function(b){};c.GetAttribute=function(b){switch(b){case 1:return d;case 4:return c.buttons;case 2:return c.mouseX;case 3:return c.mouseY;
case 8:return c.mouseWheelDelta;case 5:return c.lastKey;case 9:return c.lastInput;case 6:return c.modifiers}};c.SetAttribute=function(b,a){switch(b){case 1:d.getContext("2d").drawImage(a,0,0);break;case 7:switch(c.cursor=a,a){case 0:d.style.cursor="default";c.cursor=-1;break;case 3:d.style.cursor="pointer";break;case 1:d.style.cursor="crosshair";break;case 2:d.style.cursor="text";break;case 4:d.style.cursor="wait";break;case 5:d.style.cursor="no-drop";break;case 6:d.style.cursor="move";break;case 7:d.style.cursor=
"w-resize";break;case 6:d.style.cursor="s-resize";break;case 8:d.style.cursor="se-resize";break;case 9:d.style.cursor="sw-resize";break;case 10:d.style.cursor="none"}}};c.Resize=function(c,a,e,f){var p=u(b);if(d.width!=e-p.x||d.height!=f-p.y)if(d.width=e-p.x,d.height=f-p.y,0===(m&16)){var g=d.getContext("2d");g.fillStyle="#FFF";g.fillRect(0,0,d.width,d.height)}s(b,c,a,e-p.x,f-p.y)};spider.gadget.register(c,33,b,d);c.Resize(f,g,k,n);return c.resultId};window.spider_CanvasOutput=function(e){var f;return(f=
spider.gadget.objects.Get(e))?{gadget:f,canvas:f.canvas,context:f.canvas.getContext("2d"),stopDrawingCallback:null}:0};window.spider_CanvasVectorOutput=function(e,f){"undefined"===typeof f&&(f=1);var g;return(g=spider.gadget.objects.Get(e))?{gadget:g,canvas:g.canvas,inputUnit:1,outputUnit:f,stopDrawingCallback:null}:0};window.spider_CheckBoxGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e);e="spidercheckbox_"+d.id;var b=new dijit.form.CheckBox({id:e,
onClick:function(){r(d,0)}}),h=document.createElement("div"),a=document.createElement("span");a.className="sbVerticalCenter";h.appendChild(a);a.appendChild(b.domNode);var l=put(a,"label",{htmlFor:e});$(l).css("padding-left","5px");$(l).css("display","inline-block");b.label=l;c&1?$(l).css("text-align","right"):c&2&&$(l).css("text-align","center");d.Disable=function(a){$(l).css("color",a?"gray":"");b.set("disabled",a?!0:!1)};d.GetState=function(){return b.get("checked")?1:0};d.SetState=function(a){-1==
a?b.set("value","mixed"):b.set("checked",a)};d.GetText=function(){return l.innerHTML};d.SetText=function(b){l.innerHTML=b;""===b?a.removeChild(l):a.appendChild(l)};d.GetRequiredSize=function(){var a=$(h).css("fontSize")+" "+$(h).css("fontFamily"),a=y(d,a,d.GetText());a.width+=28;a.height+=6;return a};d.Resize=function(c,d,e,f){s(h,c,d,e,f);$(a).width(e);$(a).height(f);$(l).width(e-$(b.domNode).outerWidth(!0)-5)};spider.gadget.register(d,4,h,b);b.startup();d.SetText(m);d.Resize(f,g,k,n);return d.resultId};
window.spider_ClearGadgetItems=function(e){var f;(f=spider.gadget.objects.Get(e))&&f.ClearItems&&f.ClearItems()};window.spider_CloseGadgetList=function(){spider.window.gadgetList.pop()};window.spider_ComboBoxGadget=function(e,f,g,k,n,m){"undefined"===typeof m&&(m=0);var c=spider.gadget.objects.Allocate(e),d=0,b=spider_NewList(function(){return{id:null,text:null}}),h=new spider.StoreMemory,a=new dijit.form.ComboBox({store:h,onChange:function(){r(c,9)},onFocus:function(){spider.DigitFocus.focus(a.focusNode);
r(c,7)},onBlur:function(){r(c,8)}});m&1||$(a.focusNode).attr("readOnly",!0);var l=document.createElement("div");l.appendChild(a.domNode);$(a._buttonNode).css("height","100%");var q=-1;a.watch("item",function(a,b,c){c&&(q=c.id)});c.GetState=function(){return q};c.SetState=function(b){a.set("value",h.get(b).name);q=b};c.GetText=function(){return a.get("value")};c.SetText=function(b){a.set("value",b);q=-1};c.AddItem=function(a,c,e,l){-1==a&&(a=spider_ListSize(b));0>=a?spider_ResetList(b):spider_SelectElement(b,
a-1);a=spider_AddElement(b);a.id=d;a.text=c;a.imageId=e;h.add({name:"",id:d});c=spider_ListIndex(b);do h.put({name:a.text},h.get(c)),c++;while(a=spider_NextElement(b));d++};c.ClearItems=function(){spider_ClearList(b);h=new spider.StoreMemory;a.set("store",h);d=0};c.CountItems=function(){return spider_ListSize(b)};c.SetColor=function(b,d){B(c,a.focusNode.parentNode,a.focusNode,b,d)};c.GetItemData=function(a){var c;return(c=spider_SelectElement(b,a))?c.data?c.data:0:0};c.SetItemData=function(a,c){var d;
if(d=spider_SelectElement(b,a))d.data=c};c.GetItemText=function(a,c){var d;return(d=spider_SelectElement(b,a))?d.text:""};c.SetItemText=function(a,c,d){if(d=spider_SelectElement(b,a))d.text=c,a=h.get(a),a.name=c,h.put(a)};c.GetRequiredSize=function(){var a=$(l).css("fontSize")+" "+$(l).css("fontFamily"),a=y(c,a,"Hg");a.width=50;a.height+=5;return a};c.Resize=function(b,c,d,e){s(l,b,c,d,e);b=u(a.domNode);v(a,0,0,d-b.x,e-b.y);"claro"==spider.gadgetTheme?$(a.focusNode).height(e-b.y-2):$(a.focusNode).height(e-
b.y)};spider.gadget.register(c,8,l,a);c.Resize(f,g,k,n);return c.resultId};window.spider_ContainerGadget=function(e,f,g,k,n,m){var c=spider.gadget.objects.Allocate(e);"undefined"===typeof m&&(m=0);var d=new dijit.layout.ContentPane({style:"overflow: hidden; padding: 0px;",content:""}),b=document.createElement("div");d.placeAt(b);m&1?$(b).addClass("sbContainerBorder"):m&4?$(b).addClass("sbContainerBorderSingle"):m&2?$(b).addClass("sbContainerBorderRaised"):m&8&&$(b).addClass("sbContainerBorderDouble");
c.GetColor=function(b){return 2==b?c.backColor?c.backColor:-1:-1};c.SetColor=function(d,a){2==d&&($(b).css("background-color",spider_helper_ColorToHtml(a)),c.backColor=a)};c.Resize=function(c,a,e,f){var g=u(b);s(b,c,a,e,f);v(d,0,0,e-g.x,f-g.y);d.resize()};spider.DojoAspect.after(d,"resize",function(b,a){r(c,0)});spider.gadget.register(c,11,b,d);spider.window.gadgetList.push(d.domNode);c.Resize(f,g,k,n);return c.resultId};window.spider_CountGadgetItems=function(e){var f;return(f=spider.gadget.objects.Get(e))&&
f.CountItems?f.CountItems():0};window.spider_DateGadget=function(e,f,g,k,n,m,c,d){function b(a){a=spider_ReplaceString(a,"%yyyy","yyyy");a=spider_ReplaceString(a,"%mm","MM");return a=spider_ReplaceString(a,"%dd","dd")}function h(a){return new Date(spider_Year(a),spider_Month(a)-1,spider_Day(a))}function a(a){return spider_Date(a.getFullYear(),a.getMonth()+1,a.getDate(),0,0,0)}"undefined"===typeof m&&(m="%yyyy/%mm/%dd");"undefined"===typeof c&&(c=spider_Date());"undefined"===typeof d&&(d=0);var l=
spider.gadget.objects.Allocate(e),q,p=new dijit.form.DateTextBox({constraints:{min:new Date(1970,0,0),max:new Date(2035,0,0),datePattern:b(m)},onChange:function(){r(l,9)}});$(p._buttonNode).css("height","100%");var w=document.createElement("div");d&2&&(q=new dijit.form.CheckBox({onClick:function(){debug("ok");q.get("checked")?l.SetState(p.get("value")):l.SetState(0)}}),w.appendChild(q.domNode),$(p.domNode).css("margin-left",5));w.appendChild(p.domNode);l.Disable=function(a){C(l,p.focusNode.parentNode,
p.focusNode,a)};l.GetText=function(){return d&2&&!1===q.get("checked")?"":p.get("displayedValue")};l.SetText=function(a){var c=p.get("value");p.attr("constraints").datePattern=b(a);p.set("value",c)};l.GetState=function(){return d&2&&!1===q.get("checked")?0:a(p.get("value"))};l.SetState=function(a){if(d&2){var b=0===a;l.Disable(b);q.set("checked",!b)}0!==(d&2)&&0===a||p.set("value",h(a))};l.GetAttribute=function(b){switch(b){case 1:return a(p.attr("constraints").min);case 2:return a(p.attr("constraints").max)}return 0};
l.SetAttribute=function(a,b){var c=p.attr("constraints");switch(a){case 1:c.min=h(b);p.attr("constraints",c);break;case 2:c.max=h(b),p.attr("constraints",c)}};l.GetColor=function(a){switch(a){case 2:return l.backColor?l.backColor:-1;case 1:return l.frontColor?l.frontColor:-1}return-1};l.SetColor=function(a,b){B(l,p.focusNode.parentNode,p.focusNode,a,b)};l.GetRequiredSize=function(){var a=$(w).css("fontSize")+" "+$(w).css("fontFamily"),a=y(l,a,"Hg");a.width=60;a.height+=5;return a};l.Resize=function(a,
b,c,d){s(w,a,b,c,d);a=u(p._popupStateNode);v(p,0,0,c-a.x,d-a.y);$(p.domNode).height(d-a.y);"claro"==spider.gadgetTheme?$(p.focusNode).height(d-a.y-2):$(p.focusNode).height(d-a.y)};spider.gadget.register(l,2,w,p);l.SetState(c);l.Resize(f,g,k,n);return l.resultId};window.spider_DisableGadget=function(e,f){var g;if(g=spider.gadget.objects.Get(e))g.Disable?g.Disable(f):g.gadget.set("disabled",f?!0:!1)};window.spider_EditorGadget=function(e,f,g,k,n,m){"undefined"===typeof m&&(m=0);var c=spider.gadget.objects.Allocate(e),
d=new dijit.form.SimpleTextarea({style:"overflow: auto; resize: none;",intermediateChanges:!0,onChange:function(){r(c,9)},onFocus:function(){spider.DigitFocus.focus(d.focusNode);r(c,7)},onBlur:function(){r(c,8)}});e=d.domNode;var b=document.createElement("div");b.appendChild(e);c.editor=d;m&2||$(d.focusNode).attr("wrap","off");m&1&&$(d.focusNode).attr("readOnly",!0);c.Disable=function(b){C(c,d.focusNode,d.focusNode,b)};c.GetText=function(){return d.get("value")};c.SetText=function(b){d.set("value",
b)};c.GetAttribute=function(b){switch(b){case 2:return"off"==$(d.focusNode).attr("wrap")?0:1;case 1:return $(d.focusNode).attr("readOnly")?1:0}return 0};c.SetAttribute=function(b,a){switch(b){case 2:$(d.focusNode).attr("wrap",a?"":"off");break;case 1:$(d.focusNode).attr("readOnly",a?!0:!1)}};c.GetColor=function(b){switch(b){case 2:return c.backColor?c.backColor:-1;case 1:return c.frontColor?c.frontColor:-1}return-1};c.SetColor=function(b,a){B(c,d.focusNode,d.focusNode,b,a)};c.SetGadgetFont=function(b){$(d.focusNode).css("fontFamily",
b.family);$(d.focusNode).css("fontSize",b.size)};c.Resize=function(c,a,e,f){s(b,c,a,e,f);c=u(d.focusNode);v(d,0,0,e-c.x,f-c.y)};spider.gadget.register(c,22,b,d);c.Resize(f,g,k,n);return c.resultId};window.spider_FrameGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);e=spider.gadget.objects.Allocate(e);var d=document.createElement("fieldset");$(d).css("margin",0);$(d).addClass("sbFrameBorder");var b=document.createElement("div");b.appendChild(d);var h=document.createElement("legend");e.legend=
h;e.GetText=function(){return h.innerHTML};e.SetText=function(a){h.innerHTML=a;""===a?d.hasChildNodes()&&d.removeChild(h):d.appendChild(h)};e.GetRequiredSize=function(){var a={width:0,height:0};$.each($(b).children(),function(b,c){a.width+=$(c).outerWidth(!0);a.height+=$(c).outerHeight(!0)});var c=u(d);a.width-=c.x;a.height-=c.y;return a};e.Resize=function(a,c,e,f){s(b,a,c,e,f);a=u(d);s(d,0,0,e-a.x,f-a.y)};e.SetText(m);spider.gadget.register(e,7,b,d);e.Resize(f,g,k,n);return e.resultId};window.spider_FreeGadget=
D;window.spider_GadgetHeight=I;window.spider_GadgetID=function(e){var f;return(f=spider.gadget.objects.Get(e))?f:null};window.spider_GadgetToolTip=function(e,f){var g;if(g=spider.gadget.objects.Get(e))g.tooltip||(g.tooltip=new dijit.Tooltip({connectId:g.div})),g.tooltip.set("label",f)};window.spider_GadgetType=function(e){if(e=spider.gadget.objects.Get(e))return e.type};window.spider_GadgetWidth=J;window.spider_GadgetX=K;window.spider_GadgetY=L;window.spider_GetActiveGadget=function(){var e=-1,f;
f=spider.DigitFocus.curNode;for(var g;!g&&f;)f.hasOwnProperty("spiderId")?g=f:(g=spider.DigitRegistry.byNode(f),f=f.parentElement?f.parentElement:null,g&&!g.hasOwnProperty("spiderId")&&(g=null));(f=g)&&f.hasOwnProperty("spiderId")&&(e=f.spiderId);return e};window.spider_GetGadgetAttribute=function(e,f){var g;return(g=spider.gadget.objects.Get(e))&&g.GetAttribute?g.GetAttribute(f):0};window.spider_GetGadgetColor=function(e,f){var g;return(g=spider.gadget.objects.Get(e))&&g.GetColor?g.GetColor(f):0};
window.spider_GetGadgetData=function(e){var f;return(f=spider.gadget.objects.Get(e))?f.userData:0};window.spider_GetGadgetItemAttribute=function(e,f,g,k){"undefined"===typeof k&&(k=-1);var n;return(n=spider.gadget.objects.Get(e))&&n.GetItemAttribute?n.GetItemAttribute(f,g,k):0};window.spider_GetGadgetItemData=function(e,f){var g;return(g=spider.gadget.objects.Get(e))&&g.GetItemData?g.GetItemData(f):0};window.spider_GetGadgetItemState=function(e,f){var g;return(g=spider.gadget.objects.Get(e))&&g.GetItemState?
g.GetItemState(f):0};window.spider_GetGadgetItemText=function(e,f,g){"undefined"===typeof g&&(g=-1);var k;return(k=spider.gadget.objects.Get(e))&&k.GetItemText?k.GetItemText(f,g):""};window.spider_GetGadgetState=function(e){var f;return(f=spider.gadget.objects.Get(e))&&f.GetState?f.GetState():0};window.spider_GetGadgetText=function(e){var f;return(f=spider.gadget.objects.Get(e))&&f.GetText?f.GetText():""};window.spider_HideGadget=function(e,f){var g;(g=spider.gadget.objects.Get(e))&&$(g.div).css("display",
f?"none":"block")};window.spider_HyperLinkGadget=function(e,f,g,k,n,m,c,d){"undefined"===typeof d&&(d=0);var b=spider.gadget.objects.Allocate(e),h=document.createElement("a");h.innerHTML=m;h.href="";0===(d&1)&&$(h).css("text-decoration","none");$(h).on("click",function(a){a.preventDefault();a.stopPropagation();r(b,0)});var a=document.createElement("div"),l=document.createElement("span");l.className="sbVerticalCenter";a.appendChild(l);l.appendChild(h);b.GetText=function(){return h.innerHTML};b.SetText=
function(a){h.innerHTML=a};b.GetColor=function(a){switch(a){case 2:return b.backColor?b.backColor:-1;case 1:return b.frontColor?b.frontColor:-1}return-1};b.SetColor=function(c,d){switch(c){case 2:$(a).css("background-color",spider_helper_ColorToHtml(d));b.backColor=d;break;case 1:h.style.color=spider_helper_ColorToHtml(d),b.frontColor=d}};b.GetRequiredSize=function(){var c=$(a).css("fontSize")+" "+$(a).css("fontFamily"),c=y(b,c,b.GetText());c.width+=16;c.height+=8;return c};b.Resize=function(b,c,
d,e){s(a,b,c,d,e);$(l).width(d);$(l).height(e)};spider.gadget.register(b,10,a,h);b.SetColor(c);b.Resize(f,g,k,n);return b.resultId};window.spider_ImageGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b=document.createElement("div"),h=document.createElement("canvas");put(b,h);c&2&&$(b).addClass("sbImageBorder");$(b).on({click:function(){r(d,0)},dblclick:function(){r(d,2)},mouseup:function(a){3===a.which&&1===a.originalEvent.detail&&r(d,1)}});d.GetState=
function(){return d.image};d.SetState=function(a){a&&(h.width!=a.width&&(h.width=a.width),h.height!=a.height&&(h.height=a.height),h.getContext("2d").drawImage(a,0,0));d.image=a};d.Resize=function(a,c,d,e){var f=u(b);s(b,a,c,d-f.x,e-f.y)};d.Free=function(){h.remove();h=null;b.parentNode&&b.remove()};spider.gadget.register(d,9,b,b);d.Resize(f,g,k,n);d.SetState(m);return d.resultId};window.spider_IsGadget=function(e){var f;return(f=spider.gadget.objects.Get(e))&&f.div.parentNode?1:0};window.spider_ListIconGadget=
function(e,f,g,k,n,m,c,d){function b(a,b){for(var c=a;c<=b;c++)p.put({id:c})}function h(){for(var a=0;a<x.length;a++)x[a].field=""+a,x[a].index=a;t.set("columns",x);t.resize()}"undefined"===typeof d&&(d=0);var a=spider.gadget.objects.Allocate(e),l=spider_NewList(function(){return{id:null,text:null}}),q=spider.DojoBaseDeclare([spider.DStoreMemory,spider.DStoreTrackable]),p=new q,w=d,t,x=[],E="single",z=document.createElement("div");z.spiderId=a.id;e=spider.DojoBaseDeclare([spider.DGridOnDemandGrid,
spider.DGridKeyboard,spider.DGridSelection,spider.DGridColumnResizer]);d&2&&(E="extended");t=new e({showHeader:!0,collection:p,selectionMode:E});t.on("dgrid-select",function(b){r(a,9)});z.appendChild(t.domNode);$(z).css("cursor","default");$(z).on({click:function(){r(a,0)},dblclick:function(){r(a,2)},mouseup:function(b){3===b.which&&(2===b.originalEvent.detail?r(a,3):r(a,1))}});a.Disable=function(b){(a.isDisabled=b)&&!a.previousSelection&&(a.previousSelection=a.GetState());t.set("allowTextSelection",
b?!1:!0);t.set("selectionMode",b?"none":E);b||(a.previousSelection&&a.SetState(a.previousSelection),a.previousSelection=null)};a.AddItem=function(c,d,e,f){-1==c&&(c=spider_ListSize(l));0>=c?spider_ResetList(l):spider_SelectElement(l,c-1);c=spider_AddElement(l);c.text=d;w&1&&(c.checkBox=new dijit.form.CheckBox({onClick:function(){r(a,9)}}));e&&(c.image=e);d=spider_ListIndex(l);p.add({id:spider_ListSize(l)-1});b(d,spider_ListSize(l)-1)};a.RemoveItem=function(c){var d=spider_ListSize(l);if(d>c&&0<=c){var e=
a.GetState();e>c&&a.SetState(e-1);spider_SelectElement(l,c);spider_DeleteElement(l);p.remove(d-1);b(c,d-2)}};a.ClearItems=function(){spider_ClearList(l);p=new q;t.set("collection",p)};a.CountItems=function(){return spider_ListSize(l)};a.AddColumn=function(a,b,c){x.splice(a,0,{field:"",index:0,label:b,width:c,sortable:!1,renderCell:function(a,b,c,d){b=spider_SelectElement(l,a.id);a=put("div");0===this.index&&(b.checkBox&&(c=put("div"),$(c).css("float","left"),$(c).css("padding-right","8px"),put(c,
b.checkBox.domNode),a.appendChild(c)),b.image&&(c=put("div"),$(c).css("float","left"),$(c).css("padding-right","8px"),c.className=spider.image.GetCSS(b.image),a.appendChild(c)));b=put("div",spider_StringField(b.text,this.index+1,spider_Chr(10)));$(b).css("white-space","nowrap");a.appendChild(b);return a}});h()};a.RemoveColumn=function(a){x.splice(a,1);h()};a.GetState=function(){var b=-1;if(a.previousSelection)b=a.previousSelection;else for(var c in t.selection){b=c;break}return+b};a.SetState=function(a){t.clearSelection();
t.select(a);t.scrollTo({y:t.rowHeight*a})};a.GetText=function(){var b=a.GetState();return-1!=b?spider_SelectElement(l,b).text:""};a.SetText=function(b){var c;for(spider_ResetList(l);c=spider_NextElement(l);)if(c.text==b){a.SetState(spider_ListIndex(l));break}};a.SetActive=function(){0<x.length&&x[0].headerNode.focus()};a.GetItemAttribute=function(a,b,c){return 1==b?x[c].width:0};a.SetItemAttribute=function(a,b,c,d){1==b&&(x[d].width=c,h())};a.GetItemState=function(a){var b=0,c=spider_SelectElement(l,
a);c.checkBox&&c.checkBox.get("checked")&&(b|=2);t.isSelected(a)&&(b|=1);return b};a.SetItemState=function(a,b){var c=spider_SelectElement(l,a);c.checkBox&&c.checkBox.set("checked",b&2?!0:!1);b&1?t.select(a):t.deselect(a)};a.GetItemData=function(a){var b;return(b=spider_SelectElement(l,a))?b.data?b.data:0:0};a.SetItemData=function(a,b){var c;if(c=spider_SelectElement(l,a))c.data=b};a.GetItemText=function(a,b){var c;return-1==a?(-1==b&&(b=0),x[b].label):(c=spider_SelectElement(l,a))?-1!=b?spider_StringField(c.text,
b+1,spider_Chr(10)):c.text:""};a.SetItemText=function(a,c,d){var e;if(-1==a)-1==d&&(d=0),x[d].label=c,h();else if(e=spider_SelectElement(l,a)){if(-1!=d){var f=e.text.split(spider_Chr(10));f[d]=c;e.text=f.join(spider_Chr(10))}else e.text=c;b(a,a)}};a.GetColor=function(b){switch(b){case 2:return a.backColor?a.backColor:-1;case 1:return a.frontColor?a.frontColor:-1}return-1};a.SetColor=function(b,c){switch(b){case 2:$(z).find("div").each(function(){if("dgrid-scroller"==$(this).attr("class"))return $(this).css("background-color",
spider_helper_ColorToHtml(c)),!1});a.backColor=c;break;case 1:$(z).find("div").each(function(){if("dgrid-scroller"==$(this).attr("class"))return $(this).css("color",spider_helper_ColorToHtml(c)),!1}),a.frontColor=c}};a.Resize=function(a,b,c,d){s(z,a,b,c,d);a=u(t.domNode);v(t,0,0,c-a.x,d-a.y)};a.AddColumn(0,m,c);spider.gadget.register(a,12,z,t);a.Resize(f,g,k,n);var y=setInterval(function(){$(z).is(":visible")&&(clearInterval(y),t.startup(),t.resize())},10);return a.resultId};window.spider_ListViewGadget=
function(e,f,g,k,n,m){function c(){a=spider_NewList(function(){return{id:null,text:null}});l=new (spider.DojoBaseDeclare([spider.DStoreMemory,spider.DStoreTrackable]));q.set("collection",l)}function d(a,b){for(var c=a;c<=b;c++)l.put({id:c})}"undefined"===typeof m&&(m=0);var b=spider.gadget.objects.Allocate(e),h="single",a,l,q,p=document.createElement("div");$(p).css("cursor","default");p.spiderId=b.id;e=spider.DojoBaseDeclare([spider.DGridOnDemandGrid,spider.DGridKeyboard,spider.DGridSelection]);
m&1?h="extended":m&2&&(h="toggle");q=new e({showHeader:!1,selectionMode:h,keepScrollPosition:!0,columns:[{renderCell:function(b,c,d,e){$(d).css("border","0px");c=spider_SelectElement(a,b.id);c=put("div",c.text);$(c).css("padding","1px");c.id=b.id;return c}}]});q.on("dgrid-select",function(a){r(b,9)});c();p.appendChild(q.domNode);$(p).on({click:function(){r(b,0)},dblclick:function(){r(b,2)},mouseup:function(a){3===a.which&&(2===a.originalEvent.detail?r(b,3):r(b,1))}});b.Disable=function(a){(b.isDisabled=
a)&&!b.previousSelection&&(b.previousSelection=b.GetState());q.set("allowTextSelection",a?!1:!0);q.set("selectionMode",a?"none":h);a||(b.previousSelection&&b.SetState(b.previousSelection),b.previousSelection=null)};b.AddItem=function(b,c,e,f){-1==b&&(b=spider_ListSize(a));0>=b?spider_ResetList(a):spider_SelectElement(a,b-1);spider_AddElement(a).text=c;b=spider_ListIndex(a);l.add({id:spider_ListSize(a)-1});d(b,spider_ListSize(a)-1)};b.RemoveItem=function(c){var e=spider_ListSize(a);if(e>c&&0<=c){var f=
b.GetState();f>c&&b.SetState(f-1);spider_SelectElement(a,c);spider_DeleteElement(a);l.remove(e-1);d(c,e-2)}};b.ClearItems=function(){c()};b.CountItems=function(){return spider_ListSize(a)};b.GetState=function(){var a=-1;if(b.previousSelection)a=b.previousSelection;else for(var c in q.selection){a=c;break}return+a};b.SetState=function(a){q.clearSelection();q.select(a);q.scrollTo({y:q.rowHeight*a})};b.GetText=function(){var c=b.GetState();return-1!=c?spider_SelectElement(a,c).text:""};b.SetText=function(c){var d;
for(spider_ResetList(a);d=spider_NextElement(a);)if(d.text==c){b.SetState(spider_ListIndex(a));break}};b.GetItemState=function(a){return q.isSelected(a)?1:0};b.SetItemState=function(a,b){b?q.select(a):q.deselect(a)};b.GetItemData=function(b){var c;return(c=spider_SelectElement(a,b))?c.data?c.data:0:0};b.SetItemData=function(b,c){var d;if(d=spider_SelectElement(a,b))d.data=c};b.GetItemText=function(b,c){var d;return(d=spider_SelectElement(a,b))?d.text:""};b.SetItemText=function(b,c,e){if(e=spider_SelectElement(a,
b))e.text=c,d(b,b)};b.GetColor=function(a){switch(a){case 2:return b.backColor?b.backColor:-1;case 1:return b.frontColor?b.frontColor:-1}return-1};b.SetColor=function(a,c){switch(a){case 2:$(p).find("div").each(function(){if("dgrid-scroller"==$(this).attr("class"))return $(this).css("background-color",spider_helper_ColorToHtml(c)),!1});b.backColor=c;break;case 1:$(p).css("color",spider_helper_ColorToHtml(c)),b.frontColor=c}};b.Resize=function(a,b,c,d){s(p,a,b,c,d);a=u(q.domNode);v(q,0,0,c-a.x,d-a.y);
$(p).find("div").each(function(){if("dgrid-content ui-widget-content"==$(this).attr("class"))return $(this).css("width","100%"),!1})};spider.gadget.register(b,6,p,q);q.startup();$(p).find("div").each(function(){if("dgrid-scroller"==$(this).attr("class"))return $(this).css("overflow-y","auto"),!1});b.Resize(f,g,k,n);return b.resultId};window.spider_OpenGadgetList=function(e,f){var g,k;if(g=spider.gadget.objects.Get(e)){switch(g.type){case 16:k=g.contentPane.domNode;break;case 11:k=g.gadget.domNode;
break;case 28:if(g=g.getPanelChild(f))k=g.domNode}k&&spider.window.gadgetList.push(k)}};window.spider_OptionGadget=function(e,f,g,k,n,m){var c=spider.gadget.objects.Allocate(e);e="spideroption_"+c.id;5!=spider.gadget.lastType&&spider.gadget.optionGroupCount++;var d=new dijit.form.RadioButton({id:e,name:"spideroptiongroup"+spider.gadget.optionGroupCount,onChange:function(){r(c,0)}}),b=document.createElement("div"),h=document.createElement("span");h.className="sbVerticalCenter";b.appendChild(h);h.appendChild(d.domNode);
var a=put(h,"label",{htmlFor:e,innerHTML:m});$(a).css("padding-left","5px");c.Disable=function(b){$(a).css("color",b?"gray":"");d.set("disabled",b?!0:!1)};c.GetState=function(){return d.get("checked")?1:0};c.SetState=function(a){d.set("checked",a)};c.GetText=function(){return a.innerHTML};c.SetText=function(b){a.innerHTML=b};c.GetRequiredSize=function(){var a=$(b).css("fontSize")+" "+$(b).css("fontFamily"),a=y(c,a,c.GetText());a.width+=28;a.height+=6;return a};c.Resize=function(a,c,d,e){s(b,a,c,d,
e);$(h).width(d);$(h).height(e)};spider.gadget.register(c,5,b,d);c.Resize(f,g,k,n);return c.resultId};window.spider_PanelGadget=function(e,f,g,k,n){function m(a){var b=d.getChildren();return 0<=a&&a<b.length?b[a]:null}var c=spider.gadget.objects.Allocate(e),d=new dijit.layout.TabContainer({doLayout:!0}),b=document.createElement("div");b.appendChild(d.domNode);d.watch("selectedChildWidget",function(a,b,d){r(c,9)});var h=function(){$(b).find("div").each(function(){if("dijitTabListWrapper"==spider_Left($(this).attr("class"),
19))return-2==$(this).cssValue("left")&&($(this).css("left","0px"),$(this).css("top","1px")),!1})};c.getPanelChild=m;c.AddItem=function(a,b,c,e){a=new dijit.layout.ContentPane({title:b,iconClass:c?spider.image.GetCSS(c):null});d.addChild(a);spider.window.gadgetList.set(a.domNode);d.startup();d.resize();h()};c.RemoveItem=function(a){var b=c.CountItems();0<=a&&a<b&&(a=m(a),d.removeChild(a),a.destroy(),d.startup(),d.resize(),h())};c.ClearItems=function(){for(var a=c.CountItems(),b=0;b<a;b++)c.RemoveItem(0)};
c.CountItems=function(){return d.getChildren().length};c.GetState=function(){for(var a=d.getChildren(),b=0;b<a.length;b++)if(a[b].get("selected"))return b;return-1};c.SetState=function(a){var b;(b=m(a))&&d.selectChild(b)};c.GetItemData=function(a){var b;return(b=m(a))&&b.spiderData?b.spiderData:0};c.SetItemData=function(a,b){var c;if(c=m(a))c.spiderData=b};c.GetItemText=function(a,b){var c;return(c=m(a))?c.get("title"):""};c.SetItemText=function(a,b,c){var d;(d=m(a))&&d.set("title",b)};c.SetItemImage=
function(a,b){var c;(c=m(a))&&c.set("iconClass",b?spider.image.GetCSS(b):null)};c.GetAttribute=function(a){var d,e=c.GetState();if(-1!=e&&(d=m(e)))switch(a){case 1:return $(d.domNode).width();case 2:return $(d.domNode).height();case 3:return $(b).height()-$(d.domNode).height()}return 0};c.Disable=function(a){for(var b=d.getChildren(),c=0;c<b.length;c++)b[c].set("disabled",a?!0:!1)};c.Resize=function(a,e,f,g){s(b,a,e,f,g);v(d,0,0,f,g);c.disableResize||d.resize();h()};spider.gadget.register(c,28,b,
d);c.disableResize=!0;c.Resize(f,g,k,n);c.disableResize=!1;spider.window.gadgetList.push(null);return c.resultId};window.spider_ProgressBarGadget=function(e,f,g,k,n,m,c,d){function b(){a.maximum=h.maximum-h.minimum}"undefined"===typeof d&&(d=0);var h=spider.gadget.objects.Allocate(e),a=new dijit.ProgressBar;$(a.labelNode).css("visibility","hidden");$(a.internalProgress).css("height","100%");var l=document.createElement("div");l.appendChild(a.domNode);h.minimum=m;h.maximum=c;b();h.GetState=function(){return a.get("value")+
h.minimum};h.SetState=function(b){a.set("value",b-h.minimum)};h.GetAttribute=function(a){switch(a){case 1:return h.minimum;case 2:return h.maximum}return 0};h.SetAttribute=function(a,c){switch(a){case 1:h.minimum=c;b();break;case 2:h.maximum=c,b()}};h.Resize=function(b,c,d,e){s(l,b,c,d,e);b=u(a.domNode);v(a,0,0,d-b.x,e-b.y)};spider.gadget.register(h,14,l,l);h.Resize(f,g,k,n);return h.resultId};window.spider_RemoveGadgetColumn=function(e,f){var g;(g=spider.gadget.objects.Get(e))&&g.RemoveColumn&&g.RemoveColumn(f)};
window.spider_RemoveGadgetItem=function(e,f){var g;(g=spider.gadget.objects.Get(e))&&g.RemoveItem&&g.RemoveItem(f)};window.spider_ResizeGadget=function(e,f,g,k,n){var m;if(m=spider.gadget.objects.Get(e))-65535==f&&(f=K(e)),-65535==g&&(g=L(e)),-65535==k&&(k=J(e)),-65535==n&&(n=I(e)),m.Resize&&m.Resize(f|0,g|0,k|0,n|0)};window.spider_ScrollAreaGadget=function(e,f,g,k,n,m,c,d,b){"undefined"===typeof d&&(d=1);"undefined"===typeof b&&(b=0);var h=spider.gadget.objects.Allocate(e),a=new dijit.layout.ContentPane({style:"overflow: hidden; padding: 0px;"}),
l=document.createElement("div");$(l).css("overflow","auto");b&8||$(l).addClass("sbScrollAreaBorder");a.placeAt(l);v(a,0,0,m,c);h.GetAttribute=function(b){switch(b){case 1:return $(a.domNode).width();case 2:return $(a.domNode).height();case 3:return l.scrollLeft;case 4:return l.scrollTop;case 5:return 1}return 0};h.SetAttribute=function(b,c){switch(b){case 1:$(a.domNode).width(c);break;case 2:$(a.domNode).height(c);break;case 3:l.scrollLeft=c;break;case 4:l.scrollTop=c}};h.GetColor=function(a){return 2==
a?h.backColor?h.backColor:-1:-1};h.SetColor=function(a,b){2==a&&($(l).css("background-color",spider_helper_ColorToHtml(b)),h.backColor=b)};h.Resize=function(a,b,c,d){var e=u(l);s(l,a,b,c-e.x,d-e.y)};spider.gadget.register(h,16,l,l);h.Resize(f,g,k,n);spider.window.gadgetList.push(a.domNode);h.contentPane=a;return h.resultId};window.spider_SetActiveGadget=function(e){if(e=spider.gadget.objects.Get(e))e.SetActive?e.SetActive():e.gadget instanceof dijit._WidgetBase&&spider.DigitFocus.focus(e.gadget.focusNode?
e.gadget.focusNode:e.gadget.domNode)};window.spider_SetGadgetAttribute=function(e,f,g){var k;(k=spider.gadget.objects.Get(e))&&k.SetAttribute&&k.SetAttribute(f,g)};window.spider_SetGadgetColor=function(e,f,g){var k;(k=spider.gadget.objects.Get(e))&&k.SetColor&&k.SetColor(f,g)};window.spider_SetGadgetData=function(e,f){var g;if(g=spider.gadget.objects.Get(e))g.userData=f};window.spider_SetGadgetFont=function(e,f){var g;if(g=spider.gadget.objects.Get(e))g.SetGadgetFont?g.SetGadgetFont(f):($(g.div).css("fontFamily",
f.family),$(g.div).css("fontSize",f.size))};window.spider_SetGadgetItemAttribute=function(e,f,g,k,n){"undefined"===typeof n&&(n=-1);var m;(m=spider.gadget.objects.Get(e))&&m.SetItemAttribute&&m.SetItemAttribute(f,g,k,n)};window.spider_SetGadgetItemData=function(e,f,g){var k;(k=spider.gadget.objects.Get(e))&&k.SetItemData&&k.SetItemData(f,g)};window.spider_SetGadgetItemImage=function(e,f,g){var k;(k=spider.gadget.objects.Get(e))&&k.SetItemImage&&k.SetItemImage(f,g)};window.spider_SetGadgetItemState=
function(e,f,g){var k;(k=spider.gadget.objects.Get(e))&&k.SetItemState&&k.SetItemState(f,g)};window.spider_SetGadgetItemText=function(e,f,g,k){"undefined"===typeof k&&(k=-1);var n;(n=spider.gadget.objects.Get(e))&&n.SetItemText&&n.SetItemText(f,g,k)};window.spider_SetGadgetState=function(e,f){var g;if(g=spider.gadget.objects.Get(e))F(g),g.SetState&&g.SetState(f),G(g)};window.spider_SetGadgetText=H;window.spider_SpinGadget=function(e,f,g,k,n,m,c,d){"undefined"===typeof d&&(d=0);var b=spider.gadget.objects.Allocate(e),
h=new dijit.form.NumberSpinner({constraints:{min:m,max:c},intermediateChanges:!0,onChange:function(){var a=h.get("value");a>b.oldValue?r(b,4):a<b.oldValue&&r(b,5);b.oldValue=a;r(b,9)},onFocus:function(){spider.DigitFocus.focus(h.focusNode);r(b,7)},onBlur:function(){r(b,8)}}),a=A(h.upArrowNode,"div","dijitArrowButtonInner"),l=A(h.downArrowNode,"div","dijitArrowButtonInner");"flat"===spider.gadgetTheme&&($(a).css("position","absolute"),$(l).css("position","absolute"));d&1&&$(h.focusNode).attr("disabled",
!0);var q=document.createElement("div");q.appendChild(h.domNode);b.Disable=function(a){C(b,h.focusNode.parentNode,h.focusNode,a)};b.GetState=function(){return h.get("value")};b.SetState=function(a){b.oldValue=a;h.set("value",a)};b.GetAttribute=function(a){switch(a){case 1:return h.attr("constraints").min;case 2:return h.attr("constraints").max}return 0};b.SetAttribute=function(a,b){var c=h.attr("constraints");switch(a){case 1:c.min=b;h.attr("constraints",c);break;case 2:c.max=b,h.attr("constraints",
c)}};b.GetColor=function(a){switch(a){case 2:return b.backColor?b.backColor:-1;case 1:return b.frontColor?b.frontColor:-1}return-1};b.SetColor=function(a,c){B(b,h.focusNode.parentNode,h.focusNode,a,c)};b.GetRequiredSize=function(){var a=$(q).css("fontSize")+" "+$(q).css("fontFamily"),a=y(b,a,"Hg");a.width=60;a.height+=5;return a};b.Resize=function(b,c,d,e){s(q,b,c,d,e);b=u(h.domNode);v(h,0,0,d-b.x,e-b.y);d=A(q,"div","dijitSpinnerButtonContainer");$(d).height(e-b.y);$(a).css("top",(e-b.y)/4-8);$(l).css("top",
(e-b.y)/4-8);"claro"==spider.gadgetTheme?$(h.focusNode).height(e-b.y-2):$(h.focusNode).height(e-b.y)};b.SetState(m);spider.gadget.register(b,2,q,h);b.Resize(f,g,k,n);return b.resultId};window.spider_SplitterGadget=function(e,f,g,k,n,m,c,d){"undefined"===typeof d&&(d=0);var b,h,a,l,q,p=spider.gadget.objects.Allocate(e),w=function(c){b.Resize(0,0,$(a.domNode).width(),$(a.domNode).height());h.Resize(0,0,$(l.domNode).width(),$(l.domNode).height())};if((b=spider.gadget.objects.Get(m))&&(h=spider.gadget.objects.Get(c))){q=
new dijit.layout.BorderContainer({design:"sidebar",gutters:!1,liveSplitters:!0});a=new dijit.layout.ContentPane({region:d&1?"left":"top",style:"overflow: hidden",content:"",splitter:!0});q.addChild(a);a.domNode.appendChild(b.div);l=new dijit.layout.ContentPane({style:"overflow: hidden",region:"center",content:"",splitter:!0});q.addChild(l);l.domNode.appendChild(h.div);var t=document.createElement("div");q.placeAt(t);p.GetState=function(){return d&1?$(a.domNode).width():$(a.domNode).height()};p.SetState=
function(b){d&1?$(a.domNode).width(b):$(a.domNode).height(b);q.resize();w()};p.GetAttribute=function(c){switch(c){case 3:return b.id;case 4:return h.id;case 1:return a.attr("minSize");case 2:if(p.secondMinimumSize)return p.secondMinimumSize}return 0};p.SetAttribute=function(c,d){var e;switch(c){case 3:if(e=spider.gadget.objects.Get(d))spider_WindowID(b.windowId).content.appendChild(b.div),b=e,a.domNode.appendChild(b.div),w();break;case 4:if(e=spider.gadget.objects.Get(d))spider_WindowID(h.windowId).content.appendChild(h.div),
h=e,l.domNode.appendChild(h.div),w();break;case 1:a.attr("minSize",d);break;case 2:p.secondMinimumSize=d,p.secondMinimumSize&&a.attr("maxSize",$(q.domNode).width()-p.secondMinimumSize-16)}};p.Resize=function(a,b,c,d){s(t,a,b,c,d);v(q,0,0,c,d);q.resize();w()};spider.DojoAspect.after(a,"resize",function(c,d){b.Resize(0,0,$(a.domNode).width(),$(a.domNode).height())});spider.DojoAspect.after(l,"resize",function(a,b){h.Resize(0,0,$(l.domNode).width(),$(l.domNode).height())});spider.gadget.register(p,29,
t,q);q.startup();p.Resize(f,g,k,n);d&1?p.SetState(k/2-5):p.SetState(n/2-5)}else p.resultId=0;return p.resultId};window.spider_StringGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b;c&4?b=new dijit.form.NumberTextBox({constraints:{min:0,places:0}}):(e={},e.type=c&1?"password":"text",c&256&&(e.placeHolder=m),b=new dijit.form.TextBox(e));b.intermediateChanges=!0;b.attr("onChange",function(){c&16&&b.set("value",b.get("value").toUpperCase());c&8&&b.set("value",
b.get("value").toLowerCase());r(d,9)});b.attr("onClick",function(){c&2&&!d.isFocused&&(d.isFocused=1,r(d,7))});b.attr("onFocus",function(){spider.DigitFocus.focus(b.focusNode);r(d,7)});b.attr("onBlur",function(){r(d,8);d.isFocused=0});c&2&&b.attr("readOnly",!0);c&32&&$(b.domNode).css("border","0px");var h=document.createElement("div");h.appendChild(b.domNode);d.Disable=function(a){C(d,b.focusNode.parentNode,b.focusNode,a)};d.GetText=function(){var a=b.get("value");c&4&&(a=isNaN(a)?"":""+a);return a};
d.SetText=function(a){b.set("value",a)};d.GetAttribute=function(a){return 1==a?b.get("maxlength"):0};d.SetAttribute=function(a,c){1==a&&(b.set("maxlength",c),b.set("value",d.GetText().substring(0,c)))};d.GetColor=function(a){switch(a){case 2:return d.backColor?d.backColor:-1;case 1:return d.frontColor?d.frontColor:-1}return-1};d.SetColor=function(a,c){B(d,b.focusNode.parentNode,b.focusNode,a,c)};d.GetRequiredSize=function(){var a=$(h).css("fontSize")+" "+$(h).css("fontFamily"),a=y(d,a,"Hg");a.width=
30;a.height+=10;return a};d.Resize=function(a,d,e,f){s(h,a,d,e,f);a=u(b.domNode);v(b,0,0,e-a.x,f-a.y);"claro"==spider.gadgetTheme?$(b.focusNode).height(f-a.y-2):$(b.focusNode).height(f-a.y);c&256&&(e=$(h).find(".dijitPlaceHolder"),$(e).css("vertical-align","middle"),$(e).css("height","100%"),$(e).css("line-height",f-a.y+1+"px"),$(e).css("margin-left","4px"))};spider.gadget.register(d,2,h,b);d.Resize(f,g,k,n);0===(c&256)&&H(d.id,m);return d.resultId};window.spider_TextGadget=function(e,f,g,k,n,m,c){"undefined"===
typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b=document.createElement("div"),h=document.createElement("span");b.appendChild(h);h.innerHTML=m;c&8&&(h.className="sbVerticalCenter");c&4&&$(b).addClass("sbTextBorder");c&2?$(b).css("text-align","right"):c&1&&$(b).css("text-align","center");d.GetText=function(){return h.innerHTML};d.SetText=function(a){h.innerHTML=a};d.GetColor=function(a){switch(a){case 2:return d.backColor?d.backColor:-1;case 1:return d.frontColor?d.frontColor:-1}return-1};
d.SetColor=function(a,c){switch(a){case 2:$(b).css("background-color",spider_helper_ColorToHtml(c));d.backColor=c;break;case 1:$(b).css("color",spider_helper_ColorToHtml(c)),d.frontColor=c}};d.GetRequiredSize=function(){var a=$(b).css("fontSize")+" "+$(b).css("fontFamily"),a=y(d,a,d.GetText());a.width+=8;a.height+=6;return a};d.Resize=function(a,c,d,e){var f=u(b);s(b,a,c,d-f.x,e-f.y);$(h).width(d-f.x);$(h).height(e-f.y)};spider.gadget.register(d,3,b,h);d.Resize(f,g,k,n);return d.resultId};window.spider_TrackBarGadget=
function(e,f,g,k,n,m,c,d){"undefined"===typeof d&&(d=0);var b=spider.gadget.objects.Allocate(e),h=new (d&2?dijit.form.VerticalSlider:dijit.form.HorizontalSlider)({minimum:m,maximum:c,showButtons:!1,intermediateChanges:!0,discreteValues:c-m+1,onChange:function(a){r(b,0)}}),a=document.createElement("div");a.appendChild(h.domNode);b.GetState=function(){return h.get("value")|0};b.SetState=function(a){h.set("value",a)};b.GetAttribute=function(a){switch(a){case 1:return h.get("minimum");case 2:return h.get("maximum")}return 0};
b.SetAttribute=function(a,b){switch(a){case 1:h.set("minimum",b);break;case 2:h.set("maximum",b)}};b.GetRequiredSize=function(){var b={width:0,height:0};$.each($(a).children(),function(a,c){b.width+=$(c).outerWidth(!0);b.height+=$(c).outerHeight(!0)});return b};b.Resize=function(b,c,d,e){s(a,b,c,d,e);v(h,0,0,d,e)};spider.gadget.register(b,17,a,h);b.Resize(f,g,k,n);return b.resultId};window.spider_TreeGadget=function(e,f,g,k,n,m){"undefined"===typeof m&&(m=0);var c=spider.gadget.objects.Allocate(e),
d=spider_NewList(function(){return{id:null,text:null}}),b,h=0,a=!1,l,q=document.createElement("div");$(q).addClass("sbTreeBorder");spider.DojoBaseLang.extend(dijit.Tree,{refreshModel:function(){this._itemNodesMap={};this.rootNode.state="UNCHECKED";this.model.root.children=null;this.rootNode&&this.rootNode.destroyRecursive();this._load()}});b=new spider.CBTreeStoreHierarchy;e=new spider.CBTreeModelForestStoreModel({store:b,query:{type:"root"},rootLabel:""});l=new dijit.Tree({model:e,getIconClass:function(a,
b){var c;return(c=a.spiderItem)&&c.image?spider.image.GetCSS(c.image):""},showRoot:!1,onClick:function(a){r(c,0);r(c,9)},onDblClick:function(a){r(c,2)}});$(q).on("mouseup",function(a){3===a.which&&1===a.originalEvent.detail&&r(c,1)});q.appendChild(l.domNode);var p=function(){a||(a=setInterval(function(){clearInterval(a);a=!1;l.refreshModel()},0))};c.AddItem=function(a,c,e,f){-1==a&&(a=spider_ListSize(d));0>=a?spider_ResetList(d):spider_SelectElement(d,a-1);a=spider_AddElement(d);a.id=h;a.text=c;a.subLevel=
f;e&&(a.image=e);e="";var g;spider_ListIndex(d);if(0<f)for(;g=spider_PreviousElement(d);)if(g.subLevel<f){e=g.id;break}b.add({id:h,name:c,type:0===f?"root":"child",parent:[e],spiderItem:a});h++;p()};c.RemoveItem=function(a){spider_ListSize(d)>a&&0<=a&&(a=spider_SelectElement(d,a),spider_DeleteElement(d),b.remove(a.id),l.set("selectedItems",[]),p())};c.ClearItems=function(){for(var a=spider_ListSize(d),b=0;b<a;b++)c.RemoveItem(0)};c.CountItems=function(){return spider_ListSize(d)};c.GetState=function(){var a=
-1,b,c;if(b=l.attr("selectedItem"))for(spider_ResetList(d);c=spider_NextElement(d);)if(c.id==b.id){a=spider_ListIndex(d);break}return a};c.SetState=function(a){var c;(c=spider_SelectElement(d,a))&&l.set("selectedItems",[b.get(c.id)])};c.GetText=function(){var a=c.GetState();return-1!=a?spider_SelectElement(d,a).text:""};c.SetText=function(a){var b;for(spider_ResetList(d);b=spider_NextElement(d);)if(b.text==a){c.SetState(spider_ListIndex(d));break}};c.GetItemAttribute=function(a,b,c){return 1==b&&
(a=spider_SelectElement(d,a))?a.subLevel:0};c.GetItemState=function(a){var c=0;if(a=spider_SelectElement(d,a)){var e=l.get("selectedItem");e&&e.id==a.id&&(c|=1);a=l.getNodesByItem(b.get(a.id));c=a[0].isExpanded?c|2:c|8}return c};c.SetItemState=function(c,e){var f;if(f=spider_SelectElement(d,c))switch(a&&(clearInterval(a),a=!1,l.refreshModel()),e){case 1:l.set("selectedItems",[b.get(f.id)]);break;case 2:f=l.getNodesByItem(b.get(f.id));l._expandNode(f[0]);break;case 8:f=l.getNodesByItem(b.get(f.id)),
l._collapseNode(f[0])}};c.GetItemData=function(a){var b;return(b=spider_SelectElement(d,a))?b.data?b.data:0:0};c.SetItemData=function(a,b){var c;if(c=spider_SelectElement(d,a))c.data=b};c.GetItemText=function(a,b){var c;return(c=spider_SelectElement(d,a))?c.text:""};c.SetItemText=function(a,b,c){if(a=spider_SelectElement(d,a))a.text=b,p()};c.GetColor=function(a){switch(a){case 2:return c.backColor?c.backColor:-1;case 1:return c.frontColor?c.frontColor:-1}return-1};c.SetColor=function(a,b){switch(a){case 2:$(q).find("div").each(function(){if("dojoDndContainer dijitTree"==
$(this).attr("class")||"dijitTree dojoDndContainer"==$(this).attr("class"))return $(this).css("background-color",spider_helper_ColorToHtml(b)),!1});c.backColor=b;break;case 1:$(q).css("color",spider_helper_ColorToHtml(b)),c.frontColor=b}};c.Resize=function(a,b,c,d){var e=u(q);s(q,a,b,c-e.x,d-e.y);v(l,0,0,c-e.x,d-e.y)};spider.gadget.register(c,27,q,l);c.Resize(f,g,k,n);l.startup();return c.resultId};window.spider_UnbindGadgetEvent=function(e,f,g){"undefined"===typeof g&&(g=-1);var k;(k=spider.gadget.objects.Get(e))&&
spider_UnbindEvent(1,f,k.windowId,k.id,g)};window.spider_UseGadgetList=function(e){var f=spider.window.gadgetList.get();f&&(f=f.window);spider.window.gadgetList.set(e.content);return f};window.spider_WebGadget=function(e,f,g,k,n,m,c){"undefined"===typeof c&&(c=0);var d=spider.gadget.objects.Allocate(e),b=document.createElement("div");$(b).addClass("sbWebBorder");$(b).addClass("sbWebGadget");var h=document.createElement("iframe");$(h).load(function(){r(d,6)});h.src=m;h.setAttribute("frameborder",0);
b.appendChild(h);d.GetText=function(){return h.src};d.SetText=function(a){h.src=a};d.GetItemText=function(a,b){try{switch(a){case 1:return $(h).contents().find("html").html();case 4:var c;var d=h.contentWindow.document;c=d.getSelection?d.getSelection():d.selection?d.selection.createRange().text:void 0;return c;case 2:return $(h).contents().find("title").html()}}catch(e){}return""};d.SetItemText=function(a,b,c){try{1==a&&(h.src="data:text/html;charset=utf-8,"+encodeURI(b))}catch(d){}};d.Resize=function(a,
c,d,e){var f=u(b);s(b,a,c,d-f.x,e-f.y);s(h,0,0,d-f.x,e-f.y)};spider.gadget.register(d,18,b,h);d.Resize(f,g,k,n);return d.resultId};window.spider_gadget_GetRequiredSize=function(e){var f;spider.gadget.context||(spider.gadget.canvas=document.createElement("canvas"),spider.gadget.canvas.width=2E3,spider.gadget.canvas.height=200,spider.gadget.context=spider.gadget.canvas.getContext("2d"));return(f=spider.gadget.objects.Get(e))&&f.GetRequiredSize?f.GetRequiredSize():{width:0,height:0}}})();

function spider_FreeSprite(a){var c;if(-1==a)spider.sprite.objects.CleanAll();else if(c=spider.sprite.objects.Get(a))c.texture&&c.texture.destroy(),spider.sprite.objects.Remove(a)}
spider.sprite={objects:new spider.object(spider_FreeSprite),cache:{},nbDisplayedSprite:0,scaleMode:0,NewFrame:function(){for(var a=0;a<this.nbDisplayedSprite;a++)this.cache[a].visible=!1;this.nbDisplayedSprite=0},Reset:function(){this.cache={};this.nbDisplayedSprite=0;spider_FreeSprite(-1);for(var a=spider.screen.stage.children.length-1;0<=a;a--)spider.screen.stage.removeChild(spider.screen.stage.children[a])}};function spider_InitSprite(){spider_SpriteQuality(1);return 1}
function spider_sprite_GetTexturePixels(a,c,d){var e=spider.screen.renderer.gl,b=a.texture.baseTexture;spider.screen.renderer.updateTexture(b);a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,b._glTextures[0],0);b=new Uint8Array(c*d*4);e.readPixels(0,0,c,d,e.RGBA,e.UNSIGNED_BYTE,b);e.deleteFramebuffer(a);return b}
function spider_sprite_InitializeSprite(a){var c=a.texture.baseTexture.width,d=a.texture.baseTexture.height;a.width=c;a.height=d;a.rotation=0;if(a.flags&4){var e=spider_sprite_GetTexturePixels(a,c,d);if(e){var b=new Uint8Array(a.width*a.height);a.pixelCollisionMask=b;for(a=0;a<d;a++)for(var g=a*c,f=0;f<c;f++)b[g+f]=255==e[4*(g+f)+3]?1:0}}}
function spider_CreateSprite(a,c,d,e){"undefined"===typeof e&&(e=0);a=spider.sprite.objects.Allocate(a);a.flags=e;a.clip=!1;a.clipFrame={x:0,y:0,width:0,height:0};var b=document.createElement("canvas");b.width=c;b.height=d;0===(e&8)&&(e=b.getContext("2d"),e.fillStyle="#000000",e.fillRect(0,0,c,d));a.texture=PIXI.Texture.fromCanvas(b);spider_sprite_InitializeSprite(a);return a.resultId}
function spider_LoadSprite(a,c,d){"undefined"===typeof d&&(d=0);var e=spider.sprite.objects.Allocate(a);e.flags=d;e.clip=!1;e.clipFrame={x:0,y:0,width:0,height:0};e.texture=null;(new PIXI.loaders.Loader).add(c).load(function(a,d){d[c].error?spider.event.SendLoading(19,3,c,e.id):(e.texture=d[c].texture,spider_sprite_InitializeSprite(e),spider.event.SendLoading(18,3,c,e.id))});return e.resultId}
function spider_sprite_GenericDisplaySprite(a,c,d){var e=spider.sprite.nbDisplayedSprite,b;(b=spider.sprite.cache[e])||(b=new PIXI.Sprite(a.texture),spider.sprite.cache[e]=b,b.anchor.x=0,b.anchor.y=0,spider.screen.stage.addChild(b));a.clippedRectangle?(b.clippedBaseTexture!=a.texture.baseTexture&&(b.texture=new PIXI.Texture(a.texture.baseTexture),b.clippedBaseTexture=a.texture.baseTexture),b.texture.frame=a.clippedRectangle):(b.clippedBaseTexture=null,b.texture=a.texture);b.tint=a.color;b.width=a.width;
b.height=a.height;b.visible=!0;b.mask=null;b.alpha=a.alpha;b.texture.baseTexture.scaleMode=spider.sprite.scaleMode;a.rotation?(b.rotation=a.rotation*Math.PI/180,b.pivot.x=b.texture.width/2,b.pivot.y=b.texture.height/2,b.position.x=c+b.width/2,b.position.y=d+b.height/2):(b.rotation=0,b.pivot.x=0,b.pivot.y=0,b.position.x=c,b.position.y=d);spider.sprite.nbDisplayedSprite++}
function spider_ClipSprite(a,c,d,e,b){if(a=spider.sprite.objects.Get(a)){var g=a.texture.width,f=a.texture.height;-1==c&&(c=0);-1==d&&(d=0);-1==e&&(e=g);-1==b&&(b=f);0===c&&0===d&&e==g&&b==f?a.clippedRectangle=null:(c>g&&(c=g),d>f&&(d=f),c+e>g&&(e=g-c),d+b>f&&(b=f-d),a.clippedRectangle=new PIXI.Rectangle(c,d,e,b));a.width=e;a.height=b}}function spider_DisplaySprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.alpha=1,a.color=-1,spider_sprite_GenericDisplaySprite(a,c,d)}
function spider_DisplayTransparentSprite(a,c,d,e,b){"undefined"===typeof e&&(e=255);"undefined"===typeof b&&(b=16777215);if(a=spider.sprite.objects.Get(a))a.alpha=e/255,a.color=b>>16&255|b<<16&16711680|b&65280,spider_sprite_GenericDisplaySprite(a,c,d)}function spider_RotateSprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.rotation=1==d?a.rotation+c:c}function spider_ZoomSprite(a,c,d){if(a=spider.sprite.objects.Get(a))a.width=-1==c?a.texture.width:c,a.height=-1==d?a.texture.height:d}
function spider_SpriteDepth(a){return spider.sprite.objects.Get(a)?32:0}function spider_SpriteWidth(a){var c;return(c=spider.sprite.objects.Get(a))?c.width:0}function spider_SpriteHeight(a){var c;return(c=spider.sprite.objects.Get(a))?c.height:0}
function spider_SpriteOutput(a){var c,d;return(c=spider.sprite.objects.Get(a))?(a=c.texture.baseTexture.source,a instanceof HTMLCanvasElement?(d=a,a=d.getContext("2d")):(d=document.createElement("canvas"),d.width=c.width,d.height=c.height,a=d.getContext("2d"),a.drawImage(c.texture.baseTexture.source,0,0)),{sprite:c,canvas:d,context:a,stopDrawingCallback:function(){c.texture=PIXI.Texture.fromCanvas(d);spider.screen.renderer.updateTexture(c.texture)}}):null}
function spider_SpriteCollision(a,c,d,e,b,g){var f,h;return(f=spider.sprite.objects.Get(a))&&(h=spider.sprite.objects.Get(e))&&b<c+f.width&&b+h.width>c&&g+h.height>d&&g<d+f.height?1:0}
function spider_SpritePixelCollision(a,c,d,e,b,g){var f,h,k,l,p,q,r,s,m,n;if((f=spider.sprite.objects.Get(a))&&(h=spider.sprite.objects.Get(e))&&0!==(f.flags&4)&&0!==(h.flags&4)&&b<c+f.width&&b+h.width>c&&g+h.height>d&&g<d+f.height)if(c<b?(c=b-c,e=0,a=f.width-c,a>h.width&&(a=h.width)):(e=c-b,c=0,a=h.width-e,a>f.width&&(a=f.width)),d<g?(k=g-d,l=0,b=f.height-k,b>h.height&&(b=h.height)):(l=d-g,k=0,b=h.height-l,b>f.height&&(b=f.height)),f.height!=f.texture.baseTexture.height||f.width!=f.texture.baseTexture.width||
h.height!=h.texture.baseTexture.height||h.width!=h.texture.baseTexture.width)for(p=f.width/f.width,q=f.height/f.height,r=h.width/h.width,s=h.height/h.height,g=0;g<b;g++)for(m=((g+k)*q|0)*f.width,n=((g+l)*s|0)*h.width,d=0;d<a;d++){if(f.pixelCollisionMask[m+((d+c)*p|0)]&&h.pixelCollisionMask[n+((d+e)*r|0)])return 1}else for(g=0;g<b;g++)for(m=(g+k)*f.width,n=(g+l)*h.width,d=0;d<a;d++)if(f.pixelCollisionMask[m+(d+c)]&&h.pixelCollisionMask[n+(d+e)])return 1;return 0}
function spider_SpriteQuality(a){spider.sprite.scaleMode=1==a?PIXI.SCALE_MODES.LINEAR:PIXI.SCALE_MODES.NEAREST}function spider_IsSprite(a){return spider.sprite.objects.Is(a)};

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
mozpointerlockchange:a.pointerLockChange,webkitpointerlockchange:a.pointerLockChange}),a.initialized=!0);return!0}function spider_MouseX(){return spider.mouse.x}function spider_MouseY(){return spider.mouse.y}function spider_MouseDeltaX(){var b=spider.mouse.deltaX;spider.mouse.deltaX=0;return b}function spider_MouseDeltaY(){var b=spider.mouse.deltaY;spider.mouse.deltaY=0;return b}
function spider_MouseButton(b){switch(b){case 1:return spider.mouse.leftButton;case 2:return spider.mouse.rightButton;case 3:return spider.mouse.middleButton}return 0}function spider_MouseWheel(){var b=spider.mouse.wheel;spider.mouse.wheel=0;return b}function spider_MouseLocate(b,a){spider.mouse.x=b;spider.mouse.y=a}
function spider_ReleaseMouse(b){spider.mouse.locked&&b&&(document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,document.exitPointerLock())};

if("undefined"===typeof spider)var spider={};spider.keyboard={initialized:!1,lastChar:"",keys:{},keysReleased:{}};function spider_InitKeyboard(){return!0}
function spider_ExamineKeyboard(){spider.keyboard.initialized||($(document).on({keydown:function(a){spider.screen.isActive&&(spider.keyboard.keys[a.keyCode]=!0,116!=a.keyCode&&a.preventDefault())},keyup:function(a){spider.screen.isActive&&(a=a.keyCode,spider.keyboard.keys[a]=!1,spider.keyboard.keysReleased[a]=2,47<a&&58>a||32==a||64<a&&91>a||95<a&&112>a||185<a&&193>a||218<a&&223>a)&&(spider.keyboard.lastChar=String.fromCharCode(a))}}),spider.keyboard.initialized=!0);for(var b=Object.keys(spider.keyboard.keysReleased),
c=0;c<b.length;c++){var d=b[c];0<spider.keyboard.keysReleased[d]&&spider.keyboard.keysReleased[d]--}return spider.screen.isActive}function spider_KeyboardPushed(b){return!0===spider.keyboard.keys[b]}function spider_KeyboardReleased(b){return spider.keyboard.keysReleased[b]?(spider.keyboard.keysReleased[b]=!1,!0):!1}function spider_KeyboardMode(b){}function spider_KeyboardInkey(){var b=spider.keyboard.lastChar;spider.keyboard.lastChar="";return b};

spider.nbModules++;require(["seedrandom.min"],function(a){spider.nbLoadedModules++;SpiderMain()});function spider_Abs(a){return Math.abs(a)}function spider_ACos(a){return Math.acos(a)}function spider_ACosH(a){return Math.log(a+Math.sqrt(a*a-1))}function spider_ASin(a){return Math.asin(a)}function spider_ASinH(a){return Math.log(a+Math.sqrt(a*a+1))}function spider_ATan(a){return Math.atan(a)}function spider_ATan2(a,b){return Math.atan2(b,a)}
function spider_ATanH(a){return 0.5*Math.log((1+a)/(1-a))}function spider_CosH(a){return(Math.exp(a)+Math.exp(-a))/2}function spider_Degree(a){return 180/Math.PI*a}function spider_Radian(a){return Math.PI/180*a}function spider_Log(a){return Math.log(a)}function spider_Log10(a){return Math.log(a)/2.302585092994046}function spider_Exp(a){return Math.exp(a)}function spider_Mod(a,b){return a%b}function spider_Infinity(){return Number.POSITIVE_INFINITY}function spider_NaN(){return NaN}
function spider_IsInfinity(a){return a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY?1:0}function spider_Sqr(a){return Math.sqrt(a)}function spider_Cos(a){return Math.cos(a)}function spider_Round(a,b){switch(b){case 1:return Math.ceil(a);case 2:return 0<a?Math.floor(a+0.5):Math.ceil(a-0.5);default:return Math.floor(a)}}function spider_Sign(a){return a?0>a?-1:1:0}function spider_Sin(a){return Math.sin(a)}function spider_SinH(a){return(Math.exp(a)-Math.exp(-a))/2}
function spider_Tan(a){return Math.tan(a)}function spider_TanH(a){return(Math.exp(a)-Math.exp(-a))/(Math.exp(a)+Math.exp(-a))}function spider_Pow(a,b){return Math.pow(a,b)}function spider_Int(a){return a|0}function spider_IntQ(a){return 0<=a?Math.floor(a):Math.ceil(a)}function spider_IsNAN(a){return isNaN(a)?1:0}function spider_Random(a,b){"undefined"===typeof b&&(b=0);return b+(Math.random()*(a-b+1)|0)}function spider_RandomSeed(a){Math.seedrandom(a)};

if("undefined"==typeof Spider)var Spider={};spider.system={batteryEventRegistered:0,batteryLevel:-1};function spider_ElapsedMilliseconds(){return(new Date).getTime()}function spider_CountProgramParameters(){var a=location.search.substring(1);return 0<a.length?spider_CountString(a,"&")+1:0}function spider_ProgramParameter(a){var b=location.search.substring(1);return 0<=a&&a<spider_CountProgramParameters()?decodeURI(spider_StringField(b,a+1,"&")):""}
function spider_BatteryLevel(){window.cordova&&!spider.system.batteryEventRegistered&&(spider.system.batteryEventRegistered=1,window.addEventListener("batterystatus",function(a){spider.system.batteryLevel=a.isPlugged?-2:a.level},!1));return spider.system.batteryLevel}
function spider_DeviceInfo(a){if(window.cordova)switch(a){case 0:return device.model;case 1:return device.platform;case 2:return device.uuid;case 3:return device.version;case 4:return device.manufacturer;case 5:return device.serial}return""}function spider_VibrateDevice(a){window.cordova&&navigator.vibrate(a)};

function f_start() {
spider_ClearScreen(0);
spider_BindEvent(17,f_runworld);
f_reset();
spider_FlipBuffers();
return 0;
}
function f_loadingerror(v_type,v_filename$) {
spider.debug.Print(v_filename$+_S5);
return 0;
}
function f_reset() {
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
}
function f_loading(v_type,v_filename$) {
spider.debug.Print(v_filename$+_S4);
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
v_sp=spider_CreateSprite(-1,300,40);
spider_StartDrawing(spider_SpriteOutput(v_sp));
spider_DrawText(0,0,v_msg,spider_RGB(0,255,0));
spider_StopDrawing();
spider_DisplayTransparentSprite(v_sp,v_x,v_y,255,0);
spider_FreeSprite(v_sp);
return 0;
}
function f_updatebodies() {
var v_dx=0;
var v_dy=0;
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
}
function f_mydisplaytransparentsprite(v_spriteid,v_x,v_y,v_intensity,v_color) {
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
}
function f_runworld() {
var v_numfpsshown=0;
var v_a=0;
var v_numfps=0;
var v_r=0;
var v_result=0;
var v_rt=0;
var p_bodyptr=0;
var v_timer=0;
var v_sum=0;
var v_ev=0;
var v_ft=0;
v_ang=(v_ang+0.01);
spider_FirstElement(t_bodies);
spider_ExamineKeyboard();
if (spider_KeyboardPushed(38)) {
t_bodies.current._y=(t_bodies.current._y+-0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
} else if (spider_KeyboardPushed(40)) {
t_bodies.current._y=(t_bodies.current._y+0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
}
if (spider_KeyboardPushed(37)) {
t_bodies.current._x=(t_bodies.current._x+-0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
} else if (spider_KeyboardPushed(39)) {
t_bodies.current._x=(t_bodies.current._x+0.01);
t_bodies.current._mass=(t_bodies.current._mass+-1);
} else if (spider_KeyboardPushed(82)) {
f_reset();
}
v_a=1;
for (;5>=v_a;v_a+=1) {
f_updatebodies();;
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
spider_ZoomSprite(a_sp.array[12],(v_right*2),(v_right*2));
spider_DisplayTransparentSprite(a_sp.array[12],(-(((v_right/2)|0))),(-(((v_right/2)|0))));
v_sum=(-(p_player._mass));
spider_ResetList(t_bodies); while (spider_NextElement(t_bodies)) {
v_r=spider_BankerRound(t_bodies.current._r);
if (t_bodies.current._mass>0) {
v_sum=(v_sum+t_bodies.current._mass);
spider_ZoomSprite(t_bodies.current._sprite,spider_BankerRound((t_bodies.current._r*2)),spider_BankerRound((t_bodies.current._r*2)));
spider_ZoomSprite(a_sp.array[2],spider_BankerRound((t_bodies.current._r*1.8)),spider_BankerRound((t_bodies.current._r*1.8)));
spider_RotateSprite(a_sp.array[2],(t_bodies.current._x-t_bodies.current._vx),1);
v_rt=(t_bodies.current._r*0.90000000000000002);
f_mydisplaytransparentsprite(a_sp.array[2],spider_BankerRound(t_bodies.current._x),spider_BankerRound(t_bodies.current._y),127,0);
f_mydisplaytransparentsprite(t_bodies.current._sprite,spider_BankerRound(t_bodies.current._x),spider_BankerRound(t_bodies.current._y),127,0);
} else {
if (p_player==t_bodies.current) {
if (!(v_time)) {
v_time=((((spider_ElapsedMilliseconds()-v_st))/1000)|0);
}
f_displaymessage(30,30,_S1+spider_Str(v_time)+_S2);
} else {
spider_DeleteElement(t_bodies);
}
}
}
if (p_player._mass>v_sum) {
if (!(v_time)) {
v_time=((((spider_ElapsedMilliseconds()-v_st))/1000)|0);
}
f_displaymessage(30,30,_S3+spider_Str(v_time)+_S2);
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
}
//
SpiderLaunch = function() {
  spider.debug.Init();
 spider_InitFunctions();
t_bodies=spider_NewList(s_ball,"object",false);
t_del=spider_NewList(s_integer,"_i",true);
spider_Dim(a_sp,21,[12],null);
spider_BindEvent(18,f_loading);
spider_BindEvent(19,f_loadingerror);
spider_OpenScreen(v_right,v_bottom,32,_S6);
spider_ExamineDesktops();
v_left=0;
v_right=spider_DesktopWidth(0);
v_top=0;
v_bottom=spider_DesktopHeight(0);
a_sp.array[0]=spider_LoadSprite(-1,_S7,8);
a_sp.array[1]=spider_LoadSprite(-1,_S8,8);
a_sp.array[2]=spider_LoadSprite(-1,_S9,8);
a_sp.array[12]=spider_LoadSprite(-1,_S10);
spider_ClipSprite(a_sp.array[12],0,128,512,384);

}


function spider_InitFunctions() {
spider_InitImageDecoder();
spider_InitImage();
spider_Init2DDrawing();
spider_InitArray();
spider_InitDesktop();
spider_InitMap();
spider_Event_Init();
spider_InitWindow();
spider_InitList();
spider_InitGadget();
}


spider.nbLoadedModules++


