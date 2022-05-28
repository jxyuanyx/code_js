import cv from "../../components/lobby/cv";
import { CleanResLevel } from "./ResourceManager";

/**
 * 切换场景信息
 */
export class TransSceneInfo {
    srcSceneName: string = "";                                                          // 原场景名
    tarSceneName: string = "";                                                          // 目标场景名
    isTransing: boolean = false;                                                        // 是否正在过渡
    isPreLoadRes: boolean = false;                                                      // 是否预加载目标场景资源
    onLaunched: Function = null;                                                        // 切换至目标场景完毕
    cleaResLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE;                            // 切换过程中清理资源级别

    constructor() {
        this.reset();
    }

    reset(): void {
        this.srcSceneName = "";
        this.tarSceneName = "";
        this.isTransing = false;
        this.isPreLoadRes = false;
        this.onLaunched = null;
        this.cleaResLevel = CleanResLevel.LEVEL_SCENE;
    }
}

/**
 * 动态资源配置信息类
 * 
 * 一张图片在内存中的占用计算方式 = (w * h * 32)/8/1024 结果为kb
 */
export class ResConfig extends cc.Component {

    /**
     * 过渡场景信息(由过渡场景去维护, 写在这里是不想写场景管理类, 暂时不想铺这么大)
     */
    public transSceneInfo: TransSceneInfo = new TransSceneInfo();

    // **********************************************************************************************************************
    // 基础资源(热更场景就加载)

    /**
     * 公共资源(基础资源切场景不做释放)
     */
    getCommonRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/internal/image/", type: cc.SpriteFrame },                                                // 基础资源
            { path: "zh_CN/game/dzpoker/card/card_bg", type: cc.SpriteFrame },                                      // 牌背
            { path: "zh_CN/game/dzpoker/audio/buttonSound", type: cc.AudioClip },                                   // 公用按钮音效
            { path: "zh_CN/game/jackfruit/setting", type: cc.SpriteFrame },                                         // 通用的牌面设置

