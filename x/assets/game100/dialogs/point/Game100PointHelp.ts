// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100PointHelp extends BaseDlg {
    
    @property(cc.PageView)
    pageView:cc.PageView=null;

    private _page:number=0;

    beforeShow(){
        this.pageView.node.on('page-turning', this.callback, this);
    }

    callback() {
        this._page=this.pageView.getCurrentPageIndex();
     }

    onNextClick(){
        this._page++;
        if(this._page>=5){
            this._page=0;
        }
        this.pageView.scrollToPage(this._page,0.2);
    }

}
