import App from "../../../gamecore/App";


export const NoticeType_COMPETITION="Competition";
export const NoticeEvent_Competition:string="notice_competition_event";
export const NoticeEvent_MarQuee:string="notice_marquee_event";

export  class NoticeService{
    //显示时间
    private showTime:number=6000;

    private _competitionHandID:number=0;
    
    public static _noticeService:NoticeService=null;


    static getInstance(){
      if(!this._noticeService){
          this._noticeService=new NoticeService();
      }
      return this._noticeService;
    }

    constructor(){
        App.NoticeManager.addMsgType(NoticeType_COMPETITION);
    }

    startComNotice(){
        if(!this._competitionHandID){
            let msg=App.NoticeManager.getMsg(NoticeType_COMPETITION);
            if(msg){
                //@ts-ignore
                this._competitionHandID=setTimeout(()=>{
                    this._competitionHandID=null;
                    clearTimeout(this._competitionHandID);
                    this.startComNotice();
                },this.showTime);
                cc.game.emit(NoticeEvent_Competition,msg);
            }
        }
    }
}