;A reverse proxy example where you can access server instances running on different ports 
;the other servers can be in the same instance or seperate programs for localy or remote locations   
;Use Atomic_Server_Add_Proxy(server,domain.s,IP.s,port.i) to add a proxy to the other domains and port  

;-HOW TO TEST  
;##############################################################################
;The www folder has two websites under atomicwebserver1.com and atomicwebserver2.com 
;this requires you edit your hosts file so you can associate the domains to IP number 
;run notepad as admin and edit host file with your respective IP numbers 
;C:\Windows\System32\drivers\etc\hosts 
;192.168.1.54     atomicwebserver.com
;192.168.1.54     atomicwebserver2.com

;Next compile twice   
;Set #proxy=0 and Compile Without Debugger
;Set #proxy=1 And compile With Debugger
;When you vist atomicwebserver2.com it will proxy it via atomicwebserer1.com  

#proxy = 1
#Server_IP = "192.168.1.54"  

XIncludeFile "Atomic_Web_Server3.pbi"

;Example of a URIHandeler, you create the content and have full access to the request and parmenters 
;the server frees the memory allocated 
Procedure URIfoo(*request.Atomic_Server_Request)
  
  Protected  *Atomic_Server.Atomic_Server = *request\serverid 
  Protected  content.s 
  Protected *data
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

CompilerIf #Proxy 
    
  Global event,server1,title.s = "atomic_webserver 1"
  
  server1 = Atomic_Server_Init(title,"./www/",#Server_IP,"atomicwebserver.com",80) ;this is our proxy server navigate to http://atomicwebserver.com  
  Atomic_Server_Add_Proxy(server1,"atomicwebserver2.com","127.0.0.1",81)          ;set server 1 to proxy to port 81    
  
  Atomic_Server_Add_Handler(server1,"atomicwebserver.com/foo",@URIfoo()) ;navigate to http://atomicwebserver.com/foo?foo=1234&bar=56789
  Atomic_Server_Add_Handler(server1,"atomicwebserver.com/bar",@URIbar()) ;navigate to http://atomicwebserver.com/bar?foo=1234&bar=56789
  
  OpenConsole() 
  
  If Atomic_Server_Start(server1,-1,1)  ;start server no window logs to console 
    
    Repeat 
    Until Input() = "quit"   ;type quit to exit 
    
    Atomic_Server_Exit(server1)
    CloseConsole()
    
  EndIf 

  
CompilerElse 
  
  Global event,server2,title.s = "atomic_webserver 2"
  
  server2 = Atomic_Server_Init(title,"./www/","127.0.0.1","atomicwebserver2.com",81) ;this is our proxy server navigate to http://atomicweberver1.com  
  
  Atomic_Server_Add_Handler(server2,"atomicwebserver2.com/bar",@URIbar()) ;navigate to http://atomicwebserver2.com/bar?foo=12345&bar=56789
  
  OpenConsole() 
  
   If Atomic_Server_Start(server2,-1,1)  ;start server no window logs to console 
    
    Repeat 
    Until Input() = "quit"   ;type quit to exit 
    
    Atomic_Server_Exit(server2)
    CloseConsole()
    
  EndIf 
  
  
CompilerEndIf   