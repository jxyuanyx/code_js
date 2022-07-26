// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import CashAccount from "../../../mainpackage/dialogs/cashaccount/CashAccount";

const {ccclass, property} = cc._decorator;
const DECKNUM:number = 4;//四组
const DECKMAX:number = 13;//最大k
const SYSTEM:number = 16;//16进制
@ccclass
export default class Game101_MatchDealer extends BaseDlg {
    showMode=DlgEnum.SCALE;
    protected _cardAltas:cc.SpriteAtlas;

    @property(cc.Prefab)
    cardInstance:cc.Prefab = null;

    @property(cc.EditBox)
    editbox:cc.EditBox = null;
    
    @property(cc.Node)
    layout_cards:cc.Node = null;

    private _allCards:number[]  = [];
    private _cards:cc.Node[] = [];
    private _selectCards:number[] = [];
    onLoad(){
        super.onLoad();
        this._cardAltas=App.BundleManager.getCommonAtlas("game101/poker")
        this._setAllCards();
        this._bindCardClick();
        this._reset();
    }

    private _setAllCards(){
        for (let index = 1; index <= DECKNUM; index++) {
            for (let n = 1; n <= DECKMAX; n++) {
                this._allCards.push(index*SYSTEM + n);
            }
        }
    }

    private _bindCardClick(){
        for (let index = 0; index < this._allCards.length; index++) {
            let card:cc.Node = cc.instantiate(this.cardInstance);
            this.layout_cards.addChild(card);
            card.on( cc.Node.EventType.TOUCH_END,()=>{
                this._selectCards.push(this._allCards[index]);
                this._editShow();
            },this);
            card.getComponent(cc.Sprite).spriteFrame = this._cardAltas.getSpriteFrame(this._allCards[index].toString(16));
            this._cards.push(card);
        }
    }

    onDestroy(){
        super.onDestroy();
        for (let index = 0; index < this._cards.length; index++) {
            this._cards[index].off(cc.Node.EventType.TOUCH_END);
        }
    }

    private _editShow(){
        this.editbox.string = JSON.stringify(this._selectCards);
    }


    private _reset(){ 
        this._selectCards = [];
        this.editbox.string = "";
    }

    onEditBoxClick(){
        if (this.editbox.string) {
            this._selectCards = JSON.parse(this.editbox.string);
        }
        else{
            this._selectCards = [];
        }
    }

    onCancelClick(){
        this.hide();
        this._data.normalCb&&this._data.normalCb();
    }

    onReturnClick(){
        this._reset();
    }

    onConfirmClick(){
        this.hide();
        this._data.testCb&&this._data.testCb(this._selectCards);
    }
}
