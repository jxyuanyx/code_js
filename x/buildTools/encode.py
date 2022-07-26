#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os,sys
import os.path

def encodeFile(infile, outfile):
    print(infile,outfile)
    fr = open(infile, 'rb')
    key = 0x91
    inBuffer = fr.read()
    outBuffer = "MUNENG"
    for b in inBuffer:
        outBuffer = outBuffer + chr(ord(b) ^ key)
    #print outBuffer
    open(outfile,'wb').write(outBuffer)
    fr.close();


def encodeDir(rootdir):
    print('start>>>>>')
    for parent,dirnames,filenames in os.walk(rootdir):
        if parent.find("unityCommon_")!=-1:
            continue
        for filename in filenames:
            index=filename.find(".")
            if index!=-1:
                ext =filename[(index+1):len(filename)]  #filetype.guess(os.path.join(parent,filename))
                if ext=="png" or ext=="jpg":
                    #print('File extension: %s' % kind.extension)
                    print(os.path.join(parent,filename))
                    path1=os.path.join(parent,filename)
                    encodeFile(path1, path1)
    print('end success>>>>>')

if len(sys.argv) !=2:
    print("参数错误")
else:
    encodeDir(sys.argv[1])




