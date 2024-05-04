;Single server application instance with virtual file system, use it to host spiderbasic apps or a portable webstite 

;shows how to make the virtual file system, use uriHandlers and preprocessor tags 

XIncludeFile "Atomic_Web_Server3.pbi"

;Example of a URIHandeler, you create the content and have full access to the request and parmenters 
;the server frees the memory allocated 
Procedure URIfoo(*request.Atomic_Server_Request)
  
  Protected  *Atomic_Server.Atomic_Server = *request\serverID 
  Protected  *client.Atomic_Server_Client = *request\clientID 
  Protected  content.s,session.s,setsession.s   
  Protected *data
  
  If FindMapElement(*client\Cookies(),"sessionID")   
    session = *client\Cookies()
  Else   
    setsession = Str(Random($FFFFFFFF)) + "; " + "Max-Age=" + "60"  
    Atomic_Server_SetCookie(*request,"sessionID",setsession)
  EndIf  
  
  Debug *request\Request 
  
  content.s = "<!DOCTYPE html>" + #CRLF$
  content + "<html><head>" + #CRLF$
  content + "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Noto Sans&effect=fire'>" + #CRLF$
  content + "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Noto Color Emoji'>" + #CRLF$
  content + "<meta charset='utf-8' />" + #CRLF$
  content + "<title>" + *Atomic_Server\Title + "</title>" + #CRLF$
  content + "<style> body { background-color: #6600ff; margin: 10%;} h1 { font-family: 'Noto Sans', sans-serif; color: white;  text-align: center; } " + #CRLF$
  content + "p { font-family: 'Noto Sans', sans-serif; font-size: 18px;  text-align: center; color: white;} " + #CRLF$ 
  content + "h2 { font-family: 'Noto Color Emoji'; text-align: center; } " + #CRLF$ 
  content + "label { font-family: 'Noto Sans', sans-serif; font-size: 30px;  text-align: left; color: white;} " + #CRLF$ 
  content +  "input[type=text], Select { width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; } " + #CRLF$  
  content +  "input[type=submit] { width: 100%; background-color: #0099cc; color: white; padding: 14px 20px; margin: 8px 0; border: none; border-radius: 4px; cursor: pointer; } </style>"  + #CRLF$
  content + "</head><body><h1 class='font-effect-fire' style='text-align:center';>" + *Atomic_Server\Title + "</h1>"+ #CRLF$
  content + "<h2 style='text-align:center';>" + Atomic_Server_Chr($2622) + "</h2>"
  ForEach *request\parameters() 
    content + "<p>" + MapKey(*request\parameters()) + "=" + *request\parameters() +"</p>" 
  Next 
  If session <> ""
    content + "<p>" + "sessionID =" + session + "</p>"  
  EndIf 
  
  content + "<body></html>"
  
  *data = UTF8(content)
  
  *request\ContentType = "text/html" ;Set the contentType
  
  ProcedureReturn *data  
  
EndProcedure

;call back for get post parameters 
Procedure CBPostGet(*request.Atomic_Server_Request) 
  
  Debug *request\Type 
  Debug "params:" 
  
  ForEach *request\parameters()
    Debug MapKey(*request\parameters()) + " = " + *request\parameters()
  Next 
  
  Debug "headers:" 
  ForEach *request\RequestHeaders() 
    Debug MapKey(*request\RequestHeaders()) + " = " + *request\RequestHeaders()
  Next   
    
EndProcedure   

;-Example of using the tag preprocessor, fills in page content of an html file saved as .pbh at the tag = <?PB ElementsFillTable /> 
; This provides a replacement for PHP, you have access to the request and its parameters  
; Navigate to http://127.0.0.1/elements.pbh
Runtime Procedure ElementsFillTable(*request.Atomic_Server_Request) 
  
  Protected sout.s,sum.f,a  
  sout = "<div><H2>Output from ElementsFillTable() Callback</h2></div>"
  sout + "<div class='table-wrapper'><table><thead><tr><th>Name</th><th>Description</th><th>Price</th></tr></thead>" + #LF$
  sout + "<tbody>" + #LF$ 
  For a = 1 To 20 
    sout + "<tr><td>Item " + Str(a) + "</td><td>Ante turpis integer aliquet porttitor.</td><td>" + StrF(a * 2.99,2) + "</td></tr>" + #LF$
    sum + (a * 2.99)  
  Next 
  sout + "</tbody><tfoot><tr><td colspan='2'></td><td>$" + StrF(sum,2) + "</td></tr></tfoot></table></div>"
  
  ProcedureReturn UTF8(sout) 
  
EndProcedure   

;Example gets a code and fills it in the page 
Runtime Procedure ElementsFillCode(*request.Atomic_Server_Request) 
  Protected  *Atomic_Server.Atomic_Server = *request\serverid 
  Protected fn,*buffer 
  
  *buffer = Atomic_Server_ReadFile(*request\clientID,"bm_search.pb")
  If *buffer 
    ProcedureReturn *buffer 
  EndIf   
  
EndProcedure   

Global server1 = Atomic_Server_Init("atomic_webserver","./www/","127.0.0.1","",80,#PB_Network_IPv4,5000,@CBPostGet(),@CBPostGet()) 

;Atomic_Server_Create_Pack(server1) ;use this to pack the www folder then include the binary and comment it out   

Atomic_server_Set_PackAddress(server1,?Index,?EndIndex-?Index) ;set the pack address and size 

Atomic_Server_Add_Handler(server1,"foo",@URIfoo()) ;set handler navigate to http://127.0.0.1/foo?foo=1234&bar=56789
OpenConsole() 

If Atomic_Server_Start(server1,-1,1)  ;start server no window logs to console 
  
  Repeat 
  Until Input() = "quit"   ;type quit to exit 
  
  Atomic_Server_Exit(server1)
  CloseConsole()
  
EndIf 

DataSection 
  Index:
  IncludeBinary "./www.ezp"
  EndIndex:
EndDataSection 
