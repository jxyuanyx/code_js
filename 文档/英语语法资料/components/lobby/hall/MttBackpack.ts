import cv from "../cv";
import { ResourcesLoader } from "../../../../mtt/script/common/ResourcesLoader";
import { BagPrefab } from "../../../../mtt/prefab/impoker/hall/profile/bag/BagPrefab";
import MTTConnector from "../../../../mtt/script/common/MTTConnector";
import BagRecord from "../../../../mtt/prefab/impoker/hall/profile/bag/BagRecord";

/**
 * 系统设置面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MttBackpack extends cc.Component {

    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_record: cc.Button = null;
    private _backpack_web: cc.WebView = null;
    private _backpack_url: string = "&page=2";

    private mttUseWebView: boolean = false;
    private mttBag:BagPrefab = null;
    private mttBagRecord: BagRecord = null;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this.onClickBtnBack, this);
        this.btn_record.node.on("click", this.onClickBtnRecord, this);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);

        cv.resMgr.adaptWidget(this.node);
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    protected start(): void {
        this.initLanguage();
    }

    // 更新静态文本
    public initLanguage(): void {
        // 标题
        do {
            if((this.mttBagRecord && cc.isValid(this.mttBagRecord.node)) && this.mttBagRecord.node.active) {
                this.txt_title.string = cv.config.getStringData("selfView_ScrollView_Button_backpack_record");
            } else {
                this.txt_title.string = cv.config.getStringData("selfView_ScrollView_Button_backpack");
            }
        } while (false);
    }

    public show() {
        if( !this.mttUseWebView )
        {
            if (cv.config.HAVE_MTT && ( !this.mttBag || !cc.isValid(this.mttBag.node) )) {
                ResourcesLoader.instance.loadRes("mtt/hall/bag_page", cc.Prefab, null, (err, prefab)=>{
                    if (cv.config.HAVE_MTT && ( !this.mttBag || !cc.isValid(this.mttBag.node) )) {
                        if (!err && cc.isValid(prefab)) {
                            MTTConnector.instance.initMTTBag();
                            let temp = cc.instantiate(prefab);
                            this.mttBag = temp.getComponent(BagPrefab);
                            temp.parent = this.node;
                            let widget:cc.Widget = temp.getComponent(cc.Widget);
                            widget.top = 190;
                            this.mttBag.setPage();
                        } else {
                            console.log(err);
                        }
                    }
                });
            }else{
                if (this.mttBag && cc.isValid(this.mttBag.node)){
                    this.mttBag.resetBagPage();
                }
            }
            return;
        }
        if (!this._backpack_web) {
            let web = this.node.getChildByName("web");
            this._backpack_web = web.addComponent(cc.WebView);
            this._backpack_web.url = cv.dataHandler.getUserData().mtt_url + this._backpack_url;
            if (cc.sys.isNative) {
                this._backpack_web.setJavascriptInterfaceScheme("mttjs");
                let self = this;
                this._backpack_web.setOnJSCallback((webView: cc.WebView, url: string) => {
                    if (url.search("mttjs://back-normal") != -1 || url.search("mttjs://back-abnormal") != -1) {
                        if (self._backpack_web) {
                            self._backpack_web.node.removeComponent(cc.WebView);
                            self._backpack_web = null;
                        }
                        self.show();
                    }
                    else if (url.search("mttjs://WebGL") != -1) {
                        cv.config.CAN_USE_WEBGL = false;
                        self.hide();
                        cv.TT.showMsg(cv.config.getStringData("MTT_No_webgl"), cv.Enum.ToastType.ToastTypeError);
                    }
                });
            }
        }
    }

    destroyMTTBagView()
    {
        console.log("destroyMTTBagView", this.mttBag);
        if(this.mttBag && cc.isValid(this.mttBag.node))
        {
            this.mttBag.node.targetOff(this);
            this.mttBag.node.removeFromParent(true);
            this.mttBag.node.destroy();
        }
        this.mttBag = null;
    }

    destroyMTTBagRecordView()
    {
        console.log("destroyMTTBagRecordView", this.mttBag);
        if(this.mttBagRecord && cc.isValid(this.mttBagRecord.node))
        {
            this.mttBagRecord.node.targetOff(this);
            this.mttBagRecord.node.removeFromParent(true);
            this.mttBagRecord.node.destroy();
        }
        this.mttBagRecord = null;
    }

    hideMTTBag()
    {
        if( !this.mttUseWebView )
        {
            this.destroyMTTBagView();
            this.destroyMTTBagRecordView();
        }
        else
        {
            if (this._backpack_web) {
                this._backpack_web.node.removeComponent(cc.WebView);
                this._backpack_web = null;
            }
        }
    }

    public hide() {
        cv.config.setMTTWebIndex(0);
        this.node.active = false;
        this.hideMTTBag();
        
        // 恢复显示"邮件"图标
        cv.MessageCenter.send("show_mail_entrance", true);
    }

    private showRecord(show: boolean) {
        this.btn_record.node.active = !show;
        this.mttBag.node.active = !show;
        this.mttBagRecord.node.active = show;
        this.initLanguage();
    }

    private onClickBtnBack(event: cc.Event): void {
        if(this.mttBagRecord && cc.isValid(this.mttBagRecord.node) && this.mttBagRecord.node.active) {
            this.showRecord(false);
            this.mttBag.resetBagPage(false);
            return;
        }
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL
            , (target: cc.Node, actIO: number): void => {
            }
            , (target: cc.Node, actIO: number): void => {
                cv.config.setMTTWebIndex(0);
                this.hideMTTBag();
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
            });
    }

    private onClickBtnRecord(event: cc.Event): void {
        if (cv.config.HAVE_MTT && ( !this.mttBagRecord || !cc.isValid(this.mttBagRecord.node) )) {
            ResourcesLoader.instance.loadRes("mtt/hall/bag_record_page", cc.Prefab, null, (err, prefab)=>{
                if (cv.config.HAVE_MTT && ( !this.mttBagRecord || !cc.isValid(this.mttBagRecord.node) )) {
                    if (!err && cc.isValid(prefab)) {
                        let temp = cc.instantiate(prefab);
                        this.mttBagRecord = temp.getComponent(BagRecord);
                        temp.parent = this.node;
                        let widget:cc.Widget = temp.getComponent(cc.Widget);
                        widget.top = 190;
                        this.showRecord(true);
                        this.mttBagRecord.setPage();
                    } else {
                        console.log(err);
                    }
                }
            });
        } else {
            if (this.mttBagRecord && cc.isValid(this.mttBagRecord.node)) {
                this.showRecord(true);
                this.mttBagRecord.resetBagRecordPage();
            }
        }
    }

}
