;Single server application instance running on two ports 80 and 81 over localhost 

;website is directly under the www folder 
;shows how to use uriHandlers and pre processor tags 

XIncludeFile "Atomic_Web_Server3.pbi"

;Example of a URIHandeler, you create the content and have full access to the request and parmenters 
;the server frees the memory allocated 
Procedure URIfoo(*request.Atomic_Server_Request)
  
  Protected  *Atomic_Server.Atomic_Server = *request\serverid 
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

Procedure URIBar(*request.Atomic_Server_Request)
   
   ProcedureReturn URIfoo(*request)  
  
EndProcedure  

Procedure CBPostGet(*request.Atomic_Server_Request) 
  
  Debug *request\Type 
  
  ForEach *request\parameters()
    Debug MapKey(*request\parameters()) + " = " + *request\parameters()
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

Runtime Procedure ElementsFillCode(*request.Atomic_Server_Request) 
  Protected  *Atomic_Server.Atomic_Server = *request\serverid 
  Protected fn,*buffer 
  fn = OpenFile(#PB_Any,*Atomic_Server\WWWDirectory + "bm_search.pb") 
  If fn 
    *buffer = AllocateMemory(Lof(fn)) 
     ReadData(fn,*buffer,Lof(fn)) 
     CloseFile(fn) 
     ProcedureReturn *buffer 
  EndIf    
     
EndProcedure   

Global event, server1,server2

server1 = Atomic_Server_Init("atomic_webserver 1","./www/","127.0.0.1","",80,#PB_Network_IPv4,5000,@CBPostGet(),@CBPostGet()) 
server2 = Atomic_Server_Init("Atomic_webwerver 2","./www/","127.0.0.1","",81) 

Atomic_Server_Add_Handler(server1,"foo",@URIfoo()) ;navigate to http://127.0.0.1/foo?foo=1234&bar=56789
Atomic_Server_Add_Handler(server2,"bar",@URIbar()) ;navigate to http://127.0.0.1/bar?foo=12345&bar=6789

If OpenWindow(1, 0, 0, 800, 600, "my log window", #PB_Window_SystemMenu | #PB_Window_SizeGadget)
  
  EditorGadget(0, 0, 0, 800, 560, #PB_Editor_ReadOnly)
  AddGadgetItem(0,-1, "Server Running on port 80")
  Atomic_Server_start(server1,1,1) ;navigate to http://127.0.0.1 
  Atomic_Server_start(server2,1,1) ;navigate to http://127.0.0.1:81   
  Repeat 
    event = WaitWindowEvent()
    Select event 
      Case #ATOMIC_SERVER_EVENT_ADD  
        AddGadgetItem(0, -1, PeekS(EventData(),-1,#PB_UTF8))
        FreeMemory(EventData()) ;<-----IMPORTANT you must free the EventData or it will leak memory.                                 
      Case #PB_Event_CloseWindow
        Break 
     EndSelect   
  ForEver  
  
  Atomic_Server_Exit(server1)
  Atomic_Server_Exit(server2)

EndIf