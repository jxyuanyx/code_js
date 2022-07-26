package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;
import android.content.Intent;

import com.anythink.core.api.ATAdConst;
import com.anythink.core.api.ATAdInfo;
import com.anythink.core.api.ATNetworkConfirmInfo;
import com.anythink.core.api.AdError;
import com.anythink.splashad.api.ATSplashAd;
import com.anythink.splashad.api.ATSplashAdExtraInfo;
import com.anythink.splashad.api.ATSplashExListener;

//diff0
import com.classic.solitairemaster.R;
//diffend0
import java.util.HashMap;
import java.util.Map;

public class SplashAdShowActivity extends Activity implements ATSplashExListener {

    private static final String TAG = SplashAdShowActivity.class.getSimpleName();

    ATSplashAd splashAd;
    FrameLayout container;
    ImageView bg;
    boolean isLoadAd = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.hideSystemUI();
        setContentView(R.layout.activity_splash);

        String placementId = getIntent().getStringExtra("placementId");
        bg = findViewById(R.id.img_bg);
        container = findViewById(R.id.splash_ad_container);
        ViewGroup.LayoutParams layoutParams = container.getLayoutParams();
        Configuration cf = getResources().getConfiguration();

        int ori = cf.orientation;

        /**You should set size to the layout param.**/
        if (ori == Configuration.ORIENTATION_LANDSCAPE) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
            layoutParams.width = (int) (getResources().getDisplayMetrics().widthPixels * 0.9);
            layoutParams.height = getResources().getDisplayMetrics().heightPixels;
        } else if (ori == Configuration.ORIENTATION_PORTRAIT) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
            layoutParams.width = getResources().getDisplayMetrics().widthPixels;
            layoutParams.height = (int) (getResources().getDisplayMetrics().heightPixels * 0.85);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
            layoutParams.width = getResources().getDisplayMetrics().widthPixels;
            layoutParams.height = (int) (getResources().getDisplayMetrics().heightPixels * 0.85);
        }

        Log.i(TAG, "onCreate:------> " + layoutParams.height);
//diff1
        String defaultConfig = "{\"unit_id\":1937106,\"ad_type\":-1,\"nw_firm_id\":6,\"adapter_class\":\"com.anythink.network.mintegral.MintegralATSplashAdapter\",\"content\":\"{\\\"placement_id\\\":\\\"499042\\\",\\\"unitid\\\":\\\"1892900\\\",\\\"countdown\\\":\\\"3\\\",\\\"allows_skip\\\":\\\"1\\\",\\\"orientation\\\":\\\"1\\\",\\\"appkey\\\":\\\"3203e9b9f9704b377fd8ca51c9d485c2\\\",\\\"suport_video\\\":\\\"1\\\",\\\"appid\\\":\\\"171513\\\"}\"}";
//diffend1
        //Mintegral
//        defaultConfig = "{\"unit_id\":1331159,\"ad_type\":-1,\"nw_firm_id\":6,\"adapter_class\":\"com.anythink.network.mintegral.MintegralATSplashAdapter\",\"content\":\"{\\\"unitid\\\":\\\"276803\\\",\\\"countdown\\\":\\\"3\\\",\\\"allows_skip\\\":\\\"0\\\",\\\"orientation\\\":\\\"1\\\",\\\"appkey\\\":\\\"ef13ef712aeb0f6eb3d698c4c08add96\\\",\\\"suport_video\\\":\\\"1\\\",\\\"placement_id\\\":\\\"210169\\\",\\\"appid\\\":\\\"100947\\\"}\"}";
//        defaultConfig = "{\"unit_id\":1743366,\"ad_type\":-1,\"nw_firm_id\":6,\"adapter_class\":\"com.anythink.network.mintegral.MintegralATSplashAdapter\",\"content\":\"{\"placement_id\":\"468000\",\"unitid\":\"1837578\",\"countdown\":\"3\",\"allows_skip\":\"1\",\"orientation\":\"1\",\"appkey\":\"3203e9b9f9704b377fd8ca51c9d485c2\",\"suport_video\":\"1\",\"appid\":\"162805\"}\"}";
        //Admob
