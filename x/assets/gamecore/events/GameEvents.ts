export enum GameEvents{
    NET_CONNECTING="onConnecting",   //网络链接中
    NET_OPEN="onOpen",               //打开网络链接
    NET_CLOSE="onClose",          //网络链接关闭
    NET_MESSAGE="onMessage",        //网络消息
    NET_RECONNECT_TIMEOUT="reconnectTimeOut",//重连超时
    NET_ERROR="onNetError",     //网络错误

    UI_FLUSH=2000,              //更新UI

    DATA_FLUSH=3000,             //更新数据

    LANG_CHANGE="changeLang",     //切换语言包

    FLUSH_SELFDATA="flush_selfData",//更新自己的数据

    PAY="pay",                   //支付

    GETWAY = "getway",          //获取支付方式

    SELECTPAY = "selectpay",        //选择支付方式

    LOGOUT="logout",                 //注销帐号


    UPLOAD_GAME_RESULT_SUCCESS="UploadGameResultSuccess",    //上报游戏结果成功

    GUIDE_STEP_START="guide_stepchange_start",  //步骤开始前调用

    GUIDE_STEP_END="guide_stepchange_end",       //步骤完成后调用

    PASS_BACK="pass_back",                      //用户触发了后退

    CONFIRM_GAMEEND="confirm_gameEnd",           //用户确认退出游戏

    SAVEGAMEGUID="saveGameGuid",                 //保存用户新手引导过程

    ERROR_TIP="error_tip",                       //全局错误提示

    ERROR_TOKEN="tokenError",                    //token过期

    UPDATE_GAMESTATE="update_gameState",         //更新游戏状态

    GUIDE_CLICK="guide_click",                    //新手引导点击确认


    UPLOAD_GAME_RESULT="UploadGameResult",    //上报游戏结果

    GAME_ADDSCORE="game_addScore",              //游戏中加分
    

    RECONNECT_SUCCESS="reconnnect_success"      //重连成功
}