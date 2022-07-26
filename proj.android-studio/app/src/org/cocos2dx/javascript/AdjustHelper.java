package org.cocos2dx.javascript;

import android.app.Activity;
import android.app.Application;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.adjust.sdk.Adjust;
import com.adjust.sdk.AdjustConfig;
import com.adjust.sdk.AdjustEvent;
import com.adjust.sdk.LogLevel;
import com.adjust.sdk.OnDeviceIdsRead;
import com.appsflyer.AppsFlyerLib;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class AdjustHelper {

     private static AdjustHelper adjustHelper;

     private static  Activity _app;

     private static String _gps_adid="";

     private static JSONObject _adConfig;

     static AdjustHelper getInstance(){
         if (adjustHelper==null){
             adjustHelper=new AdjustHelper();
         }
         return adjustHelper;
     }

     public  void init(Activity app,JSONObject adConfig){
         this._adConfig=adConfig;
         try {
             String environment = (NativeHelper.isTest()?AdjustConfig.ENVIRONMENT_SANDBOX:AdjustConfig.ENVIRONMENT_PRODUCTION);
             AdjustConfig config = new AdjustConfig(app.getApplication(), this._adConfig.getString("key"), environment);
             config.setLogLevel(LogLevel.VERBOSE);
             config.setProcessName(app.getPackageName());
             Adjust.onCreate(config);

             Adjust.getGoogleAdId(app, new OnDeviceIdsRead() {
                 @Override
                 public void onGoogleAdIdRead(String googleAdId) {
                     _gps_adid=googleAdId;
                 }
             });
         }catch (Exception e){

         }
     }

    public static String getAdKey(String key) {
        String str=null;
        if(_adConfig!=null){
            try {
                str=_adConfig.getJSONObject("Events").getString(key);
            }catch (JSONException e){
                str="";
            }
        }
        return str;
    }


    public  static void logEvent(String eventName,String info){
         String eventCode=getAdKey(eventName);
         AdjustEvent adjustEvent = new AdjustEvent(eventCode);
         if(info!=null&&info.length()>0){
             JsonObject obj=new JsonParser().parse(info).getAsJsonObject();
             Iterator<String> it=obj.keySet().iterator();
             while (it.hasNext()){
                 String key=it.next();
                 adjustEvent.addPartnerParameter(key,obj.get(key).getAsString());
             }
         }
         Adjust.trackEvent(adjustEvent);
     }

     public static String getAdjustUID(){
         String adid= Adjust.getAdid();
         return adid;
     }

    public static String getGpsAdjustUID(){
        return _gps_adid;
    }
}