//        defaultConfig = "{\"unit_id\":1333299,\"nw_firm_id\":2,\"adapter_class\":\"com.anythink.network.admob.AdmobATSplashAdapter\",\"content\":\"{\\\"orientation\\\":\\\"1\\\",\\\"unit_id\\\":\\\"ca-app-pub-3940256099942544\\\\\\/1033173712\\\",\\\"app_id\\\":\\\"ca-app-pub-9488501426181082~6354662111\\\"}\"}";

        splashAd = new ATSplashAd(this, placementId, this, 5000, defaultConfig);
        //ATSplashAd.entryAdScenario(placementId, "");
        Map<String, Object> localMap = new HashMap<>();
        localMap.put(ATAdConst.KEY.AD_WIDTH, layoutParams.width);
        localMap.put(ATAdConst.KEY.AD_HEIGHT, layoutParams.height);
        splashAd.setLocalExtra(localMap);

        Log.i(TAG, isLoadAd?"-----true":"--------false");
        if (splashAd.isAdReady()) {
            Log.i(TAG, "SplashAd is ready to show.");
            splashAd.show(this, container);
        } else {
            Log.i(TAG, "SplashAd isn't ready to show, start to request.");
            splashAd.loadAd();
        }
    }

    @Override
    public void onDeeplinkCallback(ATAdInfo adInfo, boolean isSuccess) {
        Log.i(TAG, "onDeeplinkCallback:" + adInfo.toString() + "--status:" + isSuccess);
    }

    @Override
    public void onDownloadConfirm(Context context, ATAdInfo adInfo, ATNetworkConfirmInfo networkConfirmInfo) {

    }

    @Override
    public void onAdLoaded(boolean isTimeout) {
        Log.i(TAG, "onAdLoaded---------isTimeout:" + isTimeout);

        if (isLoadAd) {
            return;
        }
        if (!inForeBackground) {
            needShowSplashAd = true;
            return;
        }

        if (!splashAd.isAdReady()) {
            Log.e(TAG, "onAdLoaded: no cache" );
            jumpToMainActivity();
            return;
        }

        splashAd.show(this, container);
    }

    @Override
    public void onAdLoadTimeout() {
        Log.i(TAG, "onAdLoadTimeout---------");

        if (isLoadAd) {
            return;
        }
//        Toast.makeText(SplashAdShowActivity.this, "onAdLoadTimeout", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNoAdError(AdError adError) {
        Log.i(TAG, "onNoAdError---------:" + adError.getFullErrorInfo());

        if (isLoadAd) {
            return;
        }
        jumpToMainActivity();
    }


    @Override
    public void onAdShow(ATAdInfo entity) {
        Log.i(TAG, "onAdShow:\n" + entity.toString());
        if (isLoadAd) {
            return;
        }

        bg.setVisibility(View.GONE);
        splashAd.loadAd();
        isLoadAd = true;
        NativeHelper.playData = entity.toString();
        Log.i(TAG, "onAdShow:" + "--------------------succ");
    }

    @Override
    public void onAdClick(ATAdInfo entity) {
        Log.i(TAG, "onAdClick:\n" + entity.toString());
    }

    @Override
    public void onAdDismiss(ATAdInfo entity, ATSplashAdExtraInfo splashAdExtraInfo) {
        Log.i(TAG, "onAdDismiss type:" + splashAdExtraInfo.getDismissType() + "\n" + entity.toString());
        jumpToMainActivity();
    }

    boolean hasHandleJump = false;
    boolean needJump;

    boolean inForeBackground;
    boolean needShowSplashAd;

    public void jumpToMainActivity() {
        if (!needJump) {
            needJump = true;
            return;
        }

        if (!hasHandleJump) {
            hasHandleJump = true;
            bg.setVisibility(View.GONE);
            finish();
//            Toast.makeText(this, "start your MainActivity.", Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    protected void onResume() {
        super.onResume();

        inForeBackground = true;

        if (needJump) {
            Log.i(TAG, "onResume---------:");
            jumpToMainActivity();
        }

        needJump = true;

        if (needShowSplashAd) {
            needShowSplashAd = false;

            if (splashAd.isAdReady()) {
                splashAd.show(this, container);
            }
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        inForeBackground = false;

        needJump = false;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i(TAG,"------------onDestroy--------------");
        if (splashAd != null) {
            splashAd.onDestory();
        }

    }
    //重写Activity该方法，当窗口焦点变化时自动隐藏system bar，这样可以排除在弹出dialog和menu时，
    //system bar会重新显示的问题(弹出dialog时似乎还是可以重新显示的0.0)。
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemUI();
        }
    }

    private void hideSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY //(修改这个选项，可以设置不同模式)
                        //使用下面三个参数，可以使内容显示在system bar的下面，防止system bar显示或
                        //隐藏时，Activity的大小被resize。
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        // 隐藏导航栏和状态栏
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN);
    }

}
