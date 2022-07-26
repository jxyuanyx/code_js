export enum REDTIP_MODULE{
    MENU=100,
    SEASON=200,

    MENU_ACH=0,     // 成就
    SEASON_REWARD=1,// 赛季段位
    SEASON_TASK=2,  // 赛季任务
    SEASON_WHEEL=3, // 赛季转盘
    MENU_MESSAGE=4,  // 消息
    ANNOUNCEMENT=5,  //公告
    RECORD=6,       // 对战记录
    NEW_TASK=7,//新手充值
    

    
    
}

export const EVENT_REDTIP:string="event_redtip";

export class RedTipService{

    private static _redTipService:RedTipService;

    private  RedTipConfig={
        100:{
            desc:"大厅菜单",
            parentId:null,
            num:0
        },

        0:{
            desc:"菜单-成就",
            parentId:100,
            num:0
        },

        4:{
            desc:"菜单-消息-系统消息",
            parentId:100,
            num:0
        },

        5:{
            desc:"菜单-消息-公告",
            parentId:100,
            num:0
        },

        3:{
            desc:"赛季-转盘",
            parentId:200,
            num:0
        },

        200:{
            desc:"赛季-大厅底部",
            parentId:null,
            num:0
        },

        1:{
            desc:"赛季奖励",
            parentId:200,
            num:0
        },
        2:{
            desc:"赛季任务奖励",
            parentId:200,
            num:0
        },
        6:{
            desc:"历史纪录-大厅底部",
            parentId:null,
            num:0
        },
        7:{
            desc:"新手充值",
            parentId:null,
            num:0
        },
    }
    

    static getInstance(){
        if(!this._redTipService){
            this._redTipService=new RedTipService();
        }
        return this._redTipService;
    }

    getRedTipNumById(id:REDTIP_MODULE){
        let num:number=0;
        for(let key in this.RedTipConfig){
            let config=this.RedTipConfig[key];
            if(config.parentId==id){
                num+=config.num;
            }
        }
        num+=(this.RedTipConfig[id]?.num || 0);
        return num;
    }

    activeRedTip(node:cc.Node,...keys:REDTIP_MODULE[]){
        for(let i=0;i<keys.length;i++){
            node.active=this.getRedTipNumById(keys[i])>0;
            if(node.active)return
        }
    }

    /*
    activeRedTipNum(node:cc.Node,key:REDTIP_MODULE){
        this.activeRedTip(node,key);
        if (node.getChildByName("lb_num")) {
            node.getChildByName("lb_num").getComponent(cc.Label).string = String(this.getRedTipNumById(key));
        }
    }*/
    
    updateRedTipStatus(key:REDTIP_MODULE,num:number){
        let config=this.RedTipConfig[key];
        if(config){
            config.num+=num;
            config.num=Math.max(config.num,0);
            cc.game.emit(EVENT_REDTIP,key,config.num);

            //更新父节点的状态
            if(config.parentId!=key){
                cc.game.emit(EVENT_REDTIP,config.parentId,this.getRedTipNumById(config.parentId));
            }
        }
    }

    setRedTipNum(key:REDTIP_MODULE,num:number){
        let config=this.RedTipConfig[key];
        if(config){
            config.num=num;
            cc.game.emit(EVENT_REDTIP,key,config.num);
             //更新父节点的状态
             if(config.parentId!=key){
                cc.game.emit(EVENT_REDTIP,config.parentId,this.getRedTipNumById(config.parentId));
             }
        }
    }

    clearRedTip(key:REDTIP_MODULE){
        let config=this.RedTipConfig[key];
        if(config){
            config.num=0;
            cc.game.emit(EVENT_REDTIP,key,config.num);

            //更新父节点的状态
            if(config.parentId!=key){
                cc.game.emit(EVENT_REDTIP,config.parentId,this.getRedTipNumById(config.parentId));
            }
        }
    }

    reset(){
        for(let key in this.RedTipConfig){
            this.RedTipConfig[key].num=0;
        }
    }

}