            // { path: "zh_CN/common/icon", type: cc.SpriteFrame },                                                 // common
            // { path: "zh_CN/font", type: cc.Font },                                                               // 字体
            // { path: "zh_CN/common/sliderVerify", type: cc.SpriteFrame },                                         // 滑块验证
            // { path: "zh_CN/common/sliderVerify/bg", type: cc.SpriteFrame },                                      // 滑块验证
        ];
        return res;
    }

    /**
     * 不同客户端logo资源
     */
    getClientTypeRes(): any[] {
        let res: any[] = [
            { path: cv.config.isOverSeas() ? "client_type/pkc" : "client_type/pkw", type: cc.SpriteFrame },
        ];
        return res;
    }

    /**
     * 获取应该加载的PB协议
     */
    getPBInfo(): any[] {
        let res: any[] = [
            { path: "zh_CN/pb/ws_protocol", type: "worldPB" },
            { path: "zh_CN/pb/gs_protocol", type: "gamePB" },
            { path: "zh_CN/pb/gs_protocol", type: "aof" },
            { path: "zh_CN/pb/cowboy", type: "cowboy" },
            { path: "zh_CN/pb/video_cowboy", type: "video_cowboy" },
            { path: "zh_CN/pb/humanboy", type: "humanboy" },
            { path: "zh_CN/pb/gate", type: "gate" },
            { path: "zh_CN/pb/pokermaster", type: "pokermaster" },
            { path: "zh_CN/pb/data", type: "data" },
            { path: "zh_CN/pb/jackfruit", type: "jackfruit" },
        ]
        return res;
    }

    /**
     * 牛仔私语(目前已废弃)
     */
    getCowboyOnlyRes(): any[] {
        let res: any[] = [
            // { path: "zh_CN/game/cowboy", type: cc.SpriteFrame },                                                    // 牛仔散图
            // { path: "zh_CN/game/cowboy/audio", type: cc.AudioClip },                                                // 牛仔音效
            // { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas, },                // 牛仔语言图集
            // { path: cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"), type: cc.SpriteAtlas, },       // 兑换语言图集
        ]
        return res;
    }

    // **********************************************************************************************************************
    // 对应场景资源(切换场景才加载)
    // 静态数组改成动态函数, 因为语言模块和其他模块都没加载完成, 获取不到值(也就是获取顺序不能写到引擎加载脚本那一层)

    /**
     * 牛仔资源
     */
    getCowboyRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/game/cowboy", type: cc.SpriteFrame },                                                    // 牛仔散图
            { path: "zh_CN/game/humanboy", type: cc.SpriteFrame },                                                  // 百人散图
            { path: "zh_CN/game/cowboy/audio", type: cc.AudioClip },                                                // 牛仔音效
            { path: "zh_CN/game/humanboyPlist/humanboy", type: cc.SpriteAtlas },                                    // 百人其它图集
            { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas },                 // 牛仔语言图集
            { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas },                 // 牛仔语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/language"), type: cc.SpriteAtlas },               // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/language"), type: cc.SpriteAtlas, },              // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"), type: cc.SpriteAtlas },        // 兑换语言图集
        ];
        return res;
    }

    /**
     * 视频牛仔资源
     */
    getVideoCowboyRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/game/cowboy", type: cc.SpriteFrame },                                                    // 牛仔散图
            { path: "zh_CN/game/humanboy", type: cc.SpriteFrame },                                                  // 百人散图
            { path: "zh_CN/game/cowboy/audio", type: cc.AudioClip },                                                // 牛仔音效
            { path: "zh_CN/game/humanboyPlist/humanboy", type: cc.SpriteAtlas },                                    // 百人其它图集
            { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas },                 // 牛仔语言图集
            { path: cv.config.getLanguagePath("game/videoCowboyPlist/language"), type: cc.SpriteAtlas },            // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/language"), type: cc.SpriteAtlas },               // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"), type: cc.SpriteAtlas },        // 兑换语言图集
        ];
        return res;
    }

    /**
     * 百人资源
     */
    getHumanboyRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/game/cowboy", type: cc.SpriteFrame },                                                    // 牛仔散图
            { path: "zh_CN/game/humanboy", type: cc.SpriteFrame },                                                  // 百人散图
            { path: "zh_CN/game/cowboy/audio", type: cc.AudioClip },                                                // 牛仔音效
            { path: "zh_CN/game/humanboyPlist/number", type: cc.SpriteAtlas },                                      // 百人 jp number 图集
            { path: "zh_CN/game/humanboyPlist/humanboy", type: cc.SpriteAtlas },                                    // 百人其它图集
            { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas },                 // 牛仔语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/language"), type: cc.SpriteAtlas },               // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"), type: cc.SpriteAtlas },        // 兑换语言图集
        ];
        return res;
    }

    /**
     * 扑克大师资源
     */
    getPokerMasterRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/game/cowboy", type: cc.SpriteFrame },                                                    // 牛仔散图
            { path: "zh_CN/game/humanboy", type: cc.SpriteFrame },                                                  // 百人散图
            { path: "zh_CN/game/pokermaster", type: cc.SpriteFrame },                                               // 扑克大师图集
            { path: "zh_CN/game/cowboy/audio", type: cc.AudioClip },                                                // 牛仔音效
            { path: "zh_CN/game/pokermasterPlist/pokermaster", type: cc.SpriteAtlas },                              // 扑克大师图集
            { path: "zh_CN/game/humanboyPlist/humanboy", type: cc.SpriteAtlas },                                    // 百人其它图集
            { path: cv.config.getLanguagePath("game/cowboyPlist/language"), type: cc.SpriteAtlas },                 // 牛仔语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/language"), type: cc.SpriteAtlas },               // 百人语言图集
            { path: cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"), type: cc.SpriteAtlas },        // 兑换语言图集
        ];
        return res;
    }

    /**
     * 俱乐部资源
     */
    getClubRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/club", type: cc.SpriteFrame }                                                            // club
        ];
        return res;
    }

    /**
     * 大厅资源
     */
    getHallRes(): any[] {
        let res: any[] = [
            // { path: "zh_CN/hall", type: cc.SpriteFrame },                                                           // hall
            // { path: "zh_CN/hall/RedPackets", type: cc.SpriteFrame },                                                // hall
            // { path: "zh_CN/hall/laba", type: cc.SpriteFrame },                                                      // hall
            // { path: "en_US/hall/laba", type: cc.SpriteFrame },                                                      // hall 

            { path: "zh_CN/hall/laba_stars", type: cc.SpriteFrame },                                                // hall
            { path: "zh_CN/hall/safe", type: cc.SpriteFrame },                                                      // hall
            { path: "zh_CN/hall/lobby", type: cc.SpriteFrame },                                                     // hall
            { path: "zh_CN/hall/selfView", type: cc.SpriteFrame },                                                  // hall
            { path: "en_US/hall/lobby", type: cc.SpriteFrame },                                                     // hall
            { path: "en_US/game/jackfruit/rule", type: cc.SpriteFrame },                                            // 发现列表弹框
            { path: "zh_CN/game/dzpoker/card/card_type_" + cv.tools.GetCardFace(), type: cc.SpriteFrame },          // 德州默认牌
            { path: "zh_CN/game/dzpoker/card/card_type_" + cv.tools.GetCardFacePlo(), type: cc.SpriteFrame },       // 奥马哈默认牌
        ];
        return res;
    }

    /**
     * 德州资源
     */
    getTexasRes(): any[] {
        let res: any[] = [
            // { path: "zh_CN/game/dzpoker/card", type: cc.SpriteFrame },                  // card
            // { path: "zh_CN/game/dzpoker/gameBg", type: cc.SpriteFrame },                // 桌面背景
            // { path: "zh_CN/game/dzpoker/starBg", type: cc.SpriteFrame },                // 明星桌面背景
            // { path: "zh_CN/game/dzpoker/common", type: cc.SpriteFrame },                // common
            // { path: "zh_CN/game/dzpoker/ui", type: cc.SpriteFrame },                    // ui
            // { path: "zh_CN/game/dzpoker/ui_seaStyle", type: cc.SpriteFrame },           // 星空海洋样式ui
            // { path: "zh_CN/game/dzpoker/audio", type: cc.AudioClip },                   // 音频

            // { path: "en_US/game/dzpoker/ui", type: cc.SpriteFrame },                    // ui en
            // { path: "en_US/game/dzpoker/ui_seaStyle", type: cc.SpriteFrame },           // 星空海洋样式ui  en

            { path: "zh_CN/game/dzpoker/animation/icon/effect", type: cc.SpriteAtlas },                             // 图集 effect
            { path: "zh_CN/game/dzpoker/card/card_type_" + cv.tools.GetCardFace(), type: cc.SpriteFrame },          // 德州默认牌
            { path: "zh_CN/game/dzpoker/card/card_type_" + cv.tools.GetCardFacePlo(), type: cc.SpriteFrame },       // 奥马哈默认牌
        ];
        return res;
    }

    /**
     * 菠萝蜜资源
     */
    getJackfruitRes(): any[] {
        let res: any[] = [
            { path: "zh_CN/game/dzpoker/audio", type: cc.AudioClip },
            { path: "zh_CN/game/jackfruit/bg", type: cc.SpriteFrame },
            { path: "zh_CN/game/jackfruit/cardtype", type: cc.SpriteFrame },
            { path: "zh_CN/game/jackfruit/seat", type: cc.SpriteFrame },
            { path: "zh_CN/game/jackfruit/animation/victory", type: cc.SpriteFrame },
            { path: "zh_CN/game/jackfruit/animation/youwin", type: cc.SpriteFrame },
            { path: "zh_CN/game/dzpoker/card/card_type_" + cv.tools.GetCardFaceJackfruit(), type: cc.SpriteFrame },

            { path: "en_US/game/jackfruit/animation/victory", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/animation/youwin", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/cardtype", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/common", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/gamerule", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/review", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/rule", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/seat", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/setting", type: cc.SpriteFrame },
            { path: "en_US/game/jackfruit/ui", type: cc.SpriteFrame },
        ];
        return res;
    }

    // **********************************************************************************************************************
    // 函数接口

    private static _instance: ResConfig = null;

    /**
     * 获取单例
     */
    static getInstance(): ResConfig {
        if (!ResConfig._instance) {
            ResConfig._instance = new ResConfig();
        }
        return ResConfig._instance;
    }

    /**
     * 根据包体属性获取logo路径
     * @param isGame 
     */
    getLogoPath(isGame: boolean): string {
        let logoPath = "client_type/";
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            logoPath = logoPath + "cowboy_web/"
        }
        else if (cv.config.isOverSeas()) {
            logoPath = logoPath + "pkc/"
        }
        else if (cv.config.isThai()) {
            logoPath = logoPath + "pkt/"
        } else {
            logoPath = logoPath + "pkw/"
        }
        if (isGame) {
            logoPath = logoPath + "gameView_logo"
        } else {
            logoPath = logoPath + "login_logo"
        }
        return logoPath;
    }

    /**
     * 获取场景资源列表
     * @param sceneName 场景名称
     */
    getSceneRes(sceneName: string): any[] {
        let vAschRes: any[] = [];

        switch (sceneName) {
            case cv.Enum.SCENE.COWBOY_SCENE: vAschRes = this.getCowboyRes(); break;
            case cv.Enum.SCENE.VIDEOCOWBOY_SCENE: vAschRes = this.getVideoCowboyRes(); break;
            case cv.Enum.SCENE.HUMANBOY_SCENE: vAschRes = this.getHumanboyRes(); break;
            case cv.Enum.SCENE.POKERMASTER_SCENE: vAschRes = this.getPokerMasterRes(); break;
            case cv.Enum.SCENE.HALL_SCENE: vAschRes = this.getHallRes(); break;
            case cv.Enum.SCENE.CLUB_SCENE: vAschRes = this.getClubRes(); break;
            case cv.Enum.SCENE.GAME_SCENE: vAschRes = this.getTexasRes(); break;
            case cv.Enum.SCENE.JACKFRUIT_SCENE: vAschRes = this.getJackfruitRes(); break;
            default: break;
        }

        return vAschRes;
    }
}