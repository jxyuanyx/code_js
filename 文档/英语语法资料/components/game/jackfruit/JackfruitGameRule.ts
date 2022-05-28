import cv from "../../lobby/cv";

const {ccclass, property} = cc._decorator;

@ccclass
export class JackfruitGameRule extends cc.Component {

    @property(cc.Node)title_text: cc.Node = null;
    @property(cc.ScrollView)scrollview: cc.ScrollView = null;
    _node_list:cc.Node[] = [];
    isinit:boolean = false;

    onLoad () {        
        if (cv.config.IS_IPHONEX_SCREEN) {
            cc.find("view_panel",this.node).getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
            cc.find("title_panel",this.node).getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
        cv.resMgr.setSpriteFrame(this.title_text, cv.config.getLanguagePath("game/jackfruit/gamerule/game_rule_title"))
        for (let i = 0; i < 5; i++) {
            let num = this.getNewLable();
            num.string = (i + 1) + ".";
            let label = this.getNewLable();
            label.string = cv.config.getStringData("jackfruit_rule_label_"+i);
            this.scrollview.content.addChild(num.node);
            this.scrollview.content.addChild(label.node);
            this._node_list.push(num.node);
            this._node_list.push(label.node);
            
            if(i < 4)
            {
                let img = new cc.Node();
                img.addComponent(cc.Sprite);
                cv.resMgr.setSpriteFrame(img, cv.config.getLanguagePath("game/jackfruit/gamerule/game_rule_" + i))
                this.scrollview.content.addChild(img);
                this._node_list.push(img);
            }

            if(i == 2)
            {
                let label_0 = this.getNewChildLable();
                label_0.string = cv.config.getStringData("jackfruit_rule_label_"+i +"_Child_0");
                let label_1 = this.getNewChildLable();
                label_1.string = cv.config.getStringData("jackfruit_rule_label_"+i +"_Child_1");
                this.scrollview.content.addChild(label_0.node);
                this.scrollview.content.addChild(label_1.node);
                this._node_list.push(label_0.node);
                this._node_list.push(label_1.node);
            }else if(i == 3)
            {
                let label_0 = this.getNewChildLable();
                label_0.string = cv.config.getStringData("jackfruit_rule_label_"+i +"_Child");
                this.scrollview.content.addChild(label_0.node);
                this._node_list.push(label_0.node);
            }
        }
    }

    onDestroy()
    {
        this.isinit = false;
    }

    public getNewLable():cc.Label
    {
        let label:cc.Label = (new cc.Node()).addComponent(cc.Label);
        label.node.opacity = 127;
        label.getComponent(cc.Label).fontSize = 42;
        label.getComponent(cc.Label).lineHeight = 60;
        label.node.setAnchorPoint(0, 1);
        return label;
    }

    public getNewChildLable():cc.Label
    {
        let label:cc.Label = (new cc.Node()).addComponent(cc.Label);
        label.node.opacity = 230;
        label.fontSize = 42;
        label.node.setAnchorPoint(0, 1);
        return label;
    }

    public onBtnClose(event, str:string)
    {
        if(str == "btn")
        {
            cv.AudioMgr.playButtonSound('close');
        }
        this.node.active = false;
		// cv.StatusView.show(true);
        this.node.active = false;
    }

    updateView()
    {
        if(this.isinit) return;
        this.isinit = true;
        let height = 0;
        let index = 0;
        for (let i = 0; i < 5; i++) {
            height += 60;
            this._node_list[index++].setPosition(cc.v2(-430 , -height));
            this._node_list[index].setPosition(cc.v2(-370, -height));
            height += cv.resMgr.getLabelStringSize(this._node_list[index++].getComponent(cc.Label)).height + 10;

            if(i < 4)
            {
                this._node_list[index].setPosition(cc.v2(-40, -height - this._node_list[index].getContentSize().height / 2));
                height += this._node_list[index++].getContentSize().height;
            }

            if(i == 2)
            {
                height + 16;
                this._node_list[index].setPosition(cc.v2(-370, -height));
                height += cv.resMgr.getLabelStringSize(this._node_list[index++].getComponent(cc.Label)).height + 10;
                height + 14;
                this._node_list[index].setPosition(cc.v2(-370, -height));
                height += cv.resMgr.getLabelStringSize(this._node_list[index++].getComponent(cc.Label)).height + 10;
            }else if(i == 3)
            {
                height + 16;
                this._node_list[index].setPosition(cc.v2(-370, -height));
                height += cv.resMgr.getLabelStringSize(this._node_list[index++].getComponent(cc.Label)).height + 10;
            }
        }
        this.scrollview.content.setContentSize(cc.size(this.scrollview.content.getContentSize().width, height + 50));
    }

    show()
    {
        this.node.active = true;
        this.updateView();
        this.scrollview.content.setPosition(cc.v2(0, 0));
    }

    // update (dt) {}
}
