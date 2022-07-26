// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumScroll extends cc.Component {

    private _splitTime:number=0.05;
    private _data:number=0;

    get data(){
        return this._data;
    }

    run(start:number,to:number,time:number=0.5,parseFun?:Function,callBack?:Function){
        if(start==to){
            callBack&&callBack();
            return;
        }
        try{
            this._data=to;
            let nums:number[]=[];
            let len=Math.floor(time/this._splitTime);
            if((to-start)>len*2){
                while(nums.length<len){
                    let num=start+Math.floor(Math.random()*(to-start));
                    if(nums.indexOf(num)==-1){
                        nums.push(num);
                    }
                }
            }
            nums.push(to);
            nums.sort((a,b)=>a-b);
    
            cc.tween(this.node).to(0.2,{scale:1.2}).start();
            let index:number=0;
            this.schedule(()=>{
                if(parseFun){
                    this.node.getComponent(cc.Label).string=parseFun(nums[index]);
                }else{
                    this.node.getComponent(cc.Label).string=nums[index].toString();
                }
                index++;
                if(index==nums.length){
                    cc.tween(this.node).to(0.2,{scale:1}).call(()=>{
                        callBack&&callBack();
                    }).start();
                }
            },this._splitTime,nums.length-1)
        }catch(e){
            cc.error(e.toString());
        }
       
    }
}
