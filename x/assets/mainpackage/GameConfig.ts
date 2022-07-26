import BaseGameConfig from "../gamecore/models/BaseGameConfig";
import { GameStatus } from "../gamecore/models/GameStatus";

export enum AppStatusEnum{
    HALL,
    MATCHING,
    MATCHED,
    GAMEING
}

export enum CONSTANTS{
    COUNTRY="country",
    GAMECONFIGVERSION="GameConfigVersion",
    GAMEVERSION_CONFIG="game_version_config",
    GAMECONFIG="GameConfig",
    VOL_MUSIC="vol_music",
    VOL_SOUND="vol_sound",
    SYSTEM_CONFIG="system_config",
    APP_STATUS="app_status",
    PAY_FRIST="pay_frist",
    SHOW_PAYACT="show_payact",
    ACTIVITY_DATA="activity_data",
    REWARD_DATA="reward_data",
    COMMONDATA="common_data"
}

export const  ENVIRONMENTS={
    ID_TEST:"http://147.139.76.207",
    CHECK:"http://review.skillmasterapp.com:6636",
    DEV:"http://120.78.235.228",
    ONLINE:"https://game.skill-app.com"
}

export const enum SCREEN_DIRECTION{
    TYPE_P="TypeP", //竖屏
    TYPE_L="TypeL"  //横屏
}

export class GameConfig extends BaseGameConfig{

    static readonly mainBundle:string="mainpackage";
    static readonly debug:boolean=true;
    static readonly needHotUpdate:boolean=true;
    static readonly HTTPURL:string="";
    static EXCHANGE_RATE:number=100;
    static readonly PRIVACY_POLICY:string="http://www.ludowin.online/privacy.html";
    static  HOST:string="120.78.143.78";
    static  PORT:number=80;
    static  APIURL:string=ENVIRONMENTS.ONLINE;

    static  TEST:boolean=false;
}

