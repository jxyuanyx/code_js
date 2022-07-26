// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export const TimeEvent_End="time_event_end";
export const TimeEvent_Flush="time_event_flush";

export class TimeTask{
    key:any;            //key 
    lessTime:number;    //剩余时间
}


export  class TimeManager extends cc.EventTarget {

    private static _timeManager:TimeManager;

    private _tasks:TimeTask[]=[];

    private _target:cc.Component;

    private _updateFun:Function;

    public static instance():TimeManager{
        if(!this._timeManager){
            this._timeManager=new TimeManager();
        }
        return this._timeManager;
    }

    _updateTask(){
        let len=this._tasks.length,removeCount=0;
        for(let i=0;i<len;i++){
            let task=this._tasks[i-removeCount];
            task.lessTime--;
            if(task.lessTime<0){
                this._tasks.splice(i-removeCount,1);
                this.emit(TimeEvent_End,task.key);
                removeCount++;
            }
            else{
                this.emit(TimeEvent_Flush,task.key,task.lessTime);
            }
        }
        if(this._tasks.length==0){
            this._target.unschedule(this._updateFun);
        }
    }

    init(target:cc.Component){
        this._target=target;
        this._updateFun=this._updateTask.bind(this);
        target.schedule(this._updateFun,1);
    }

    addTask(task:TimeTask){
        if(this._tasks.length==0){
            this._target.unschedule(this._updateFun);
            this._target.schedule(this._updateFun,1);
        }
        this._tasks.push(task);
    }

    clearTask(keys?:string,values?:string){
        if(keys){
            for (let index = 0; index < this._tasks.length; index++) {
                if (values) {
                    if (this._tasks[index].key == keys+"_"+values) {
                        this._tasks.splice(index,1);
                    }
                }
                else{
                    let key = String(this._tasks[index].key).split("_");
                    if (keys == key[0]) {
                        this._tasks.splice(index,1);
                        index--;
                    }
                }
            }
        }
        else{
            this._tasks.splice(0,this._tasks.length);
            this._target.unschedule(this._updateFun);
        }
    }
}
