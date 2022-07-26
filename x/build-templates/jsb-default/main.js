window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    var onProgress = null;
    
    var RESOURCES = cc.AssetManager.BuiltinBundleName.RESOURCES;
    var INTERNAL = cc.AssetManager.BuiltinBundleName.INTERNAL;
    var MAIN = cc.AssetManager.BuiltinBundleName.MAIN;

    var onStart = function () {

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            cc.view.enableAutoFullScreen([
                cc.sys.BROWSER_TYPE_BAIDU,
                cc.sys.BROWSER_TYPE_BAIDU_APP,
                cc.sys.BROWSER_TYPE_WECHAT,
                cc.sys.BROWSER_TYPE_MOBILE_QQ,
                cc.sys.BROWSER_TYPE_MIUI,
                cc.sys.BROWSER_TYPE_HUAWEI,
                cc.sys.BROWSER_TYPE_UC,
            ].indexOf(cc.sys.browserType) < 0);
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.assetManager.downloader.maxConcurrency = 4;
            cc.assetManager.downloader.maxRequestsPerFrame = 4;
        }
        
        /*
        cc.assetManager.bundles.get(MAINPACKAGE).loadScene(MAINSCENE,null, onProgress,
            function (err, scene) {
                if (!err) {
                    console.log(">>>>>5555555555",new Date().getTime())
                    cc.director.runSceneImmediate(scene);
                }
            }
        )*/
        
        var launchScene =settings.launchScene;
        var bundle = cc.assetManager.bundles.find(function (b) {
            return b.getSceneInfo(launchScene);
        });
        
        bundle.loadScene(launchScene, null, onProgress,
            function (err, scene) {
                if (!err) {
                    console.log(">>>>>5555555555",new Date().getTime())

                    cc.director.runSceneImmediate(scene);
                }
            }
        );
    };

    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    settings.remoteBundles=[];
    
    cc.assetManager.init({ 
        bundleVers: settings.bundleVers,
        remoteBundles: settings.remoteBundles,
        server: settings.server
    });

    var bundleRoot = [INTERNAL];
    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);



    var count = 0;
    function cb (err,bundle) {
        if (err) return console.error(err.message, err.stack);
        console.log(bundle.base,"bundleUrl")
        count++;
        if (count === bundleRoot.length + 1) {
            cc.assetManager.loadBundle(MAIN, function (err) {
                console.log(">>>>>444444",new Date().getTime())
                if (!err) cc.game.run(option, onStart);
            });
        }
    }

    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x;}), cb);
    console.log(">>>>>3333333",new Date().getTime())

    for (var i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
};

if (window.jsb) {

    console.log(">>>>>11111111",new Date().getTime())

    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/jsb-engine.js');
    }

    console.log(">>>>>222222",new Date().getTime())


    cc.macro.CLEANUP_IMAGE_CACHE = true;
    //cc.macro.CLEANUP_IMAGE_CACHE = false;
    //cc.dynamicAtlasManager.enabled = true;

    window.boot();
}