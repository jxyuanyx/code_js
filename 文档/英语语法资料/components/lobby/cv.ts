import { WorldNetWork } from "../../common/net/WorldNetWork";
import { NetWork } from "../../common/net/NetWork";
import { GameNetWork } from "../../common/net/GameNetWork";
import { AofNetWork } from "../../common/net/AofNetWork";
import { Base64Util } from "./../../common/net/Base64Util";
import { DomainMgr } from "../../common/net/DomainMgr";
import { NetWorkManager } from "../../common/net/NetWorkManager";
import { HttpHandler } from "../../common/net/HttpHandler";
import { HTTP } from "../../common/net/HTTP";
import { Server } from "../../common/net/Server";
import { Config } from "../../common/tools/Config";
import { ResConfig } from "../../common/tools/ResConfig";
import * as Enums from "../../common/tools/Enum";
import { MessageCenter } from "../../common/tools/MessageCenter";
import { md5 } from "../../common/tools/mdR5";
import { DataHandler } from "../../data/DataHandler";
import { Action } from "../../common/tools/Action";
import * as ByteBuffer from "./../../common/protobuf/bytebuffer";
import * as Long from "./../../common/protobuf/long";
import { LoadingView } from "../../common/prefab/LoadingView"
import { SwitchLoadingView } from "../../common/prefab/SwitchLoadingView"
import { StatusView } from "../../common/prefab/StatusView";
import { LogTools } from "../../common/tools/LogTools";
import { TipsPanel } from "../../common/prefab/TipsPanel";
import { TipsArray } from "../../common/prefab/TipsArray";
import { StringTools } from "../../common/tools/StringTools";
import { ResourceManager } from "../../common/tools/ResourceManager";
import GameDataManager from "../game/dzPoker/data/GameDataManager";
import JackfruitManager from "../game/jackfruit/JackfruitManager";
import { ViewAdaptive } from "../../common/tools/ViewAdaptive";
import { Tools } from "../../common/tools/Tools";
import { CacheUtils } from "../../common/tools/CacheUtils";
import { NativeEvent } from "../../common/tools/NativeEvent";
import { NATIVE_KEY_MAP } from "../../common/tools/NativeEventCMD";
import { AudioMgr } from "../../common/tools/AudioMgr";
import { HashMap } from "../../common/tools/HashMap";
import { ClubDataManager } from "../../data/club/ClubDataMgr";
import { GlobalMsgDataManager } from "../../data/globalMsg/GlobalMsgDataManager";
import Shop from "../../common/prefab/Shop";
import { CowboyNetWork } from "../../common/net/CowboyNetWork";
import { PushNotice } from "../../common/prefab/PushNotice";
import { HumanboyBaseSocket } from "../game/humanboy/HumanboyBaseSocket";
import { JackfruitNetWork } from "../game/jackfruit/JackfruitNetWork";
import { RoomManager } from "../../common/net/RoomManager";
import { VideoCowboyNetWork } from "../../common/net/VideoCowboyNetWork";
import { PokerMasterBaseSocket } from "../game/pokerMaster/PokerMasterBaseSocket";
import { DataNetWork } from "../../common/net/DataNetWork";
import { SegmentTool } from "../../common/segment/SegmentTool";
import { ReCAPTCHA } from "../../common/security/ReCAPTCHA";
import { KYCLoadingView } from "../../common/prefab/KYCLoadingView";
import { LoadingCommonView } from "../../common/prefab/LoadingCommonView";
import { MiniGameConfigs } from "./miniGame/MiniGameConfigs";

class cv {
    public netWork: NetWork;
    public worldNet: WorldNetWork;
    public gameNet: GameNetWork;
    public cowboyNet: CowboyNetWork;
    public videoCowboyNet: VideoCowboyNetWork;
    public humanboyNet: HumanboyBaseSocket;
    public pokerMasterNet: PokerMasterBaseSocket;
    public aofNet: AofNetWork;
    public jackfruitNet: JackfruitNetWork;
    public dataNet: DataNetWork;
    public httpHandler: HttpHandler;
    public http: HTTP;
    public server: Server;
    public dataHandler: DataHandler;
    public miniGameConfig: MiniGameConfigs;
    public action: Action;
    public config: Config;
    public resConfig: ResConfig;
    public MessageCenter: MessageCenter;
    public md5: md5;
    public worldPB: any;
    public gamePB: any;
    public cowboyPB: any;
    public videoCowboyPB: any;
    public humanboyPB: any;
    public pokerMasterPB: any;
    public aofPB: any;
    public gatePB: any;
    public dataPB: any;
    public jackfruitPB: any;
    public ByteBuffer: any;
    public Long: any;
    // public msg: any;
    // public strData: any;
    public configJson: any;
    public serverJson: any;
    public languageJsonMap: HashMap<string, any> = new HashMap();
    public Enum = Enums;
    public native: NativeEvent;
    public nativeCMD: any;
    public StringTools: StringTools;
    public resMgr: ResourceManager;
    public viewAdaptive: ViewAdaptive;
    public GameDataManager = GameDataManager;
    public JackfruitManager = JackfruitManager;
    public tools: Tools;
    public AudioMgr: AudioMgr;
    public clubDataMgr: ClubDataManager;
    public netWorkManager: NetWorkManager;
    public globalMsgDataMgr: GlobalMsgDataManager;
    public roomManager: RoomManager;
    public base64: Base64Util;
    public domainMgr: DomainMgr;
    public CacheUtils: CacheUtils;
    public segmentTool: SegmentTool;
    public reCaptcha: ReCAPTCHA;

