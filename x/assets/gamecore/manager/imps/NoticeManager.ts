import { INoticemanager } from "../INoticeManager";

export class NoticeManager implements INoticemanager{
    private _msgSequence:Map<string,any[]>=new Map();

    addMsgType(type: string): void {
        if(this._msgSequence.has(type)){
            cc.error("msgType already added",type);
            return;
        }
        this._msgSequence.set(type,[]);
        
    }

    pushMsg(type:string,msg: any): void {
        if(this._msgSequence.has(type)){
            this._msgSequence.get(type).push(msg);
        }
    }

    getMsg(type:string) {
        if(this._msgSequence.has(type)){
            return this._msgSequence.get(type).shift();
        }
        return null;
    }

    clearSequence(type: string): void {
        this._msgSequence.delete(type);
    }

    sortMsg(type: string, sortFun: any): void {
        if(this._msgSequence.has(type)){
            let msg=this._msgSequence.get(type);
            msg.sort(sortFun);
        }
    }

    clearAll():void{
        this._msgSequence.clear();
    }

}