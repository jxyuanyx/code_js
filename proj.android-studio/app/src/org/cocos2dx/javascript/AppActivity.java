/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.lib.Cocos2dxVideoHelper;
import org.json.JSONObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.graphics.Bitmap;
import android.graphics.drawable.AnimationDrawable;
import android.net.Uri;
import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.adjust.sdk.Adjust;
import com.anythink.core.api.DeviceInfoCallback;
//diff0
import com.classic.solitairemaster.R;
//diffend0
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.GoogleAuthProvider;
import com.wildma.pictureselector.FileUtils;
import com.wildma.pictureselector.PictureBean;
import com.wildma.pictureselector.PictureSelector;
import com.anythink.core.api.ATSDK;

import java.io.File;
import java.io.FileOutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import io.github.noodle1983.Boostrap;
import platform.imp.PlatformService;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.Iterator;

public class AppActivity extends Cocos2dxActivity {

    final int SELECTPHOTA=1;

    private CallbackManager callbackManager;

    private void _createWaitAnim(){
        ImageView animationImg1 = new ImageView(this);
        animationImg1.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        animationImg1.setImageResource(R.drawable.loading);
        mFrameLayout.addView(animationImg1);
        AnimationDrawable animationDrawable1 = (AnimationDrawable) animationImg1.getDrawable();
        animationDrawable1.start();
    }

    private Handler handler=new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            LoadingDialog dialog=new LoadingDialog(AppActivity.this,R.style.LoadingDialog);
            dialog.show();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }

        NativeHelper.init(this);
        NativeHelper.initGoogleSign();

        //NativeHelper.getHaseCode();
        this._initFacebook();

        //AppsflyerHelper.getInstance().init(this);
//diff1
        AdjustHelper.getInstance().init(this,NativeHelper.get_AdConfig());
//diffend1
        PlatformService.getInstance().checkAdb(this);

        // DO OTHER INITIALIZATION BELOW
        this.setKeepScreenOn(true);

        this._initTopOn();
    }
//diff2
    public void _initTopOn(){
        ATSDK.integrationChecking(getApplicationContext());//检查广告平台的集成状态
        if (NativeHelper.isTest()){
            // ATSDK.init(getApplicationContext(), "a5aa1f9deda26d", "4f7b9ac17decb9babec83aac078742c7");//初始化SDK，开屏广告需要
            ATSDK.init(getApplicationContext(), "a62d9101c0a964", "6f087bf015772c7201ca0fbf18517868");//初始化SDK
            ATSDK.setNetworkLogDebug(true);//SDK日志功能，集成测试阶段建议开启，上线前必须关闭
            //(v5.7.77新增) 打印当前设备的设备信息(IMEI、OAID、GAID、AndroidID等)
            ATSDK.testModeDeviceInfo(this, new DeviceInfoCallback() {
                @Override
                public void deviceInfo(String deviceInfo) {
                    if(deviceInfo!=null&&deviceInfo.length()>0){
                        JsonObject obj=new JsonParser().parse(deviceInfo).getAsJsonObject();
                        String AndroidID = obj.get("AndroidID").getAsString();
                        System.out.println("androidid3>>>>>>"+AndroidID);
                        ATSDK.setBiddingTestDevice(AndroidID);
                    }
                }
            });
        }else{
            ATSDK.init(getApplicationContext(), "a62d9101c0a964", "6f087bf015772c7201ca0fbf18517868");//初始化SDK
        }
        Intent intent = new Intent(this, SplashAdShowActivity.class);
//        intent.putExtra("placementId", "210169");
        intent.putExtra("placementId", "b62d910c7e17c3");
        startActivity(intent);
    }
//diffend2
    public static void showSplashAd() {
        Intent intent = new Intent(AppActivity.getContext(), SplashAdShowActivity.class);
//        intent.putExtra("placementId", "210169");
        intent.putExtra("placementId", "b62d910c7e17c3");
        AppActivity.getContext().startActivity(intent);
    }

    private void _initFacebook(){
        callbackManager = CallbackManager.Factory.create();
        LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<LoginResult>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        try{
                            // App code
                            AccessToken token=loginResult.getAccessToken();
                            JSONObject obj=new JSONObject();
                            obj.put("id",token.getUserId());
                            obj.put("token",token.getToken());
                            NativeHelper.fbLoginSuccess(obj.toString());
                        }catch (Exception e){
                            NativeHelper.fbLoginError();
                        }
                    }

                    @Override
                    public void onCancel() {
                        // App code
                        NativeHelper.fbLoginError();
                    }

                    @Override
                    public void onError(FacebookException exception) {
                        // App code
                        NativeHelper.fbLoginError();
                    }
                });
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        Adjust.onResume();
        PlatformService.getInstance().checkAdb(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        Adjust.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PictureSelector.SELECT_REQUEST_CODE) {
            if (data != null) {
                PictureBean pictureBean = data.getParcelableExtra(PictureSelector.PICTURE_RESULT);
                String path="";
                if (pictureBean.isCut()) {
                    path=pictureBean.getPath();
                } else {
                    path=pictureBean.getUri().getPath();
                }
                this._onSendSelectPhotoSuccess((path));
            }
        }

        //google登录
        if (requestCode == NativeHelper.RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                // Google Sign In was successful, authenticate with Firebase
                GoogleSignInAccount account = task.getResult(ApiException.class);
               // firebaseAuthWithGoogle(account.getIdToken());
                if(account!=null){
                    System.out.println("token>>>>>>"+account.getIdToken());
                    NativeHelper.gpLoginSuccess(account.getIdToken());
                }
            } catch (ApiException e) {
                // Google Sign In failed, update UI appropriately
                NativeHelper.gpLoginError();
            }
        }

        if(requestCode == NativeHelper.SELECT_PHOTO){
            if (resultCode == Activity.RESULT_OK && null != data) {
                Uri uri = data.getData();//获取路径
//                File directory = new File(NativeHelper.imagePath);
//                if(!directory.exists()){
//                    directory.mkdir();//没有目录先创建目录
//                }
                //Toast.makeText(this, uri.getPath(), Toast.LENGTH_LONG).show();
//                String[] strs = uri.getPath().split("/");
//                String final_path = NativeHelper.imagePath + strs[strs.length-1] + ".png";
                try{
                    Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
//                bitmap = getBitmapSize(bitmap);
                    int width = bitmap.getWidth();
                    int height = bitmap.getHeight();
                    Toast.makeText(this, NativeHelper.imagePath, Toast.LENGTH_LONG).show();
                    File f = new File(NativeHelper.imagePath);
                    if (f.exists()) {
                        f.delete();
                    }
                    FileOutputStream out = new FileOutputStream(f);
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
                    out.flush();
                    out.close();
                    NativeHelper.selectPhotoCallback(true, NativeHelper.imagePath);
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
    }

    private void _onSendSelectPhotoSuccess(final String path){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onSelectPhotoSuccess('"+path+"')");
                FileUtils.deleteAllCacheImage(getApplicationContext());
            }
        });
    }


    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        /*
        if(NativeHelper.isInUnityGame){
            NativeHelper.runUnityGame(NativeHelper.currentUnityGame,NativeHelper.currentSplashPath);
        }*/
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();
        NativeHelper.back();
    }


    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }


}
