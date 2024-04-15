
spider.debug = {
  y : 0,
  window : null,
  editorGadget : null,
  disabled: false,
  Init : function() {
    
    this.window = spider_OpenWindow(-1, spider_DesktopWidth() - 370, 0, 350, 150, "SpiderBasic - Debug output", (1 << 4) | (1 << 5));

    this.editorGadget = spider_EditorGadget(-1, 5, 5, spider_WindowWidth(spider.debug.window) - 10, spider_WindowHeight(spider.debug.window) - 10);
    spider_StickyWindow(this.window, 1);
    spider_ResizeWindow(this.window, spider_DesktopWidth() - spider_WindowWidth(this.window, 1), -1, -0xFFFF , -0xFFFF)

    spider_BindEvent(4, // PB_Event_CloseWindow
                     function() {
                       spider_CloseWindow(spider.debug.window);
                       spider.debug.disabled = true;
                     },
                     this.window);

    spider_BindEvent(7, // PB_Event_SizeWindow
                     function() {
                       spider_ResizeGadget(spider.debug.editorGadget, 5, 5, spider_WindowWidth(spider.debug.window) - 10, spider_WindowHeight(spider.debug.window) - 10);
                     },
                     this.window);
  },
  
  RawPrint : function(text) {

    if (this.editorGadget && !this.disabled)
    {
      spider_SetGadgetText(this.editorGadget, spider_GetGadgetText(this.editorGadget)+text+"\n");
      
      var editorTextArea = spider_GadgetID(this.editorGadget).gadget.domNode;
      
      // Use jquery animate to scroll down automatically
      $(editorTextArea).animate({
          scrollTop:$(editorTextArea)[0].scrollHeight - $(editorTextArea).height()
      },0);
    }
  },

  Print : function(text) {
    
    // log in browser console first, just in case the GUI text doesn't work
    console.log(text);
    
    this.RawPrint(text);
  }
};


// temporary Shortcut
spider.Debug = function(text) {
  spider.debug.Print(text);
};

// temporary Shortcut
function debug(text) {
  spider.debug.Print(text);
}


// console log wrapper, so we can get the error in our own window
//
/*(function(){
    var oldLog = console.log;
    console.log = function (message) {
        //oldLog.apply(console, arguments);
        debugger;
        spider.debug.RawPrint("<Info> ");
    };
    
    var oldWarning = console.warn;
    console.warn = function (message) {
        oldWarning.apply(console, arguments);
        debugger;
        spider.debug.RawPrint("<Warning> ");
    };
    
    var oldError = console.error;
    console.error = function (message) {
        oldError.apply(console, arguments);
        debugger;
        spider.debug.RawPrint("<Error> ");
    };
})();*/

