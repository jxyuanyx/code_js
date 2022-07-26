package com.unity3d.player;

import android.content.Context;
import android.content.ContextWrapper;

public class MyUnityPlayer extends UnityPlayer {
    public MyUnityPlayer(Context var1, IUnityPlayerLifecycleEvents var2) {
        super(var1,var2);
    }
    /*
    //不执行父类的方法
    @Override
    protected void kill() {

    }*/
}
