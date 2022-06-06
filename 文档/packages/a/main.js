'use strict';
var fs = require('fs');

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'say-hello' () {
        Editor.log('Start');
        var fSkin = "skin_0"
        var tSkin = "skin_2"

        Editor.assetdb.queryAssets('db://assets/skinRes/' + tSkin + '/**\/*', 'prefab', function (err, results) {
            results.forEach(function (result) {
                // result.url
                // result.path
                // result.uuid
                // result.type
                // result.isSubAsset

                let plistMetaPath = result.path
                let plistMetaStrings = fs.readFileSync(plistMetaPath, 'utf8');
                let plistMetaData = JSON.parse(plistMetaStrings);
                var rMap = {
                  "cc.Sprite" : ["_spriteFrame"],
                  "sp.Skeleton" : ["_N$skeletonData"],
                  "cc.Label" : ["_N$file"],
                  "cc.ParticleSystem" : ["_file", "_spriteFrame"],
                }
                var replace = function(element, k) {
                    var p = Editor.assetdb.uuidToFspath(element[k].__uuid__)
                    if (p && p.indexOf(fSkin) > 0) {
                        var rp = p.replace(fSkin, tSkin)
                        var ruuid = Editor.assetdb.fspathToUuid(rp)
                        Editor.log(element[k].__uuid__);
                        Editor.log(ruuid);
                        element[k].__uuid__ = ruuid
                    }
                }
                for (let index = 0; index < plistMetaData.length; index++) {
                    const element = plistMetaData[index];
                    var keys = rMap[element.__type__]
                    if (keys && keys.length > 0) {
                        for (let j = 0; j < keys.length; j++) {
                            const k = keys[j]
                            if (element[k]) {
                                replace(element, k)
                            }
                        }
                    } else if (element.__type__.indexOf(".") <= 0) {
                        for(let key in element){
                            if (element[key] && element[key].__uuid__) {
                                Editor.log(key + '---' + element[key].__uuid__)
                                replace(element, key)
                            }
                        }
                    }
                }
                //保存.meta
                let plistMetaDataStrings = JSON.stringify(plistMetaData, null, "\t");
                // Editor.assetdb.saveMeta(plistMetaData.uuid, plistMetaDataStrings, (err,meta)=>{});
                //也可以使用fs.writeFileSync方法保存.meta
                const data = new Uint8Array(Buffer.from(plistMetaDataStrings));
                fs.writeFileSync(plistMetaPath, data, 'utf8');
            });

            // Editor.assetdb.refresh('db://assets/skinRes/' + tSkin + '/',(err, results)=>{});
            Editor.log('End');
        });
    }
  },
};