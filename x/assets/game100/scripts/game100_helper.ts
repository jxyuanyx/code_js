import Game100Card from "../prefabs/card/Game100Card";

export default class Game100Helper {
    
    static getLogicType(data:number){
        return (data>>4)-1;
    }

    static getLogicValue(data:number){
        return data&0xf;
    }
    /**
     * 牌进右上角牌堆
     * @param pool 
     * @param sourceCard 
     */
    static checkMoveInBox(pool:Game100Card[],sourceCard:Game100Card){
        if(pool.length==0){
            return sourceCard.cardValue==1;
        }else{
            let card=pool[pool.length-1];
            return (sourceCard.cardValue==(card.cardValue+1))&&(sourceCard.cardType ==card.cardType)
        }
    }


    static checkMoveInZone(pool:Game100Card[],sourceCard:Game100Card){
        if(pool.length==0){
            return sourceCard.cardValue==13;
        }else{
            let card=pool[pool.length-1];
            return (sourceCard.cardValue==(card.cardValue-1))&&((sourceCard.cardType&0x1)!=(card.cardType&0x1))
        }
    }


    static canMoveManyCards(cards:Game100Card[][],card:Game100Card){
        for(let i=0;i<cards.length;i++){
            if(i!=card.index){
                let tcards=cards[i];
                if(tcards.length==0){
                    if(card.cardValue==13)
                    {
                        return true;
                    }
                    continue;
                }
                let tcard=tcards[tcards.length-1];
                if((card.cardValue==(tcard.cardValue-1))&&((card.cardType&0x1)!=(tcard.cardType&0x1))){
                    return true;
                }
            }
        }
        return false;
    }
    //static getMoveCards()
}