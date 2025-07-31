;V 1.0.4b
;author Hexor,infratec,idle
;* $OpenBSD: tls.h,v 1.58 2020/01/22 06:44:02 beck Exp $ */
;*
;* Copyright (c) 2014 Joel Sing <jsing@openbsd.org>
;*
;* Permission To use, copy, modify, And distribute this software For any
;* purpose With Or without fee is hereby granted, provided that the above
;* copyright notice And this permission notice appear in all copies.
;*
;* THE SOFTWARE IS PROVIDED "AS IS" And THE AUTHOR DISCLAIMS ALL WARRANTIES
;* With REGARD To THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
;* MERCHANTABILITY And FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE For
;* ANY SPECIAL, DIRECT, INDIRECT, Or CONSEQUENTIAL DAMAGES Or ANY DAMAGES
;* WHATSOEVER RESULTING FROM LOSS OF USE, Data Or PROFITS, WHETHER IN AN
;* ACTION OF CONTRACT, NEGLIGENCE Or OTHER TORTIOUS ACTION, ARISING OUT OF
;* Or IN CONNECTION With THE USE Or PERFORMANCE OF THIS SOFTWARE.
;*
; Original from idle => https://www.purebasic.fr/english/viewtopic.php?p=593079#p593079

;/=============
;|
;| Usage:
;| - Include that file here on top of your (existing?!) network application.
;| - make sure a libtls-xx.dll or libtls-xx.a is in the same directory as your app
;|                                               (or set a global variable LIBTLSFILE$ to path and filename of that library BEFORE including this source)
;|   you will find compiled libraries in the dropbox account from idle, see here:
;|   https://www.purebasic.fr/english/viewtopic.php?p=593079#p593079
;|   or just compile newer versions yourself
;| - That's it!
;|   If you now want to initiate a TLS connection, use all known PB commands as usual, but:
;|   Add one of the PB_Network_TLSv1_xx constants to:
;|   OpenNetworkConnection(ServerName$, Port [, Mode  <= here
;|   e.g. OpenNetworkConnection("my.domain.com", 1234, #PB_Network_TCP | #PB_Network_IPv4 | #PB_Network_TLS_DEFAULT, ...)
;|
;|   OR
;|
;|   CreateNetworkServer(Server, Port [, Mode, <== here
;|   e.g. CreateNetworkServer(#PB_Any, 1234, #PB_Network_TCP | #PB_Network_IPv4 | #PB_Network_TLS_DEFAULT, ...)
;|   In case of a server, you would need to call Init_TLS() also most likely.
;|   Because with that procedure you can set the needed TLS certificates (cert and key file typically)
;|
;|   ;/============

#TLS_API = 20200120

#TLS_PROTOCOL_TLSv1_0 = (1 << 1)
#TLS_PROTOCOL_TLSv1_1 = (1 << 2)
#TLS_PROTOCOL_TLSv1_2 = (1 << 3)
#TLS_PROTOCOL_TLSv1_3 = (1 << 4)

#TLS_PROTOCOL_TLSv1 = #TLS_PROTOCOL_TLSv1_0 | #TLS_PROTOCOL_TLSv1_1 | #TLS_PROTOCOL_TLSv1_2 | #TLS_PROTOCOL_TLSv1_3

#TLS_PROTOCOLS_ALL     = #TLS_PROTOCOL_TLSv1
#TLS_PROTOCOLS_DEFAULT = (#TLS_PROTOCOL_TLSv1_2 | #TLS_PROTOCOL_TLSv1_3)

#TLS_WANT_POLLIN  = -2
#TLS_WANT_POLLOUT = -3

;/* RFC 6960 Section 2.3 */
#TLS_OCSP_RESPONSE_SUCCESSFUL    = 0
#TLS_OCSP_RESPONSE_MALFORMED     = 1
#TLS_OCSP_RESPONSE_INTERNALERROR = 2
#TLS_OCSP_RESPONSE_TRYLATER      = 3
#TLS_OCSP_RESPONSE_SIGREQUIRED   = 4
#TLS_OCSP_RESPONSE_UNAUTHORIZED  = 5

;/* RFC 6960 Section 2.2 */
#TLS_OCSP_CERT_GOOD    = 0
#TLS_OCSP_CERT_REVOKED = 1
#TLS_OCSP_CERT_UNKNOWN = 2

;/* RFC 5280 Section 5.3.1 */
#TLS_CRL_REASON_UNSPECIFIED            = 0
#TLS_CRL_REASON_KEY_COMPROMISE         = 1
#TLS_CRL_REASON_CA_COMPROMISE          = 2
#TLS_CRL_REASON_AFFILIATION_CHANGED    = 3
#TLS_CRL_REASON_SUPERSEDED             = 4
#TLS_CRL_REASON_CESSATION_OF_OPERATION = 5
#TLS_CRL_REASON_CERTIFICATE_HOLD       = 6
#TLS_CRL_REASON_REMOVE_FROM_CRL        = 8
#TLS_CRL_REASON_PRIVILEGE_WITHDRAWN    = 9
#TLS_CRL_REASON_AA_COMPROMISE          = 10

#TLS_MAX_SESSION_ID_LENGTH = 32
#TLS_TICKET_KEY_SIZE       = 48

CompilerIf Defined(PB_Network_TLSv1, #PB_Constant) = 0
  
  #PB_Network_TLSv1_0     = #TLS_PROTOCOL_TLSv1_0 << 1
  #PB_Network_TLSv1_1     = #TLS_PROTOCOL_TLSv1_1 << 1
  #PB_Network_TLSv1_2     = #TLS_PROTOCOL_TLSv1_2 << 1
  #PB_Network_TLSv1_3     = #TLS_PROTOCOL_TLSv1_3 << 1 
  #PB_Network_TLSv1       = #PB_Network_TLSv1_0 | #PB_Network_TLSv1_1 | #PB_Network_TLSv1_2 | #PB_Network_TLSv1_3
CompilerEndIf  

  #PB_Network_TLS_DEFAULT = #PB_Network_TLSv1_2 | #PB_Network_TLSv1_3
  #PB_Network_KeepAlive   = $1000
  #PB_Network_Extra       = #PB_Network_TLSv1 | #PB_Network_KeepAlive


CompilerIf Defined(TLS_AUTOINIT, #PB_Constant) = #False
  #TLS_AUTOINIT = #True
CompilerEndIf

PrototypeC tls_read_cb(ctx,*buf,_buflen,*cb_arg);
PrototypeC tls_write_cb(ctx,*buf,_buflen,*cb_arg);

ImportC "" 
  tls_init()                                                                                                   
  tls_config_error(config)                                                                            
  tls_error(ctx)                                                                                      
  tls_config_new()                                                                                             
  tls_config_free(config)                                                                             
  tls_default_ca_cert_file()                                                                                   
  tls_config_add_keypair_file(config,cert_file.p-utf8,key_file.p-utf8)                              
  tls_config_add_keypair_mem(config,cert.p-utf8,certlen.i,key.p-utf8,key_len.i)        
  tls_config_add_keypair_ocsp_file(config,cert_file.p-utf8,key_file.p-utf8,ocsp_staple_file.p-utf8)
  tls_config_add_keypair_ocsp_mem(config,cert.p-utf8,cert_len.i,key.p-utf8,key_len.i,staple.p-utf8,staple_len.i)
  tls_config_set_alpn(config,alpn.p-utf8)                                                                                           
  tls_config_set_ca_file(config,ca_file.p-utf8)                                                                                     
  tls_config_set_ca_path(config,ca_path.p-utf8)                                                                                     
  tls_config_set_ca_mem(config,*ca,len.i)                                                                               
  tls_config_set_cert_file(config,cert_file.p-utf8)                                                                                 
  tls_config_set_cert_mem(config,*cert,len.i)                                                                           
  tls_config_set_ciphers(config,ciphers.p-utf8)                                                                                     
  tls_config_set_crl_file(config,crl_file.p-utf8)                                                                                   
  tls_config_set_crl_mem(config,crl.p-utf8,len.i)                                                                             
  tls_config_set_dheparams(config,params.p-utf8)                                                                                    
  tls_config_set_ecdhecurve(config,curve.p-utf8)                                                                                    
  tls_config_set_ecdhecurves(config,curves.p-utf8)                                                                                  
  tls_config_set_key_file(config,key_file.p-utf8)                                                                                   
  tls_config_set_key_mem(config,*key,len.i)                                                                             
  tls_config_set_keypair_file(config,cert_file.p-utf8,key_file.p-utf8)                                                             
  tls_config_set_keypair_mem(config,cert.p-utf8,cert_len.i,key.p-utf8,key_len.i)                                       
  tls_config_set_keypair_ocsp_file(config,cert_file.p-utf8,key_file.p-utf8,staple_file.p-utf8)                                    
  tls_config_set_keypair_ocsp_mem(config,cert.p-utf8,cert_len.i,key.p-utf8,key_len.i,staple.p-utf8,staple_len.i) 
  tls_config_set_ocsp_staple_mem(config,staple.p-utf8,len.i)                                                                  
  tls_config_set_ocsp_staple_file(config,staple_file.p-utf8)                                                                        
  tls_config_set_protocols(config,protocols.l)                                                                               
  tls_config_set_session_fd(config,session_fd.l)                                                                                  
  tls_config_set_verify_depth(config,verify_depth.l)                                                                              
  tls_config_prefer_ciphers_client(config)                                                                                           
  tls_config_prefer_ciphers_server(config)                                                                                           
  tls_config_insecure_noverifycert(config)                                                                                           
  tls_config_insecure_noverifyname(config)                                                                                           
  tls_config_insecure_noverifytime(config)                                                                                           
  tls_config_verify(config)                                                                                                          
  tls_config_ocsp_require_stapling(config)                                                                                           
  tls_config_verify_client(config)                                                                                                   
  tls_config_verify_client_optional(config)                                                                                          
  tls_config_clear_keys(config)                                                                                                      
  tls_config_parse_protocols(*protocols,protostr.p-utf8)                                                                           
  tls_config_set_session_id(config,session_id.p-utf8,len.i)                                                                   
  tls_config_set_session_lifetime(config,lifetime.l)                                                                              
  tls_config_add_ticket_key(config,keyrev.i,*key,keylen.i)                                                   
  tls_client()                                                                                                                                
  tls_server()                                                                                                                                
  tls_configure(ctx,config)                                                                                                 
  tls_reset(ctx)                                                                                                                     
  tls_free(ctx)                                                                                                                      
  tls_accept_fds(ctx,*cctx,fd_read.l,fd_write.l)                                                                       
  tls_accept_socket(ctx,*cctx,socket.l)                                                                                   
  tls_accept_cbs(ctx,*cctx,*read_cb.tls_read_cb,*write_cb.tls_write_cb,*cb_arg)                                      
  tls_connect(ctx,host.p-utf8,port.p-utf8)                                                                                         
  tls_connect_fds(ctx,fd_read.l,fd_write.l,servername.p-utf8)                                                                 
  tls_connect_servername(ctx,host.p-utf8,port.p-utf8,servername.p-utf8)                                                           
  tls_connect_socket(ctx,s.l,servername.p-utf8)                                                                                  
  tls_connect_cbs(ctx,*read_cb.tls_read_cb,*write_cb.tls_write_cb,*cb_arg,servername.p-utf8)                                
  tls_handshake(ctx)                                                                                                                 
  tls_read(ctx,*buf,buflen.i)                                                                                            
  tls_write(ctx,*buf,buflen.i)                                                                                          
  tls_close(ctx)                                                                                                                     
  tls_peer_cert_provided(ctx)                                                                                                        
  tls_peer_cert_contains_name(ctx,name.p-utf8)                                                                                      
  tls_peer_cert_hash(ctx)                                                                                                            
  tls_peer_cert_issuer(ctx)                                                                                                          
  tls_peer_cert_subject(ctx)                                                                                                         
  tls_peer_cert_notbefore(ctx)                                                                                                       
  tls_peer_cert_notafter(ctx)                                                                                                        
  tls_peer_cert_chain_pem(ctx,*len)                                                                                          
  tls_conn_alpn_selected(ctx)                                                                                                        
  tls_conn_cipher(ctx)                                                                                                               
  tls_conn_cipher_strength(ctx)                                                                                                      
  tls_conn_servername(ctx)                                                                                                           
  tls_conn_session_resumed(ctx)                                                                                                      
  tls_conn_version(ctx)                                                                                                              
  tls_load_file(file.p-utf8,*len,*password)                                                                                    
  tls_unload_file(*buf,len.i)                                                                                                   
  tls_ocsp_process_response(ctx,response.p-utf8,size.i)                                                                       
  tls_peer_ocsp_cert_status(ctx)                                                                                                     
  tls_peer_ocsp_crl_reason(ctx)                                                                                                      
  tls_peer_ocsp_next_update(ctx)                                                                                                     
  tls_peer_ocsp_response_status(ctx)                                                                                                 
  tls_peer_ocsp_result(ctx)                                                                                                          
  tls_peer_ocsp_revocation_time(ctx)                                                                                                 
  tls_peer_ocsp_this_update(ctx)                                                                                                     
  tls_peer_ocsp_url(ctx)                                                                                                             
EndImport

Structure TLS_Certs 
  Path$
  CertFile$
  KeyFile$
  CaCertFile$
  domain$
EndStructure 

Structure TLS_Report 
  host.s
  version.s
  cipher.s
  subject.s
  issuer.s
  validFrom.q
  validUntil.q
  hash.s
EndStructure  

Structure TLS_Connections
  *ctx 
   report.TLS_Report 
EndStructure

Structure TLS_Globals
  CertFile$
  KeyFile$
  CaCertFile$
  List certs.TLS_Certs()
  domain$
  LastError.i
  DLL.i
  muxClient.i
  muxSever.i
  Map Clients.TLS_Connections()
  Map Servers.TLS_Connections()
EndStructure

Global TLSG.TLS_Globals

Procedure __MyInit()
  TLSG\DLL=1
  TLSG\muxClient = CreateMutex()
  TLSG\muxSever = CreateMutex() 
    
EndProcedure

Enumeration TLS_Errors 
  #TLS_Error_InitFailed
  #TLS_Error_None
  #TLS_Error_NewConfig_Failed
  #TLS_Error_CantLoad_CertFile
  #TLS_Error_CantLoad_KeyFile
  #TLS_Error_CantLoad_RootCert
  #TLS_Error_Unsupported_Protocol
  #TLS_Error_Cant_Start_Client
  #TLS_Error_Configure_Error
  #TLS_Error_Cant_Start_Server
  #TLS_Error_Cant_Connect_Socket
EndEnumeration

Global TLSG\LastError = #TLS_Error_None

Procedure TLS_GetLastError()
  ProcedureReturn TLSG\LastError
EndProcedure

Procedure.s _PEEKS(*ptr,len,type) 
  If *PTR 
    ProcedureReturn PeekS(*ptr,len,type)   
  Else 
    ProcedureReturn "" 
  EndIf   
EndProcedure     

Macro TLS_PS(func) 
  _PeekS(func,-1,#PB_UTF8) 
EndMacro 

Procedure TLS_report(*ctx.TLS_Connections)
  
  Protected t, ocsp_url.s,*ptr,*tls_ctx;
  *tls_ctx = *ctx\ctx 
  If *ctx\report\version = "" 
    *ctx\report\version = TLS_PS(tls_conn_version(*tls_ctx)) 
    *ctx\report\cipher =  TLS_PS(tls_conn_cipher(*tls_ctx)) 
    *ctx\report\subject = TLS_PS(tls_peer_cert_subject(*tls_ctx)) 
    *ctx\report\issuer =  TLS_PS(tls_peer_cert_issuer(*tls_ctx))
    *ctx\report\hash =    TLS_PS(tls_peer_cert_hash(*tls_ctx))
    *ctx\report\validFrom = tls_peer_cert_notbefore(*tls_ctx) 
    *ctx\report\validUntil = tls_peer_cert_notafter(*tls_ctx)  
  EndIf 
    
;   CompilerIf #PB_Compiler_Debugger 
;   ;not tested yet and probably not required anymore as it's getting dropped soon  
;   *ptr = tls_peer_ocsp_url(*tls_ctx)
;   If *ptr 
;     ocsp_url = tls_PS(*ptr)
;     
;     Debug "OCSP URL: " + ocsp_url;
;     t = tls_peer_ocsp_response_status(*tls_ctx) 
;     If t = #TLS_OCSP_RESPONSE_SUCCESSFUL   
;       Debug "OCSP Stapling: " + TLS_PS(tls_peer_ocsp_result(*tls_ctx))
;       Debug "response_status= " + TLS_PS(tls_peer_ocsp_response_status(*tls_ctx))
;       Debug "cert_status= "  +  TLS_PS(tls_peer_ocsp_cert_status(*tls_ctx))
;       Debug "crl_reason= " +  TLS_PS(tls_peer_ocsp_crl_reason(*tls_ctx))
;       t = tls_peer_ocsp_this_update(*tls_ctx)                             
;       If t <> - 1 
;         Debug "this update: " + FormatDate("%hh:%dd:%mm:%yy",t)
;       EndIf   
;       t =  tls_peer_ocsp_next_update(*tls_ctx);
;       If t <> - 1
;         Debug "next update: " + FormatDate("%hh:%dd:%mm:%yy",t)
;       EndIf 
;       t =  tls_peer_ocsp_revocation_time(*tls_ctx)
;       If t <> -1 
;         Debug "revocation: " + FormatDate("%hh:%dd:%mm:%yy",t)
;       EndIf                                                 
;     ElseIf t <> -1 
;       Debug "OCSP Stapling:  failure - response_status " + Str(t) + " " + TLS_PS(tls_peer_ocsp_result(*tls_ctx))
;       
;     EndIf
;     
;   EndIf
;   
;   CompilerEndIf 
  
  ProcedureReturn @*ctx\report
  
EndProcedure 

Procedure TLS_ReportClient(clientID) 
  
  If FindMapElement(TLSG\Clients(),Str(clientID)) 
    ProcedureReturn TLS_report(TLSG\Clients())
  EndIf  
  
EndProcedure 

Procedure TLS_CreateNetworkServer(Server, Port, Mode, BindedIP.s)
  Protected TLSMode, ServerID, *ctx, *cfg, *Error, SockOpt.l, SockOptLen.l
  
  CompilerIf #PB_Compiler_Version <= 620 
    tlsmode = ((mode & $ffffff0) >> 1)  
    If mode & $10000000 
      mode = #PB_Network_IPv6 | (mode & 3) 
    Else   
      mode = mode & 3 
    EndIf 
       
  CompilerElse 
    tlsmode = ((mode & $ffffff0) >> 1 )  
    mode = mode & 3  
  CompilerEndIf 
   
  
  If TLSG\DLL And tlsMode 
    
    TLSG\LastError = #TLS_Error_None 
    *ctx = tls_server()
    If *ctx 
      *cfg  = tls_config_new()
      If *cfg = 0
        TLSG\LastError = #TLS_Error_NewConfig_Failed
      Else
        FirstElement(TLSG\certs())
        
        tls_config_set_ca_path(*cfg,TLSG\certs()\Path$)
        
        If tls_config_set_keypair_file(*cfg,tlsg\certs()\CertFile$,tlsg\certs()\KeyFile$) = -1
          TLSG\LastError = #TLS_Error_CantLoad_CertFile
        EndIf 
        
        While NextElement(TLSG\certs()) 
          If tls_config_add_keypair_file(*cfg,tlsg\certs()\CertFile$,tlsg\certs()\KeyFile$) = -1
            TLSG\LastError = #TLS_Error_CantLoad_CertFile
          EndIf   
        Wend   
                
        If tls_config_set_protocols(*cfg, TLSMode) = -1
          TLSG\LastError = #TLS_Error_Unsupported_Protocol
        EndIf
        
        If tls_config_verify_client_optional(*cfg) = -1 
          TLSG\LastError = #TLS_Error_Configure_Error 
        EndIf   
        
        If tls_configure(*ctx, *cfg) = -1
          TLSG\LastError = #TLS_Error_Configure_Error 
          *Error = tls_config_error(*cfg)
          If *Error
            PrintN("TLS Config error: " + PeekS(*Error, - 1, #PB_UTF8))
          EndIf
        EndIf     
        tls_config_free(*cfg)
      EndIf 
      
      If *ctx 
        ServerID = CreateNetworkServer(Server, Port, mode, BindedIP)
        If ServerID
          Protected iocontext   
          If tls_accept_socket(*ctx,@iocontext,ServerID(ServerID)) = -1
            TLSG\LastError = #TLS_Error_Cant_Connect_Socket
            PrintN("#TLS_Error_Cant_Connect_Socket") 
            *error = tls_error(*ctx) 
            PrintN("error " + PeekS(*Error, - 1, #PB_UTF8)) 
          Else
            LockMutex(TLSG\muxSever) 
            AddMapElement(TLSG\Servers(), Str(ServerID(ServerID)))
            TLSG\Servers()\ctx = *ctx
            FirstElement(TLSG\certs())
            TLSG\Servers()\report\host = TLSG\certs()\domain$ 
            UnlockMutex(TLSG\muxSever) 
          EndIf
        EndIf
      EndIf
    Else 
      TLSG\LastError = #TLS_Error_Cant_Start_Server
    EndIf
  Else
    ServerID = CreateNetworkServer(Server, Port, Mode, BindedIP)
  EndIf
  
  ProcedureReturn ServerID
EndProcedure

Procedure TLS_NetworkServerEvent(ServerID)
  Protected Result, Server, ClientID, ctx,*server.TLS_Connections
  Protected  *client.TLS_Connections,key.s 
  
  Result = NetworkServerEvent(ServerID)
  Select Result
    Case #PB_NetworkEvent_Connect
      
      Server = EventServer()
      Server = ServerID(Server)
      LockMutex(TLSG\muxSever)
      *server = FindMapElement(TLSG\Servers(), Str(Server))
      
      If *server 
        ClientID = EventClient()
        If tls_accept_socket(*server\ctx, @ctx, ConnectionID(ClientID)) = -1
          CloseNetworkConnection(ClientID)
          Result = #PB_NetworkEvent_None
        Else
          LockMutex(TLSG\muxClient) 
          
          AddMapElement(TLSG\Clients(),Str(ClientID))
          TLSG\Clients()\ctx = ctx
          
          If tls_handshake(ctx) = -1 
           CloseNetworkConnection(ClientID) 
           DeleteMapElement(TLSG\Clients(),Str(ClientID))
           Result = #PB_NetworkEvent_None
          Else 
            TLS_report(@TLSG\Clients())  
          EndIf 
          
          UnlockMutex(TLSG\muxClient)  
        EndIf
      EndIf
       UnlockMutex(TLSG\muxSever)
    Case #PB_NetworkEvent_Disconnect
      
      ClientID = EventClient()
      key = Str(ClientID)
      LockMutex(TLSG\muxClient) 
      *client = FindMapElement(TLSG\Clients(),key) 
      If *client 
        tls_close(*client\ctx)
        tls_free(*client\ctx)
        DeleteMapElement(TLSG\Clients(),key)
      EndIf
      UnlockMutex(TLSG\muxClient)
      
  EndSelect
  
  ProcedureReturn Result
EndProcedure

Procedure TLS_CloseNetworkServer(Server)
  Protected *client.TLS_Connections 
  Protected key.s = Str(Server)
  
  LockMutex(TLSG\muxClient) 
  
  *client = FindMapElement(TLSG\Clients(),key) 
  
  If *client 
    ;is TLS connection!
    CloseNetworkServer(Server)
    tls_close(*Client\ctx)
    tls_free(*client\ctx)
    DeleteMapElement(TLSG\clients(),key)
  Else
    CloseNetworkServer(Server)
  EndIf
  
  UnlockMutex(TLSG\muxClient) 
  
EndProcedure

Procedure TLS_OpenNetworkConnection(ServerName$, Port, Mode, TimeOut, LocaleIP$, LocalePort)
  Protected TLSMode, ClientID, *ctx, *cfg, *Error, SockOpt.l, SockOptLen.l
  
  CompilerIf #PB_Compiler_Version <= 620 
    tlsmode = ((mode & $ffffff0) >> 1)  
    If mode & $10000000 
      mode = #PB_Network_IPv6 | (mode & 3) 
    Else   
      mode = mode & 3 
    EndIf 
  CompilerElse 
    tlsmode = ((mode & $ffffff0) >> 1 )  
    mode = mode & 3  
  CompilerEndIf 
    
  If TLSG\DLL And TLSMode
    *cfg = tls_config_new()
    If *cfg = 0
      TLSG\LastError = #TLS_Error_NewConfig_Failed
    Else
      If TLSG\CertFile$ = "" And TLSG\KeyFile$ = "" And TLSG\CaCertFile$ = ""
        tls_config_insecure_noverifycert(*cfg)
        tls_config_insecure_noverifyname(*cfg)
      Else
        If TLSG\CertFile$
          If tls_config_set_cert_file(*cfg, TLSG\CertFile$) = -1
            TLSG\LastError = #TLS_Error_CantLoad_CertFile
          EndIf
        EndIf
        If TLSG\KeyFile$
          If tls_config_set_key_file(*cfg, TLSG\KeyFile$) = -1
            TLSG\LastError = #TLS_Error_CantLoad_KeyFile
          EndIf
        EndIf
        If TLSG\CaCertFile$
          If tls_config_set_ca_file(*cfg, TLSG\CaCertFile$) = -1
            TLSG\LastError = #TLS_Error_CantLoad_RootCert
          EndIf
        EndIf
      EndIf
      If tls_config_set_protocols(*cfg, TLSMode) = -1
        TLSG\LastError = #TLS_Error_Unsupported_Protocol
      EndIf
      *ctx = tls_client()
      If *ctx = 0
        TLSG\LastError = #TLS_Error_Cant_Start_Client
      ElseIf tls_configure(*ctx, *cfg) = -1
        TLSG\LastError = #TLS_Error_Configure_Error
      Else
        *Error = tls_config_error(*cfg)
        If *Error
          Debug "TLS Config error: " + PeekS(*Error, - 1, #PB_UTF8)
        EndIf
        tls_config_free(*cfg)
        ClientID = OpenNetworkConnection(ServerName$, Port, Mode, TimeOut, LocaleIP$, LocalePort)
        If ClientID
          tls_connect_socket(*ctx, ConnectionID(ClientID), ServerName$)
          tls_handshake(*ctx) 
          LockMutex(TLSG\muxClient) 
          AddMapElement(TLSG\Clients(), Str(ClientID))
          TLSG\Clients()\ctx = *ctx 
          TLSG\Clients()\report\host = ServerName$
          TLS_report(@TLSG\Clients())
          UnlockMutex(TLSG\muxClient) 
        EndIf
      EndIf
    EndIf
  Else
    ClientID = OpenNetworkConnection(ServerName$, Port, Mode, TimeOut, LocaleIP$, LocalePort)
  EndIf
  
  ProcedureReturn ClientID
EndProcedure

Procedure TLS_ReceiveNetworkData(ClientID, Buffer, Length)
  Protected Result,*client.TLS_Connections 
  
  
  LockMutex(TLSG\muxClient) 
  
  *client = FindMapElement(TLSG\Clients(), Str(ClientID))
    
  If *client 
    Result = tls_read(*client\ctx, Buffer, Length)
  Else
    Result = ReceiveNetworkData(ClientID, Buffer, Length)
  EndIf
  
  UnlockMutex(TLSG\muxClient)
   
  ProcedureReturn Result
  
EndProcedure

Procedure TLS_SendNetworkData(ClientID, Buffer, Length)
  Protected Result,*client.TLS_Connections
  
  LockMutex(TLSG\muxClient) 
  
  *client = FindMapElement(TLSG\Clients(), Str(ClientID))
   
  If *client <> 0   
    Result = tls_write(*client\ctx, Buffer, Length)
  Else
    Result = SendNetworkData(ClientID, Buffer, Length)
  EndIf
  
  UnlockMutex(TLSG\muxClient)
  
  ProcedureReturn Result
EndProcedure

Procedure TLS_SendNetworkString(ClientID, String$, Format)
  Protected Result, *Buffer,*client.TLS_Connections
  
  LockMutex(TLSG\muxClient) 
  
  *client = FindMapElement(TLSG\Clients(), Str(ClientID))
  
  If *client 
    Select Format
      Case #PB_Ascii
        *Buffer = Ascii(String$)
        Result  = tls_write(*client\ctx, *Buffer, MemorySize(*Buffer) - 1)
        FreeMemory(*Buffer)
      Case #PB_Unicode
        Result = tls_write(*client\ctx, @String$, StringByteLength(String$))
      Case #PB_UTF8
        *Buffer = UTF8(String$)
        Result  = tls_write(*client\ctx, *Buffer, MemorySize(*Buffer) - 1)
        FreeMemory(*Buffer)
    EndSelect
  Else
    Result = SendNetworkString(ClientID, String$, Format)
  EndIf
  
  UnlockMutex(TLSG\muxClient)
  
  ProcedureReturn Result
EndProcedure

Procedure TLS_CloseNetworkConnection(ClientID)
  Protected *client.TLS_Connections,key.s 
  key =  Str(ClientID)
  
  LockMutex(TLSG\muxClient) 
  
  *client = FindMapElement(TLSG\Clients(), key)
  If *client   
    
    If *client\ctx 
      tls_close(*client\ctx)
      tls_free(*client\ctx)
    EndIf
    CloseNetworkConnection(ClientID)
    
    DeleteMapElement(TLSG\Clients(),key)
  Else
    CloseNetworkConnection(ClientID)
  EndIf
  
  UnlockMutex(TLSG\muxClient)
  
EndProcedure

Procedure Init_TLS(Domain$="",CertFile$ = "", KeyFile$ = "", CaCertFile$ = "",caPath$="")
  
  Protected Result = #TLS_Error_InitFailed
  If tlsg\DLL 
    If tls_init() = 0; TLS_Error_None
      AddElement(TLSG\certs())
      tlsg\certs()\Path$ = caPath$
      TLSG\certs()\domain$ = Domain$ 
      TLSG\certs()\CertFile$ = CertFile$ 
      TLSG\certs()\KeyFile$ = KeyFile$
      TLSG\certs()\CaCertFile$ = CaCertFile$ 
      If TLSG\CertFile$ <> "" 
        TLSG\CertFile$ = CertFile$  
        TLSG\KeyFile$ = KeyFile$ 
        TLSG\CaCertFile$ = CaCertFile$ 
        TLSG\domain$ = Domain$ 
      EndIf   
      Result  = #TLS_Error_None
    EndIf
  EndIf 
  
  ProcedureReturn Result
EndProcedure

Macro OpenNetworkConnection(ServerName, Port, Mode = #PB_Network_TCP | #PB_Network_IPv4, TimeOut = 0, LocaleIP = "", LocalePort = 0)
  TLS_OpenNetworkConnection(ServerName, Port, Mode, TimeOut, LocaleIP, LocalePort)
EndMacro

Macro CloseNetworkConnection(ClientID)
  TLS_CloseNetworkConnection(ClientID)
EndMacro

Macro ReceiveNetworkData(ClientID, Buffer, Length)
  TLS_ReceiveNetworkData(ClientID, Buffer, Length)
EndMacro

Macro SendNetworkData(ClientID, Buffer, Length)
  TLS_SendNetworkData(ClientID, Buffer, Length)
EndMacro

Macro SendNetworkString(ClientID, String, Format = #PB_UTF8)
  TLS_SendNetworkString(ClientID, String, Format)
EndMacro

Macro CreateNetworkServer(Server, Port, Mode = #PB_Network_TCP | #PB_Network_IPv4, BindedIP = "")
  TLS_CreateNetworkServer(Server, Port, Mode, BindedIP)
EndMacro

Macro CloseNetworkServer(Server)
  TLS_CloseNetworkServer(Server)
EndMacro

Macro NetworkServerEvent(ServerID = -1)
  TLS_NetworkServerEvent(ServerID)
EndMacro

CompilerIf #TLS_AUTOINIT
  __MyInit()
CompilerEndIf

;-Demo from infratec
CompilerIf #PB_Compiler_IsMainFile
  
  Define.i Con, Timeout, Length
  Define Receive$
  Define *Buffer
  Define *report.TLS_Report 
  
  Con = OpenNetworkConnection("atomicwebserver.com", 443, #PB_Network_TCP | #PB_Network_IPv4 | #PB_Network_TLS_DEFAULT)
  If Con
    *report = TLS_ReportClient(con) 
    If *report  
      Debug "TLS handshake negotiated with " + *report\version + " " +  *report\cipher + " host " + *report\host
      Debug "Subject: " + *report\subject 
      Debug "Issuer: " + *report\issuer
      Debug "Valid From: " + FormatDate("%hh:%dd:%mm:%yy",*report\validFrom)
      Debug "Valid Until: " + FormatDate("%hh:%dd:%mm:%yy",*report\validUntil)
      Debug "Cert Hash: " + *report\hash
      Debug ""
    EndIf 	
        
    *Buffer = AllocateMemory($FFFF, #PB_Memory_NoClear)
    If *Buffer
      
      SendNetworkString(Con, "GET / HTTP/1.1" + #CRLF$ + "Host: atomicwebserver.com" + #CRLF$ + #CRLF$)
      
      Timeout = 100
      Repeat
        Select NetworkClientEvent(Con)
          Case #PB_NetworkEvent_Data
            Repeat
              Length = ReceiveNetworkData(Con, *Buffer, MemorySize(*Buffer))
              If Length > 0
                Receive$ + PeekS(*Buffer, Length, #PB_UTF8 | #PB_ByteLength)
              EndIf
            Until Length = 0 Or (Length > 0 And Length <> MemorySize(*Buffer))
            Break
            
          Case #PB_NetworkEvent_Disconnect
            Break
            
          Case #PB_NetworkEvent_None
            Delay(10)
            Timeout - 1
            
        EndSelect
      Until Timeout = 0
      
      If Receive$ <> ""
        Debug Receive$
      EndIf
      
      FreeMemory(*Buffer)
    EndIf
    
    CloseNetworkConnection(Con)
  EndIf
 
  
CompilerEndIf
