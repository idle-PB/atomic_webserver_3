;==================================================================
;
; Library:          EzPack
; Author:           Andrew Ferguson <idle> 
; Date:             28:12:2012
; Version:          1.0.6b
; Target OS:        All 
; Strings:          Unicode
; Target Compiler:  PureBasic 4.51 and later
; 
; EzPack ; Copyright (c) 2012-2018 Andrew Ferguson 
;==================================================================
; * Permission is hereby granted, free of charge, To any person obtaining a copy
; * of this software And associated documentation files (the "Software"), To deal
; * in the Software without restriction, including without limitation the rights
; * To use, copy, modify, merge, publish, distribute, sublicense, And/Or sell
; * copies of the Software, And To permit persons To whom the Software is
; * furnished To do so, subject To the following conditions:
; *
; * The above copyright notice And this permission notice shall be included in
; * all copies Or substantial portions of the Software.
; *
; * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS Or
; * IMPLIED, INCLUDING BUT Not LIMITED To THE WARRANTIES OF MERCHANTABILITY,
; * FITNESS For A PARTICULAR PURPOSE And NONINFRINGEMENT. IN NO EVENT SHALL THE
; * AUTHORS Or COPYRIGHT HOLDERS BE LIABLE For ANY CLAIM, DAMAGES Or OTHER
; * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT Or OTHERWISE, ARISING FROM,
; * OUT OF Or IN CONNECTION With THE SOFTWARE Or THE USE Or OTHER DEALINGS IN
; * THE SOFTWARE.
; */


; Description
;A streaming file packer
;ascii And unicode

;History 1.0.6 
;changed the compression level settings so it can be set on a perfile basis  
;from BuildSourceList

;History 1.0.5 
;Added Threading for async gui processing, assumes one thread only  

;History 1.0.4b
;Added file data compresion to file index 

;History 1.0.3b 
;Changed Internal string representaion to utf8  
;Added more error trapping  
;needs testing on OSX 32 / 64 bit 

;History v.1.0.1b
;Needs testing on osx 32 / 64 

;
;usage
;To create a pack make a new object and optionally provide it with the addresses of your callback functions
;with matching parameters of these prototypes  
;Prototype protoEzPackProgress(percent.f,position.q) 
;Prototype protoEzPackList(index.i,path.s) 

; MyPack.iEzPack =NewEzPack(@cbPackList(),@cbProgress())