    public TT: TipsArray = null;
    public TP: TipsPanel = null;
    public SHOP: Shop = null;
    public pushNotice: PushNotice = null;
    public StatusView: StatusView = null;
    public LoadingView: LoadingView = null;
    public LoadingCommonView: LoadingCommonView = null;
    public SwitchLoadingView: SwitchLoadingView = null;
    public KYCLoadingView: KYCLoadingView = null;
    public LogTools: LogTools = null;

    private static g_instance: cv = null;
    public static getInstance(): cv {
        if (!cv.g_instance) {
            cv.g_instance = new cv;
        }
        return cv.g_instance;
    }
    public initBaseClass(): void {
        this.http = HTTP.getInstance();
        this.config = Config.getInstance();
        this.tools = Tools.getInstance();
        this.resConfig = ResConfig.getInstance();
        this.md5 = md5.getInstance();
        this.dataHandler = DataHandler.getInstance();
        this.native = NativeEvent.getInstance();
        this.StringTools = StringTools.getInstance();
        this.resMgr = ResourceManager.getInstance();
        this.base64 = Base64Util.getInstance();
        this.domainMgr = DomainMgr.getInstance();
        this.server = Server.getInstance();
        this.MessageCenter = MessageCenter.getInstance();
        this.CacheUtils = CacheUtils.getInstance();

        // 基础预制件
        this.TT = TipsArray.getInstance();
        this.TP = TipsPanel.getInstance();
        this.pushNotice = PushNotice.getInstance();
        this.StatusView = StatusView.getInstance();
        this.LoadingView = LoadingView.getInstance();
        this.LoadingCommonView = LoadingCommonView.getInstance();
        this.SwitchLoadingView = SwitchLoadingView.getInstance();
        this.KYCLoadingView = KYCLoadingView.getInstance();
        if (this.config.GET_CLIENT_TYPE() !== this.Enum.ClientType.CowboyWeb) {
            this.SHOP = Shop.getInstance();
        }
        //只在测试服显示
        // if (this.config.GET_DEBUG_MODE() === 1) {
        //     this.LogTools = LogTools.getInstance();
        // }
    }

    public init(): void {
        this.segmentTool = SegmentTool.getInstance();
        this.netWork = NetWork.getInstance();
        this.worldNet = WorldNetWork.getInstance();
        this.gameNet = GameNetWork.getInstance();
        this.aofNet = AofNetWork.getInstance();
        this.dataNet = DataNetWork.getInstance();
        this.cowboyNet = CowboyNetWork.getInstance();
        this.videoCowboyNet = VideoCowboyNetWork.getInstance();
        this.humanboyNet = HumanboyBaseSocket.getInstance();
        this.pokerMasterNet = PokerMasterBaseSocket.getInstance();
        this.jackfruitNet = JackfruitNetWork.getInstance();
        this.httpHandler = HttpHandler.getInstance();

        this.ByteBuffer = ByteBuffer;
        this.Long = Long;
        this.action = Action.getInstance();
        this.action.WIDTH = this.config.WIDTH;
        this.action.HEIGHT = this.config.HEIGHT;
        this.nativeCMD = NATIVE_KEY_MAP;
        this.viewAdaptive = ViewAdaptive.getInstance();
        this.AudioMgr = AudioMgr.getInstance();
        this.clubDataMgr = ClubDataManager.getInstance();
        this.globalMsgDataMgr = GlobalMsgDataManager.getInstance();
        this.netWorkManager = NetWorkManager.getInstance();
        this.roomManager = RoomManager.getInstance();
        this.dataHandler.getUserData().deviceInfo = this.native.GetDeviceUUID(true);
        this.reCaptcha = ReCAPTCHA.getInstance();
        this.miniGameConfig = MiniGameConfigs.getInstance();

        // 基础预制件初始化
        if (this.TT) this.TT.init();
        if (this.TP) this.TP.init();
        if (this.SHOP) this.SHOP.init();
        if (this.pushNotice) this.pushNotice.init();
        if (this.StatusView) this.StatusView.init();
        if (this.LoadingView) this.LoadingView.init();
        if (this.LoadingCommonView) this.LoadingCommonView.init();
        if (this.SwitchLoadingView) this.SwitchLoadingView.init();
        if (this.KYCLoadingView) this.KYCLoadingView.init();
        if (this.LogTools) this.LogTools.init();
    }

