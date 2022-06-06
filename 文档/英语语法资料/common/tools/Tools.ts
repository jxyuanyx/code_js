import cv from "../../components/lobby/cv";
import { aesHandler } from "../plugg/aesHandler";
import { HashMap } from "../tools/HashMap";
import { LANGUAGE_TYPE } from "./Enum";

const { ccclass, property } = cc._decorator;
@ccclass
export class Tools extends cc.Component {
    private tag: string = "logObject:";
    constructor() {
        super();
    }
    public static instance: Tools;
    public static getInstance(): Tools {
        if (!this.instance) {
            this.instance = new Tools();
        }
        return this.instance;
    }

    private readonly cardFaceKey = "user_cardface_type";
    private readonly cardBackKey = "user_cardback_type";
    private readonly tableBackKey = "user_tablebg_type";

    private readonly tableBackKey_star = "user_tablebg_type_star";  //明星桌背景设置

    private m_eCardFaceType: number = 0;
    private m_eCardBackType: number = 0;
    private m_eTableBackType: number = 0;  //普通桌桌布
    private m_eTableBackType_star: number = -1;  //明星桌桌布
    private readonly cardFaceJackfruitKey = "user_cardface_jackfruit_type";
    private m_eCardFaceJackfruitType: number = 0;

    // 奥马哈牌面设置
    private readonly cardFacePloKey = "user_cardface_plo_type";
    private m_eCardFacePloType: number = 0;

    private _bEnterbackground = false; //是否进入了后台

    public init(): void {
        //牌背
        let kCardBackValue = this.GetStringByCCFile(this.cardBackKey);
        this.SetCardBack(cv.Number(kCardBackValue ? kCardBackValue : 0));

        //牌面
        let kCardFaceValue = this.GetStringByCCFile(this.cardFaceKey);
        this.SetCardFace(cv.Number(kCardFaceValue ? kCardFaceValue : 0));

        //桌布
        let kTableBackValue = this.GetStringByCCFile(this.tableBackKey);
        this.SetTableBack(cv.Number(kTableBackValue ? kTableBackValue : 0));

        //明星桌桌布
        let kTableBackValue_star = this.GetStringByCCFile(this.tableBackKey_star);
        this.SetTableBack(cv.Number(kTableBackValue_star ? kTableBackValue_star : -1), true);

        //菠萝蜜牌面
        let kCardFaceJackfruitValue = this.GetStringByCCFile(this.cardFaceJackfruitKey);
        this.SetCardFaceJackfruit(cv.Number(kCardFaceJackfruitValue ? kCardFaceJackfruitValue : 0));

        //奥马哈牌面
        let kCardFacePloValue = this.GetStringByCCFile(this.cardFacePloKey);
        this.SetCardFacePlo(cv.Number(kCardFacePloValue ? kCardFacePloValue : 1));
    }

    /**
     * 这是牌面资源类型(这个方法涉及到原始牌资源路径, 很重要)
     * 结合目前引用该方法的逻辑, 此处 eType 数据来源不太可靠, 需要严格筛选
     * @param eType 
     */
    public SetCardFace(eType: number) {
        eType = cv.Number(eType);
        eType = Math.floor(eType);
        if (eType >= 0 && eType < cv.Enum.CardFace.CARD_FACE_MAX) {
            let kValue = cv.StringTools.formatC("%d", eType);
            this.SaveStringByCCFile(this.cardFaceKey, kValue);
            this.m_eCardFaceType = eType;
        }
    }

    public SetCardBack(eType: number) {
        eType = cv.Number(eType);
        eType = Math.floor(eType);
        if (eType >= 0 && eType < cv.Enum.CardBack.CARD_BACK_MAX) {
            let kValue = cv.StringTools.formatC("%d", eType);
            this.SaveStringByCCFile(this.cardBackKey, kValue);
            this.m_eCardBackType = eType;
        }
    }