;Add source dirs to generate a filelist it can be called multiple times with new paths to add more files  
;patterns of the form "*.pb|*.pbi|*.txt"  are accepted note the file type is explicit you need to specify each extention 
; 
; MyPack\BuildSourceFileList(#PB_Compiler_Home,"*.pb",bRecursive) 
;
;Create the pack 
;MyPack\CreatePack("/tmp/tpak.ezp")
;MyPack\Free()

;To open a pack and extract to file 
;create object 

; MyPack.iEzPack =NewEzPack(@cbPackList(),@cbProgress())

;open a pack 
;MyPack\OpenPack("/tmp/tpak.ezp")

;Select a file by name from the pack to mark for extraction file names don't include the root  
;MyPack\SelectExtractFile("/examples/3d/Demos/Tank.pb")
;Or      
;Select a file by index in the pack to mark for extraction  ;
;MyPack\SelectExtractFileIndex(101)
;Unpack the selected files to the given directory 
;MyPack\UnPack("/tmp") 
;Or to extract all files in a pack set the flag UnPackALL to extact all  
;Mypack\UnPack("/tmp",1)



CompilerIf #PB_Compiler_OS = #PB_OS_Windows 
  #EzPack_Cdir = "\" 
  #EzPack_CdirRev = "/"
  ImportC "zlib.lib"
    compress2(*dest,*destlen,*source,sourcelen,level)
    uncompress(*dest,*destlen,*source,sourcelen)
  EndImport 
CompilerElse 
  #EzPack_Cdir = "/"
  #EzPack_CdirRev = "\"
  ImportC "-lz"   
    compress2(*dest,*destlen,*source,sourcelen,level)
    uncompress(*dest,*destlen,*source,sourcelen)
  EndImport 
CompilerEndIf 

EnableExplicit 

#EzPack_MaxPath =1024
#EzPack_Meg = 1048576

#EzPack_KB =1024
#EzPack_MB = #EzPack_KB * 1024 
#EzPack_GB = #EzPack_MB * 1024
#EzPack_TB = #EzPack_GB  * 1024
#EzPack_PB = #EzPack_TB * 1024 
#EzPack_EX = #EzPack_PB * 1024 

Structure EzPack_File 
  start.q
  finish.q
  unpacksize.q
  block.l
  mark.l
  crc.s{8}
  path.u[#EzPack_MaxPath]
EndStructure    

Structure EzPack_FileList
  path.s{#EzPack_MaxPath}
  rootsize.l
  mark.l
  RequestedCompressionLevel.l
EndStructure

Structure EzPack_Header 
  filesoffset.q
  fliecount.l
  indexsize.l
EndStructure     

Structure EzPack_FileIndex 
  index.l
  size.l
  *mem
EndStructure  

Structure EzPack_PackData
  PackName.s
  PackAll.l
  WorkSetMb.l
EndStructure    

Structure EzPack_UnPackData
  DestinationPath.s
  UnpackAll.l
  UnpackToMemory.l
EndStructure   

Structure EzPack_ListData
  *this
  StartDir.s
  pattern.s
  RootSize.l
  Recursive.l
  level.l
EndStructure   

Structure EzPack_OpenData
  file.s
  *Memory
  MemoryLen.i
EndStructure  

Prototype protoEzPackProgress(percent.f,position.q) 
Prototype protoEzPackList(index.i,path.s) 

Structure EzPack 
  *vt
  *Inputbuffer 
  *Outputbuffer 
  SourceFileNumber.i
  DestFileNumber.i
  SourcePath.s
  DestPath.s 
  SourcePackPath.s
  Pattern.s 
  bset.i
  BlockSize.i
  Current.q
  Inputsize.q
  scaleprogress.d 
  ExtractCount.i 
  SuppressWarnings.i
  CurrentIndex.i
  CurrentPath.s
  *MemoryPack
  ThreadIDPack.i
  ThreadIDList.i
  ThreadIDUnPack.i
  pd.EzPack_PackData
  upd.EzPack_UnPackData
  ld.EzPack_ListData
  opd.EzPack_OpenData 
  *cbEzPackList.protoEzPackList
  *cbEzpackProgress.protoEzPackProgress 
  List FilePatterns.s()
  List Sourcefiles.EzPack_FileList()
  List CompressFiles.EzPack_File()
  Map FileIndex.EzPack_FileIndex(10000)
EndStructure 


UseCRC32Fingerprint()

Declare EzPackError(*this.EzPack,msg.s,bfatal)

Procedure iEzPack_BuildSourceFileList(*this.EzPack,StartDir.s,RootSize,pattern.s="*.*",Level=7,Recursive=1)
  Protected mDir,Directory.s,Filename.s,FullFileName.s, tdir.s,ct,a,bmatch,index,path.s
  
  If Not *this\bset 
    
    If Right(StartDir,1) = #EzPack_Cdir 
      StartDir = Left(StartDir,Len(StartDir)-1)
    EndIf   
    *this\SourcePath = StartDir 
    *this\pattern = RemoveString(pattern,"*.")
    ct = CountString(*this\pattern,"|") + 1
    ClearList(*this\FilePatterns())
    For a = 1 To ct 
      AddElement(*this\FilePatterns())
      *this\FilePatterns() = UCase(StringField(*this\pattern,a,"|"))
    Next
    *this\bset=1
  EndIf 
  
  mDir = ExamineDirectory(#PB_Any, StartDir, "*.*") 
  If mDir 
    While NextDirectoryEntry(mDir)
      If DirectoryEntryType(mDir) = #PB_DirectoryEntry_File
        Directory = StartDir
        FileName.s = DirectoryEntryName(mDir)
        ForEach *this\FilePatterns()
          If  *this\FilePatterns() = GetExtensionPart(UCase(Filename))
            bmatch=1
          ElseIf *this\FilePatterns() = UCase(Filename)
            bmatch =1 
          ElseIf  *this\FilePatterns() = "*"
            bmatch =1 
          EndIf   
          If bmatch 
            FullFileName.s = StartDir +  #EzPack_Cdir + FileName
            AddElement(*this\Sourcefiles()) 
            *this\Sourcefiles()\path = FullFileName
            *this\Sourcefiles()\rootsize = rootsize 
            *this\Sourcefiles()\RequestedCompressionLevel = level 
            *this\Inputsize + FileSize(FullFileName)
            If *this\cbEzPackList
              *this\CurrentIndex = ListIndex(*this\Sourcefiles())
              *this\Currentpath.s = *this\Sourcefiles()\path 
              *this\cbEzPackList(*this\CurrentIndex,*this\CurrentPath) 
            EndIf  
            bmatch =0    
          EndIf
        Next  
      Else
        tdir = DirectoryEntryName(mDir)
        If tdir <> "." And tdir <> ".."
          If  Recursive = 1
            iEzPack_BuildSourceFileList(*this,startDir + #EzPack_Cdir + tdir,Rootsize,Pattern,level,Recursive)
          EndIf
        EndIf
      EndIf
    Wend
    FinishDirectory(mDir)
  EndIf
  
  ProcedureReturn ListSize(*this\Sourcefiles())
  
EndProcedure

Procedure EzPack_BuildSourceFileListTheaded(*this.Ezpack) 
  Protected lcount.i 
  lcount = iEzPack_BuildSourceFileList(*this,*this\ld\StartDir.s,*this\ld\RootSize,*this\ld\pattern.s,*this\ld\level,*this\ld\Recursive)  
  ProcedureReturn lcount
EndProcedure   

Procedure EzPack_BuildSourceFileList(*this.EzPack,StartDir.s,pattern.s="*.*",Level=7,Recursive=1,Thread=0) 
  Protected lcount.i,ct.i,pos.i,a.i
  *this\bset = 0
  *this\ld\pattern = pattern
  *this\ld\Recursive = Recursive 
  *this\ld\StartDir = StartDir 
  *this\ld\level = level 
  
  ct = CountString(StartDir,#EzPack_Cdir) 
  If ct > 1   
    If Right(StartDir,1) = #EzPack_Cdir 
      ct-1
    EndIf   
    pos = 1
    For a = 1 To ct
      pos = FindString(StartDir,#EzPack_Cdir,pos)+1
    Next   
    *this\ld\RootSize = pos-2 
  Else 
    *this\ld\RootSize = Len(StartDir) 
  EndIf     
  
  If Thread And Not IsThread(*this\ThreadIDList) 
    *this\ThreadIDList = CreateThread(@EzPack_BuildSourceFileListTheaded(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDList) 
    lcount = EzPack_BuildSourceFileListTheaded(*this)
    ProcedureReturn lcount 
  EndIf    
EndProcedure   

Procedure.s iEzpack_Key(file.s)
    
  file = RemoveString(file,"./")
  file = RemoveString(file,"/") 
  file = RemoveString(file,"\") 
  ProcedureReturn file  
  
EndProcedure   

Procedure iEzPack_Pack(*this.EzPack)
  
  Protected start.i,finish.i,FileSize.q,Readpart.q,tfile.s  
  Protected header.EzPack_Header 
  
  Protected max = *this\pd\WorkSetMb + 100  
  Protected Inputsize
  Protected cpart.q,remaining.q,block 
  Protected filecount,fn,result 
  
  
  While Not *this\InputBuffer Or Not *this\Outputbuffer 
    If max < 10 
      EzPackError(*this,"Can't allocate memory",1) 
    EndIf    
    If *this\InputBuffer 
      FreeMemory(*this\InputBuffer)
    EndIf 
    If *this\outputbuffer 
      FreeMemory(*this\outputbuffer)
    EndIf 
    
    If max < 100 
      max - 10 
    Else 
      max - 100
    EndIf    
    
    *this\blocksize= max*#EzPack_Meg
    *this\InputBuffer = AllocateMemory(*this\blocksize) 
    *this\outputbuffer = AllocateMemory(*this\blocksize)
    
  Wend 
  
  If Not *this\Inputbuffer Or Not *this\Outputbuffer 
    EzPackError(*this,"Failed to allocate buffers",1)
  Else    
    
    
    *this\Current = SizeOf(EzPack_Header) 
    *this\DestPath = *this\pd\PackName 
    
    ClearList(*this\CompressFiles())
    
    If ListSize(*this\Sourcefiles()) 
      *this\scaleprogress = 100 / *this\Inputsize 
      *this\Inputsize = 0 
      *this\DestFileNumber = CreateFile(#PB_Any,*this\pd\PackName)
      If  *this\DestFileNumber 
        WriteData( *this\DestFileNumber,@header,SizeOf(EzPack_Header)) 
        ForEach *this\Sourcefiles() 
          
          If  *this\pd\PackAll Or *this\Sourcefiles()\mark 
            fn = ReadFile(#PB_Any,*this\Sourcefiles()\path) 
            If fn 
              FileSize = Lof(fn)
              If FileSize < *this\Blocksize
                If  ReadData(fn,*this\InputBuffer,FileSize) = FileSize 
                  finish = *this\Blocksize 
                  
                  result = compress2(*this\outputbuffer,@finish,*this\InputBuffer,FileSize,*this\Sourcefiles()\RequestedCompressionLevel) 
                  If result =0
                    
                    AddElement(*this\CompressFiles())
                    *this\CompressFiles()\crc = Fingerprint(*this\InputBuffer,FileSize,#PB_Cipher_CRC32) 
                    *this\CompressFiles()\start = *this\Current 
                    *this\CompressFiles()\finish = *this\Current + finish 
                    *this\CompressFiles()\unpacksize = FileSize 
                    tfile =  Right(*this\Sourcefiles()\path,Len(*this\Sourcefiles()\path)-*this\Sourcefiles()\rootsize) 
                    
                    PokeS(@*this\CompressFiles()\path[0],tfile,#EzPack_MaxPath,#PB_Unicode) 
                    WriteData(*this\DestFileNumber,*this\outputbuffer,finish)  
                    *this\Current+finish 
                    *this\Inputsize + FileSize 
                    
                    If *this\cBEzpackProgress 
                      *this\cbEzPackProgress(*this\Inputsize* *this\scaleprogress,*this\current)
                    EndIf 
                  Else 
                    ;Debug *this\Sourcefiles()\path   
                    EzPackError(*this,"Compress Error " + *this\Sourcefiles()\path,0)
                  EndIf 
                EndIf 
              Else 
                cpart = 0 
                readpart = *this\blocksize
                block = 1
                remaining = FileSize
                
                While cpart < FileSize 
                  If  ReadData(fn,*this\InputBuffer,readpart) = readpart  
                    finish = *this\blocksize 
                    result = compress2(*this\outputbuffer,@finish,*this\InputBuffer,readpart,*this\Sourcefiles()\RequestedCompressionLevel ) 
                    If result =0
                      AddElement(*this\CompressFiles())
                      *this\CompressFiles()\crc = Fingerprint(*this\InputBuffer,readpart,#PB_Cipher_CRC32) 
                      *this\CompressFiles()\start = *this\Current 
                      *this\CompressFiles()\finish = *this\Current + finish 
                      *this\CompressFiles()\unpacksize = readpart 
                      *this\CompressFiles()\block = block
                      tfile.s = Right(*this\Sourcefiles()\path,Len(*this\Sourcefiles()\path)-*this\Sourcefiles()\rootsize) 
                      
                      PokeS(@*this\CompressFiles()\path[0],tfile,#EzPack_MaxPath,#PB_Unicode) 
                      WriteData(*this\DestFileNumber,*this\outputbuffer,finish)  
                      *this\Current+finish 
                      *this\Inputsize + readpart
                      cpart + readpart 
                      remaining - readpart
                      If remaining < readpart 
                        readpart = remaining 
                      EndIf    
                      If *this\cbEzPackProgress 
                        *this\cbEzPackProgress(*this\Inputsize* *this\scaleprogress, *this\current)
                      EndIf    
                      
                      block + 1
                    Else
                      EzPackError(*this,"compress Error " + *this\Sourcefiles()\path,0) 
                      Break 
                    EndIf 
                  Else 
                    EzPackError(*this,"Read Error " + *this\Sourcefiles()\path,0)
                    Break 
                  EndIf 
                Wend   
                
              EndIf
              
              CloseFile(fn)     
            Else 
              EzPackError(*this,"Read Error " + *this\Sourcefiles()\path,0)
            EndIf 
            Delay(0)
          EndIf 
        Next 
        
        header\filesoffset = *this\Current 
        header\fliecount = ListSize(*this\CompressFiles())
        Protected size , tpos 
        size = header\fliecount * SizeOf(EzPack_File) 
        If size > *this\BlockSize 
          *this\Inputbuffer = ReAllocateMemory(*this\Inputbuffer,size)
          *this\Outputbuffer = ReAllocateMemory(*this\Outputbuffer,size) 
        EndIf    
        
        ForEach *this\CompressFiles()    
          CopyMemory(@*this\CompressFiles(),*this\Inputbuffer+tpos,SizeOf(Ezpack_file)) 
          tpos + SizeOf(EzPack_File) 
        Next  
        finish = size 
        result = compress2(*this\outputbuffer,@finish,*this\InputBuffer,size,9) 
        If result = 0 
          WriteData(*this\DestFileNumber,*this\Outputbuffer,finish) 
          *this\Current + finish 
          header\indexsize = finish 
        EndIf   
        
        FileSeek(*this\DestFileNumber,0)
        WriteData(*this\DestFileNumber,@header,SizeOf(EzPack_Header)) 
        CloseFile(*this\DestFileNumber)
        *this\DestFileNumber = 0
        
        If *this\cbEzPackProgress 
          *this\cbEzPackProgress(0, *this\current)
        EndIf    
        
      EndIf   
    EndIf 
    
    FreeMemory(*this\Inputbuffer)
    FreeMemory(*this\Outputbuffer)
    *this\Inputbuffer = 0 
    *this\Outputbuffer = 0
  EndIf 
  
  *this\ThreadIDPack = 0
  ProcedureReturn *this\Current
  
EndProcedure  

Procedure.q EzPack_CreatePack(*this.EzPack,PackName.s,Thread=0,WorkSetMb.i=500);,level.i=7)
  
  *this\pd\PackAll = #True 
  *this\pd\PackName = PackName 
  *this\pd\WorkSetMb = WorkSetMb 
  If thread And Not IsThread(*this\ThreadIDPack)
    *this\ThreadIDPack = CreateThread(@iEzPack_pack(),*this)
    ProcedureReturn 1
  ElseIf Not IsThread(*this\ThreadIDPack)  
    ProcedureReturn iEzPack_Pack(*this)
  EndIf    
EndProcedure 

Procedure.q EzPack_CreatePackSelected(*this.EzPack,PackName.s,Thread=0,WorkSetMb.i=500);,level.i=7)
  
  *this\pd\PackAll = #False 
  *this\pd\PackName = PackName 
  *this\pd\WorkSetMb = WorkSetMb 
  If thread And Not IsThread(*this\ThreadIDPack)
    *this\ThreadIDPack = CreateThread(@iEzPack_pack(),*this)
    ProcedureReturn 1
  ElseIf Not IsThread(*this\ThreadIDPack)  
    ProcedureReturn iEzPack_Pack(*this)
  EndIf    
EndProcedure 

Procedure iEzPack_OpenPack(*this.EzPack)
  Protected fn, header.EzPack_Header,lastfile.s,pos.i,key.s,tfile.s
  Protected *input,*output,inputsize,outputsize,result,a,tpos   
  
  *this\SourcePackPath = *this\opd\file 
  *this\Inputsize = 0
  If Not *this\opd\memory
    fn = ReadFile(#PB_Any,*this\SourcePackPath)
    If fn 
      If  ReadData(fn,@header,SizeOf(EzPack_Header))
        outputsize = header\fliecount * SizeOf(EzPack_File)
        inputsize = header\indexsize
        *input = AllocateMemory(outputsize)
        *output = AllocateMemory(outputsize) 
        If *input And *output 
          FileSeek(fn,header\filesoffset)
          If ReadData(fn,*input,inputsize) 
            result = uncompress(*output,@outputsize,*input,inputsize)
            If result = 0 
              ClearList(*this\CompressFiles()) 
              For a = 0 To header\fliecount -1 
                AddElement(*this\CompressFiles())
                CopyMemory(*output+tpos,@*this\CompressFiles(),SizeOf(EzPack_File)) 
                *this\Inputsize + *this\CompressFiles()\unpacksize 
                tfile = PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
                key = iEzpack_Key(tfile)
                
                If *this\FileIndex(key)\index = 0
                  *this\FileIndex(key)\index = ListIndex(*this\CompressFiles())
                  If *this\cbEzPackList
                    *this\cbEzPackList(a,tfile)     
                  EndIf 
                EndIf 
                
                tpos+ SizeOf(EzPack_File) 
              Next 
              FreeMemory(*input)
              FreeMemory(*output) 
            Else 
              EzPackError(*this,"Failed to decompress file data",1)
            EndIf 
          Else 
            EzPackError(*this,"Failed to Read file data",1)
          EndIf    
        Else 
          EzPackError(*this,"Failed to allocate memory",1) 
        EndIf    
      Else 
        EzPackError(*this,"Failed to read pack header opening pack",1)   
      EndIf    
      CloseFile(fn) 
    EndIf   
  ElseIf *this\opd\Memory And *this\opd\MemoryLen  
    *this\MemoryPack = *this\opd\Memory 
    CopyMemory(*this\opd\memory,@header,SizeOf(EzPack_Header))
    outputsize = header\fliecount * SizeOf(EzPack_File)
    inputsize = header\indexsize
    *input = AllocateMemory(outputsize)
    *output = AllocateMemory(outputsize) 
    If *input And *output 
      CopyMemory(*this\opd\Memory+header\filesoffset,*input,inputsize) 
      result = uncompress(*output,@outputsize,*input,inputsize)
      If result = 0 
        ClearList(*this\CompressFiles()) 
        For a = 1 To header\fliecount 
          AddElement(*this\CompressFiles())
          CopyMemory(*output+tpos,@*this\CompressFiles(),SizeOf(EzPack_File)) 
          *this\Inputsize + *this\CompressFiles()\unpacksize 
          tfile = PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
          key = iEzpack_Key(tfile)
          If *this\FileIndex(key)\index = 0
            *this\FileIndex(key)\index = ListIndex(*this\CompressFiles())
            If *this\cbEzPackList
              *this\cbEzPackList(a,tfile)      
            EndIf 
          EndIf   
          tpos+ SizeOf(EzPack_File) 
        Next 
        FreeMemory(*input)
        FreeMemory(*output) 
      Else 
        EzPackError(*this,"Failed to decompress file data",1)
      EndIf 
    Else 
      EzPackError(*this,"Failed to allocate memory",1)
    EndIf    
  EndIf    
  
  ProcedureReturn ListSize(*this\CompressFiles())
  
EndProcedure

Procedure EzPack_OpenPackFromDisk(*this.EzPack,file.s,Thread=0)
  
  If file <> "" 
    *this\opd\file = file 
    If Thread And Not IsThread(*this\ThreadIDList) 
      *this\ThreadIDList = CreateThread(@iEzPack_OpenPack(),*this) 
    ElseIf Not IsThread(*this\ThreadIDList) 
      ProcedureReturn iEzPack_OpenPack(*this) 
    EndIf 
  EndIf     
  
EndProcedure   

Procedure EzPack_OpenPackFromMemory(*this.EzPack,*Memory,MemoryLen,thread=0)
  If *Memory And MemoryLen 
    *this\opd\Memory = *Memory 
    *this\opd\MemoryLen = MemoryLen 
    
    If Thread And Not IsThread(*this\ThreadIDList) 
      *this\ThreadIDList = CreateThread(@iEzPack_OpenPack(),*this) 
    ElseIf Not IsThread(*this\ThreadIDList) 
      ProcedureReturn iEzPack_OpenPack(*this) 
    EndIf 
  EndIf    
  
EndProcedure 

Procedure EzPack_SelectExtractFileIndex(*this.EzPack,index.i) 
  Protected CurrentIndex.i,file.s,tfile.s
  
  If index >=0 And index < ListSize(*this\CompressFiles())    
    CurrentIndex = ListIndex(*this\CompressFiles())
    SelectElement(*this\CompressFiles(),Index) 
    *this\CompressFiles()\mark = 1 
    
    file = PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
    While NextElement(*this\CompressFiles()) 
      tfile =  PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
      If  tfile = file 
        *this\CompressFiles()\mark = 1 
      Else 
        Break 
      EndIf 
    Wend    
    
    SelectElement(*this\CompressFiles(),currentIndex) 
    ProcedureReturn #True 
  EndIf      
  
EndProcedure   

Procedure EzPack_SelectExtractFile(*this.EzPack,File.s) 
  Protected ListIndex.i,CurrentIndex.i,tfile.s,key.s 
  
  If file <> "" 
    key = iEzpack_Key(file)
    Listindex = *this\FileIndex(key)\index 
    If ListIndex 
      CurrentIndex = ListIndex(*this\CompressFiles())
      SelectElement(*this\CompressFiles(),ListIndex) 
      *this\CompressFiles()\mark = 1 
      While NextElement(*this\CompressFiles()) 
        tfile =  PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
        If  tfile = file 
          *this\CompressFiles()\mark = 1 
        Else 
          Break 
        EndIf 
      Wend    
      
      SelectElement(*this\CompressFiles(),currentIndex) 
      ProcedureReturn #True 
    EndIf      
  EndIf      
EndProcedure   

Procedure EzPack_SelectCompresstFile(*this.EzPack,index.i)
  Protected CurrentElement
  If index >= 0 And index < ListSize(*this\Sourcefiles()) 
    CurrentElement = ListIndex(*this\Sourcefiles()) 
    SelectElement(*this\Sourcefiles(),index)
    *this\Sourcefiles()\mark = 1
    SelectElement(*this\Sourcefiles(),CurrentElement) 
  EndIf    
EndProcedure    

Procedure iEzPack_CreatFileWithPath(*this.EzPack,file.s,*idata,len) 
  Protected path.s,root.s,tpath.s,a,ct,outfn,tdir.s 
  
  If FindString(file,#EzPack_CdirRev,1)
    ReplaceString(file,#EzPack_CdirRev,#EzPack_Cdir, #PB_String_InPlace,1)
  EndIf 
  
  path = GetPathPart(file) 
  
  ct = CountString(path,#EzPack_Cdir) 
  
  root = StringField(path,1,#EzPack_Cdir)
  tpath = root    
  
  For a = 2 To ct 
    tpath.s + #EzPack_Cdir + StringField(path,a,#EzPack_Cdir) 
    CreateDirectory(tpath)
  Next 
  
  outfn = CreateFile(#PB_Any,file) 
  If outfn 
    WriteData(outfn,*iData,len) 
    CloseFile(outfn) 
    ProcedureReturn 1 
  Else 
    EzPackError(*this,"couldn't create extract file " + file,1) 
  EndIf 
  
EndProcedure  

Procedure iEzPack_WriteDatatoFile(*this.EzPack,file.s,*idata,len)
  Protected fn 
  
  If FindString(file,#EzPack_CdirRev,1)
    ReplaceString(file,#EzPack_CdirRev,#EzPack_Cdir, #PB_String_InPlace,1)
  EndIf 
  
  fn = OpenFile(#PB_Any,file) 
  If fn 
    FileSeek(fn,Lof(fn)) 
    WriteData(fn,*idata,len) 
    CloseFile(fn) 
    ProcedureReturn 1   
  EndIf 
  
EndProcedure   

Procedure.i iEzPack_UnPack(*this.EzPack)
  Protected fn, size,outsize.q,*input,*output,tfile.s,*tmem,tsize,pos.i,ufile.s,key.s
  Protected scaleprogress.d,totaloutput.q
  
  If FindString(*this\upd\DestinationPath,#EzPack_Cdir,Len(*this\upd\DestinationPath)-1) 
    *this\upd\DestinationPath = Left(*this\upd\DestinationPath,Len(*this\upd\DestinationPath)-1) 
  ElseIf  FindString(*this\upd\DestinationPath,#EzPack_CdirRev,Len(*this\upd\DestinationPath)-1) 
    *this\upd\DestinationPath = Left(*this\upd\DestinationPath,Len(*this\upd\DestinationPath)-1) 
  EndIf    
  
  *this\ExtractCount = 0
  
  If ListSize(*this\CompressFiles())
    
    scaleprogress = (100.0 / *this\Inputsize) 
    If  Not  *this\MemoryPack
      fn = ReadFile(#PB_Any,*this\SourcePackPath)
    EndIf   
    If fn Or *this\MemoryPack 
      ForEach *this\CompressFiles() 
        ufile =  PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
        
        totaloutput + *this\CompressFiles()\unpacksize 
        If *this\upd\UnpackAll Or *this\CompressFiles()\mark 
          *this\CompressFiles()\mark = 0
          size = *this\CompressFiles()\finish - *this\CompressFiles()\start 
          outsize = *this\CompressFiles()\unpacksize 
          
          *input  = AllocateMemory(size) 
          *output = AllocateMemory(outsize)
          If *input And *output 
            If fn And size   
              FileSeek(fn,*this\CompressFiles()\start) 
              If Not  ReadData(fn,*input,size)
                EzPackError(*this,"Failed to read data in pack",1)
              EndIf    
            ElseIf size  
              CopyMemory(*this\MemoryPack+*this\CompressFiles()\start,*input,size) 
            EndIf    
            If uncompress(*output,@outsize,*input,size) = 0 
              If Fingerprint(*output,outsize,#PB_Cipher_CRC32) = *this\CompressFiles()\crc 
                tfile = *this\upd\DestinationPath + ufile  
                If Not *this\upd\UnpackToMemory
                  If *this\CompressFiles()\block <= 1
                    If iEzPack_CreatFileWithPath(*this,tfile,*output,outsize)
                      *this\ExtractCount+1 
                    EndIf    
                  Else 
                    iEzPack_WriteDatatoFile(*this,tfile,*output,outsize) 
                    *this\ExtractCount+1 
                  EndIf  
                Else 
                  If *this\CompressFiles()\block <= 1
                    *tmem = AllocateMemory(outsize)
                    If *tmem 
                      key = iEzpack_Key(ufile)
                      CopyMemory(*output,*tmem,outsize)
                      *this\FileIndex(key)\mem = *tmem 
                      *this\FileIndex(key)\size = outsize
                      *this\ExtractCount+1 
                    Else 
                      EzPackError(*this,"Failed to alloacte memory " + ufile,0); 
                    EndIf
                  Else 
                    key = iEzpack_Key(ufile)
                    *tmem = *this\FileIndex(key)\mem
                    tsize = *this\Fileindex(key)\size 
                    *tmem = ReAllocateMemory(*tmem,tsize+outsize)
                    If *tmem 
                      CopyMemory(*output,*tmem+tsize,outsize) 
                      *this\FileIndex(key)\mem = *tmem
                      *this\FileIndex(key)\size + outsize
                      *this\ExtractCount+1 
                    EndIf    
                  EndIf
                EndIf 
              Else 
                EzPackError(*this,"Extract Error CRC doesn't match " + ufile,0)
                ProcedureReturn 
              EndIf    
            Else 
              EzPackError(*this,"Extraction Error " + ufile,0)
            EndIf 
            FreeMemory(*input)
            FreeMemory(*output) 
          EndIf 
        EndIf
        
        If *this\cbEzpackProgress 
          *this\Current = *this\CompressFiles()\finish
          *this\cbEzpackProgress(totaloutput*scaleprogress,*this\CompressFiles()\finish)
        EndIf 
            
        
        Delay(0)
      Next   
      If fn
        CloseFile(fn)
      EndIf    
    EndIf
    
    If *this\cbEzpackProgress 
      *this\Current = *this\CompressFiles()\finish
      *this\cbEzpackProgress(0,*this\CompressFiles()\finish)
    EndIf 
    
    
    ProcedureReturn *this\ExtractCount 
  Else 
    
    EzPackError(*this,"No files selected",0)
  EndIf 
  
EndProcedure   

Procedure.i EzPack_UnPack(*this.EzPack,DestinationPath.s,Thread=0,UnPackAll=0,UnPackToMemory=0)
  
  *this\upd\DestinationPath = DestinationPath 
  *this\upd\UnpackAll = UnPackAll 
  *this\upd\UnpackToMemory = UnPackToMemory 
  If Thread And Not IsThread(*this\ThreadIDUnPack) 
    *this\ThreadIDUnPack = CreateThread(@iEzPack_UnPack(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDUnPack) 
    ProcedureReturn iEzPack_UnPack(*this) 
  EndIf    
  
EndProcedure 

Procedure.i EzPack_UnPackAllToDisk(*this.EzPack,DestinationPath.s,Thread=0)
  *this\upd\DestinationPath = DestinationPath 
  *this\upd\UnpackAll = #True 
  *this\upd\UnpackToMemory = #False 
  If Thread And Not IsThread(*this\ThreadIDUnPack) 
    *this\ThreadIDUnPack = CreateThread(@iEzPack_UnPack(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDUnPack) 
    ProcedureReturn iEzPack_UnPack(*this) 
  EndIf    
  
EndProcedure    

Procedure.i EzPack_UnPackSelectedToDisk(*this.EzPack,DestinationPath.s,Thread=0)
  *this\upd\DestinationPath = DestinationPath 
  *this\upd\UnpackAll = #False 
  *this\upd\UnpackToMemory = #False 
  If Thread And Not IsThread(*this\ThreadIDUnPack) 
    *this\ThreadIDUnPack = CreateThread(@iEzPack_UnPack(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDUnPack) 
    ProcedureReturn iEzPack_UnPack(*this) 
  EndIf    
  
EndProcedure 

Procedure.i EzPack_UnPackAllToMemory(*this.EzPack,Thread=0)
  *this\upd\DestinationPath = "" 
  *this\upd\UnpackAll = #True 
  *this\upd\UnpackToMemory = #True 
  If Thread And Not IsThread(*this\ThreadIDUnPack) 
    *this\ThreadIDUnPack = CreateThread(@iEzPack_UnPack(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDUnPack) 
    ProcedureReturn iEzPack_UnPack(*this) 
  EndIf    
EndProcedure    

Procedure.i EzPack_UnPackSelectedToMemory(*this.EzPack,Thread=0)
  *this\upd\DestinationPath = "" 
  *this\upd\UnpackAll = #False 
  *this\upd\UnpackToMemory = #True 
  If Thread And Not IsThread(*this\ThreadIDUnPack) 
    *this\ThreadIDUnPack = CreateThread(@iEzPack_UnPack(),*this)
    ProcedureReturn 1 
  ElseIf Not IsThread(*this\ThreadIDUnPack) 
    ProcedureReturn iEzPack_UnPack(*this) 
  EndIf    
EndProcedure    

Procedure.i EzPack_OpenFile(*this.EzPack,File.s)
  Protected *ele.EzPack_FileIndex,key.s 
  Protected *file.EzPack_FileIndex
  
  key = iEzpack_Key(file)
  *ele = FindMapElement(*this\FileIndex(),Key) 
 
  If *ele 
    If Not *ele\mem 
      EzPack_SelectExtractFileIndex(*this,*ele\index)
      EzPack_UnPackSelectedToMemory(*this)
    EndIf   
    
    *file = AllocateMemory(SizeOf(EzPack_FileIndex))
    If *file 
      *file\index = *ele\index
      *file\mem = AllocateMemory(*ele\size)
      If *file\mem
        *file\size = *ele\size 
        CopyMemory(*ele\mem,*file\mem,*file\size)
        ProcedureReturn *file
      Else 
        EzPackError(*this,"failed To allocate memory: OpenFile",1) 
      EndIf
    Else 
      EzPackError(*this,"failed to allocate *file\mem: Openfile",1) 
    EndIf   
  EndIf    
  
EndProcedure  

Procedure EzPack_OpenFileIndex(*this.EzPack,index.i)
  Protected file.s ,CurrentIndex.i
  If index > -1 And index < ListSize(*this\CompressFiles())    
    CurrentIndex = ListIndex(*this\CompressFiles())
    SelectElement(*this\CompressFiles(),Index) 
    file =  PeekS(@*this\CompressFiles()\path[0],#EzPack_MaxPath,#PB_Unicode) 
    SelectElement(*this\CompressFiles(),CurrentIndex) 
    ProcedureReturn EzPack_OpenFile(*this,file)
  EndIf     
EndProcedure   

Procedure.i EzPack_CatchFile(*this.EzPack,FileNumber.i) 
  Protected *ele.EzPack_FileIndex  
  *ele = FileNumber 
  If *ele 
    ProcedureReturn *ele\mem
  EndIf    
EndProcedure 

Procedure.i EzPack_GetFileSize(*this.EzPack,FileNumber.i)
  Protected size,*ele.EzPack_FileIndex  
  *ele = FileNumber 
  If *ele 
    ProcedureReturn *ele\size   
  EndIf 
  
EndProcedure   

Procedure.i EzPack_CloseFile(*this.EzPack,Filenumber.i) 
  Protected *ele.EzPack_FileIndex  
  *ele = Filenumber
  If *ele   
    FreeMemory(*ele\mem)
    FreeMemory(*ele)
    ProcedureReturn 1
  EndIf
EndProcedure   

Procedure Ezpack_Reset(*this.Ezpack) 
  
  If *this\Inputbuffer 
    FreeMemory(*this\Inputbuffer)
    *this\Inputbuffer = 0
  EndIf 
  If *this\Outputbuffer 
    FreeMemory(*this\Outputbuffer)
    *this\Outputbuffer = 0
  EndIf 
  If *this\SourceFileNumber 
    CloseFile(*this\SourceFileNumber)
    *this\SourceFileNumber = 0
  EndIf 
  If *this\DestFileNumber 
    CloseFile(*this\DestFileNumber)
    *this\DestFileNumber = 0
  EndIf 
  If IsThread(*this\ThreadIDList)
    KillThread(*this\ThreadIDList)
  EndIf 
  If IsThread(*this\ThreadIDPack)
    KillThread(*This\ThreadIDPack)
  EndIf   
  If IsThread(*this\ThreadIDUnPack)
    KillThread(*this\ThreadIDUnPack)
  EndIf   
  
  ClearList(*this\Sourcefiles())
  ClearList(*this\CompressFiles())
  
  ForEach *this\FileIndex() 
    If *this\FileIndex()\mem 
      FreeMemory(*this\FileIndex()\mem)
    EndIf 
  Next    
  
  *this\Current=0
  *this\CurrentIndex = 0
  *this\CurrentPath = ""
  *this\DestFileNumber =0 
  *this\DestPath = ""
  *this\ExtractCount = 0
  *this\scaleprogress = 0
  *this\SourceFileNumber = 0
  *this\SourcePackPath = "" 
  *this\SourcePath = ""
  
  ClearStructure(*this\ld,EzPack_ListData)
  ClearStructure(*this\opd,EzPack_OpenData) 
  ClearStructure(*this\pd,EzPack_PackData) 
  
  
EndProcedure     

Procedure.i EzPack_GetSourceFileCount(*this.EzPack) 
  ProcedureReturn ListSize(*this\Sourcefiles()) 
EndProcedure   

Procedure.q EzPack_GetPackedSize(*this.EzPack)
  ProcedureReturn *this\Current 
EndProcedure 

Procedure.q EzPack_GetRawInputSize(*this.EzPack)
  ProcedureReturn *this\Inputsize 
EndProcedure    

Procedure.i EzPack_GetExtractedCount(*this.EzPack)
  ProcedureReturn *this\ExtractCount
EndProcedure    

Procedure Ezpack_GetProgress(*this.EzPack) 
  ProcedureReturn *this\Inputsize* *this\scaleprogress
EndProcedure 

Procedure.s  EzPack_GetProcessed(*this.Ezpack) 
  Protected processed.s 
  If *this\Current  < #EzPack_KB 
    processed = Str(*this\Current) + "bytes"
  ElseIf *this\Current  < #EzPack_MB 
    processed = Str(*this\Current / #EzPack_KB) + " kb" 
  ElseIf *this\Current < #EzPAck_GB 
    processed = StrF(*this\Current / #EzPack_MB,2) + " mb"
  ElseIf *this\Current  < #EzPack_TB 
    processed = StrF(*this\Current / #EzPack_GB,4) + " gb" 
  ElseIf *this\Current < #EzPack_PB 
    processed = StrD(*this\Current / #EzPack_TB,6)  + " tb" 
  ElseIf *this\Current < #Ezpack_EX  
    processed  = StrD(*this\Current / #EzPack_PB,6) + " pb" 
  Else 
    processed = StrD(*this\Current / #ezpack_Ex,6)  + " eb"
  EndIf 
  
  ProcedureReturn processed 
  
EndProcedure   

Procedure EzPack_GetCurrentListIndex(*this.EzPack) 
  ProcedureReturn *this\CurrentIndex 
EndProcedure 

Procedure.s EzPack_GetCurrentListItem(*this.EzPack) 
  ProcedureReturn *this\CurrentPath 
EndProcedure   

Procedure EzPack_Free(*this.EzPack)
  If *this\Inputbuffer 
    FreeMemory(*this\Inputbuffer)
    *this\Inputbuffer = 0
  EndIf 
  If *this\Outputbuffer 
    FreeMemory(*this\Outputbuffer)
    *this\Outputbuffer = 0
  EndIf 
  If *this\SourceFileNumber 
    CloseFile(*this\SourceFileNumber)
    *this\SourceFileNumber = 0
  EndIf 
  If *this\DestFileNumber 
    CloseFile(*this\DestFileNumber)
    *this\DestFileNumber = 0
  EndIf 
  
  ClearList(*this\Sourcefiles())
  ClearList(*this\CompressFiles())
  
  ForEach *this\FileIndex() 
    If *this\FileIndex()\mem 
      FreeMemory(*this\FileIndex()\mem)
    EndIf 
  Next    
  
  ClearStructure(*this,EzPack) 
  FreeMemory(*this)
  
EndProcedure    

Procedure EzPackError(*this.EzPack,msg.s,bfatal) 
  Protected result 
  If bfatal 
    MessageRequester("EzPack Fatal Error :",msg) 
    EzPack_Free(*this)
    End 
  ElseIf *this\SuppressWarnings = 0 
    result = MessageRequester("EzPack Error Continue: ",msg, #PB_MessageRequester_YesNo) 
    If result = #PB_MessageRequester_No    
      EzPack_Free(*this)
      End 
    EndIf      
  EndIf    
EndProcedure   

Interface iEzPack 
  BuildSourceFileList(StartDir.s,Pattern.s="*.*",Level=7,Recursive=1,Thread=0)
  CreatePack.q(PackFileName.s,Thread=0,WorkSetMb.i=500) 
  CreatePackSelected.q(PackFileName.s,Thread=0,WorkSetMb.i=500)
  OpenPackFromDisk(PackFile.s,Thread=0)
  OpenPackFromMemory(*Memory,MemoryLen,Thread=0)
  UnPack(DestinationPath.s,Thread=0,UnPackAll=0,UnPackToMemory=0)
  UnPackAllToDisk(DestinationPath.s,Thread=0) 
  UnPackSelectedToDisk(DestinationPath.s,Thread=0)
  UnPackAllToMemory(Thread=0) 
  UnpackSelectedToMemory(Thread=0) 
  SelectExtractFile(file.s)
  SelectExtractFileIndex(index.i)
  SelectCompressFile(index.i)
  OpenFile(file.s)
  OpenFileIndexed(Index.i)
  CatchFile(FileNumber.i) 
  GetFileSize(FileNumber.i)
  CloseFile(FileNumber.i)
  Reset()
  GetProgress()
  GetProcessed.s() 
  GetCurrentListIndex()
  GetCurrentListItem.s() 
  GetSourceFileCount()
  GetPackedSize.q()
  GetRawSize.q()
  GetExtractedCount()
  Free()
EndInterface   

DataSection : vt_EzPack:
  Data.i @EzPack_BuildSourceFileList()
  Data.i @EzPack_CreatePack()
  Data.i @EzPack_CreatePackSelected()
  Data.i @EzPack_OpenPackFromDisk()
  Data.i @EzPack_OpenPackFromMemory()
  Data.i @EzPack_UnPack()
  Data.i @EzPack_UnPackAllToDisk()
  Data.i @EzPack_UnPackSelectedToDisk()
  Data.i @EzPack_UnPackAllToMemory()
  Data.i @EzPack_UnPackSelectedToMemory()
  Data.i @EzPack_SelectExtractFile()
  Data.i @EzPack_SelectExtractFileIndex()
  Data.i @EzPack_SelectCompresstFile()
  Data.i @EzPack_OpenFile()
  Data.i @EzPack_OpenFileIndex()
  Data.i @EzPack_CatchFile()
  Data.i @EzPack_GetFileSize()
  Data.i @EzPack_CloseFile()
  Data.i @Ezpack_Reset()
  Data.i @Ezpack_GetProgress()
  Data.i @EzPack_GetProcessed() 
  Data.i @EzPack_GetCurrentListIndex()
  Data.i @EzPack_GetCurrentListItem() 
  Data.i @EzPack_GetSourceFileCount()
  Data.i @EzPack_GetPackedSize()
  Data.i @EzPack_GetRawInputSize()
  Data.i @EzPack_GetExtractedCount()
  Data.i @EzPack_free()
EndDataSection 

ProcedureDLL NewEzPack(*cbEzPackList=0,*cbEzPackProgress=0,SuppressWarnings=1)
  Protected *this.EzPack 
  
  *this = AllocateMemory(SizeOf(EzPack))  
  If *this 
    InitializeStructure(*this,EzPack)
    *this\vt = ?vt_EzPack 
    
    If *cbEzPackList 
      *this\cbEzPackList = *cbEzPackList 
    EndIf 
    If *cbEzPackProgress 
      *this\cBEzpackProgress = *cbEzPackProgress  
    EndIf 
    
    *this\SuppressWarnings = SuppressWarnings
    
    ProcedureReturn *this 
  EndIf 
  
EndProcedure    

