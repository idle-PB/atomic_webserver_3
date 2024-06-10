#Server_IP = "192.168.1.54"  

;this assumes you have an ssl cert 
;and have them in a directory named the same as your domain 

XIncludeFile "Atomic_Web_Server3.pbi"

Global event,server1,title.s = "atomic_webserver 3"

server1 = Atomic_Server_Init(title,"./www/",#Server_IP,"atomicwebserver.com",443)  
Atomic_Server_Init_TLS(server1,"./certs/atomicwebserver.com/","certificate.crt","private.key","ca_bundle.crt")   
OpenConsole()
If OpenWindow(1, 0, 0, 800, 600, title, #PB_Window_SystemMenu | #PB_Window_SizeGadget)
  
  EditorGadget(0, 0, 0, 800, 560, #PB_Editor_ReadOnly)
  AddGadgetItem(0,-1, "Server Running on port 443")
  AddWindowTimer(1,2,60000)
  Atomic_Server_start(server1,1,1) ;
 
  Repeat 
    event = WaitWindowEvent()
    Select event 
      Case #ATOMIC_SERVER_EVENT_ADD  
        AddGadgetItem(0, -1, PeekS(EventData(),-1,#PB_UTF8))
        FreeMemory(EventData()) ;<-----IMPORTANT you must free the EventData or it will leak memory.                                 
      Case #PB_Event_Timer 
        If EventTimer() = 2 
         ; updateDNS()
        EndIf   
      Case #PB_Event_CloseWindow
        Break 
    EndSelect   
  ForEver  
  
  Atomic_Server_Exit(server1)
   
EndIf
CloseConsole()
