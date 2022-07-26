// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BlackJack, Game101ClearType } from "../enum/game101_enum";
import { Game101Count } from "./game101_count";

const {ccclass, property} = cc._decorator;

@ccclass
export default class game101_logic {


    public static getClearType(cards:number[],curCard:number){
        let allCards:number[] = cards.concat(curCard);
        let clearType:number[] = [];
        if (game101_logic.isBlackJack(allCards)) {
            clearType.push(Game101ClearType.BLACKJACK);
        }
        if (game101_logic.is5Dragon(allCards)) {
            clearType.push(Game101ClearType.FIVEDRAGON);
        }
        if (game101_logic.is21(allCards)) {
            clearType.push(Game101ClearType.FINISHPOINT);
        }
        if (clearType.length==0 && game101_logic.isBomb(allCards)) {
            clearType.push(Game101ClearType.BOMB);
        }
        if (clearType.length == 0) {
            clearType.push(Game101ClearType.UNCLEAR);
        }
        return clearType;
    }

    public static is5Dragon(cards:number[]){
        
        let allScore = Game101Count.getCardGroupsScore(cards).s;



        if (cards.length != 5) {
            return false;
        }
        if (allScore <= 21) {
            return true;
        }
        return false;
    }

    public static is21(cards:number[]){
        let A = Game101Count.getCardGroupsScore(cards).a;
        let info = Game101Count.getCardGroupsScore(cards);

        if (A && info.s+10 == 21) {
            return true;
        }

        if (info.s == 21) {
            return true;
        }
        return false;
    }

    public static isBomb(cards:number[]){
        let allScore = Game101Count.getCardGroupsScore(cards).s;
        if (allScore > 21) {
            return true;
        }
        return false;
    }
 
    public static isBlackJack(cards:number[]){
        for (let index = 0; index < cards.length; index++) {
            if (cards[index].toString(16) == BlackJack[0] || cards[index].toString(16) == BlackJack[1]){
                return true;
            }
        }
        return false;
    }
}