    public SetTableBack(eType: number, starRoom: boolean = false) {
        eType = cv.Number(eType);
        eType = Math.floor(eType);
        if (eType >= cv.Enum.TableBack.TABLE_BACK_STAR && eType < cv.Enum.TableBack.TABLE_BACK_MAX) {
            let kValue = cv.StringTools.formatC("%d", eType);
            if (starRoom) {

                this.SaveStringByCCFile(this.tableBackKey_star, kValue);  //明星桌桌布
                this.m_eTableBackType_star = eType;
            } else {
                this.SaveStringByCCFile(this.tableBackKey, kValue);
                this.m_eTableBackType = eType;
            }
        }
    }

    public SetCardFaceJackfruit(eType: number) {
        eType = cv.Number(eType);
        eType = Math.floor(eType);
        if (eType >= 0 && eType < cv.Enum.CardFace.CARD_FACE_MAX) {
            let kValue = cv.StringTools.formatC("%d", eType);
            this.SaveStringByCCFile(this.cardFaceJackfruitKey, kValue);
            this.m_eCardFaceJackfruitType = eType;
        }
    }

    /**
     * 设置奥马哈牌面
     * @param eType 
     */
    public SetCardFacePlo(eType: number): void {
        eType = cv.Number(eType);
        eType = Math.floor(eType);
        if (eType >= 0 && eType < cv.Enum.CardFace.CARD_FACE_MAX) {
            let kValue = cv.StringTools.formatC("%d", eType);
            this.SaveStringByCCFile(this.cardFacePloKey, kValue);
            this.m_eCardFacePloType = eType;
        }
    }

    /**
     * 获取奥马哈牌面索引
     * @returns 
     */
    public GetCardFacePlo(): number {
        return this.m_eCardFacePloType;
    }

    public GetCardBack() {
        return this.m_eCardBackType;
    }

    public GetCardFace() {
        return this.m_eCardFaceType;
    }

    //bStar 当前是否是明星桌
    public GetTableBack(bStarRoom: boolean = false) {
        if (bStarRoom) {
            return this.m_eTableBackType_star;
        } else {
            return this.m_eTableBackType;
        }
    }

    public GetCardFaceJackfruit() {
        return this.m_eCardFaceJackfruitType;
    }

    public IsFaction(param: string): number {
        let Dig = '/';
        let idx = param.indexOf(Dig);
        return idx;
    }
    /**
     * 
    自由加注本质是生成一个Step的数组  这样上滑的时候 根据进度取数组里面的值来生成下注筹码
        ChipsStep 为自由加注的数组  
        u32MiniRaise 是最小下注筹码
        u32Stake 是最大下注筹码
        isSmall 判断是否微局

        ChipsStep 的第一个值为 0 第二个值为最小下注 

        定义一个i32Stake  初始值为最小筹码u32MiniRaise
        通过调用 GetRaiseLevel 函数 传递i32Stake 获取一个i32Step值
        定义一个while循环  只要i32Stake  不等于 最大下注 就让 i32Stake累加一个i32Step值
        如果累加后的i32Stake 大于最大下注  就让它等于最大下注终止循环
        然后把得到的 i32Stake 值存入ChipsStep数组
        用累加后的 i32Stake 值 再调用 GetRaiseLevel 函数获取最新的i32Step值

        微局和非微局的区别在于调用 GetRaiseLevel 时  微局直接调用，可以得到小数 

        非微局需要先把 参数转换为客户端显示值 也就是除100  然后再把得到的值 转换成服务器值乘100  
        这样最终存入 ChipsStep 里的数据就是非小数的值

        最终客户端自由加注条 根据上滑的进度  对应 ChipsStep数组的值来显示和下注
        如果上滑到最上面就是allin
     */
    public SplitChipsLevel(u32Stake: number, u32MiniRaise: number, isSmall: number): number[] {
        let ChipsStep: number[] = [];
        ChipsStep.push(0);
        let i32Stake = u32MiniRaise;
        let i32Step = 0;
        if (isSmall) {
            i32Step = this.GetRaiseLevel(i32Stake);
        }
        else {
            i32Step = cv.StringTools.serverGoldByClient(this.GetRaiseLevel(cv.StringTools.clientGoldByServer(i32Stake)));
        }
        ChipsStep.push(u32MiniRaise);

        while (i32Stake != u32Stake) {
            if (i32Stake + i32Step <= u32Stake) {
                i32Stake += i32Step;
            }
            else {
                i32Stake = u32Stake;
            }
            ChipsStep.push(i32Stake);
            if (isSmall) {
                i32Step = this.GetRaiseLevel(i32Stake);
            }
            else {
                i32Step = cv.StringTools.serverGoldByClient(this.GetRaiseLevel(cv.StringTools.clientGoldByServer(i32Stake)));
            }

        }

        return ChipsStep;
    }

