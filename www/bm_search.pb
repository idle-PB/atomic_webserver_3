Procedure BM_Search(*pinput,inlen,*pat.ara,palen,pos=0)
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
      Skiptable\a[i] = -1;
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