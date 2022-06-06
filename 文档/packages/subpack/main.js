'use strict';


const fs = require("fs")
const path = require("path")


module.exports = {
    load () {
    // execute when package loaded
    },

    unload () {
    // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'open' () {
            // open entry panel registered in package.json
            Editor.Panel.open('subpack');
        },
        'test'(){
            let str = "";
            for(let key in fs){
                str += key + "\n";
            }
            fs.writeFileSync(path.join(Editor.Project.path, 'tea.txt'), str);
        },
    },
};