    public GetRaiseLevel(u32Stake: number): number {
        let i32Step: number = 1;
        if (u32Stake < 50) {
            i32Step = 1;
        }
        else if (u32Stake < 100) {
            i32Step = 5;
        }
        else if (u32Stake < 1000) {
            i32Step = 10;
        }
        else if (u32Stake < 10000) {
            i32Step = 100;
        }
        else if (u32Stake < 100000) {
            i32Step = 1000;
        }
        else if (u32Stake < 1000000) {
            i32Step = 2000;
        }
        else if (u32Stake < 10000000) {
            i32Step = 10000;
        }
        else if (u32Stake < 100000000) {
            i32Step = 20000;
        }
        else {
            i32Step = 100000;
        }
        return i32Step;
    }

    public Fraction2Decimal(Value: string): number {
        let Dig = "/";
        let idx = Value.indexOf(Dig);

        if (idx != -1) {
            let Numerator: string = Value.substr(0, Value.indexOf('/'));
            let Denominator: string = Value.substr(Value.lastIndexOf('/') + 1, Value.length);

            let fNumerator = parseFloat(Numerator);
            let fDenominator = parseFloat(Denominator);
            return fNumerator / fDenominator;
        }
        return 0;
    }

    public round_double(number: number) {
        return Math.round(number);
    }

    public RoundingNum(Num: number) {
        if (Num > 100 && Num <= 1000) {
            let f32Value = this.round_double(Num / 10);//抹掉个位数
            return Math.floor(f32Value * 10);
        }
        else if (Num > 1000 && Num <= 10000) {
            let f32Value = this.round_double(Num / 100);//抹掉十位数 以下依此类推
            return Math.floor(f32Value * 100);
        }
        else if (Num > 10000 && Num <= 100000) {
            let f32Value = this.round_double(Num / 1000);
            return Math.floor(f32Value * 1000);
        }
        else if (Num > 100000 && Num <= 1000000) {
            let f32Value = this.round_double(Num / 10000);
            return Math.floor(f32Value * 10000);
        }
        else if (Num > 1000000 && Num <= 10000000) {
            let f32Value = this.round_double(Num / 100000);
            return Math.floor(f32Value * 100000);
        }
        else if (Num > 10000000 && Num <= 100000000) {
            let f32Value = this.round_double(Num / 1000000);
            return Math.floor(f32Value * 1000000);
        }
        else if (Num > 100000000) {
            let f32Value = this.round_double(Num / 1000000);
            return Math.floor(f32Value * 1000000);
        }
        else {
            return Num;
        }
        return Num;
    }

