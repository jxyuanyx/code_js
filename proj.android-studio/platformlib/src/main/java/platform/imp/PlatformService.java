package platform.imp;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.provider.Settings;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import platform.models.Game;
import platform.IPlatformService;
import platform.models.UnityCallBack;
import platform.models.UserData;

public class PlatformService implements IPlatformService {

    private static PlatformService _platformService;

    private String _currentGame;  //当前游戏

    private  String _lang;      //当前语言环境

    private UserData _userData; //用户信息

    private Activity _gameActivity;

    private UnityCallBack _startGameCB;

    private UnityCallBack _uploadResultCB;

    public String get_currentGame() {
        return _currentGame;
    }

    public void set_currentGame(String _currentGame) {
        this._currentGame = _currentGame;
    }

    public String get_lang() {
        return _lang;
    }

    public void set_lang(String _lang) {
        this._lang = _lang;
    }


    public static PlatformService  getInstance(){
        if(_platformService==null){
            _platformService=new PlatformService();
        }
        return _platformService;
    }

    public  void setCurrentGame(String info){
        this._currentGame=info;
    }


    public void setLang(String lang){
        this._lang=lang;
    }

    public String getLang(){
        return this._lang;
    }

    /**
     * 获取当前游戏
     * @return
     */
    public String getCurrentGame(){
        //Gson gson=new Gson();
        // return gson.toJson(this._currentGame);
        return this._currentGame;
    }

    /**
     * 上传游戏结果
     * @param score
     * @param log
     */
    public  void uploadGameResult(int score,String log){

    }

    @Override
    public void setStartGameUploadCompelte(String target, String funName) {
        this._startGameCB=new UnityCallBack(target,funName);
    }

    @Override
    public void setGameResultUploadCompelte(String target, String funName) {
        System.out.println(">>>>>>SSSSS setGameResultUploadCompelte");
        this._uploadResultCB=new UnityCallBack(target,funName);
    }

    @Override
    public void setUserData(String userData) {
        Gson gson=new Gson();
        this._userData=gson.fromJson(userData,UserData.class);
    }

    @Override
    public void finishGame() {
        if(this._gameActivity!=null){
            this._gameActivity.finish();
        }
    }

    @Override
    public void setCurrentGameScene(Activity activity) {
        this._gameActivity=activity;
    }

    public UnityCallBack getStartGameCB() {
        return _startGameCB;
    }

    public UnityCallBack getUploadResultCB() {
        return _uploadResultCB;
    }

    public Activity getCurrentGameScene(){
        return this._gameActivity;
    }

    public ImageView showSplash(String path,Activity act){
        //添加开屏页
        ImageView sSplashBgImageView = new ImageView(act);
        sSplashBgImageView.setScaleType(ImageView.ScaleType.FIT_XY);
        act.addContentView(sSplashBgImageView,
                new WindowManager.LayoutParams(
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        FrameLayout.LayoutParams.MATCH_PARENT
                )
        );
        try {
            //path="@assets/splashs/bingo.png";
            if(path.startsWith("@")){
                InputStream fis =act.getAssets().open(path.replace("@",""));
                sSplashBgImageView.setImageBitmap(BitmapFactory.decodeStream(fis));
            }else{
                sSplashBgImageView.setImageBitmap(this.getLoacalBitmap(path));
            }
            sSplashBgImageView.setVisibility(View.VISIBLE);
        }catch (Exception e){
            System.out.println("Error>>>>>>:"+e.getMessage());
        }
        return sSplashBgImageView;
    }


    public  Bitmap getLoacalBitmap(String url) {
        try {
            FileInputStream fis =new FileInputStream(url);
            return BitmapFactory.decodeStream(fis);  ///把流转化为Bitmap图片

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveSharedData(Context context,String fileName,String data) {
        FileOutputStream out = null;
        BufferedWriter writer = null;
        try {
            //设置文件名称，以及存储方式
            out =context.openFileOutput(fileName, Context.MODE_PRIVATE);
            //创建一个OutputStreamWriter对象，传入BufferedWriter的构造器中
            writer = new BufferedWriter(new OutputStreamWriter(out));
            //向文件中写入数据
            writer.write(data);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                writer.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String getSharedData(Context context,String fileName) {
        FileInputStream in = null;
        BufferedReader reader = null;
        StringBuilder content = new StringBuilder();
        try {
            //设置将要打开的存储文件名称
            in =context.openFileInput(fileName);
            //FileInputStream -> InputStreamReader ->BufferedReader
            reader = new BufferedReader(new InputStreamReader(in));
            String line = new String();
            //读取每一行数据，并追加到StringBuilder对象中，直到结束
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return content.toString();
    }

    private static  String getMetaInfo(Activity app,String key){
        String value="";
        try {
            ApplicationInfo info = app.getPackageManager().getApplicationInfo(app.getPackageName(), PackageManager.GET_META_DATA);
            value=info.metaData.getString(key);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return value;
    }

    public static boolean isTest(Activity app){
        String isTest=getMetaInfo(app,"test");
        if(isTest!=null){
            return isTest.equals("T");
        }else{
            return false;
        }
    }

    @Override
    public boolean checkAdb(Activity app) {
        if(isTest(app)){
            return false;
        }
        boolean enableAdb=(Settings.Secure.getInt(app.getContentResolver(),Settings.Secure.ADB_ENABLED,0)>0);
        if(enableAdb){
            new AlertDialog.Builder(app).setTitle("Tips")//设置对话框标题
                    .setMessage("Please turn off the phone's debug mode and try again")
                    .setCancelable(false)
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {//添加确定按钮
                        @Override
                        public void onClick(DialogInterface dialog, int which) {//确定按钮的响应事件，点击事件没写，自己添加
                            android.os.Process.killProcess(android.os.Process.myPid());    //获取PID
                            System.exit(0);
                        }
                    }).show();
            return true;
        }
        return false;
    }
}
