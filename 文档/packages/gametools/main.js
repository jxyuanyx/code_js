'use strict';
let fs=require("fs");
let path=require("path");
module.exports = {

  load () {
      
      
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'openProtoTool' () {
      // open entry panel registered in package.json
      Editor.Panel.open('gametools.protoPanel');
    },

    'openPackageTool' () {
      // open entry panel registered in package.json
      Editor.Panel.open('gametools.packagePanel');
    },

    'openAutoEncrypt' () {
      // open entry panel registered in package.json
      Editor.Panel.open('gametools.autoEncryptPanel');
    }
   
  },
};