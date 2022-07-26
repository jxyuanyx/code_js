package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.pm.Signature;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.os.FileUtils;
import android.os.Handler;
import android.os.Vibrator;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.classic.solitairemaster.R;
import com.facebook.AccessToken;
import com.facebook.login.LoginManager;
import com.facebook.share.widget.ShareDialog;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.gson.Gson;
import com.unity3d.player.UnityPlayer;
import com.unity3d.player.UnityPlayerActivity;
import com.wildma.pictureselector.PictureSelector;

import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import platform.imp.PlatformService;


import static org.cocos2dx.lib.Cocos2dxHelper.getPackageName;


public class NativeHelper {

    public static Activity _app;

    private static final int REQUEST_CODE_CHOOSE = 23;

    public  static final int RC_SIGN_IN=1001;

    private static GoogleSignInClient mGoogleSignInClient;

    private static ImageView sSplashBgImageView = null;

    public  static boolean isInUnityGame=false;

    public static String currentUnityGame;
    public static String currentSplashPath;

    private static String _unityCommonPath;

    private static String CPUABI=null;

    private static JSONObject _config;

    public static final int SELECT_PHOTO = 7;
    public static String imagePath = "";

    public static String playData = "";

    public  static void init(Activity app){
        _app=app;

        //添加开屏页
//        sSplashBgImageView = new ImageView(_app);
//        sSplashBgImageView.setScaleType(ImageView.ScaleType.FIT_XY);
//        _app.addContentView(sSplashBgImageView,
//                new WindowManager.LayoutParams(
//                        FrameLayout.LayoutParams.MATCH_PARENT,
//                        FrameLayout.LayoutParams.MATCH_PARENT
//                )
//        );
//
//        showSplash();

        _initConfig();
    }

    private static void _initConfig(){
        StringBuilder stringBuilder=new StringBuilder();
        try {
            AssetManager assetManager=_app.getAssets();
            BufferedReader bf=new BufferedReader(new InputStreamReader(assetManager.open("Config.json")));
            String line;
            while((line=bf.readLine())!=null){
                stringBuilder.append(line);
            }
            _config=new JSONObject(stringBuilder.toString());
        }catch (Exception e){

        }
    }

    public static String getAppVersionCode() {
        int versioncode = 0;
        try {
            PackageManager pm = _app.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(_app.getPackageName(), 0);
            // versionName = pi.versionName;
            versioncode = pi.versionCode;
        } catch (Exception e) {
            Log.e("VersionInfo", "Exception", e);
        }
        return versioncode + "";
    }

