import App from "../../../gamecore/App";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaqQuestion extends cc.Component{


     @property(cc.Label)
     title:cc.Label=null;

     private _data:any=null;

     setData(data:{ID:string,Title:string}){
         this.title.string=data.Title;
         this._data=data;
     }

     onTitleClick(){
         App.DlgManager.showDlg("faqDetail",this._data);
     }
     
}