    SaveStringByCCFile(kkey: string, kValue: string) {
        cc.sys.localStorage.setItem(kkey, kValue);
        //存keychain
        if (kkey == "user_account") {
            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.invokeSyncFunc(cv.nativeCMD.KEY_SAVE_USERNAME_INKEY, { "username": kValue }); //保存账号到手机
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                cv.native.writeToFileForAndroid("pkuserinfo", kValue);
            }
        } else if (kkey == "user_password") {
            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.invokeSyncFunc(cv.nativeCMD.KEY_SAVE_PASSWORD_INKEY, { "password": kValue }); //保存账号到手机
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                cv.native.writeToFileForAndroid("pkpassinfo", kValue);
            }
        }
    }


    GetStringByCCFile(kkey: string): string {
        let kRet = cc.sys.localStorage.getItem(kkey);
        if (kRet == "" || kRet == null) {
            if (kkey == "user_account") {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    kRet = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_GET_USERNAME_INKEY); //保存账号到手机
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    let result: string = cv.native.readFileForAndroid("pkuserinfo");
                    return result;
                }
            } else if (kkey == "user_password") {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    kRet = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_GET_PASSWORD_INKEY); //保存账号到手机
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    let result: string = cv.native.readFileForAndroid("pkpassinfo");
                    return result;
                }
            }
        }
        return kRet;
    }

    RemoveStringByCCFile(kkey: string): void {
        cc.sys.localStorage.removeItem(kkey);
    }

    /**
     * 数组去重(仿c++的std::unique)
     */
    unique(array: any[]): any[] {
        let vRet: any[] = [];

        if (cv.StringTools.getArrayLength(array) > 0) {
            let json: object = {};
            for (let i = 0; i < array.length; ++i) {
                let key = array[i];
                if (!json[key]) {
                    json[key] = true;
                    vRet.push(key);
                }
            }
        }

        return vRet;
    }

    /**
     * 音效声音是否开启(true-开启, false-关闭)
     */
    isSoundEffectOpen(): boolean {
        let value = cc.sys.localStorage.getItem(this.getSoundEffectKey());
        value = value == null || value === "true";
        return value;
    }

    /**
     * 设置声音
     */
    setSoundEffect(bSlience: boolean): void {
        bSlience = Boolean(bSlience);

        let key: string = this.getSoundEffectKey();
        let value: string = cv.String(bSlience);
        cc.sys.localStorage.setItem(key, value);
    }

    getSoundEffectKey() {
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     return "client_slience_jackfruit_key";
        // }
        return "client_slience_key";
    }

    setVibrate(isVibrate: boolean) {
        cc.sys.localStorage.setItem(this.getVibrateKey(), cv.String(isVibrate));
    }

    isVibrate() {
        var isVibrate = cc.sys.localStorage.getItem(this.getVibrateKey());
        isVibrate = isVibrate == null || isVibrate === "true";
        return isVibrate;
    }

    getVibrateKey() {
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     return "client_vibrate_jackfruit_key";
        // }
        return "client_vibrate_key";
    }

    setShowBarrage(isShowBarrage: boolean) {
        cc.sys.localStorage.setItem(this.getShowBarrageKey(), cv.String(isShowBarrage));
    }

    isShowBarrage() {
        var isShowBarrage = cc.sys.localStorage.getItem(this.getShowBarrageKey());
        return isShowBarrage == null || isShowBarrage === "true";
    }

    getShowBarrageKey() {
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     return "client_show_barrage_jackfruit_key";
        // }
        if (cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat) {
            return "client_show_barrage_starseat_key";
        }
        return "client_show_barrage_key";
    }

    setShowGiftAnim(isShowGiftAnim: boolean) {
        cc.sys.localStorage.setItem(this.getShowGiftAnimKey(), cv.String(isShowGiftAnim));
    }

    isShowGiftAnim() {
        var isShowBarrage = cc.sys.localStorage.getItem(this.getShowGiftAnimKey());
        return isShowBarrage == null || isShowBarrage === "true";
    }

    getShowGiftAnimKey() {
        return "client_GiftAnim_key";
    }

    setBetPreflop(value: boolean): void {
        cc.sys.localStorage.setItem(this.getBetPreflopKey(), cv.String(value));
    }

    isBetPreflop(): boolean {
        let value: any = cc.sys.localStorage.getItem(this.getBetPreflopKey());
        return value === null || value === "true";
    }

    getBetPreflopKey(): string {
        return "client_BetPreflop_key";
    }

    setPlayVoice(isPlayVoice: boolean) {
        cc.sys.localStorage.setItem(this.getPlayVoiceKey(), cv.String(isPlayVoice));
    }

    isPlayVoice() {
        var isPlayVoice = cc.sys.localStorage.getItem(this.getPlayVoiceKey());
        isPlayVoice = isPlayVoice == null || isPlayVoice === "true";
        return isPlayVoice;
    }

    getPlayVoiceKey() {
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     return "client_play_voice_jackfruit_key";
        // }
        return "client_play_voice_key";
    }

    /**
     * 设置是否进入后台
     */
    setEnterbackState(bEnter: boolean = false): void {
        this._bEnterbackground = bEnter;
    }

    /**
     * 获取是否进入后台状态
     */
    getEnterbackState(): boolean {
        return this._bEnterbackground;
    }


    /**
     * 是否播放背景音乐(true-播放, false-关闭)
     */
    isPlayMusic() {
        let Key = "client_music_key";
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     Key = "jackfruit_music_key_new"
        // }
        return this.GetStringByCCFile(Key) == "false" ? false : true;
    }

    /**
    * 设置是否播放背景音乐
    */
    SetPlayMusic(b: boolean): void {
        b = Boolean(b);
        let value: string = cv.String(b);
        let Key = "client_music_key";
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     Key = "jackfruit_music_key_new"
        // }
        this.SaveStringByCCFile(Key, value);
    }

    GetBase64String(kName: string): string {
        let kPath: string;
        kPath += kName;

        if (cc.sys.isNative) {
            let data = jsb.fileUtils.getDataFromFile(kName);
            let _baseData: string = aesHandler.bytesToBase64(data);
            return _baseData;
        }

        return "";
    }

    getGreenColor() {
        let greenColor: cc.Color = cc.color(0, 255, 0);

        // 游戏场景 与外面绿色使用不一致
        if (cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE &&
            cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE_AOF) {
            greenColor = cc.color(67, 198, 116);  //#43C674
        }

        return greenColor;
    }

    getRedColor() {
        let redColor: cc.Color = cc.color(255, 0, 0);

        // 游戏场景 与外面红色使用不一致
        if (cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE &&
            cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE_AOF) {
            redColor = cc.color(228, 69, 69);  //#e44545
        }

        return redColor;
    }

    /**
     * 通过指定语言判断赢面是否该显示红色(默认为当前设置的语言)
     * @param laguage 
     */
    isRedWinColorByLanguage(laguage?: LANGUAGE_TYPE): boolean {
        let isRed: boolean = false;

        if (!laguage || typeof laguage === "undefined") laguage = cv.config.getCurrentLanguage();
        if (laguage === cv.Enum.LANGUAGE_TYPE.en_US || laguage === cv.Enum.LANGUAGE_TYPE.th_PH) {
            isRed = false;
        }
        else {
            isRed = true;
        }

        return isRed;
    }

    /**
     * 通过语言获取赢的颜色
     */
    getWinColor(): cc.Color {
        let redColor: cc.Color = this.getRedColor();
        let greenColor: cc.Color = this.getGreenColor();
        return this.isRedWinColorByLanguage() ? redColor : greenColor;
    }

    /**
     * 通过语言获取输的颜色
     */
    getLoseColor(): cc.Color {
        let greenColor: cc.Color = this.getGreenColor();
        let redColor: cc.Color = this.getRedColor();
        return this.isRedWinColorByLanguage() ? greenColor : redColor;
    }

    getLanguageStr(lang: string): string {
        let indx = 0;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            indx = 0;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            indx = 2;
        }
        else {
            indx = 1;
        }
        let strArr = lang.split("(*)");
        if (strArr.length < indx + 1) {
            indx = 0;
        }
        return strArr[indx];
    }

    /**
     * 遍历目标节点   采用广度遍历
     */
    public ThroughNode(obj: cc.Node) {
        let objchilds = obj.children;
        let childs: cc.Node[] = [];
        childs = childs.concat(objchilds);
        let count = 0;
        while (childs.length > count) {
            let child = childs[count];
            count++;
            if (child.childrenCount > 0) {
                let childarr = child.children;
                for (let index = 0; index < childarr.length; index++) {
                    childs.push(childarr[index]);
                }
            }
            let sp = child.getComponent(cc.Sprite);
            console.log(cv.StringTools.formatC("length:%d count:%d  obj.childrenCount:%d", childs.length, count, obj.childrenCount));
            if (sp && !cc.isValid(sp.spriteFrame, true)) {
                console.log(cv.StringTools.formatC("sp:%s", sp.name));
                sp.spriteFrame = null;
            }

        }
    }

    //获取game中文名
    public displayChineseName(str: string): string {
        //模式匹配
        if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN) {
            let gameMap: HashMap<string, string> = new HashMap();
            gameMap.add("HL", "德州扑克");
            gameMap.add("HLZ", "急速扑克");
            gameMap.add("HLB", "暴击德州扑克");
            gameMap.add("HS", "短牌德州");
            gameMap.add("HSZ", "急速短牌");
            gameMap.add("HSB", "暴击短牌");
            gameMap.add("AL", "AoF德州扑克");
            gameMap.add("AS", "AoF短牌");
            gameMap.add("AN", "必下");
            gameMap.add("JF", "菠萝蜜");
            gameMap.add("PLO", "底池限注奥马哈");
            let pattern = new RegExp("[0-9]");
            let array = str.match(pattern);

            if (array != null) {
                let strArray = str.split(array[0]);

                if (gameMap.has(strArray[0])) {
                    return gameMap.get(strArray[0]) + "-" + str.replace(strArray[0], "");
                }
            }
        }
        return str;
    }


    /**
     * 打印一个对象所有的值
     * @param obj 
     */
    public logObject(obj: Object, tag: string = "打印：") {
        this.logMsg(tag, `对象信息\n${JSON.stringify(obj, null, 2)}`);
    }


    /**
     * 将一个对象的所有属性拷贝给另外一个对象
     */
    public copyObjectProperties(obj: any, soureObj: Object) {
        if (!soureObj) {
            console.log("copyObjectProperties 不能传入空对象");
            return;
        }

        if (!obj) {
            obj = {};
        }
        for (var i in soureObj) {
            obj[i] = soureObj[i];
        }
        cv.tools.logObject(obj);
    }
    /**
     * 输出信息
     * @param tag 
     * @param msg 
     */
    public logMsg(tag: string, msg: string) {
        console.log(`${tag} -> ${msg}`);
    }

    //将秒转化为小时分钟
    secondFormat(result) {
        let h = Math.floor(result / 3600 % 24);
        let m = Math.floor(result / 60 % 60);
        if (h < 1) {
            if (m < 10) {
                return result = "00:" + "0" + m;
            }
            return result = "00:" + m;
        } else {
            if (h < 10) {
                return result = "0" + h + ":" + m;
            }
            else {
                return result = h + ":" + m;
            }
        }
    }

    formatTime(second): string {
        let now = new Date(second);
        // Y = now.getFullYear(),
        // M = now.getMonth()+1,
        // D= now.getDate(),
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        //M = M<10?'0'+M:M;
        //D = D<10?'0'+D:D;
        let hour = (h < 10 ? '0' + h.toString() : h)
        let min = m < 10 ? '0' + m : m;
        let sec = s < 10 ? '0' + s : s;
        return hour + ':' + min + ':' + sec;

        // return [parseInt((second / 60 / 60).toString()), second / 60 % 60, second % 60].join(":")
        //     .replace(/\b(\d)\b/g, "0$1");
    }

    public GetFriendLevelName(intimacy: number): string {
        let level = -1;
        if (intimacy < 100 && intimacy >= 0) {
            level = 0;
        }
        else if (intimacy <= 299 && intimacy >= 100) {
            level = 1;
        }
        else if (intimacy <= 999 && intimacy >= 300) {
            level = 2;
        }
        else if (intimacy <= 2999 && intimacy >= 1000) {
            level = 3;
        }
        else if (intimacy <= 6999 && intimacy >= 3000) {
            level = 4;
        }
        else if (intimacy <= 12999 && intimacy >= 7000) {
            level = 5;
        }
        else if (intimacy <= 19999 && intimacy >= 13000) {
            level = 6;
        }
        else if (intimacy <= 49999 && intimacy >= 20000) {
            level = 7;
        }
        else if (intimacy >= 50000) {
            level = 8;
        }

        return level > -1 ? cv.config.getStringData("Star_friend_" + level) : "";
    }

    public getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    getActualSize(node: cc.Node) {
        let newNode = new cc.Node();
        let namelabel = newNode.addComponent(cc.Label);
        namelabel.fontSize = node.getComponent(cc.Label).fontSize;
        let actualSize = cv.resMgr.getLabelStringSize(namelabel, node.getComponent(cc.Label).string);
        newNode.destroy();
        if (actualSize.width <= node.width) {
            return actualSize;
        }
        else {
            return node.getContentSize();
        }
    }

    //changecard
    public dealRaiseData(raiseArray: string[]) {
        for (let i = 0; i < raiseArray.length; i++) {
            raiseArray[i] = this.dealRaiseDataStr(raiseArray[i]);
        }
    }

    public dealRaiseDataStr(raiseArray: string): string {
        return this.dealRaiseDataNumber(cv.Number(raiseArray));
    }


    /**
     * 快捷下注通过百分比取分数
     * @param raiseArray 
     */
    public dealRaiseDataNumber(raiseArray: number): string {
        let retStr = "";

        // 百分比
        switch (raiseArray) {
            // 1/4
            case 25: retStr = cv.config.getStringData("UITableSetBetBtnValue0"); break;
            // 1/3
            case 34: retStr = cv.config.getStringData("UITableSetBetBtnValue1"); break;
            // 1/2
            case 50: retStr = cv.config.getStringData("UITableSetBetBtnValue2"); break;
            // 2/3
            case 67: retStr = cv.config.getStringData("UITableSetBetBtnValue3"); break;
            // 3/4
            case 75: retStr = cv.config.getStringData("UITableSetBetBtnValue4"); break;
            // 1
            case 100: retStr = cv.config.getStringData("UITableSetBetBtnValue5"); break;
            // 1.2
            case 120: retStr = cv.config.getStringData("UITableSetBetBtnValue6"); break;
            // 2
            case 200: retStr = "2"; break;
            // 其他
            default: retStr = (raiseArray / 100).toFixed(2); break;
        }

        return retStr;
    }

    // 将时间（秒数）转换为xx时xx分xx秒形式  支持多语言(如果 时 分为0则省略)
    public getStringByTime(time: number): string {
        // let h = Math.floor(time/3600%24);
        // let m = Math.floor((time - h * 3600) /60%60);
        // let s = time - h * 3600 - m * 60;
        let h = Math.floor(time / 3600);
        let m = Math.floor(time % 3600 / 60);
        let s = Math.floor(time % 60);
        if (h == 0) {
            if (m == 0) {
                return s + cv.config.getStringData("seconds");
            } else {
                return m + cv.config.getStringData("minute") + s + cv.config.getStringData("seconds");
            }
        } else {
            return h + cv.config.getStringData("hour") + m + cv.config.getStringData("minute") + s + cv.config.getStringData("seconds");
        }
    }

    // 将时间（秒数）转换为天数 不足一天则转换为xx时xx分xx秒形式  支持多语言(如果 时 分为0则省略)
    public getStringByDay(time: number) {
        let d = Math.floor(time / 3600 / 24);
        if (d > 0) {
            return d + cv.config.getStringData("day");
        } else {
            return this.getStringByTime(time);
        }
    }

    showError(arg, showTips: boolean = true) {
        let errorMsg = null;
        let errorType = null;
        let check = function (name) {
            return name != undefined;
        }

        if (check(arg.KVCode)) {
            if (arg.KVCode.length != 6) {
                errorMsg = "ErrorToast39";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.phoneNum)) {
            if (arg.phoneNum.length <= 0) {
                errorMsg = "ErrorToast38";
                errorType = "ToastTypeError";
            } else if (check(arg.AreaCode)) {
                if (arg.AreaCode === "86" && arg.phoneNum.length != 11) {
                    errorMsg = "ErrorToast28";
                    errorType = "ToastTypeError";
                }
            }
        }

        if (check(arg.kAccount0)) {
            let leng = cv.StringTools.getStrLen(arg.kAccount0);
            if (arg.kAccount0.length <= 0) {
                errorMsg = "ErrorCode8";
                errorType = "ToastTypeError";
            } else if (leng < 8 || leng > 32) {
                errorMsg = "ErrorToast41";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.kAccount0) && check(arg.kAccount1)) {
            if (arg.kAccount0 != arg.kAccount1) {
                errorMsg = "ErrorToast40";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.password0)) {
            let leng = cv.StringTools.getStrLen(arg.password0);
            if (arg.password0.length <= 0) {
                errorMsg = "ErrorCode9";
                errorType = "ToastTypeError";
            } else if (leng < 6 || leng > 14) {
                errorMsg = "ErrorCode7";
                errorType = "ToastTypeError";
            } else if (arg.password0.indexOf(" ") != -1) {
                errorMsg = "recetPassWord_recetPassWord_panel_des_text";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.password0) && check(arg.password1)) {
            if (arg.password0 != arg.password1) {
                errorMsg = "ErrorToast17";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.nickname)) {
            let leng = cv.StringTools.getStrLen(arg.nickname);
            if (arg.nickname.length <= 0) {
                errorMsg = "ErrorToast3";
                errorType = "ToastTypeError";
            } else if (!cv.StringTools.isClubNameFormat(arg.nickname)) {
                errorMsg = "tips_no_special_words";
                errorType = "ToastTypeWarning";
            } else if (cv.StringTools.isSensitiveWords(arg.nickname)) {
                errorMsg = "tips_no_sensitive_words";
                errorType = "ToastTypeWarning";
            } else if (leng < 4 || leng > 12) {
                errorMsg = "EditBoxNickName1";
                errorType = "ToastTypeWarning";
            }
        }


        if (errorMsg != null) {
            if (showTips) {
                cv.TT.showMsg(cv.config.getStringData(errorMsg), errorType);
            }
            return true;
        }
        return false;
    }

    // 获取默认图片路径
    getBackgroundBannerImgPath(): string {
        let backGroundImgpath = "client_type/";
        if (cv.config.isOverSeas()) {
            backGroundImgpath = backGroundImgpath + "pkc/"
        }
        else if (cv.config.isThai()) {
            backGroundImgpath = backGroundImgpath + "pkt/"
        } else {
            backGroundImgpath = backGroundImgpath + "pkw/"
        }

        let bannerName = "banner_0";
        if (cv.native.isWideScreen()) {  //如果是宽屏ipad，使用默认ipad的banner
            bannerName = "banner_1";
        }

        return backGroundImgpath + bannerName;
    }

    /**
     * 判断当前帧指引擎对象实例是否有效
     * @param node 
     * @returns true:表示有效
     */
    isValidNode(cc_obj: any): boolean {
        return cc_obj && cc.isValid(cc_obj, true);
    }

    /**
     * 安全销毁指定节点
     * @param node 
     */
    destroyNode(node: cc.Node) {
        if (this.isValidNode(node)) node.destroy();
    }
}