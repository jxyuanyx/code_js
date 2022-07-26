package org.cocos2dx.javascript;

import android.app.Activity;

import com.appsflyer.AppsFlyerLib;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class AppsflyerHelper {

     private static AppsflyerHelper appsflyerHelper;

     private final String KEY="3SU2HsH8x4TzEurCxCUC3C";

     private static  Activity _app;

     static AppsflyerHelper getInstance(){
         if (appsflyerHelper==null){
             appsflyerHelper=new AppsflyerHelper();
         }
         return appsflyerHelper;
     }

     public  void init(Activity app){
         AppsFlyerLib.getInstance().init(KEY,null,app);
         AppsFlyerLib.getInstance().start(app);
        _app=app;
     }

     public  static void logEvent(String eventName,String info){
         Map<String, Object> eventValues = new HashMap<String, Object>();
         if(info!=null&&info.length()>0){
             JsonObject obj=new JsonParser().parse(info).getAsJsonObject();
             Iterator<String> it=obj.keySet().iterator();
             while (it.hasNext()){
                 String key=it.next();
                 eventValues.put(key,obj.get(key).getAsString());
             }
         }
         AppsFlyerLib.getInstance().logEvent(_app,eventName,eventValues);
     }

     public static String getAppsFlyerUID(){
         return AppsFlyerLib.getInstance().getAppsFlyerUID(_app);
     }

     public static void setCustomUID(String uid){
         AppsFlyerLib.getInstance().setCustomerUserId(uid);
     }
}
