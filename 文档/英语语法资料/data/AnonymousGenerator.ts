import cv from "../components/lobby/cv";
import { HashMap } from "../common/tools/HashMap";
import { LANGUAGE_TYPE } from "../common/tools/Enum";

/**
 * 匿名生成器
 */
export class AnonymousGenerator {
    static g_class_name: string = "AnonymousGenerator";
    private static _g_instance: AnonymousGenerator = null;
    private _data_map: HashMap<LANGUAGE_TYPE, string[][]> = new HashMap();

    // 中文库
    private _am_zh_CN_data: string[][] = [
        ["诸葛亮", "安其拉", "白起", "不知火舞", "妲己", "狄仁杰", "典韦", "韩信", "老夫子", "刘邦", "干将莫邪", "刘禅", "鲁班七号", "墨子", "孙膑", "孙尚香", "孙悟空", "项羽", "亚瑟", "周瑜", "庄周", "蔡文姬", "甄姬", "廉颇", "程咬金", "后羿", "扁鹊", "大乔", "钟无艳", "小乔", "王昭君", "虞姬", "李元芳", "张飞", "刘备", "牛魔张良", "兰陵王", "露娜", "貂蝉", "达摩", "曹操", "芈月", "荆轲", "高渐离", "钟馗", "花木兰", "关羽", "李白", "宫本武藏", "吕布", "嬴政", "娜可露露", "武则天", "赵云", "姜子牙", "盾山", "明世隐", "司马懿", "女娲", "孙策", "梦奇", "元歌", "苏烈", "米莱狄", "百里玄策", "狂铁", "百里守约", "弈星", "铠", "裴擒虎", "鬼谷", "杨玉环", "干将莫邪", "公孙离"],
        ["大天狗", "酒吞童子", "荒川之主", "阎魔", "两面佛", "小鹿男", "茨木童子", "青行灯", "妖刀姬", "一目连", "花鸟卷", "辉夜姬", "荒", "彼岸花", "雪童子", "山风", "玉藻前", "御馔津", "面灵气", "鬼切", "白藏主", "八岐大蛇", "不知火", "大岳丸", "泷夜叉姬", "云外镜", "鬼童丸", "缘结神", "铃鹿御前", "紧那罗", "千姬", "御怨般若", "缚骨清姬", "初翎山风", "奴良陆生", "卖药郎", "鬼灯", "阿香", "犬夜叉", "杀生丸", "桔梗", "黑崎一护"],
        ["任嘉伦", "黎明", "刘德华", "迪丽热巴", "朱一龙", "邓伦", "杨洋", "杨紫", "胡歌", "蔡徐坤", "王俊凯", "肖战", "黄景瑜", "霍尊", "华晨宇", "罗云熙", "高以翔", "李沁", "肖茵", "宝儿", "白宇", "袁冰妍", "王一博", "张哲瀚", "杨幂", "黄子韬", "鹿晗", "宋茜", "唐嫣", "范丞丞", "鞠婧祎", "古天乐", "蒋欣", "李现", "靳东", "郑恺", "宋轶", "范冰冰", "李光洁", "李易峰", "谭松韵", "郑爽", "郝蕾", "虞书欣", "陈钰琪", "胡一天", "邢昭林", "吴希泽", "王大陆", "王凯", "王耀庆", "周震南", "卓依婷", "易烊千玺", "熊梓淇", "许凯", "郭麒麟", "任重", "金瀚", "朱正廷", "张学友", "甘婷婷", "王源", "许魏洲", "许佳琪", "黄家驹", "朱主爱", "张新成", "段奥娟", "刘诗诗", "赵丽颖", "周深"],
    ];

    // 英文库(暂无)
    private _am_en_US_data: string[][] = [];

    private constructor() {
        this._init();
    }

    static getInstance(): AnonymousGenerator {
        if (!AnonymousGenerator._g_instance) {
            AnonymousGenerator._g_instance = new AnonymousGenerator();
        }
        return AnonymousGenerator._g_instance;
    }

    private _init(): void {
        // 语言映射
        this._data_map.clear();
        this._data_map.add(LANGUAGE_TYPE.zh_CN, this._am_zh_CN_data);       // 中文
        this._data_map.add(LANGUAGE_TYPE.en_US, this._am_en_US_data);       // 英文
    }

    /**
     * 获取临时匿名
     * @param lanType       语言索引
     * @param uid           玩家id(非中文库才生效, 默认0)
     * @param seatViewID    玩家椅子视图id(非中文库才生效, 默认0)
     * @param libIdx        库索引(默认-1, 库随机, 然后库中再随机)
     */
    getAnonymousName(lanType: LANGUAGE_TYPE, uid: number = 0, seatViewID: number = 0, libIdx: number = -1,): string {
        let retValue: string = "";
        let data: string[][] = this._data_map.get(lanType);

        if (data) {
            switch (lanType) {
                // 中文
                case LANGUAGE_TYPE.zh_CN: {
                    if (libIdx < 0 || libIdx >= data.length) {
                        libIdx = cv.StringTools.randomRange(0, data.length);
                        libIdx = Math.floor(libIdx);
                    }

                    let nameIdx: number = cv.StringTools.randomRange(0, data[libIdx].length);
                    nameIdx = Math.floor(nameIdx);
                    retValue = data[libIdx][nameIdx];
                } break;

                // 英文以及其他语言, 自己的昵称"Hero", 其他玩家"Player1", "Player2", "Player3"...按照顺序显示
                default: {
                    if (uid === cv.dataHandler.getUserData().u32Uid) {
                        retValue = "Hero";
                    }
                    else {
                        retValue = `Player${seatViewID}`;
                    }
                } break;
            }
        }
        else {
            console.error(`${AnonymousGenerator.g_class_name}: Error, language[${lanType}] library[${libIdx}] does not exist, [${uid}, ${seatViewID}]`);
        }

        return retValue;
    }
}