    public ToastGameError(gameID: Enums.GameId, errorID: number) {
        let strKey: string = "";

        // 版本过低检测
        switch (gameID) {
            case Enums.GameId.GameId_Dummy: break;

            case Enums.GameId.CowBoy:
            case Enums.GameId.VideoCowboy: {
                if (errorID == 31001) {
                    this.netWorkManager.OnNeedRelogin(2);
                    return;
                }
                strKey = this.StringTools.formatC("Cowboy_ServerErrorCode%d", errorID);
            } break;

            case Enums.GameId.HumanBoy: {
                if (errorID == 41001) {
                    this.netWorkManager.OnNeedRelogin(2);
                    return;
                }
                strKey = this.StringTools.formatC("Humanboy_ServerErrorCode%d", errorID);
            } break;

            case Enums.GameId.PokerMaster: {
                if (errorID == 51001) {
                    this.netWorkManager.OnNeedRelogin(2);
                    return;
                }
                strKey = this.StringTools.formatC("PokerMaster_ServerErrorCode%d", errorID);
            } break;

            default: break;
        }

        this.TT.showMsg(this.config.getStringData(strKey), Enums.ToastType.ToastTypeError);
    }
    public ToastError(i32Error: number) {
        if (i32Error === 1 || i32Error === 0) return;

        if (i32Error == 1203) {  //1203显示1201的提示
            i32Error = 1201;
        } else if (i32Error == 1275) {
            i32Error = 87;
        }

        let acBuffer = this.config.getStringData("ServerErrorCode" + i32Error);
        if (i32Error == 31003) {
            acBuffer = this.config.getStringData("Cowboy_ServerErrorCode31003");
        }

        if (i32Error === 22) {
            this.MessageCenter.send("on_room_not_exist");
            this.TT.showMsg(acBuffer, this.Enum.ToastType.ToastTypeInfo);
        }
        else if (i32Error === 53 || i32Error === 42 || i32Error === 32 || i32Error === 98) {
            this.GameDataManager.tRoomData.isShowNeedShop = true;
            this.MessageCenter.send("on_need_more_gold");
            this.TT.showMsg(acBuffer, this.Enum.ToastType.ToastTypeError);
        }
        else if (i32Error === 49 || i32Error === 50 || i32Error === 71) {
            this.GameDataManager.tGameData.m_bIsOnSelfAction = false;
            this.MessageCenter.send("on_action_error");
            this.TT.showMsg(acBuffer, this.Enum.ToastType.ToastTypeError);
        }
        else if (i32Error === 52 || i32Error === 1001) {

        }
        else if (i32Error === 112) {
            this.GameDataManager.tRoomData.isShowNeedClub = true;
            this.MessageCenter.send("needClub");
        }
        else if (i32Error === 93) {

            this.GameDataManager.tGameData.m_bIsOnSelfAction = true;
            this.TT.showMsg(this.StringTools.formatC(acBuffer), this.Enum.ToastType.ToastTypeError);
        }
        else if (i32Error === 51 || i32Error === 48 || i32Error === 92) {
            this.GameDataManager.tGameData.m_bIsOnSelfAction = false;
            this.TT.showMsg(this.StringTools.formatC(acBuffer), this.Enum.ToastType.ToastTypeError);
        }
        else if (i32Error === 105) {
            this.TP.showMsg(acBuffer, this.Enum.ButtonStyle.GOLD_BUTTON, null);
            let image = this.TP.getMessageImage();
            let msgTxt = this.TP.getMessageImageText();
            let msgtext = this.TP.getMessageText();
            image.node.active = true;
            msgTxt.string = this.config.getStringData("TipsPanel_Image_duanxin_text_duanxin_2");
            msgTxt.node.active = true;
            this.resMgr.setSpriteFrame(image.node, "zh_CN/hall/ui/common_prompt");
            msgtext.node.setPosition(msgtext.node.x, 0);
        }
        else if (i32Error === 229 || i32Error === 2) {
            this.netWorkManager.OnNeedRelogin(i32Error);
        }
        else {
            this.TT.showMsg(this.StringTools.formatC(acBuffer), this.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 包装 Number, 防止返回 NaN, Infinity 等情况, 默认返回 0
     */
    public Number(value: any): number {
        value = Number(value);
        value = isFinite(value) ? value : 0;
        return value;
    }

    /**
     * 包装 String, 防止为空时返回 undefined, 默认返回 ""
     */
    public String(value: any): string {
        if (value === null || typeof value === "undefined") value = "";
        else value = String(value);

        return value;
    }
}

let cv_instance: cv = null;
export default cv_instance = cv.getInstance();
