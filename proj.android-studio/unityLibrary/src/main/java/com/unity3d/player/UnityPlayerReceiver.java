package com.unity3d.player;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class UnityPlayerReceiver extends BroadcastReceiver {

    private final String EXIT="exit";

    @Override
    public void onReceive(final Context context, Intent intent) {
        final String action=intent.getStringExtra("action");
        final String data=intent.getStringExtra("data");
        if(action.equals(EXIT)){
            UnityPlayer.currentActivity.finish();
        }else{
            UnityPlayer.UnitySendMessage("BuTongSdk",action,data);
        }
    }
}