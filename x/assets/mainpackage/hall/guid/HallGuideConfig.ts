// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
export enum GUIDE_STEPS{
    NONE,                       //还没开始         
    CLICK_ICON,                 //点击图标
    CLICK_RECORD_MORESTAKES,    //点击战绩详情的more stakes
    CLICK_ROOMLIST,             //点击房间列表
    CLICK_RECORD_WINTIP,        //点击战绩详情的win tip
    //CLICK_DLG_WINFREECASH,     //点击win free cash对话框
    //CLICK_DLG_MORECASH,        //点击want more cash对话框
    FINISH=100                   //完成
}

export enum ENTER_STEPS{
    OPENAPP,                              
    GETCONFIG,                  
    GETCONFIG_SUCCESS,          
    CLICK_LOGIN,                
    SEE_GUIDE,                  
    CLICK_GAMEICON,
    SHOWRECORD              
}