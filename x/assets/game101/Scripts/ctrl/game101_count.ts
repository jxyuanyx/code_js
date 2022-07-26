// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class Game101Count {

    public static getCardGroupsPos(startPos:cc.Vec3,index:number){
        let x = startPos.x;
        let y = startPos.y;
        return new cc.Vec3(x,y - 100 - 60*index);
    }

    public static getCardGroupsScore(cardGroups:number[]){
        let score = 0;
        let A:boolean = false;
        for (let index = 0; index < cardGroups.length; index++) {
            let sin = cardGroups[index]%16>10 ? 10:cardGroups[index]%16;
            if (sin == 1) {
                A = true;
            }
            score += sin;
        }
        
        return {s:score,a:A};
    }
    
}
