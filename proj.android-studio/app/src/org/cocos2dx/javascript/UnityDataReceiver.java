package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.unity3d.player.UnityPlayer;
import com.unity3d.player.UnityPlayerActivity;

import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import platform.imp.PlatformService;

public class UnityDataReceiver extends BroadcastReceiver {

    private final String UPLOAD_RESULT="uploadResult";
    private final String UPLOAD_SCORE="uploadScore";
    private final String UPLOAD_PLAYTIME="uploadPlayTime";
    private final String CUSTOM_ACTION="doAction";

    @Override
    public void onReceive(final Context context, Intent intent) {
        final String action=intent.getStringExtra("action");
        final String data=intent.getStringExtra("data");
        System.out.println(">>>>onReceive:"+action);

        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                switch (action){
                    case UPLOAD_RESULT:
                        Cocos2dxJavascriptJavaBridge.evalString( String.format("App.NativeManager.uploadGameResult('%s')",data));
                        Cocos2dxJavascriptJavaBridge.evalString( "App.DataManager.clearTableData()");
                        NativeHelper.sendDataToUnity("exit","");
                        NativeHelper.isInUnityGame=false;
                        break;
                    case UPLOAD_SCORE:
                        final String cmd= String.format("App.NativeManager.uploadGameOpearScore('%s')",data);
                        Cocos2dxJavascriptJavaBridge.evalString(cmd);
                        break;
                    case UPLOAD_PLAYTIME:
                        final String str= String.format("App.NativeManager.setGamePlayTime(%d)",Integer.parseInt(data));
                        Cocos2dxJavascriptJavaBridge.evalString(str);
                        break;
                    case CUSTOM_ACTION:
                        final String str1= String.format("App.NativeManager.doUnityAction('%s')",data);
                        Cocos2dxJavascriptJavaBridge.evalString(str1);
                        break;
                }
            }
        });

    }
}
