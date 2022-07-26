// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatDate, formatDateWithOutTime } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Age extends BaseDlg {
    UIBindData={
        date:"",
    }
    showMode=DlgEnum.R2L;
    @property(cc.Label)
    label: cc.Label = null;

    private currentDate:number  = 0;

    afterShow(){
        let data = App.DataManager.getSelfData();
        this.flushCurrentDate(data.Birth);
    }

    flushCurrentDate(date:number){
        this.currentDate = date;
        this.UIBindData.date = formatDateWithOutTime(this.currentDate * 1000);
    }

    onSubmitClick(){
        App.HttpManager.post("profile/updateBirth",{Birth:this.currentDate/1000},"PUT",this.node,(data:any)=>{
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Modify Success"});
            let info = App.DataManager.getSelfData();
            info.Birth = data;
            App.DataManager.setSelfData(info);
        },()=>{
            App.LogManager.i("error:updateBirth")
        });
    }

    onSelectClick(){
        let curIndex:number[] = [];

        let curDate = App.DataManager.getSelfData().Birth;
        let myDate = new Date(curDate*1000);
        curIndex.push(myDate.getFullYear() - 1900);
        curIndex.push(myDate.getMonth() );
        curIndex.push(myDate.getDate() - 1);
        
        let data = new Date;
        let year:number[] = [];
        let month:number[] =[];
        let day:number[] = [];
        
        for (let index = 0; index <= data.getFullYear() - 1900; index++) {
            year[index] = 1900 + index;
        }
        for (let index = 0; index < 12; index++) {
            month[index] = index + 1;
        }
        for (let index = 0; index < 31; index++) {
           day[index] = index+1; 
        }
        App.DlgManager.showDlg("comscrollview",{cb:(data:any)=>{
            let str:string = "";
            for (let index = 0; index < data.length; index++) {
                if (index == 0) {
                    str = str += data[index];
                }
                else{
                    str = str += ("-"+data[index]);
                }
            }
            let date=new Date(str);
            this.currentDate = date.getTime();
            this.UIBindData.date = formatDateWithOutTime(this.currentDate);
        },group:[{title:"Year",infoList:year,curIndex:curIndex[0]},{title:"Month",infoList:month,curIndex:curIndex[1]},{title:"Date",infoList:day,curIndex:curIndex[2]}],top:formatDateWithOutTime(App.DataManager.getSelfData().Birth*1000)});
    }
}
