import App from '../../../gamecore/App';
import { BaseComponent } from '../../../gamecore/ui/baseview/imp/BaseComponent';
import { CHIP_TYPES, DataConfig } from '../../GameConfig';
import ListItem from '../../../gamecore/ui/components/common/ListItem';
import { formatCurrency, fromatChip } from '../../gameHelper/AthHelper';
import { SEASONPAGE } from './SeasonTask';
import { GoodsEnum } from '../../../gamecore/enums/GoodsEnum';
import { RedTipService, REDTIP_MODULE } from '../../services/RedTipService';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
const COLOR = [
    cc.Color.WHITE.fromHEX("#CC2600"),
    cc.Color.WHITE.fromHEX("#3E36AD"),
    cc.Color.WHITE.fromHEX("#1B1944"),
];
@ccclass
export default class SeasonItemTask extends ListItem {

    UIBindData={
        icon:null,
        desc:"",
        progress:"",
        receive:"",
        value:""
    }

    @property(cc.Node)
    anim_reward:cc.Node = null;

    @property([cc.SpriteFrame])
    status:cc.SpriteFrame[] = [];

    @property(cc.Node)
    progress:cc.Node = null;


    setData(index:number,data?:any){
        super.setData(index,data);
        this.UIBindData.desc=data.task_desc.length > 25?data.task_desc.substr(0,25)+"...":data.task_desc;
        let progress=Math.min(data.count,data.value);
        this.UIBindData.progress=progress+"/"+data.value;
        this.progress.getComponent(cc.ProgressBar).progress = progress/data.value;
       
        this.UIBindData.icon = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+data.reward_type);
        this.UIBindData.value = (data.reward_type==GoodsEnum.SeasonPoint||data.reward_type==GoodsEnum.DIAMOND)?fromatChip(data.reward_value):formatCurrency(data.reward_value);
        this._setState(data.status);
    }

    _setState(state:number){
        
        this.UI_BTNS.get("receive").getComponent(cc.Sprite).spriteFrame = this.status[state];
        this.UI_LBS.get("receive").color = COLOR[state];
        this.anim_reward.active=(state==0);
        this.UIBindData.receive = App.LangManager.getTxtByKey((state==2)?"received":"receive");
        this.UI_BTNS.get("receive").getComponent(cc.Button).interactable=(state==0)
    }
    
    
    async onReceiveClick(){
        let prize="<color=#D5E3FF>%s</color> X <color=#1CDF18>%s</color>";
        let prizeName=App.LangManager.getTxtByKey("prizeName")[this._data.reward_type];
        prize=cc.js.formatStr(prize,prizeName,(this._data.reward_type==GoodsEnum.TICKET||this._data.reward_type==GoodsEnum.BONUSCASH||this._data.reward_type == GoodsEnum.CASH)?formatCurrency(this._data.reward_value):fromatChip(this._data.reward_value));
        let data=await App.HttpManager.postAsync("season_api/receive_season_task_reward",{task_id:this._data.task_id});
        if(data){
            App.DlgManager.showDlg("toast",{title:"Congratulations",content:prize});
            this._setState(2);
            this._data.status=2;
            cc.game.emit(SEASONPAGE,this._data.task_id);
            //清红点
            RedTipService.getInstance().updateRedTipStatus(REDTIP_MODULE.SEASON_TASK,-1);
        }
    }
}
