;V 1.01b
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
;|   REMARK:
;|   SERVER FUNCTIONALITY NOT TESTED!!
;|
;/============

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
  #PB_Network_TLSv1_0     = $10
  #PB_Network_TLSv1_1     = $20
  #PB_Network_TLSv1_2     = $40
  #PB_Network_TLSv1_3     = $80
  #PB_Network_TLSv1       = #PB_Network_TLSv1_0 | #PB_Network_TLSv1_1 | #PB_Network_TLSv1_2 | #PB_Network_TLSv1_3
  #PB_Network_TLS_DEFAULT = #PB_Network_TLSv1_2 | #PB_Network_TLSv1_3
  #PB_Network_KeepAlive   = $1000
  #PB_Network_Extra       = #PB_Network_TLSv1 | #PB_Network_KeepAlive
CompilerEndIf

CompilerIf Defined(TLS_AUTOINIT, #PB_Constant) = #False
  #TLS_AUTOINIT = #True
CompilerEndIf

;download build from bsd
;https://ftp.openbsd.org/pub/OpenBSD/LibreSSL/libressl-3.5.0.tar.gz

;Build tools required for windows builds cmake and mingw64
;cmake
;https://cmake.org/download/

;mingw64
;Info https://www.mingw-w64.org/downloads/#llvm-mingw
;Available versions info https://github.com/mstorsjo/llvm-mingw/releases
;Direct download link https://github.com/mstorsjo/llvm-mingw/releases/download/20211002/llvm-mingw-20211002-msvcrt-x86_64.zip

;building on windows linux osx
;copy the tar file to a folder of your choice, make a subfolder and then extract the tar and cd into the folder
;> mkdir libressl-3.5.0
;> tar -xf libressl-3.5.0.tar.gz
;> cd libressl-3.5.0

;add cmake and mingw to the PATH environment variable
;(temp. for the open command console: SET PATH=%PATH%;path\to\cmake\bin\;path\to\mingw\bin\)

;Edit the file libressl-3.5.0\cmakelists and insert option(BUILD_SHARED_LIBS "Build shared" ON) at line 38
;option(BUILD_SHARED_LIBS "Build shared" ON)

;now make a build folder cd to it and call cmake
;libressl-3.5.0> mkdir build
;libressl-3.5.0> cd build

;If OS = Windows
;  libressl-3.5.0\build> cmake -S="../" -G="MinGW Makefiles"
;  libressl-3.5.0\build> mingw32-make all
;Else
;  libressl-3.5.0\build> cmake all
;  libressl-3.5.0\build> make all
;EndIf

;{ Prototypes
PrototypeC tls_read_cb(ctx, *buf, _buflen, *cb_arg)
PrototypeC tls_write_cb(ctx, *buf, _buflen, *cb_arg)

PrototypeC P_tls_init() : Global tls_init.P_tls_init
PrototypeC P_tls_config_error(config) : Global tls_config_error.P_tls_config_error
PrototypeC P_tls_error(ctx) : Global tls_error.P_tls_error
PrototypeC P_tls_config_new() : Global tls_config_new.P_tls_config_new
PrototypeC P_tls_config_free(config) : Global tls_config_free.P_tls_config_free
PrototypeC P_tls_default_ca_cert_file() : Global tls_default_ca_cert_file.P_tls_default_ca_cert_file
PrototypeC P_tls_config_add_keypair_file(config, cert_file.p-utf8, key_file.p-utf8) : Global tls_config_add_keypair_file.P_tls_config_add_keypair_file
PrototypeC P_tls_config_add_keypair_mem(config, cert.p-utf8, certlen.i, key.p-utf8, key_len.i) : Global tls_config_add_keypair_mem.P_tls_config_add_keypair_mem
PrototypeC P_tls_config_add_keypair_ocsp_file(config, cert_file.p-utf8, key_file.p-utf8, ocsp_staple_file.p-utf8) : Global tls_config_add_keypair_ocsp_file.P_tls_config_add_keypair_ocsp_file
PrototypeC P_tls_config_add_keypair_ocsp_mem(config, cert.p-utf8, cert_len.i, key.p-utf8, key_len.i, staple.p-utf8, staple_len.i) : Global tls_config_add_keypair_ocsp_mem.P_tls_config_add_keypair_ocsp_mem
PrototypeC P_tls_config_set_alpn(config, alpn.p-utf8) : Global tls_config_set_alpn.P_tls_config_set_alpn
PrototypeC P_tls_config_set_ca_file(config, ca_file.p-utf8) : Global tls_config_set_ca_file.P_tls_config_set_ca_file
PrototypeC P_tls_config_set_ca_path(config, ca_path.p-utf8) : Global tls_config_set_ca_path.P_tls_config_set_ca_path
PrototypeC P_tls_config_set_ca_mem(config, *ca, len.i) : Global tls_config_set_ca_mem.P_tls_config_set_ca_mem
PrototypeC P_tls_config_set_cert_file(config, cert_file.p-utf8) : Global tls_config_set_cert_file.P_tls_config_set_cert_file
PrototypeC P_tls_config_set_cert_mem(config, *cert, len.i) : Global tls_config_set_cert_mem.P_tls_config_set_cert_mem
PrototypeC P_tls_config_set_ciphers(config, ciphers.p-utf8) : Global tls_config_set_ciphers.P_tls_config_set_ciphers
PrototypeC P_tls_config_set_crl_file(config, crl_file.p-utf8) : Global tls_config_set_crl_file.P_tls_config_set_crl_file
PrototypeC P_tls_config_set_crl_mem(config, crl.p-utf8, len.i) : Global tls_config_set_crl_mem.P_tls_config_set_crl_mem
PrototypeC P_tls_config_set_dheparams(config, params.p-utf8) : Global tls_config_set_dheparams.P_tls_config_set_dheparams
PrototypeC P_tls_config_set_ecdhecurve(config, curve.p-utf8) : Global tls_config_set_ecdhecurve.P_tls_config_set_ecdhecurve
PrototypeC P_tls_config_set_ecdhecurves(config, curves.p-utf8) : Global tls_config_set_ecdhecurves.P_tls_config_set_ecdhecurves
PrototypeC P_tls_config_set_key_file(config, key_file.p-utf8) : Global tls_config_set_key_file.P_tls_config_set_key_file
PrototypeC P_tls_config_set_key_mem(config, *key, len.i) : Global tls_config_set_key_mem.P_tls_config_set_key_mem
PrototypeC P_tls_config_set_keypair_file(config, cert_file.p-utf8, key_file.p-utf8) : Global tls_config_set_keypair_file.P_tls_config_set_keypair_file
PrototypeC P_tls_config_set_keypair_mem(config, cert.p-utf8, cert_len.i, key.p-utf8, key_len.i) : Global tls_config_set_keypair_mem.P_tls_config_set_keypair_mem
PrototypeC P_tls_config_set_keypair_ocsp_file(config, cert_file.p-utf8, key_file.p-utf8, staple_file.p-utf8) : Global tls_config_set_keypair_ocsp_file.P_tls_config_set_keypair_ocsp_file
PrototypeC P_tls_config_set_keypair_ocsp_mem(config, cert.p-utf8, cert_len.i, key.p-utf8, key_len.i, staple.p-utf8, staple_len.i) : Global tls_config_set_keypair_ocsp_mem.P_tls_config_set_keypair_ocsp_mem
PrototypeC P_tls_config_set_ocsp_staple_mem(config, staple.p-utf8, len.i) : Global tls_config_set_ocsp_staple_mem.P_tls_config_set_ocsp_staple_mem
PrototypeC P_tls_config_set_ocsp_staple_file(config, staple_file.p-utf8) : Global tls_config_set_ocsp_staple_file.P_tls_config_set_ocsp_staple_file
PrototypeC P_tls_config_set_protocols(config, protocols.l) : Global tls_config_set_protocols.P_tls_config_set_protocols
PrototypeC P_tls_config_set_session_fd(config, session_fd.l) : Global tls_config_set_session_fd.P_tls_config_set_session_fd
PrototypeC P_tls_config_set_verify_depth(config, verify_depth.l) : Global tls_config_set_verify_depth.P_tls_config_set_verify_depth
PrototypeC P_tls_config_prefer_ciphers_client(config) : Global tls_config_prefer_ciphers_client.P_tls_config_prefer_ciphers_client
PrototypeC P_tls_config_prefer_ciphers_server(config) : Global tls_config_prefer_ciphers_server.P_tls_config_prefer_ciphers_server
PrototypeC P_tls_config_insecure_noverifycert(config) : Global tls_config_insecure_noverifycert.P_tls_config_insecure_noverifycert
PrototypeC P_tls_config_insecure_noverifyname(config) : Global tls_config_insecure_noverifyname.P_tls_config_insecure_noverifyname
PrototypeC P_tls_config_insecure_noverifytime(config) : Global tls_config_insecure_noverifytime.P_tls_config_insecure_noverifytime
PrototypeC P_tls_config_verify(config) : Global tls_config_verify.P_tls_config_verify
PrototypeC P_tls_config_ocsp_require_stapling(config) : Global tls_config_ocsp_require_stapling.P_tls_config_ocsp_require_stapling
PrototypeC P_tls_config_verify_client(config) : Global tls_config_verify_client.P_tls_config_verify_client
PrototypeC P_tls_config_verify_client_optional(config) : Global tls_config_verify_client_optional.P_tls_config_verify_client_optional
PrototypeC P_tls_config_clear_keys(config) : Global tls_config_clear_keys.P_tls_config_clear_keys
PrototypeC P_tls_config_parse_protocols(*protocols, protostr.p-utf8) : Global tls_config_parse_protocols.P_tls_config_parse_protocols
PrototypeC P_tls_config_set_session_id(config, session_id.p-utf8, len.i) : Global tls_config_set_session_id.P_tls_config_set_session_id
PrototypeC P_tls_config_set_session_lifetime(config, lifetime.l) : Global tls_config_set_session_lifetime.P_tls_config_set_session_lifetime
PrototypeC P_tls_config_add_ticket_key(config, keyrev.i, *key, keylen.i) : Global tls_config_add_ticket_key.P_tls_config_add_ticket_key
PrototypeC P_tls_client() : Global tls_client.P_tls_client
PrototypeC P_tls_server() : Global tls_server.P_tls_server
PrototypeC P_tls_configure(ctx, config) : Global tls_configure.P_tls_configure
PrototypeC P_tls_reset(ctx) : Global tls_reset.P_tls_reset
PrototypeC P_tls_free(ctx) : Global tls_free.P_tls_free
PrototypeC P_tls_accept_fds(ctx, *cctx, fd_read.l, fd_write.l) : Global tls_accept_fds.P_tls_accept_fds
PrototypeC P_tls_accept_socket(ctx, *cctx, socket.l) : Global tls_accept_socket.P_tls_accept_socket
PrototypeC P_tls_accept_cbs(ctx, *cctx, *read_cb.tls_read_cb, *write_cb.tls_write_cb, *cb_arg) : Global tls_accept_cbs.P_tls_accept_cbs
PrototypeC P_tls_connect(ctx, host.p-utf8, port.p-utf8) : Global tls_connect.P_tls_connect
PrototypeC P_tls_connect_fds(ctx, fd_read.l, fd_write.l, servername.p-utf8) : Global tls_connect_fds.P_tls_connect_fds
PrototypeC P_tls_connect_servername(ctx, host.p-utf8, port.p-utf8, servername.p-utf8) : Global tls_connect_servername.P_tls_connect_servername
PrototypeC P_tls_connect_socket(ctx, s.l, servername.p-utf8) : Global tls_connect_socket.P_tls_connect_socket
PrototypeC P_tls_connect_cbs(ctx, *read_cb.tls_read_cb, *write_cb.tls_write_cb, *cb_arg, servername.p-utf8) : Global tls_connect_cbs.P_tls_connect_cbs
PrototypeC P_tls_handshake(ctx) : Global tls_handshake.P_tls_handshake
PrototypeC P_tls_read(ctx, *buf, buflen.i) : Global tls_read.P_tls_read
PrototypeC P_tls_write(ctx, *buf, buflen.i) : Global tls_write.P_tls_write
PrototypeC P_tls_close(ctx) : Global tls_close.P_tls_close
PrototypeC P_tls_peer_cert_provided(ctx) : Global tls_peer_cert_provided.P_tls_peer_cert_provided
PrototypeC P_tls_peer_cert_contains_name(ctx, name.p-utf8) : Global tls_peer_cert_contains_name.P_tls_peer_cert_contains_name
PrototypeC P_tls_peer_cert_hash(ctx) : Global tls_peer_cert_hash.P_tls_peer_cert_hash
PrototypeC P_tls_peer_cert_issuer(ctx) : Global tls_peer_cert_issuer.P_tls_peer_cert_issuer
PrototypeC P_tls_peer_cert_subject(ctx) : Global tls_peer_cert_subject.P_tls_peer_cert_subject
PrototypeC P_tls_peer_cert_notbefore(ctx) : Global tls_peer_cert_notbefore.P_tls_peer_cert_notbefore
PrototypeC P_tls_peer_cert_notafter(ctx) : Global tls_peer_cert_notafter.P_tls_peer_cert_notafter
PrototypeC P_tls_peer_cert_chain_pem(ctx, *len) : Global tls_peer_cert_chain_pem.P_tls_peer_cert_chain_pem
PrototypeC P_tls_conn_alpn_selected(ctx) : Global tls_conn_alpn_selected.P_tls_conn_alpn_selected
PrototypeC P_tls_conn_cipher(ctx) : Global tls_conn_cipher.P_tls_conn_cipher
PrototypeC P_tls_conn_cipher_strength(ctx) : Global tls_conn_cipher_strength.P_tls_conn_cipher_strength
PrototypeC P_tls_conn_servername(ctx) : Global tls_conn_servername.P_tls_conn_servername
PrototypeC P_tls_conn_session_resumed(ctx) : Global tls_conn_session_resumed.P_tls_conn_session_resumed
PrototypeC P_tls_conn_version(ctx) : Global tls_conn_version.P_tls_conn_version
PrototypeC P_tls_load_file(file.p-utf8, *len, *password) : Global tls_load_file.P_tls_load_file
PrototypeC P_tls_unload_file(*buf, len.i) : Global tls_unload_file.P_tls_unload_file
PrototypeC P_tls_ocsp_process_response(ctx, response.p-utf8, size.i) : Global tls_ocsp_process_response.P_tls_ocsp_process_response
PrototypeC P_tls_peer_ocsp_cert_status(ctx) : Global tls_peer_ocsp_cert_status.P_tls_peer_ocsp_cert_status
PrototypeC P_tls_peer_ocsp_crl_reason(ctx) : Global tls_peer_ocsp_crl_reason.P_tls_peer_ocsp_crl_reason
PrototypeC P_tls_peer_ocsp_next_update(ctx) : Global tls_peer_ocsp_next_update.P_tls_peer_ocsp_next_update
PrototypeC P_tls_peer_ocsp_response_status(ctx) : Global tls_peer_ocsp_response_status.P_tls_peer_ocsp_response_status
PrototypeC P_tls_peer_ocsp_result(ctx) : Global tls_peer_ocsp_result.P_tls_peer_ocsp_result
PrototypeC P_tls_peer_ocsp_revocation_time(ctx) : Global tls_peer_ocsp_revocation_time.P_tls_peer_ocsp_revocation_time
PrototypeC P_tls_peer_ocsp_this_update(ctx) : Global tls_peer_ocsp_this_update.P_tls_peer_ocsp_this_update
PrototypeC P_tls_peer_ocsp_url(ctx) : Global tls_peer_ocsp_url.P_tls_peer_ocsp_url
;}

Structure TLS_Connections
  *ctx
EndStructure

Structure TLS_Globals
  CertFile$
  KeyFile$
  CaCertFile$
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
  
  TLSG\muxClient = CreateMutex()
  TLSG\muxSever = CreateMutex() 
  
  CompilerIf Defined(LIBTLSFILE$, #PB_Variable)
    TLSG\DLL = OpenLibrary(#PB_Any, LIBTLSFILE$)
  CompilerElse
    CompilerSelect #PB_Compiler_OS
      CompilerCase #PB_OS_Windows
        CompilerIf #PB_Compiler_64Bit
          TLSG\DLL = OpenLibrary(#PB_Any, "libtls-24.dll")
        CompilerElse 
          TLSG\DLL = OpenLibrary(#PB_Any, "tls.dll")
        CompilerEndIf  
        ;error? get it from https://www.purebasic.fr/english/viewtopic.php?p=593079#p593079
      CompilerDefault
        TLSG\DLL = OpenLibrary(#PB_Any, "./libtls.so.25.0.0")
        ;error? get it from https://www.purebasic.fr/english/viewtopic.php?p=593079#p593079
    CompilerEndSelect
  CompilerEndIf
  
  If TLSG\DLL
    tls_init                          = GetFunction(TLSG\DLL, "tls_init")
    tls_config_error                  = GetFunction(TLSG\DLL, "tls_config_error")
    tls_error                         = GetFunction(TLSG\DLL, "tls_error")
    tls_config_new                    = GetFunction(TLSG\DLL, "tls_config_new")
    tls_config_free                   = GetFunction(TLSG\DLL, "tls_config_free")
    tls_default_ca_cert_file          = GetFunction(TLSG\DLL, "tls_default_ca_cert_file")
    tls_config_add_keypair_file       = GetFunction(TLSG\DLL, "tls_config_add_keypair_file")
    tls_config_add_keypair_mem        = GetFunction(TLSG\DLL, "tls_config_add_keypair_mem")
    tls_config_add_keypair_ocsp_file  = GetFunction(TLSG\DLL, "tls_config_add_keypair_ocsp_file")
    tls_config_add_keypair_ocsp_mem   = GetFunction(TLSG\DLL, "tls_config_add_keypair_ocsp_mem")
    tls_config_set_alpn               = GetFunction(TLSG\DLL, "tls_config_set_alpn")
    tls_config_set_ca_file            = GetFunction(TLSG\DLL, "tls_config_set_ca_file")
    tls_config_set_ca_path            = GetFunction(TLSG\DLL, "tls_config_set_ca_path")
    tls_config_set_ca_mem             = GetFunction(TLSG\DLL, "tls_config_set_ca_mem")
    tls_config_set_cert_file          = GetFunction(TLSG\DLL, "tls_config_set_cert_file")
    tls_config_set_cert_mem           = GetFunction(TLSG\DLL, "tls_config_set_cert_mem")
    tls_config_set_ciphers            = GetFunction(TLSG\DLL, "tls_config_set_ciphers")
    tls_config_set_crl_file           = GetFunction(TLSG\DLL, "tls_config_set_crl_file")
    tls_config_set_crl_mem            = GetFunction(TLSG\DLL, "tls_config_set_crl_mem")
    tls_config_set_dheparams          = GetFunction(TLSG\DLL, "tls_config_set_dheparams")
    tls_config_set_ecdhecurve         = GetFunction(TLSG\DLL, "tls_config_set_ecdhecurve")
    tls_config_set_ecdhecurves        = GetFunction(TLSG\DLL, "tls_config_set_ecdhecurves")
    tls_config_set_key_file           = GetFunction(TLSG\DLL, "tls_config_set_key_file")
    tls_config_set_key_mem            = GetFunction(TLSG\DLL, "tls_config_set_key_mem")
    tls_config_set_keypair_file       = GetFunction(TLSG\DLL, "tls_config_set_keypair_file")
    tls_config_set_keypair_mem        = GetFunction(TLSG\DLL, "tls_config_set_keypair_mem")
    tls_config_set_keypair_ocsp_file  = GetFunction(TLSG\DLL, "tls_config_set_keypair_ocsp_file")
    tls_config_set_keypair_ocsp_mem   = GetFunction(TLSG\DLL, "tls_config_set_keypair_ocsp_mem")
    tls_config_set_ocsp_staple_mem    = GetFunction(TLSG\DLL, "tls_config_set_ocsp_staple_mem")
    tls_config_set_ocsp_staple_file   = GetFunction(TLSG\DLL, "tls_config_set_ocsp_staple_file")
    tls_config_set_protocols          = GetFunction(TLSG\DLL, "tls_config_set_protocols")
    tls_config_set_session_fd         = GetFunction(TLSG\DLL, "tls_config_set_session_fd")
    tls_config_set_verify_depth       = GetFunction(TLSG\DLL, "tls_config_set_verify_depth")
    tls_config_prefer_ciphers_client  = GetFunction(TLSG\DLL, "tls_config_prefer_ciphers_client")
    tls_config_prefer_ciphers_server  = GetFunction(TLSG\DLL, "tls_config_prefer_ciphers_server")
    tls_config_insecure_noverifycert  = GetFunction(TLSG\DLL, "tls_config_insecure_noverifycert")
    tls_config_insecure_noverifyname  = GetFunction(TLSG\DLL, "tls_config_insecure_noverifyname")
    tls_config_insecure_noverifytime  = GetFunction(TLSG\DLL, "tls_config_insecure_noverifytime")
    tls_config_verify                 = GetFunction(TLSG\DLL, "tls_config_verify")
    tls_config_ocsp_require_stapling  = GetFunction(TLSG\DLL, "tls_config_ocsp_require_stapling")
    tls_config_verify_client          = GetFunction(TLSG\DLL, "tls_config_verify_client")
    tls_config_verify_client_optional = GetFunction(TLSG\DLL, "tls_config_verify_client_optional")
    tls_config_clear_keys             = GetFunction(TLSG\DLL, "tls_config_clear_keys")
    tls_config_parse_protocols        = GetFunction(TLSG\DLL, "tls_config_parse_protocols")
    tls_config_set_session_id         = GetFunction(TLSG\DLL, "tls_config_set_session_id")
    tls_config_set_session_lifetime   = GetFunction(TLSG\DLL, "tls_config_set_session_lifetime")
    tls_config_add_ticket_key         = GetFunction(TLSG\DLL, "tls_config_add_ticket_key")
    tls_client                        = GetFunction(TLSG\DLL, "tls_client")
    tls_server                        = GetFunction(TLSG\DLL, "tls_server")
    tls_configure                     = GetFunction(TLSG\DLL, "tls_configure")
    tls_reset                         = GetFunction(TLSG\DLL, "tls_reset")
    tls_free                          = GetFunction(TLSG\DLL, "tls_free")
    tls_accept_fds                    = GetFunction(TLSG\DLL, "tls_accept_fds")
    tls_accept_socket                 = GetFunction(TLSG\DLL, "tls_accept_socket")
    tls_accept_cbs                    = GetFunction(TLSG\DLL, "tls_accept_cbs")
    tls_connect                       = GetFunction(TLSG\DLL, "tls_connect")
    tls_connect_fds                   = GetFunction(TLSG\DLL, "tls_connect_fds")
    tls_connect_servername            = GetFunction(TLSG\DLL, "tls_connect_servername")
    tls_connect_socket                = GetFunction(TLSG\DLL, "tls_connect_socket")
    tls_connect_cbs                   = GetFunction(TLSG\DLL, "tls_connect_cbs")
    tls_handshake                     = GetFunction(TLSG\DLL, "tls_handshake")
    tls_read                          = GetFunction(TLSG\DLL, "tls_read")
    tls_write                         = GetFunction(TLSG\DLL, "tls_write")
    tls_close                         = GetFunction(TLSG\DLL, "tls_close")
    tls_peer_cert_provided            = GetFunction(TLSG\DLL, "tls_peer_cert_provided")
    tls_peer_cert_contains_name       = GetFunction(TLSG\DLL, "tls_peer_cert_contains_name")
    tls_peer_cert_hash                = GetFunction(TLSG\DLL, "tls_peer_cert_hash")
    tls_peer_cert_issuer              = GetFunction(TLSG\DLL, "tls_peer_cert_issuer")
    tls_peer_cert_subject             = GetFunction(TLSG\DLL, "tls_peer_cert_subject")
    tls_peer_cert_notbefore           = GetFunction(TLSG\DLL, "tls_peer_cert_notbefore")
    tls_peer_cert_notafter            = GetFunction(TLSG\DLL, "tls_peer_cert_notafter")
    tls_peer_cert_chain_pem           = GetFunction(TLSG\DLL, "tls_peer_cert_chain_pem")
    tls_conn_alpn_selected            = GetFunction(TLSG\DLL, "tls_conn_alpn_selected")
    tls_conn_cipher                   = GetFunction(TLSG\DLL, "tls_conn_cipher")
    tls_conn_cipher_strength          = GetFunction(TLSG\DLL, "tls_conn_cipher_strength")
    tls_conn_servername               = GetFunction(TLSG\DLL, "tls_conn_servername")
    tls_conn_session_resumed          = GetFunction(TLSG\DLL, "tls_conn_session_resumed")
    tls_conn_version                  = GetFunction(TLSG\DLL, "tls_conn_version")
    tls_load_file                     = GetFunction(TLSG\DLL, "tls_load_file")
    tls_unload_file                   = GetFunction(TLSG\DLL, "tls_unload_file")
    tls_ocsp_process_response         = GetFunction(TLSG\DLL, "tls_ocsp_process_response")
    tls_peer_ocsp_cert_status         = GetFunction(TLSG\DLL, "tls_peer_ocsp_cert_status")
    tls_peer_ocsp_crl_reason          = GetFunction(TLSG\DLL, "tls_peer_ocsp_crl_reason")
    tls_peer_ocsp_next_update         = GetFunction(TLSG\DLL, "tls_peer_ocsp_next_update")
    tls_peer_ocsp_response_status     = GetFunction(TLSG\DLL, "tls_peer_ocsp_response_status")
    tls_peer_ocsp_result              = GetFunction(TLSG\DLL, "tls_peer_ocsp_result")
    tls_peer_ocsp_revocation_time     = GetFunction(TLSG\DLL, "tls_peer_ocsp_revocation_time")
    tls_peer_ocsp_this_update         = GetFunction(TLSG\DLL, "tls_peer_ocsp_this_update")
    tls_peer_ocsp_url                 = GetFunction(TLSG\DLL, "tls_peer_ocsp_url")
  EndIf
  
  ProcedureReturn TLSG\DLL
EndProcedure

Enumeration TLS_Errors 1
  #TLS_Error_None
  #TLS_Error_InitFailed
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

Procedure TLS_CreateNetworkServer(Server, Port, Mode, BindedIP.s)
  Protected TLSMode, ServerID, *ctx, *cfg, *Error, SockOpt.l, SockOptLen.l
  
  If TLSG\DLL And Mode & #PB_Network_TLSv1
    TLSMode = (Mode & #PB_Network_TLSv1) >> 3
    *cfg    = tls_config_new()
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
      *ctx = tls_server()
      If *ctx = 0
        TLSG\LastError = #TLS_Error_Cant_Start_Server
      ElseIf tls_configure(*ctx, *cfg) = -1
        TLSG\LastError = #TLS_Error_Configure_Error
      Else
        *Error = tls_config_error(*cfg)
        If *Error
          Debug "TLS Config error: " + PeekS(*Error, - 1, #PB_UTF8)
        EndIf
        tls_config_free(*cfg)
        Mode     = Mode & ($FFFFFFFF - #PB_Network_Extra)
        ServerID = CreateNetworkServer(Server, Port, #PB_Network_TCP | #PB_Network_IPv4, BindedIP)
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
            UnlockMutex(TLSG\muxSever) 
          EndIf
         EndIf
      EndIf
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
      ;UnlockMutex(TLSG\muxSever)
      If *server 
        ;TLS!
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
  
  If Mode & #PB_Network_TLSv1
    TLSMode = (Mode & #PB_Network_TLSv1) >> 3
    Mode    = Mode & ($FFFFFFFF - #PB_Network_Extra)
  EndIf
  
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
          LockMutex(TLSG\muxClient) 
          AddMapElement(TLSG\Clients(), Str(ClientID))
          TLSG\Clients()\ctx = *ctx 
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
  
  If *client   
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
    ;is TLS connection!
    ;CloseNetworkConnection(ClientID)
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

Procedure Init_TLS(Domain$="",CertFile$ = "", KeyFile$ = "", CaCertFile$ = "")
  ;Only needed, when you have certificates.
  ;the library will call tls_init() internally already when needed
  ;but you can call it as often as you want (to use different certificates right before a connection e.g.)
  Protected Result
  If tls_init() = 0; TLS_Error_None
    TLSG\domain$     = Domain$ 
    TLSG\CertFile$   = CertFile$
    TLSG\KeyFile$    = KeyFile$
    TLSG\CaCertFile$ = CaCertFile$
    Result           = #TLS_Error_None
  Else
    Result = #TLS_Error_InitFailed
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
  
  
  Con = OpenNetworkConnection("www.purebasic.fr", 443, #PB_Network_TCP | #PB_Network_IPv4 | #PB_Network_TLS_DEFAULT)
  If Con
    *Buffer = AllocateMemory($FFFF, #PB_Memory_NoClear)
    If *Buffer
      
      SendNetworkString(Con, "GET / HTTP/1.1" + #CRLF$ + "Host: www.purebasic.fr" + #CRLF$ + #CRLF$)
      
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
