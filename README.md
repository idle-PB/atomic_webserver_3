![PureBasic Version][badge purebasic]&nbsp;&nbsp;
[![MIT License][badge license]](./LICENSE)&nbsp;&nbsp;

# Atomic_Web_Server_3
 Atomic Web Server 3
 multi threaded application server for purebasic 
 
Atomic Web Server 3, is a multi threaded version of the origonal Atomic Web Server with minimal locks, featuring a PB Tag Preprocessor, URI Handlers, Reverse Proxy and an optional *Virtual File System to serve assets from memory. With Atomic Web Server 3 you can create a single exe with no dependencies to Host web gui applications or Spider Basic applications for the desktop and serve, locally to a web gadget or a web browser. Uri handlers let you create dynamic content and respond to POST or GET requests. The Tag Preprocessor fills in elements within html using runtime procedures and eliminates the need for CGI or interpreted languages like PHP, Python, Lua or Node JS for server side processing unleashing the pure power of PB on the web. One exe with no dependencies when using the optional virtual file system.

*virtual file system is still in the works

Examples 
single_server_localhost.pb  : use if you want an application to host a webgui or spiderbasic application   
shared_server_lan_wan.pb    : uses domain names under the root www folder so mulitple services can be exposed under the same server 
proxy_server_lan_wan.pb     : use multiple domains on same server multiple ports or seperate instances locally or remotely

www folder contains the test data for the examples 
note you will have to edit your hosts file to test and change IP address to suit. 

<!-- badges  -->

[badge license]: https://img.shields.io/badge/license-MIT-00b5da "Released under the MIT License"
[badge purebasic]: https://img.shields.io/badge/PureBasic-6.10-yellow "PureBasic 6.10 (x86/x64) â€” Linux/OS X/Windows (Arm) PI3/Pi4"

  

 
 