export const Games=[
    {
        packageName:"game107",
        serverModuleName:"ludo",
        gameName:"ludo",
        gameState:GameStatus.NEED_DOWNLOAD,
        isUnity:false,
        playingCount:Math.floor(Math.random()*10000)+1000,
        guidRoomId:1001001,
        guidRoomListRoomId:1003001,
        room_type:800,
        have_contest:0,
        onlineGame:true,
        inPackage:true
    },
    {
        packageName:"game100",
        serverModuleName:"solitaire",
        gameName:"solitaire",
        gameState:GameStatus.NEED_DOWNLOAD,
        isUnity:false,
        playingCount:Math.floor(Math.random()*10000)+1000,
        guidRoomId:1001001,
        guidRoomListRoomId:1003001,
        have_contest:0,
        room_type:200,
        inPackage:true
    },
    {
        packageName:"game101",
        serverModuleName:"blitz21",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"blitz21",
        isUnity:false,
        playingCount:Math.floor(Math.random()*10000)+1000,
        guidRoomId:2001001,
        have_contest:0,
        guidRoomListRoomId:2003001,

        room_type:300,
        inPackage:true
    },
    {
        packageName:"game102",
        serverModuleName:"matchbattle",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"matchbattle",
        isUnity:true,
        playingCount:Math.floor(Math.random()*10000)+1000,
        sort:3,
        guidRoomId:3001001,
        guidRoomListRoomId:3003001,

        room_type:500,
        have_contest:0,

        screensType:SCREEN_DIRECTION.TYPE_P,

        enterGameInfo:{
            ClassName:"MatchBattle.DataMgr_Mb",
            InsFuncName:"GetInstance",
            CallFuncName:"InitData",
            HaveParam:"true",
            CallFuncParam:"5",
            EnterSceneName:"GameScene_mb",
            EnterSceneAbsStr:"match/scenes.mb"
        },
        inPackage:false
    },

    {
        room_type:400,
        packageName:"game103",
        serverModuleName:"snakebattle",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"snakebattle",
        isUnity:true,
        playingCount:Math.floor(Math.random()*10000)+1000,
        sort:4,
        guidRoomId:4001001,
        guidRoomListRoomId:4003001,
        
        screensType:SCREEN_DIRECTION.TYPE_L,

        hasReplay:false,
        have_contest:0,
        enterGameInfo:{
            ClassName:"SnakeBattle.DataMgr_Snake",
            InsFuncName:"GetInstance",
            CallFuncName:"InitData",
            HaveParam:"true",
            CallFuncParam:"5",
            EnterSceneName:"GameScene_Snake",
            EnterSceneAbsStr:"snake/scenes_s.sn"
        },

        inPackage:false
    },

    {
        room_type:100,
        packageName:"game104",
        serverModuleName:"bingo",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"bingo",
        isUnity:true,
        playingCount:Math.floor(Math.random()*10000)+1000,
        sort:5,
        guidRoomId:5001001,
        guidRoomListRoomId:5003001,
        have_contest:0,
        screensType:SCREEN_DIRECTION.TYPE_P,

        enterGameInfo:{
            ClassName:"Bingo.DataMgr_Bingo",
            InsFuncName:"GetInstance",
            CallFuncName:"InitData",
            HaveParam:"false",
            CallFuncParam:"5",
            EnterSceneName:"GameScene_bingo",
            EnterSceneAbsStr:"bingoab/scenes_b.bg"
        },

        inPackage:true
    },

    {
        room_type:600,
        packageName:"game105",
        serverModuleName:"fruitninja",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"fruitninja",
        isUnity:true,
        playingCount:Math.floor(Math.random()*10000)+1000,
        sort:6,
        guidRoomId:6001001,
        guidRoomListRoomId:6003001,
        screensType:SCREEN_DIRECTION.TYPE_L,
        have_contest:0,
        enterGameInfo: {
            "ClassName": "FruitNinja.DataMgr_Fn",
            "InsFuncName": "GetInstance",
            "CallFuncName": "InitData",
            "HaveParam": "true",
            "CallFuncParam": "5",
            "EnterSceneName": "GameScene_fn",
            "EnterSceneAbsStr": "fruitab/scenes_f.fn"
        },
        inPackage:true
    },

    {
        room_type:700,
        packageName:"game106",
        serverModuleName:"bubbleshooter",
        gameState:GameStatus.NEED_DOWNLOAD,
        gameName:"bubbleshooter",
        isUnity:true,
        playingCount:Math.floor(Math.random()*10000)+1000,
        sort:7,
        guidRoomId:7001001,
        guidRoomListRoomId:7003001,
        have_contest:0,
        enterGameInfo: {
            "ClassName": "BubbleShooter.DataMgr_Bs",
            "InsFuncName": "GetInstance",
            "CallFuncName": "InitData",
            "HaveParam": "true",
            "CallFuncParam": "5",
            "EnterSceneName": "GameScene_Bs",
            "EnterSceneAbsStr": "bubble/scenes/scenes_bs.bs"
        },
        inPackage:true
    } 
]

export const DataConfig={
    SEASON_TASKS:"season_tasks",
    SEASON_RANK:"season_rank",
    ACHIEVEMENT:"achievement",
    ERROR_CODE:"error_code",
    LOTTERY:"lottery"
}

export const WITHDRAWDATA={
    SHOWWITHDRAW:"showwithdraw",
    MINWITHDRAW:"minwithdraw"
}

export enum CHIP_TYPES{
    FREE,           //"免费",
    TICKET,         //"门票",
    CASH,           //"现金",
    BIND_CASH,      //"绑定现金",
    PRIZE_TICKET,   //"奖券",
    SEASON_SCORE,   //"赛季分"
    RED_TICKET,     //红色抽奖券
    PINK_TICKET,    //粉色抽奖券
    BLUE_TICKET,    //蓝色抽奖券
    YELLOW_TICKET   //黄色抽奖券
}

export const Goods=[
    "Free",
    "Ticket",
    "Cash",
    "Bonus Cash",
    "Free",
    "Season Point",
    "Lottery Ticket·Lv1",
    "Lottery Ticket·Lv2",
    "Lottery Ticket·Lv3",
    "Lottery Ticket·Lv4",
    "Diamond"
]