    public static void runJsCode(String code){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(code);
            }
        });
    }

    private static  String getMetaInfo(String key){
        String value="";
        try {
            ApplicationInfo info = _app.getPackageManager().getApplicationInfo(_app.getPackageName(), PackageManager.GET_META_DATA);
            value=info.metaData.getString(key);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return value;
    }

    public static String getChannel() {
        return getMetaInfo("channel")+"";
    }

    public static String getUUID(){
        String ANDROID_ID = Settings.System.getString(_app.getContentResolver(), Settings.System.ANDROID_ID);
        String SerialNumber = android.os.Build.SERIAL;
        return ANDROID_ID+SerialNumber;
    }

    public static String getPhoneName(){
        return android.os.Build.MODEL;
    }

    public static void selectPhoto(){
        PictureSelector
                .create(_app, PictureSelector.SELECT_REQUEST_CODE)
                .selectPicture(true, 200, 200, 1, 1);
    }

    public static String getHaseCode(){
        try {
            PackageInfo info = _app.getPackageManager().getPackageInfo(
                    _app.getPackageName(),
                    PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            }
        } catch (PackageManager.NameNotFoundException e) {

        } catch (NoSuchAlgorithmException e) {

        }
        return "";
    }

    public static void fbLogin(){
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
        if(!isLoggedIn){
            LoginManager.getInstance().logOut();
            LoginManager.getInstance().logInWithReadPermissions(_app, Arrays.asList("public_profile"));
        }else{
            try {
                JSONObject obj=new JSONObject();
                obj.put("id",accessToken.getUserId());
                obj.put("token",accessToken.getToken());
                fbLoginSuccess(obj.toString());
            }catch (Exception e){
                fbLoginError();
            }
        }
    }

    public static void  fbLogOut(){
        LoginManager.getInstance().logOut();
    }

    public static void fbLoginSuccess(final String data){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onFacebookSuccess('"+data+"')");
            }
        });
    }

    public static void fbLoginError(){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onFacebookError()");
            }
        });
    }

    public  static void initGoogleSign(){
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(_app.getString(R.string.default_web_client_id))
                .requestId()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(_app, gso);
    }


    public static void googleSignIn(){
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(_app);
        if(account==null || account.isExpired()){
            Intent signInIntent = mGoogleSignInClient.getSignInIntent();
            _app.startActivityForResult(signInIntent, RC_SIGN_IN);
        }else{
            System.out.println("token>>>>>>"+account.getIdToken());
             gpLoginSuccess(account.getIdToken());
        }
    }

    public static void googleLogOut(){
        if(mGoogleSignInClient!=null){
            mGoogleSignInClient.signOut();
        }
    }

    public static void gpLoginSuccess(final String data){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onGoogleLoginSuccess('"+data+"')");
            }
        });
    }

    public static  void gpLoginError(){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onGoogleLoginError()");
            }
        });
    }


    public static void runUnityGame(String uid,String gameName,String splashPath){
        Intent intent = new Intent(_app, UnityPlayerActivity.class);
        intent.putExtra("gameInfo",PlatformService.getInstance().get_currentGame());
        intent.putExtra("splashPath",splashPath);
        intent.putExtra("uid",uid);
        intent.putExtra("unityCommonPath",_unityCommonPath);
        _app.startActivity(intent);
        isInUnityGame=true;
        currentUnityGame=gameName;
        currentSplashPath=splashPath;
    }

    /*
    public static void uploadGameResult(final String Score,final String Steps, final String CheckCode, final String ScoreSteps){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString( String.format("App.NativeManager.uploadGameResult('%s')",ScoreSteps));
            }
        });
    }*/
    /*
    public static void unityStartGame(){

        UnityCallBack cb= PlatformService.getInstance().getStartGameCB();
        String game=PlatformService.getInstance().get_currentGame();
        UnityPlayer.UnitySendMessage("BuTongSdk","setStartGameUploadCompelte",game);
        PlatformService.getInstance().hideSplash();
    }*/


    public  static void setCurrentGame(String info){
        System.out.println("setCurrentGame>>>>>>>>>>:"+info);
        PlatformService.getInstance().setCurrentGame(info);
    }

    public static void setStartCallBack(String target,String funName){
        PlatformService.getInstance().setStartGameUploadCompelte(target,funName);
    }

    /**
     * 上传分数
     *
     * @param score
     */
    public static void uploadScore(String score){

    }

    public static void echo(String message){
        System.out.println("echo>>>>>:"+message);
    }

    /**
     * 震动
     * @param type 0 轻度， 1 重度
     */
    public static void StartShock(int type){
        Vibrator  vibrator = (Vibrator) _app.getSystemService(Context.VIBRATOR_SERVICE);
        long [] pattern = new long[] {0, 40};  // 停止 开启 停止 开启
        if(type == 1)
        {
            pattern = new long[] {0, 80, 0, 80};
        }
        vibrator.vibrate(pattern, -1);
    }

    public  static void shockByCustom(@NotNull String data){

        Vibrator  vibrator = (Vibrator) _app.getSystemService(Context.VIBRATOR_SERVICE);
        String[] shockData=data.split("#");
        long [] pattern = new long[shockData.length];
        for(int i=0;i<shockData.length;i++){
            pattern[i]=Long.parseLong(shockData[i]);
        }
        vibrator.vibrate(pattern,-1);
    }

    public static void back(){
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("App.NativeManager.onGameBack()");
            }
        });
    }

    public static void showSplash(){
        String welcomePath=Cocos2dxHelper.getWritablePath()+"/welcome.png";
        File file=new File(welcomePath);
        if(!file.exists()){
            sSplashBgImageView .setImageResource(R.drawable.splash);
        }else{
            Bitmap bitmap = PlatformService.getInstance().getLoacalBitmap(welcomePath); //从本地取图片(在cdcard中获取)  //
            sSplashBgImageView .setImageBitmap(bitmap);
        }
        sSplashBgImageView.setVisibility(View.VISIBLE);
    }

    public static void hideSplash(){
        _app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (sSplashBgImageView != null) {
                    sSplashBgImageView.setVisibility(View.GONE);
                }
            }
        });
    }

    public static void sendDataToUnity(String action,String data){
        Intent intent=new Intent(_app.getString(R.string.receiver_c2u));
        intent.putExtra("action",action);
        intent.putExtra("data",data);
        intent.setComponent(new ComponentName(getPackageName(),"com.unity3d.player.UnityPlayerReceiver"));
        _app.sendBroadcast(intent);
    }

    public static boolean isTest(){
        String isTest=getMetaInfo("test");
        if(isTest!=null){
            return isTest.equals("T");
        }else{
            return false;
        }
    }

    public static String persistentDataPath(){
        String path = _app.getApplicationContext().getExternalFilesDir(null).getPath()+"/";
        return path;
    }

    public static void copyAssetsToDst(String srcPath, String dstPath) {
        try {
            Context context=_app.getApplicationContext();
            String fileNames[] = context.getAssets().list(srcPath);
            if (fileNames.length > 0) {
                File file = new File(dstPath);
                if (!file.exists()) file.mkdirs();
                for (String fileName : fileNames) {
                    if (!srcPath.equals("")) { // assets 文件夹下的目录
                        copyAssetsToDst(srcPath + File.separator + fileName, dstPath + File.separator + fileName);
                    } else { // assets 文件夹
                        copyAssetsToDst(fileName, dstPath + File.separator + fileName);
                    }
                }
            } else {
                File outFile = new File(dstPath);
                InputStream is = context.getAssets().open(srcPath);
                FileOutputStream fos = new FileOutputStream(outFile);
                byte[] buffer = new byte[1024];
                int byteCount;
                while ((byteCount = is.read(buffer)) != -1) {
                    fos.write(buffer, 0, byteCount);
                }
                fos.flush();
                is.close();
                fos.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void unZipFiles(String zipFilePath, String outPathString) throws IOException {
        File pathFile = new File(outPathString);
        if (!pathFile.exists()) {
            pathFile.mkdirs();
        }
        //解决zip文件中有中文目录或者中文文件
        ZipFile zip = new ZipFile(zipFilePath);

        for (Enumeration entries = zip.entries(); entries.hasMoreElements(); ) {
            ZipEntry entry = (ZipEntry) entries.nextElement();
            String zipEntryName = entry.getName();
            InputStream in = zip.getInputStream(entry);
            String outPath = (outPathString + "/" + zipEntryName).replaceAll("\\*", "/");
            //判断路径是否存在,不存在则创建文件路径
            File file = new File(outPath.substring(0, outPath.lastIndexOf('/')));
            if (!file.exists()) {
                file.mkdirs();
            }
            //判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
            if (new File(outPath).isDirectory()) {
                continue;
            }
            //输出文件路径信息
            System.out.println(outPath);
            OutputStream out = new FileOutputStream(outPath);
            byte[] buf1 = new byte[1024];
            int len;
            while ((len = in.read(buf1)) > 0) {
                out.write(buf1, 0, len);
            }
            in.close();
            out.close();
        }
    }

    public static String getarchabi(){
        if(CPUABI==null){
            try {
                String os_cupabi=new BufferedReader(new InputStreamReader(Runtime.getRuntime().exec("getprop ro.product.cpu.abi").getInputStream())).readLine();
                if(os_cupabi.contains("arm64-v8a")){
                    CPUABI="arm64-v8a";
                }else{
                    CPUABI="armeabi-v7a";
                }
            }catch (Exception e){
                CPUABI="armeabi-v7a";
            }
        }
        return CPUABI;
    }

    public static void usedatadir(String path){
        _unityCommonPath=path;
        //Boostrap.usedatadir(path,_app.getPackageName());
    }

    public static boolean isEnableAdb(){
        if(isTest()){
            return false;
        }

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.CUPCAKE) {
            boolean enableAdb=(Settings.Secure.getInt(_app.getContentResolver(),Settings.Secure.ADB_ENABLED,0)>0);
            return enableAdb;
        }
        return true;
    }

    public static String getSharedData(String key){
        return PlatformService.getInstance().getSharedData(_app,key);
    }

    public static void removeSharedData(String key){
        _app.deleteFile(key);
    }

    public static String getAdKey(String key) {
        String str=null;
        try {
            str= _config.getString(key);
        }catch (JSONException e){
            str="";
        }
        return str;
    }
    public static JSONObject get_AdConfig() {
        try {
            return _config.getJSONObject("AdConfig");
        }catch (Exception e){
            return null;
        }
    }

    public static boolean shareToApp(String packageName,String shareContent){
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, shareContent);
        sendIntent.setType("text/plain");
        sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        sendIntent.setPackage(packageName);
        _app.startActivity(sendIntent);
        return true;
    }


    public static boolean checkApp(String packageName) {
        if(packageName==null || "".equals(packageName)){
           return false;
        }
        try {
            _app.getPackageManager().getApplicationInfo(packageName,PackageManager.GET_UNINSTALLED_PACKAGES);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public static String getFakePackageName(){
        String cpname=getMetaInfo("cpname");
        return cpname;
    }

    public static <Intent> void selectPhotos(final String path) {
        imagePath = path;
        android.content.Intent picture = new android.content.Intent(android.content.Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        _app.startActivityForResult(picture, SELECT_PHOTO);
    }
    public static void selectPhotoCallback(Boolean result, String path) {
        if (result) {
            String code = "App.NativeManager.selectPhotoCallback(true, '";
            code += path;
            code += "');";
            runJsCode(code);
        } else {
            String code = "App.NativeManager.selectPhotoCallback(false, '')";
            runJsCode(code);
        }
    }

    public static String getPlayAdData() {
        Log.i("getPlayAdData", "------------");
        String tempData = playData;
        playData = "";
        return tempData;
    }

    public static boolean checkAppInstalled(String pkgName) {
        if (pkgName== null || pkgName.isEmpty()) {
            return false;
        }
        try {
            List<ResolveInfo> queryIntentActivities =  null;
            Intent intent = new  Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER);
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                queryIntentActivities =
                    _app.getPackageManager().queryIntentActivities(intent, PackageManager.MATCH_ALL);
            } else {
                queryIntentActivities = _app.getPackageManager().queryIntentActivities(intent, 0);
            }

            for ( ResolveInfo msg:queryIntentActivities) {
                Log.e("pakageName",msg.activityInfo.applicationInfo.packageName);
                Log.e("pakageName2",pkgName);
                if (msg.activityInfo.applicationInfo.packageName.equals(pkgName)) {
                    return true;
                }
            }
        }catch (Exception e) {
            return  false;
        }
        return  false;
    }
}
