EnableExplicit
;Atomic Webserver threaded 
;Version 3.0.8b3
;Authors Idle, Fantaisie Software
;Licence MIT
;Supports GET POST
;Get Post handlers
;URIhandler with parameters for get or post
;Reverse Proxy 
;Deflate compression 
;Header fields and Cookies

CompilerIf Not #PB_Compiler_Thread 
  MessageRequester("Atomic Web Server v3","Compile with thread safe!")
  End 
CompilerEndIf  

UsePNGImageDecoder()
UsePNGImageEncoder() 

CompilerSelect #PB_Compiler_OS ;for compatiblity with 6.04lts mk-soft
  CompilerCase #PB_OS_Windows
    CompilerIf #PB_Compiler_32Bit
      ImportC "" 
        _DateUTC.q(t=0) As "_time"  
      EndImport 
    CompilerElse   
      ImportC "" 
        _DateUTC.q(t=0) As "time"  
      EndImport 
    CompilerEndIf
  CompilerCase #PB_OS_Linux
    Procedure.q _DateUTC()
      ProcedureReturn time_(#Null)
    EndProcedure
  CompilerCase #PB_OS_MacOS
    ImportC ""
      CFAbsoluteTimeGetCurrent.d()
    EndImport
    Procedure.q _DateUTC()
      ProcedureReturn CFAbsoluteTimeGetCurrent() + Date(2001, 1, 1, 0, 0, 0)
    EndProcedure
CompilerEndSelect

Structure Atomic_Server_Request 
  clientID.i
  Serverid.i
  tid.i
  Type.i
  status.i
  kill.i
  done.i
  ContentType.s
  bcompress.i
  Host.s
  Request.s
  RequestedFile.s
  Map RequestHeaders.s(64)
  Map parameters.s(64)
EndStructure   

Structure Atomic_Server_Client 
  ID.i 
  ServerId.i
  lock.i
  timeout.i
  bSetCookie.i
  Map  Cookies.s(64)
  Map  ResponseHeaders.s(64) 
  List Requests.Atomic_Server_Request() 
EndStructure   

Prototype Atomic_Server_pURIHandler(*request.Atomic_Server_Request)
Prototype Atomic_Server_pPostGet(*request.Atomic_Server_Request) 
Prototype Atomic_server_pPreprocess(*request.Atomic_Server_Request) 

Structure Atomic_Server_handlers 
  *pt.Atomic_Server_pURIHandler 
EndStructure  

Structure Atomic_Server_Log_window 
  Window.i
  Gadget.i
EndStructure  

Structure Atomic_server_proxy 
  domain.s
  IP.s
  port.i
  pem.s
  key.s 
  cert.s 
  *request.Atomic_Server_Request 
EndStructure  

Structure Atomic_Server
  Tid.i
  Serverid.i
  Blog.i
  Title.s
  IP.s
  IpVer.i
  Port.i
  timeout.i
  WWWDirectory.s
  WWWIndex.s
  WWWError.s
  maxclients.i
  BufferSize.i
  DomainAlias.s
  Map proxy.Atomic_server_proxy(128)
  Map MimeTypes.s(128)
  Map MimeTypesComp.s(128) 
  Map URIHandlers.Atomic_Server_handlers(128) 
  pCBPost.Atomic_Server_pPostGet    
  pCBGet.Atomic_Server_pPostGet 
  Quit.i
EndStructure   

Global Atomic_Server_Log_window.Atomic_Server_Log_window

CompilerIf #PB_Compiler_OS = #PB_OS_Windows 
  
  Procedure KeepAlive(ID,set.l=#True) 
    Protected option.l,oplen.l=4 
    If setsockopt_(ID,#SOL_SOCKET,#SO_KEEPALIVE,@set,oplen) = 0 
      If getsockopt_(ID,#SOL_SOCKET,#SO_KEEPALIVE,@option,@oplen ) = 0 
        ProcedureReturn option    
      EndIf 
      ProcedureReturn -1     
    EndIf   
    
  EndProcedure    
  
  Procedure TCPNoDelay(ID,set.l=#True)  
    Protected option.l,oplen.l=4 
    If setsockopt_(ID,#IPPROTO_TCP,#TCP_NODELAY,@set,oplen) = 0 
      If getsockopt_(ID,#IPPROTO_TCP,#TCP_NODELAY,@option,@oplen ) = 0 
        ProcedureReturn option    
      EndIf 
      ProcedureReturn -1     
    EndIf  
  EndProcedure   
  
  Procedure GetSendBufferSize(ID) 
    Protected option.l,oplen.l=4 
    If getsockopt_(ID,#SOL_SOCKET,#SO_SNDBUF,@option,@oplen ) = 0 
      ProcedureReturn option 
    EndIf 
  EndProcedure   
  
  Procedure GetNetworkError(ID) 
    Protected option.l,oplen.l=4 
    
    ProcedureReturn WSAGetLastError_()
    
    If getsockopt_(ID,#SOL_SOCKET,#SO_ERROR,@option,@oplen ) = 0 
      ProcedureReturn option 
    EndIf
    ProcedureReturn -1 
    
  EndProcedure   
  
CompilerEndIf   

Procedure Atomic_Server_Init_MimeTypess(*Atomic_server.Atomic_Server) 
  ;Ref : https://fr.wikipedia.org/wiki/Type_MIME       
  *Atomic_server\MimeTypesComp("doc") = "application/msword"
  *Atomic_server\MimeTypesComp("eps") = "application/postscript"
  *Atomic_server\MimeTypesComp("exe") = "application/octet-stream"
  *Atomic_server\MimeTypescomp("json") = "application/json"
  *Atomic_server\MimeTypescomp("pdf") = "application/pdf"
  *Atomic_server\MimeTypescomp("ps") = "application/postscript"
  *Atomic_server\MimeTypescomp("rtf") = "application/rtf"
  *Atomic_server\MimeTypescomp("xhtml") = "application/xhtml+xml"
  *Atomic_server\MimeTypescomp("xsl") = "application/xml"
  *Atomic_server\MimeTypescomp("xslt") = "application/xml"
  
  *Atomic_server\MimeTypes("ttf") = "application/font-sfnt"
  *Atomic_server\MimeTypes("cff") = "application/font-sfnt"
  *Atomic_server\MimeTypes("otf") = "application/font-sfnt"
  *Atomic_server\MimeTypes("aat") = "application/font-sfnt"
  *Atomic_server\MimeTypes("sil") = "application/font-sfnt"
  *Atomic_server\MimeTypes("pfr") = "application/font-tdpfr"
  *Atomic_server\MimeTypes("woff") = "application/font-woff"
  *Atomic_server\MimeTypes("woff2") = "application/font-woff2"
  *Atomic_server\MimeTypes("eot") = "application/vnd.ms-fontobject"
  
  *Atomic_server\MimeTypes("mp3") = "audio/mpeg"
  *Atomic_server\MimeTypes("oga") = "audio/ogg"
  *Atomic_server\MimeTypes("ogg") = "audio/ogg"
  *Atomic_server\MimeTypescomp("wav") = "audio/wav"
  
  *Atomic_server\MimeTypes("gif") = "image/gif"
  *Atomic_server\MimeTypes("ief") = "image/ief"
  *Atomic_server\MimeTypes("jpeg") = "image/jpeg"
  *Atomic_server\MimeTypes("jpg") = "image/jpeg"
  *Atomic_server\MimeTypes("jpm") = "image/jpm"
  *Atomic_server\MimeTypes("jpx") = "image/jpx"
  *Atomic_server\MimeTypes("png") = "image/png"
  *Atomic_server\MimeTypescomp("svg") = "image/svg+xml"
  *Atomic_server\MimeTypes("tif") = "image/tiff"
  *Atomic_server\MimeTypes("tiff") = "image/tiff"
  
  *Atomic_server\MimeTypescomp("wrl") = "model/vrml"
  
  *Atomic_server\MimeTypescomp("pbh") =  "text/html"
  *Atomic_server\MimeTypescomp("js") =  "text/javascript"
  *Atomic_server\MimeTypescomp("css") = "text/css"
  *Atomic_server\MimeTypescomp("csv") = "text/csv"
  *Atomic_server\MimeTypescomp("htm") = "text/html"
  *Atomic_server\MimeTypescomp("html") = "text/html"
  *Atomic_server\MimeTypescomp("sgm") = "text/sgml"
  *Atomic_server\MimeTypescomp("shtm") = "text/html"
  *Atomic_server\MimeTypescomp("shtml") = "text/html"
  *Atomic_server\MimeTypescomp("txt") = "text/plain"
  *Atomic_server\MimeTypescomp("xml") = "text/xml"
  *Atomic_server\MimeTypescomp("sass") = "text/x-sass" 
  *Atomic_server\MimeTypescomp("scss") = "text/x-scss" 
  *Atomic_server\MimeTypescomp("pb") = "text/plain"
  *Atomic_server\MimeTypescomp("pbi") = "text/plain"
  
  *Atomic_server\MimeTypes("mov") = "video/quicktime"
  *Atomic_server\MimeTypes("mp4") = "video/mp4"
  *Atomic_server\MimeTypes("mpeg") = "video/mpeg"
  *Atomic_server\MimeTypes("mpg") = "video/mpeg"
  *Atomic_server\MimeTypes("ogv") = "video/ogg"
  *Atomic_server\MimeTypes("qt") = "video/quicktime"
  
  *Atomic_server\MimeTypes("arj") = "application/x-arj-compressed"
  *Atomic_server\MimeTypes("gz") = "application/x-gunzip"
  *Atomic_server\MimeTypes("rar") = "application/x-arj-compressed"
  *Atomic_server\MimeTypes("swf") = "application/x-shockwave-flash"
  *Atomic_server\MimeTypes("tar") = "application/x-tar"
  *Atomic_server\MimeTypes("tgz") = "application/x-tar-gz"
  *Atomic_server\MimeTypes("torrent") = "application/x-bittorrent"
  *Atomic_server\MimeTypescomp("ppt") = "application/x-mspowerpoint"
  *Atomic_server\MimeTypescomp("xls") = "application/x-msexcel"
  *Atomic_server\MimeTypes("zip") = "application/x-zip-compressed"
  *Atomic_server\MimeTypes("aac") = "audio/aac" 
  *Atomic_server\MimeTypes("aif") = "audio/x-aif"
  *Atomic_server\MimeTypes("m3u") = "audio/x-mpegurl"
  *Atomic_server\MimeTypescomp("mid") = "audio/x-midi"
  *Atomic_server\MimeTypes("ra") = "audio/x-pn-realaudio"
  *Atomic_server\MimeTypes("ram") = "audio/x-pn-realaudio"
  *Atomic_server\MimeTypescomp("wav") = "audio/x-wav"
  *Atomic_server\MimeTypescomp("bmp") = "image/bmp"
  *Atomic_server\MimeTypes("ico") = "image/x-icon"
  *Atomic_server\MimeTypes("pct") = "image/x-pct"
  *Atomic_server\MimeTypes("pict") = "image/pict"
  *Atomic_server\MimeTypescomp("rgb") = "image/x-rgb"
  *Atomic_server\MimeTypes("webm") = "video/webm" 
  *Atomic_server\MimeTypes("asf") = "video/x-ms-asf"
  *Atomic_server\MimeTypes("avi") = "video/x-msvideo"
  *Atomic_server\MimeTypes("m4v") = "video/x-m4v"
  
EndProcedure 

;-Declares 
Declare Atomic_Server_Init(Title.s,WWWDirectory.s,Ip.s="127.0.0.1",domain.s="",Port=80,IpVer=#PB_Network_IPv4,maxClients=5000,*pCBPost=0,*pCBGet=0) 
Declare Atomic_Server_Start(Server,window=-1,Blog=0)                                                 
Declare Atomic_Server_Thread(*Atomic_server.Atomic_Server) 
Declare Atomic_Server_ProcessRequest(ClientID)                                         
Declare Atomic_Server_BuildRequestHeader(*request.Atomic_Server_Request,*FileBuffer, FileLength, ContentType.s,Status.i=200,gzip=0)
Declare Atomic_Server_Resize()
Declare Atomic_Server_Exit(Server)                                                  
Declare Atomic_Server_Index(*request.Atomic_Server_Request) 
Declare Atomic_Server_Error(*request.Atomic_Server_Request) 
Declare Atomic_Server_Favicon(*request.Atomic_Server_Request)

Enumeration #PB_EventType_FirstCustomValue 
  #ATOMIC_SERVER_EVENT_ADD
EndEnumeration  

#ATOMIC_SERVER_GET = 1 
#ATOMIC_SERVER_POST = 2
#ATOMIC_SERVER_HEAD = 3 

;-Load tests 
#Loadtest=0 
CompilerIf #Loadtest <> 0
  
  Global semtest = CreateSemaphore() 
  
  Procedure _loadLest(amount) 
    
    Protected get.s,rec.s,send.s,con,a,try=1  
    Protected  port = Random(81,80)
    Protected len,sent,res
    rec = "Host: 127.0.0.1:" + Str(port) + #CRLF$
    rec + "Connection: keep-alive" + #CRLF$
    rec + "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0" + #CRLF$
    rec + "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7" + #CRLF$
    rec + "Sec-Fetch-Site: none" + #CRLF$
    rec + "Sec-Fetch-Mode: navigate" + #CRLF$
    rec + "Sec-Fetch-User: ?1" + #CRLF$
    rec + "Sec-Fetch-Dest: document" + #CRLF$
    rec + "Accept-Encoding: gzip, deflate, br" + #CRLF$
    rec + "Accept-Language: en-US,en;q=0.9" + #CRLF$ + #CRLF$
    
    WaitSemaphore(semtest) 
    
    Repeat
      con = OpenNetworkConnection("127.0.0.1",port,#PB_Network_TCP | #PB_Network_IPv4,5000)  
      If con 
        get = "GET /index.html HTTP/1.1" + #CRLF$ 
        send = get+rec         
        SendNetworkString(Con,send)
        Delay(100)
        get = "GET /favicon.ico HTTP/1.1" + #CRLF$ 
        send = get + rec 
        SendNetworkString(Con,send)
        Debug "Sent on try " + Str(try) + " " + Str(port)
        Break 
      Else 
        Debug "can't connect retry " + Str(try) 
        Delay(10) 
        try+1
      EndIf 
    Until try > 5 
    If try > 5 
      Debug "couldn't connect" 
    EndIf 
    
  EndProcedure 
  
  Procedure loadTest(amount)
    Protected  a 
    
    Dim threads(amount) 
    
    For a = 1 To amount
      threads(a) = CreateThread(@_loadLest(),0) 
    Next 
    
    Delay(1000) 
    Debug "signal" 
    
    For a = 1 To amount 
      SignalSemaphore(semtest)
    Next 
    
    For a = 1 To amount 
      If IsThread(threads(a))
        WaitThread(threads(a),1000)
      EndIf   
    Next 
    
    Debug "done test" 
    
  EndProcedure 
  
CompilerEndIf   

Procedure Atomic_Server_Init(title.s,wwwDirectory.s,IP.s="127.0.0.1",domain.s="",port=80,IpVer=#PB_Network_IPv4,maxclients=5000,*pCBPost=0,*pCBGet=0) 
  
  Protected *atomic_server.Atomic_Server 
  *atomic_server= AllocateStructure(Atomic_Server) 
  If *atomic_server 
    *Atomic_Server\Title.s = title 
    *atomic_server\IP = IP 
    *atomic_server\IpVer = IPver
    *atomic_server\DomainAlias = domain 
    *Atomic_Server\Port = port
    *Atomic_Server\WWWDirectory.s = wwwDirectory; "www/" 
    *Atomic_Server\WWWIndex.s = "index.html"
    *Atomic_Server\WWWError.s = "error.html"
    *Atomic_Server\maxclients = maxclients
    *Atomic_Server\BufferSize = 1024*64
    *Atomic_server\timeout = 10000 
    *Atomic_Server\pCBPost = *pCBPost    ;set this to a callback to get POST parameters 
    *Atomic_Server\pCBGet = *pCBGet 
    If domain = ""
      *Atomic_Server\URIHandlers("index")\pt = @*Atomic_Server_Index() 
      *Atomic_Server\URIHandlers("error")\pt = @*Atomic_Server_Error() 
      *Atomic_Server\URIHandlers("favicon.ico")\pt = @*Atomic_Server_favicon() 
    Else 
      *Atomic_Server\URIHandlers(domain + "/index")\pt = @*Atomic_Server_Index() 
      *Atomic_Server\URIHandlers(domain + "/error")\pt = @*Atomic_Server_Error() 
      *Atomic_Server\URIHandlers(domain + "/favicon.ico")\pt = @*Atomic_Server_favicon() 
    EndIf 
    Atomic_Server_Init_MimeTypess(*atomic_server) 
    ProcedureReturn *atomic_server 
  EndIf 
  
EndProcedure   

Procedure Atomic_Server_Thread(*Atomic_server.Atomic_Server) 
  
  Protected  ServerEvent, Result, ClientID
  Protected  *buffer = AllocateMemory(*Atomic_Server\BufferSize+2) 
  Protected  *client.Atomic_Server_Client 
  Protected  NewMap clients(*Atomic_server\maxclients)
  Protected  atomicserver = CreateNetworkServer(#PB_Any,*Atomic_Server\Port,#PB_Network_TCP | *Atomic_server\IpVer,*Atomic_server\IP)  
  Protected  *request.Atomic_Server_Request  
  If atomicserver
    CompilerIf #PB_Compiler_OS = #PB_OS_Windows  
      TCPNoDelay(ServerID(atomicserver),1) 
    CompilerEndIf   
    *Atomic_server\serverid = *Atomic_server
    Repeat    
      ServerEvent = NetworkServerEvent(atomicserver)
      Select ServerEvent              
        Case #PB_NetworkEvent_Connect 
          ClientID = EventClient()
          *client = AllocateStructure(Atomic_Server_client)
          If *client <> 0 
            *client\ID = clientID 
            *client\serverid = *Atomic_server 
            *client\lock = CreateMutex()
            *client\timeout = ElapsedMilliseconds() + *Atomic_server\timeout 
            AddMapElement(clients(),Str(ClientId))  
            clients() = *client  
          EndIf   
        Case #PB_NetworkEvent_Data 
          ClientID = EventClient()         
          If FindMapElement(clients(),Str(clientid)) 
            *client = clients()  
            AddElement(*Client\requests())
            *Client\requests()\clientID = *client 
            *Client\requests()\Serverid = *Atomic_server 
            *Client\requests()\Request=""
            *Client\requests()\RequestedFile="" 
            Repeat
              FillMemory(*buffer,*Atomic_Server\BufferSize+2,0,#PB_Byte)
              Result = ReceiveNetworkData(ClientID, *Buffer, *Atomic_Server\BufferSize)
              If result <> -1 
                *Client\requests()\Request + PeekS(*Buffer, Result, #PB_UTF8 | #PB_ByteLength)
                *client\timeout = ElapsedMilliseconds() + *Atomic_server\timeout
              Else 
                Delay(0) 
              EndIf   
            Until Result <> *Atomic_Server\BufferSize
            If result > 0 
              *client\requests()\tid = CreateThread(@Atomic_Server_ProcessRequest(),@*client\requests())
            EndIf
          EndIf   
        Case #PB_NetworkEvent_Disconnect 
          ClientID = EventClient()
          If FindMapElement(clients(),Str(clientID))  
            *client = clients()  
            ForEach *client\requests()
              If IsThread(*client\requests()\tid) 
                *client\requests()\kill = 1 
                WaitThread(*client\requests()\tid) 
              EndIf   
              DeleteElement(*client\requests())
            Next   
            FreeMutex(*client\lock) 
            FreeStructure(clients()) 
            DeleteMapElement(clients()) 
          EndIf   
        Case #PB_NetworkEvent_None 
          ForEach clients() 
            *client = clients()
            If *client
              ForEach *client\requests()              
                If *client\requests()\done 
                  DeleteElement(*client\requests()) 
                EndIf   
              Next                  
              If (ElapsedMilliseconds() > *client\timeout And ListSize(*client\requests())=0)
                CloseNetworkConnection(*client\ID) 
                FreeMutex(*client\lock) 
                FreeStructure(*client) 
                DeleteMapElement(clients())
              EndIf 
            EndIf 
          Next   
          Delay(10)
      EndSelect
    Until *Atomic_Server\quit
    CloseNetworkServer(atomicserver)  
    ForEach clients()
      *client = clients()
      FreeMutex(*client\lock) 
      FreeStructure(clients()) 
    Next   
    FreeMemory(*buffer)       
  Else
    MessageRequester(*Atomic_Server\Title, "Error: can't create the server (port " + *Atomic_Server\port + " in use ?)") 
    FreeMemory(*buffer)  
  EndIf
  
EndProcedure   

Procedure Atomic_Server_Start(server,window=-1,bLog=0)  
  
  Protected *atomic_server.Atomic_Server = server     
  
  If *atomic_server 
    *Atomic_Server\bLog = blog 
    Atomic_Server_Log_window\window = window
    *Atomic_Server\tid = CreateThread(@Atomic_Server_Thread(),server) 
    If *Atomic_Server\tid 
      ProcedureReturn 1
    Else 
      MessageRequester(*Atomic_Server\Title, "Error: can't create thread") 
      FreeStructure(*atomic_server)   
    EndIf
  EndIf 
  
EndProcedure 

Procedure Atomic_Server_Exit(server)  
  
  Protected *atomic_server.Atomic_Server = server 
  *Atomic_Server\quit = 1
  If IsThread(*Atomic_Server\tid) 
    WaitThread(*Atomic_Server\tid) 
  EndIf 
  FreeStructure(*Atomic_Server) 
  
EndProcedure 

UseZipPacker() 

Procedure Atomic_Server_deflate(*request.Atomic_Server_Request,*input,len) 
  
  Protected  *atomic_client.Atomic_Server_Client = *request\clientID 
  Protected lenout = len*1.5 
  Protected *tinput,*output,res   
  
  *output = AllocateMemory(lenOut)
  If *output 
    res = CompressMemory(*input,len,*output,lenout,#PB_PackerPlugin_Zip) 
    If res > 0 
      *request\bcompress=1
      FreeMemory(*input) 
      ProcedureReturn *output    
    Else 
      Debug "failed to compress" 
    EndIf 
  Else 
    *request\bcompress = 0  
    ProcedureReturn *input 
    Debug "failed to alloc"
  EndIf
  
EndProcedure   

Structure ara
  a.a[0] 
EndStructure

Procedure Atomic_Search(*pinput,inlen,*pat.ara,palen,pos=0)
  ;booyer moore search 
  Protected i,t,len,skip,*input, *pa.Ascii,*pb.Ascii   
  Structure ST
    a.a[256] 
  EndStructure  
  Static skiptable.ST 
  inlen-pos 
  *input = *pinput+pos 
  len = inlen - palen
  If pos = 0  
    For i = 0 To 255
      Skiptable\a[i] = 255;
    Next  
    t= palen-1
    For i = 0 To t
      skiptable\a[*pat\a[i]] = i
    Next     
  EndIf 
  i=0
  skip=0
  While skip <= len
    i = palen - 1;
    *pa = (*input + skip + i)
    *pb = *pat+i
    While (*pb\a = *pa\a) 
      i-1 
      *pa - 1 
      *pb - 1
    Wend   
    If i > 0 
      t = i - Skiptable\a[*pa\a]   
      If t > 1 
        skip + t 
      Else 
        skip + 1
      EndIf 
    Else   
      ProcedureReturn skip + pos 
    EndIf     
  Wend  
  ProcedureReturn -1
  
EndProcedure 

Procedure Atomic_Server_Preprocess(*input,len,*request.Atomic_Server_Request) 
  
  Protected pos,t_start,t_end,fnTag.s,p_start,p_end,outlen,outp,osz,taglen    
  Protected *cbr.Atomic_server_pPreprocess,*dat,msz 
  Protected *output = AllocateMemory(len) 
  Static *tag
  If Not *tag 
    *tag = UTF8("<?PB") 
  EndIf   
  taglen = MemorySize(*tag)-1 
  outlen = len 
  
  While (pos > -1 And pos < len) 
    pos = Atomic_Search(*input,len,*tag,taglen,pos) 
    If pos <> -1 
      osz = outp+(pos-p_end)
      If osz > outlen 
        *output = ReAllocateMemory(*output,osz,#PB_Memory_NoClear)
        outlen = osz 
      EndIf   
      CopyMemory(*input+p_end,*output+outp,pos-p_end)
      outp + (pos-p_end) 
      p_start = pos 
      pos + taglen 
      While PeekA(*input+pos) = 32 
        pos + 1
      Wend 
      t_start = pos 
      While (PeekA(*input+pos) <> 32 And PeekA(*input+pos) <> '/')
        pos + 1
      Wend 
      t_end = pos
      While PeekA(*input+pos) <> '>' 
        pos + 1
      Wend 
      p_end = pos+1 
      fnTag = PeekS(*input+t_start,t_end-t_start,#PB_UTF8)
      *cbr.Atomic_server_pPreprocess = GetRuntimeInteger(fnTag) 
      If *cbr
        *dat = *cbr(*request) ;call backs to runtime procedures 
        If *dat 
          msz = MemorySize(*dat)-1
          osz = outp + msz 
          If osz > outlen 
            *output = ReAllocateMemory(*output,osz,#PB_Memory_NoClear)
            outlen = osz 
          EndIf   
          CopyMemory(*dat,*output+outp,msz)
          outp + msz
          FreeMemory(*dat) 
        EndIf 
        pos+1 
      EndIf 
    EndIf  
  Wend   
  osz = outp+(len-p_end) 
  If osz > outlen 
    *output = ReAllocateMemory(*output,osz,#PB_Memory_NoClear)
    outlen = osz 
  EndIf   
  CopyMemory(*input+p_end,*output+outp,len-p_end)
  ProcedureReturn *output 
  
EndProcedure   

Procedure Atomic_Server_Send(*request.Atomic_Server_Request,*buffer,len,lock=1) 
  
  Protected  *atomic_server.Atomic_Server = *request\Serverid  
  Protected  *atomic_client.Atomic_Server_Client = *request\clientID 
  Protected outpos,trylen,sendlen
  
  Repeat
    trylen = len - outpos
    If trylen > *Atomic_Server\BufferSize
      trylen = *Atomic_Server\BufferSize
    EndIf
    If lock 
      Repeat 
        If TryLockMutex(*atomic_client\lock) 
          sendlen = SendNetworkData(*atomic_client\id, *Buffer+outpos, trylen)
          UnlockMutex(*atomic_client\lock)
          Break 
        Else  
          Delay(10)
        EndIf 
      Until ElapsedMilliseconds() > *atomic_client\timeout
    Else 
      sendlen = SendNetworkData(*atomic_client\id, *Buffer+outpos, trylen)
    EndIf 
    If sendlen > 0
      outpos + sendlen
      *atomic_client\timeout = ElapsedMilliseconds() + *atomic_server\timeout
    Else
      Delay(20)
    EndIf 
    If ElapsedMilliseconds() > *atomic_client\timeout
      Break    
    EndIf 
    Delay(0) ;for context switching 
  Until (outpos >= len Or *request\kill) 
  
EndProcedure   

Procedure Atomic_Server_ProcessURIRequest(server,*request.Atomic_Server_Request,Requestfile.s) 
  
  Protected *data,FileLength,*FileBuffer,*BufferOffset,ContentType.s=""
  Protected outpos,fulllen,trylen,sendlen
  Protected  *atomic_server.Atomic_Server = server 
  Protected  *atomic_client.Atomic_Server_Client = *request\clientID 
  Protected  pos  
  
  If FindMapElement(*Atomic_Server\URIHandlers(),Requestfile)
    *data = *Atomic_Server\URIHandlers()\pt(*request)
    If *request\bcompress 
      *data = Atomic_Server_deflate(*request,*Data,MemorySize(*data)) 
    EndIf   
    FileLength = MemorySize(*data) 
    *FileBuffer   = AllocateMemory(FileLength + 8192)
    *BufferOffset = Atomic_Server_BuildRequestHeader(*request,*FileBuffer, FileLength, *request\ContentType,*request\status,*request\bcompress) 
    CopyMemory(*data,*BufferOffset,FileLength)
    outpos = 0
    fulllen = *BufferOffset - *FileBuffer + FileLength
    Atomic_Server_Send(*request,*filebuffer,fulllen)
    FreeMemory(*FileBuffer)
    FreeMemory(*data)  
    If outpos >= fulllen
      ProcedureReturn #True 
    EndIf   
  EndIf        
  
EndProcedure  
  
Procedure Atomic_Server_SetCookie(*request.Atomic_Server_Request,Cookie.s,value.s)  ;set a client cookie 
  
   Protected *client.Atomic_Server_Client = *request\clientID   
   LockMutex(*client\lock) 
   If FindMapElement(*client\Cookies(),cookie) 
     *client\Cookies() = value  
   Else 
     AddMapElement(*client\Cookies(),cookie) 
     *client\Cookies() = value   
   EndIf   
   UnlockMutex(*client\lock) 
   
EndProcedure   

Procedure Atomic_Server_GetCookies(*request.Atomic_Server_Request) ;internal function retrives cookies 
  
  Protected *client.Atomic_Server_Client = *request\clientID   
  Protected cookie.s,cookies.s,key.s,val.s,ct,a 
  Static regex 
  If Not regex 
    regex = CreateRegularExpression(#PB_Any,"(?:\s*\w+\s*=\s*[\d\w-_.]+\s*;?)*$") 
  EndIf 
  
  LockMutex(*client\lock) 
  If FindMapElement(*request\RequestHeaders(),"Cookie") 
    cookies.s = *request\RequestHeaders() 
    ct = CountString(cookies,"; ") +1 
    For a = 1 To ct 
      cookie = StringField(cookies,a,"; ") 
      If ExamineRegularExpression(regex,cookie) 
        If NextRegularExpressionMatch(regex)
          key = StringField(cookie,1,"=") 
          val = StringField(cookie,2,"=") 
          If FindMapElement(*client\Cookies(),key)  
            *client\Cookies() = Val 
          Else 
            AddMapElement(*client\Cookies(),key)
            *client\Cookies() = Val  
          EndIf
        EndIf 
      EndIf 
    Next   
  EndIf   
  UnlockMutex(*client\lock) 
  
EndProcedure   

Procedure Atomic_Server_GetRequestHeaders(*request.Atomic_Server_Request) ;internal gets request headers 
  
  Protected pos,ct,a,line.s,key.s,val.s 
  Protected *client.Atomic_Server_Client = *request\clientID  
  
  ct = CountString(*request\Request,#CRLF$) 
  For a = 1 To ct 
    line.s = StringField(*request\request,a,#CRLF$) 
    pos = FindString(line,": ") 
    If pos 
      key.s = StringField(line,1,": ") 
      val.s = StringField(line,2,": ")  
      If FindMapElement(*request\RequestHeaders(),key) 
        *request\RequestHeaders() = val 
      Else 
        AddMapElement(*request\RequestHeaders(),key) 
        *request\RequestHeaders() = val 
      EndIf 
      If key = "Cookie" 
        Atomic_Server_GetCookies(*request) 
      EndIf 
        
    EndIf   
  Next     
    
EndProcedure  

Procedure Atomic_Server_SetResponceHeader(*request.Atomic_Server_Request,key.s,value.s) ;faciltates adding custom header fields 
  
  Protected *client.Atomic_Server_Client = *request\clientID   
   LockMutex(*client\lock) 
   If FindMapElement(*client\ResponseHeaders(),key) 
     *client\ResponseHeaders() = value  
   Else 
     AddMapElement(*client\ResponseHeaders(),key)  
     *client\ResponseHeaders() = value   
   EndIf   
   UnlockMutex(*client\lock)  
  
EndProcedure   

Procedure Atomic_Server_GetParameters(*request.Atomic_Server_Request)
  
  Protected Fileleft, count, *p.Unicode,Position,Position1
  
  If *request\type = #ATOMIC_SERVER_GET 
    Position = FindString(*Request\Request,"?") ;Find the parameters 
  ElseIf *request\type = #ATOMIC_SERVER_POST   
    Position = FindString(*request\Request,#CRLF$+#CRLF$) ;Find the parameters 
    If Position > 0 
      Position+3 
    EndIf   
  EndIf 
  If Position > 0 
    ClearMap(*request\parameters())
    Fileleft = Position-1 
    Position+1
    Position1=1
    *p.Unicode = @*Request\Request+(Position*2)
    While *p\u > 32  
      Select *p\u 
        Case '&',' ' 
          *request\parameters() = Mid(*Request\Request,Position,Position1) ;add value to map
          Position+Position1+1
          Position1 = 0 
          If *p\u = ' ' 
            Break 
          EndIf 
          *p+2
        Case '=' 
          AddMapElement(*request\parameters(),Mid(*Request\Request,Position,Position1)) ;add key to map
          count +1 
          Position+Position1+1
          Position1 = 0
          *p+2
      EndSelect
      *p+2 
      Position1+1
    Wend 
    If count > 0 
      *request\parameters() = Mid(*Request\Request,Position,Position1) ;add remaning value to map 
    EndIf 
  EndIf     
  ProcedureReturn count 
  
EndProcedure  

Procedure Atomic_Server_Reverse_Proxy(*request.Atomic_Server_Request) 
  
  Protected *Atomic_Server.Atomic_Server = *request\serverid 
  Protected *Atomic_Client.Atomic_Server_Client = *request\clientID 
  Protected Timeout = ElapsedMilliseconds() + 5000 
  Protected *buffer  
  Protected result,con,sendlen,success 
  
  LockMutex(*atomic_client\lock) 
  If FindMapElement(*Atomic_Server\proxy(),*request\host) 
    *buffer = AllocateMemory(*Atomic_Server\BufferSize+2) 
    *Atomic_Client\timeout = ElapsedMilliseconds() + 5000 
    con =  OpenNetworkConnection(*Atomic_Server\proxy()\IP,*Atomic_Server\proxy()\port,#PB_Network_TCP | *Atomic_Server\IpVer,5000)    
    If con   
      Debug "start proxy request"
      If SendNetworkString(con,*request\Request,#PB_UTF8) 
        Repeat
          Delay(2)
        Until (NetworkClientEvent(con) = #PB_NetworkEvent_Data And ElapsedMilliseconds() < Timeout)
        Debug "proxy recive / send "
        Repeat
          FillMemory(*buffer,*Atomic_Server\BufferSize+2,0,#PB_Byte)
          Result = ReceiveNetworkData(con, *Buffer, *Atomic_Server\BufferSize)
          If result <> -1 
            Atomic_Server_Send(*request,*buffer,result,0) 
            *Atomic_Client\timeout = ElapsedMilliseconds() + *Atomic_server\timeout
          Else 
            Debug "proxy would block"
            Delay(10) 
          EndIf   
        Until Result <> *Atomic_Server\BufferSize
        success = 1 
      EndIf 
      CloseNetworkConnection(con)   
    Else 
      Debug "failed to open connection" 
    EndIf  
    FreeMemory(*buffer) 
  EndIf 
  UnlockMutex(*atomic_client\lock) 
  ProcedureReturn success 
  
EndProcedure   

Procedure Atomic_Server_ProcessRequest(*request.Atomic_Server_Request)
  
  Protected RequestedFile.s="", FileLength, MaxPosition, Position,ContentType.s=""
  Protected *Atomic_Server.Atomic_Server = *request\serverid 
  Protected *Atomic_Client.Atomic_Server_Client = *request\clientID 
  Protected type.s=""
  Protected *FileBuffer,fn,*msg,*preprocess,*output
  Protected *BufferOffset
  Protected outpos,fulllen,trylen,sendlen,pos,bcompress
  Protected request.s="",count,*p.Unicode,FileLeft,start,host$
  
  request.s = URLDecoder(*request\Request)
  type.s = Left(request,4)   
  If FindString(type,"GET",1)
    *request\type = #ATOMIC_SERVER_GET 
  ElseIf FindString(type,"POST",1)  
    *request\type = #ATOMIC_SERVER_POST
  ElseIf FindString(type,"HEAD",1)  
    *request\type = #ATOMIC_SERVER_HEAD
  EndIf 
  
  Atomic_Server_GetRequestHeaders(*request)
  
  If *request\type  
    MaxPosition = FindString(Request, Chr(13), 5)
    Position = FindString(Request, " ", 5)
    If Position < MaxPosition
      RequestedFile = Mid(Request, 6, Position-5)      ; Automatically remove the leading '/'
      RequestedFile = RTrim(RequestedFile)
    Else
      RequestedFile = Mid(Request, 6, MaxPosition-5)   ; When a command like 'GET /' is sent..
    EndIf
    count = Atomic_Server_GetParameters(*request)
    FileLeft = FindString(RequestedFile,"?")
    If Fileleft 
      RequestedFile = Left(RequestedFile,Fileleft-1)  ;trim the request file 
    EndIf 
    start = FindString(request,"Host:") + 6 
    Position = FindString(request,#CR$,start)   
    *request\host = Mid(request,start,Position-start); + "/"
    If FindString(*request\Host,"..") 
      *request\host ="" 
    EndIf   
    If RequestedFile = "" ; if there was no page requested 
      RequestedFile = *Atomic_Server\WWWIndex      
    EndIf
    Trim(*request\Host," ") 
    If (FindString(*request\host,"127.0.0.1") = 0 And FindString(*request\host,"localhost") = 0 And FindString(*request\Host,"[::1]")=0) ;trim out ip or add domain alias
      If *Atomic_Server\ip = *request\Host 
        *request\host = *Atomic_Server\DomainAlias 
        *request\RequestedFile = *request\host + "/" + RequestedFile   
      Else   
        *request\RequestedFile = *request\host + "/" + RequestedFile
      EndIf   
    Else     
      *request\RequestedFile = RequestedFile 
    EndIf   
    If (IsWindow(Atomic_Server_Log_window\window) And *Atomic_Server\blog)
      *msg =  UTF8("Client IP " + IPString(GetClientIP(*Atomic_Client\ID)) + " load " + *request\RequestedFile + " client " + Str(*Atomic_Client\ID) + " time " + FormatDate("%hh:%ii:%ss",_DateUTC())) 
      If *msg 
        PostEvent(#ATOMIC_SERVER_EVENT_ADD,Atomic_Server_Log_window\window,0,0,*msg)
      EndIf   
    EndIf       
    If Atomic_server_Reverse_Proxy(*request) = 0 ;if were not proxying 
      fn = ReadFile(-1, *Atomic_Server\WWWDirectory + *request\RequestedFile,#PB_UTF8 | #PB_File_SharedRead)
      If fn   
        FileLength = Lof(fn)
        *request\status = 200 
        If FindMapElement(*Atomic_server\MimeTypesComp(),GetExtensionPart(*request\RequestedFile)) ;check mime types for compression 
          ContentType = *Atomic_server\MimeTypescomp() 
          Position = FindString(*request\Request,"Accept-Encoding:") 
          If Position 
            Position = FindString(*request\Request,"deflate",Position) 
            If Position 
              *request\bcompress = 1
            EndIf
          EndIf   
        ElseIf FindMapElement(*Atomic_server\MimeTypes(),GetExtensionPart(*request\RequestedFile)) ;check mime types for uncompressed
          ContentType = *Atomic_server\MimeTypes()    
        Else 
          Position = FindString(*request\Request,"Accept-Encoding:") 
          If Position 
            Position = FindString(*request\Request,"deflate",Position) 
            If Position
              *request\bcompress = 1
            EndIf
          EndIf   
          ContentType = "text/html" 
        EndIf
        If count > 0  ;if there are parameters call post or get callbacks 
          If *request\type = #ATOMIC_SERVER_POST
            If *Atomic_Server\pCBPost 
              *Atomic_Server\pCBPost(*request)
            EndIf
          ElseIf *Atomic_Server\pCBGet 
            *Atomic_Server\pCBGet(*request) 
          EndIf   
        EndIf 
      Else
        If Atomic_Server_ProcessURIRequest(*Atomic_Server,*request,*request\RequestedFile) <> #True ;check for urihandelr 
          If Atomic_Server_ProcessURIRequest(*Atomic_Server,*request,"error") <> #True              ;check for built in error handler  
            fn = ReadFile(-1, *Atomic_Server\WWWDirectory + *Atomic_Server\WWWError, #PB_UTF8 | #PB_File_SharedRead) ;fallback to file 
            If fn 
              *request\status = 404 
              FileLength = Lof(fn)
              ContentType = "text/html"        
            EndIf
          EndIf 
        EndIf 
      EndIf
    EndIf 
    If fn 
      If GetExtensionPart(*request\RequestedFile) = "pbh"  ;check for preprocess 
        *preprocess  = AllocateMemory(FileLength)
        ReadData(fn, *preprocess, FileLength)
        *output = Atomic_Server_Preprocess(*preprocess,FileLength,*request)  ;preprocess page 
        If *request\bcompress
          *output = Atomic_Server_deflate(*request,*output,MemorySize(*output))   
        EndIf   
        FileLength = MemorySize(*output)
        *FileBuffer   = AllocateMemory(FileLength + 8192)
        *BufferOffset = Atomic_Server_BuildRequestHeader(*request,*FileBuffer, FileLength, ContentType,*request\status,*request\bcompress)
        CopyMemory(*output,*BufferOffset,FileLength) 
        FreeMemory(*preprocess)
        FreeMemory(*output) 
      Else    
        *output = AllocateMemory(FileLength)
        If *output 
          ReadData(fn,*output, FileLength)
          If *request\bcompress
            *output = Atomic_Server_deflate(*request,*output,MemorySize(*output)) 
          EndIf   
          FileLength = MemorySize(*output)
          *FileBuffer  = AllocateMemory(FileLength + 8192)
          *BufferOffset = Atomic_Server_BuildRequestHeader(*request,*FileBuffer, FileLength, ContentType,*request\status,*request\bcompress)
          CopyMemory(*output,*BufferOffset, FileLength)
          FreeMemory(*output)
        EndIf 
      EndIf   
      CloseFile(fn)
      outpos = 0
      fulllen = *BufferOffset - *FileBuffer + FileLength
      Atomic_Server_send(*request,*FileBuffer,fulllen) 
      FreeMemory(*FileBuffer)
    EndIf 
  EndIf
  *request\done = 1
  
EndProcedure

Procedure Atomic_Server_BuildRequestHeader(*request.Atomic_Server_Request,*FileBuffer, FileLength, ContentType.s,Status.i=200,gzip=0)
  
  Protected *Atomic_Server.Atomic_Server = *request\Serverid
  Protected *client.Atomic_Server_Client = *request\clientID 
  Protected Length
  Protected date = _DateUTC()
  Protected Week.s = "Sun, Mon,Tue,Wed,Thu,Fri,Sat"
  Protected MonthsOfYear.s = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" 
  Protected DayOfWeek.s = StringField("Sun, Mon,Tue,Wed,Thu,Fri,Sat", DayOfWeek(Date) + 1, ",")
  Protected Day = Day(Date)
  Protected Month.s = StringField("Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec", Month(Date), ",")
  Protected Year.s = Str(Year(Date))
  Protected Time.s = FormatDate("%hh:%ii:%ss GMT", Date)
  Protected state.s,line.s 
    
  Select status 
    Case 100 
      state = "100 Continue"
    Case 200 
      state = "200 OK"
    Case 404 
      state = "404 Not Found"
  EndSelect    
  
  Length = PokeS(*FileBuffer, "HTTP/1.1 " + state + #CRLF$, -1, #PB_UTF8)                                                             
  *FileBuffer + Length
  Length = PokeS(*FileBuffer, "Date: " + DayOfWeek + ", " + Day + " " + Month + " " + Year + " " + Time  + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  Length = PokeS(*FileBuffer, "Last-Modified: " + DayOfWeek + ", " + Day + " " + Month + " " + Year + " " + Time  + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  Length = PokeS(*FileBuffer, "Cache-Control: max-age="+ Str(3600) + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  Length = PokeS(*FileBuffer, "Server: "+ *Atomic_Server\DomainAlias + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  
  ;LockMutex(*client\lock)
  ForEach *client\ResponseHeaders() 
    line = MapKey(*client\ResponseHeaders()) + ": " + *client\ResponseHeaders() +  #CRLF$ 
    Length = PokeS(*FileBuffer,line,-1, #PB_UTF8)
    *FileBuffer + Length
  Next 
  
  If *client\bSetCookie = 0 
    ForEach *client\Cookies() 
      line = "Set-Cookie: " + MapKey(*client\Cookies()) + "=" + *client\Cookies() +  #CRLF$ 
      Length = PokeS(*FileBuffer,line,-1, #PB_UTF8)
      *FileBuffer + Length
      *client\bSetCookie = 1   
    Next   
  EndIf 
  ;UnlockMutex(*client\lock) 
  
  Length = PokeS(*FileBuffer, "Content-Length: " + Str(FileLength) + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  Length = PokeS(*FileBuffer, "Content-Type: " + ContentType + #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
  If gzip 
    Length = PokeS(*FileBuffer, "Content-Encoding: deflate" + #CRLF$, -1, #PB_UTF8)
    *FileBuffer + Length
  EndIf   
  Length = PokeS(*FileBuffer, #CRLF$, -1, #PB_UTF8)
  *FileBuffer + Length
     
  ProcedureReturn *FileBuffer
  
EndProcedure

Procedure.s Atomic_Server_Chr(v.i) ;return a proper surrogate pair for unicode values outside the BMP (Basic Multilingual Plane)
  
  Protected chr.q
  If v < $10000
    ProcedureReturn Chr(v)
  Else
    chr = (v&$3FF)<<16 | (v-$10000)>>10 | $DC00D800
    ProcedureReturn PeekS(@chr, 2, #PB_Unicode)
  EndIf
  
EndProcedure

Procedure Atomic_Server_Index(*request.Atomic_Server_Request) 
  
  Protected *Atomic_Server.Atomic_Server = *request\serverid  
  Protected *data
  Protected content.s 
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
  content + "</head><body><h1 class='font-effect-fire' style='text-align:center';>" + *request\host + "</h1>"+ #CRLF$
  content + "<h2 style='text-align:center';>" + Atomic_Server_Chr($2622) + "</h2>"
  content + "<p>Under Construction</p>" 
  content + "<body></html>"
  *data = UTF8(content) 
  *request\status = 200 
  *request\ContentType = "text/html" ;Set the contentType
  ProcedureReturn *data  
  
EndProcedure  

Procedure Atomic_Server_Error(*request.Atomic_Server_Request) 
  
  Protected *Atomic_Server.Atomic_Server = *request\serverid  
  Protected *data
  Protected content.s 
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
  content + "</head><body><h1 class='font-effect-fire' style='text-align:center';>" + *request\host + "</h1>"+ #CRLF$
  content + "<h2 style='text-align:center';>" + Atomic_Server_Chr($2622) + "</h2>"
  content + "<p><font color='red'>Error 404:</font> " + *request\RequestedFile + " Not found</p>" 
  content + "<body></html>"
  *data = UTF8(content) 
  *request\status = 404
  *request\ContentType = "text/html"
  ProcedureReturn *data  
  
EndProcedure  

Procedure Atomic_Server_Favicon(*request.Atomic_Server_Request)
  
  Protected *Atomic_Server.Atomic_Server = *request\serverid  
  Protected *data,len 
  len = ?icoe-?ico 
  *Data = AllocateMemory(len) 
  CopyMemory(?ico,*data,len)   
  *request\ContentType = "image/png"
  ProcedureReturn *data  
  
  DataSection 
    ico: 
    Data.b $89,$50,$4E,$47,$0D,$0A,$1A,$0A,$00,$00,$00,$0D,$49,$48,$44,$52
    Data.b $00,$00,$00,$40,$00,$00,$00,$40,$04,$03,$00,$00,$00,$58,$47,$6C
    Data.b $ED,$00,$00,$00,$12,$50,$4C,$54,$45,$00,$00,$00,$55,$00,$00,$FF
    Data.b $00,$00,$FF,$88,$00,$FF,$DD,$00,$FF,$FF,$88,$F9,$C3,$72,$F3,$00
    Data.b $00,$00,$01,$74,$52,$4E,$53,$00,$40,$E6,$D8,$66,$00,$00,$00,$01
    Data.b $62,$4B,$47,$44,$00,$88,$05,$1D,$48,$00,$00,$00,$09,$70,$48,$59
    Data.b $73,$00,$00,$0B,$13,$00,$00,$0B,$13,$01,$00,$9A,$9C,$18,$00,$00
    Data.b $00,$07,$74,$49,$4D,$45,$07,$DE,$01,$14,$12,$13,$18,$6B,$DA,$90
    Data.b $5D,$00,$00,$01,$2F,$49,$44,$41,$54,$48,$C7,$D5,$95,$DB,$95,$C3
    Data.b $20,$0C,$44,$DD,$82,$5A,$50,$0B,$6A,$81,$16,$DC,$7F,$2B,$3B,$33
    Data.b $C2,$39,$E0,$3C,$04,$27,$3F,$59,$3E,$6C,$8C,$6E,$F4,$16,$39,$8E
    Data.b $5F,$5B,$C6,$95,$3B,$EF,$9B,$3D,$C0,$CC,$23,$DC,$24,$EF,$9B,$5D
    Data.b $00,$C7,$10,$68,$D3,$DA,$0B,$E2,$03,$60,$CE,$2F,$73,$1C,$07,$BC
    Data.b $B3,$68,$E7,$D9,$88,$AE,$02,$46,$D5,$88,$30,$78,$0C,$C0,$05,$0C
    Data.b $26,$2A,$80,$1A,$A1,$D0,$0D,$C7,$27,$41,$FA,$38,$5B,$28,$00,$A7
    Data.b $E0,$04,$C1,$17,$34,$C3,$E5,$08,$1F,$5C,$A8,$00,$FA,$76,$2A,$AC
    Data.b $FE,$22,$E1,$53,$0C,$05,$90,$16,$28,$6A,$09,$F8,$A3,$EA,$AB,$00
    Data.b $82,$82,$00,$59,$56,$A2,$04,$4C,$45,$2C,$01,$55,$99,$72,$BC,$F9
    Data.b $BC,$19,$58,$00,$B2,$56,$54,$AD,$27,$53,$BD,$0B,$1C,$2E,$B1,$2B
    Data.b $C3,$4A,$D2,$9D,$28,$01,$B6,$9C,$54,$03,$49,$F8,$C9,$CD,$0A,$E8
    Data.b $53,$97,$6E,$2A,$E2,$7D,$40,$04,$33,$D5,$0B,$B6,$0F,$C8,$44,$44
    Data.b $56,$BE,$BD,$73,$F2,$03,$60,$E9,$64,$36,$9F,$5A,$7F,$0F,$80,$24
    Data.b $FB,$2C,$FA,$00,$E8,$32,$19,$FB,$BA,$00,$34,$6A,$9E,$36,$DA,$35
    Data.b $F6,$FC,$91,$AD,$02,$F2,$8D,$63,$9F,$DD,$97,$E7,$30,$F7,$18,$DF
    Data.b $1A,$50,$7A,$FD,$BA,$8B,$32,$4B,$93,$89,$0A,$E8,$57,$CF,$95,$B1
    Data.b $2E,$19,$92,$55,$02,$72,$E8,$FA,$64,$A8,$F1,$3C,$18,$05,$70,$D8
    Data.b $98,$D6,$F9,$02,$5B,$04,$EE,$F6,$DC,$BE,$01,$DE,$FD,$5F,$6D,$00
    Data.b $FF,$6F,$FD,$01,$14,$5A,$A1,$A3,$A4,$48,$9D,$B0,$00,$00,$00,$00
    Data.b $49,$45,$4E,$44,$AE,$42,$60,$82
    icoe: 
  EndDataSection 
  
EndProcedure   

Procedure Atomic_Server_Add_Handler(server,uri.s,*pcbhandler) 
  
  Protected *Atomic_Server.Atomic_Server = server 
  *Atomic_Server\URIHandlers(uri)\pt = *pcbhandler  
  
EndProcedure 

Procedure Atomic_Server_Add_Proxy(server,domain.s,IP.s,port.i) 
  
  Protected *Atomic_Server.Atomic_Server = server 
  AddMapElement(*Atomic_Server\proxy(),domain)  
  *Atomic_Server\proxy()\IP = IP 
  *Atomic_Server\proxy()\port = port  
  
EndProcedure   
