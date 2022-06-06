import cv from "../../lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class JackfruitRule extends cc.Component {

    @property(cc.Node)rule_list: cc.Node[] = [];
    @property(cc.Sprite)title_img: cc.Sprite = null;
    @property(cc.Node)joinGame_btn: cc.Node = null;
    @property(cc.Node)neverRemind_btn: cc.Node = null;
    @property(cc.Label)neverRemind_label: cc.Label = null;
    @property(cc.Sprite)neverRemind_img: cc.Sprite = null;
    @property(cc.Node)next_btn: cc.Node = null;
    @property(cc.Node)last_btn: cc.Node = null;
    @property(cc.Label)number_label: cc.Label = null;
    public needPassword: boolean = false;
    public static _g_prefabInst: cc.Node = null;
    public msg: any = null;
    public isNextClose = false;
    public isInit = false;
    public isShow = false;
    public _view_number = 0;

    static getSinglePrefabInst(prefab:cc.Prefab):cc.Node
    {
        let scene = cc.director.getScene();
        if (!JackfruitRule._g_prefabInst) JackfruitRule._g_prefabInst = cc.instantiate(prefab);
        if (!scene.getChildByUuid(JackfruitRule._g_prefabInst.uuid)) {
            if (!cc.isValid(JackfruitRule._g_prefabInst, true)) {
                JackfruitRule._g_prefabInst = cc.instantiate(prefab);
            }
            scene.addChild(JackfruitRule._g_prefabInst, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        }
        return JackfruitRule._g_prefabInst;
    }

    onLoad () {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        this.initLanguage();
        this._initButtonClick();
    }

    start()
    {
        this.isInit = true;
        if(this.isShow)
        {
            this.show();
        }
    }

    onDestroy()
    {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private _initButtonClick()
    {
        this.joinGame_btn.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this.onJoinRoom();
        }, this);
        
        this.neverRemind_btn.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this.isNextClose = !this.isNextClose;
            if(this.isNextClose)
            {
                cv.tools.SaveStringByCCFile("hideJackfruitRule", "1");
                cv.resMgr.setSpriteFrame(this.neverRemind_img.node, "zh_CN/game/jackfruit/rule/checkbox_off");
            }
            else
            {
                cv.tools.RemoveStringByCCFile("hideJackfruitRule");
                cv.resMgr.setSpriteFrame(this.neverRemind_img.node, "zh_CN/game/jackfruit/rule/checkbox_on");
            }
        }, this);
    }

    public initLanguage()
    {
        cc.find("joinGame_label", this.joinGame_btn).getComponent(cc.Label).string = cv.config.getStringData("jackfruit_joinGame_label");
        cv.resMgr.setSpriteFrame(this.title_img.node, cv.config.getLanguagePath("game/jackfruit/rule/tule_title_text"))
        for (let i = 0; i < this.rule_list.length; i++) {
            let node = this.rule_list[i];
            cv.resMgr.setSpriteFrame(cc.find("rule_img",node), cv.config.getLanguagePath("game/jackfruit/rule/rule_" + i))
        }
            
        cv.resMgr.setSpriteFrame(this.next_btn, cv.config.getLanguagePath("game/jackfruit/rule/next_button"))
        cv.resMgr.setSpriteFrame(this.last_btn, cv.config.getLanguagePath("game/jackfruit/rule/last_button"))

        this.neverRemind_label.string = cv.config.getStringData("jackfruit_rule_neverRemind_label");

        let labelSize = cv.resMgr.getLabelStringSize(this.neverRemind_label);
        let imageSize = this.neverRemind_img.node.getContentSize();
        this.neverRemind_btn.setContentSize(cc.size(labelSize.width + 22 + imageSize.width, this.neverRemind_btn.getContentSize().height));
        this.neverRemind_label.node.setPosition(cc.v2(imageSize.width / 2 + 11, this.neverRemind_label.node.getPosition().y));
        this.neverRemind_img.node.setPosition(cc.v2(-labelSize.width / 2 - 11, this.neverRemind_img.node.getPosition().y));
    }
    public setData(msg:any)
    {
        this.msg = msg;
    }

    public setNeedPassword(isneedPassword)
    {
        this.needPassword = isneedPassword;
    }

    public onJoinRoom()
    {
        this.isShow = false;
        this.node.active = false;
        cv.GameDataManager.tRoomData.entry_clubid = this.msg.club_id;
        cv.GameDataManager.tRoomData.u32GameID = this.msg.game_id;
        cv.roomManager.RequestJoinRoom(this.msg.game_id, this.msg.room_id, false, this.needPassword);
    }

    public show()
    {
        this.isShow = true;
        if(this.isInit)
        {
            this.node.active = true;
            this.setViewByType(0);
        }
    }

    public onBtnNext(event, index:string)
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.setViewByType(this._view_number + 1);
    }

    public onBtnLast(event, index:string){
        cv.AudioMgr.playButtonSound('button_click');
        this.setViewByType(this._view_number - 1);
    }

    public setViewByType(index:number)
    {
        this._view_number = index;
        for (let i = 0; i < this.rule_list.length; i++) {
            this.rule_list[i].active = i==index;
        }

        this.next_btn.active = this._view_number < 2;
        this.last_btn.active = this._view_number > 0;
        this.number_label.string = (index + 1) + "/3"
    }
    // update (dt) {}
}
