import {BaseComponent} from "./BaseComponent";
import {IBaseGameView} from "../IBaseGameView";
import {BaseSeatView} from "./BaseSeatView";
import Card from "../models/Card";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseRoomView extends BaseComponent implements IBaseGameView{
    @property(cc.Node)
    private playerNode:cc.Node=null;

    @property(cc.Prefab)
    private cardInstance:cc.Prefab=null;

    protected _seatViews:Map<number,cc.Node> =new Map<number, cc.Node>();

    protected _cardPools:cc.NodePool=new cc.NodePool();

    createSeatViews(seatCount: number,seatPos: cc.Vec2[],zIndex:number) {
        for(let i=0;i<seatCount;i++){
            let player=cc.instantiate(this.playerNode);
            player.parent=this.node;
            player.zIndex=zIndex;
            this._seatViews.set(i,player);
            let pos=seatPos[i];
            player.setPosition(pos);
            let com=player.getComponent(BaseSeatView)
            com.reset();
            com.setClientId(i);
        }
    }

    getCardNode(number:number){
        let card=this._cardPools.get();
        if(!card){
            card=cc.instantiate(this.cardInstance);
        }
        card.getComponent(Card).metaData=0;
        card.opacity=255;
        return card
    }

    backCardNode(card:cc.Node){
        card.stopAllActions();
        card.scale = 1;
        card.name=""
        this._cardPools.put(card);
    }


    dealCardToSeat(seat: number, cardView: cc.Node | cc.Prefab, show?: boolean) {
    }

    resetTable() {
    }

    setSelfHandCards(cardView: cc.Node | cc.Prefab, cards: number[]) {
    }

    setTableInfo(tableInfo: any) {
    }

    onUserSit(clientId:number,info: any): void {
        let view=this._seatViews.get(clientId);
        let com=view.getComponent(BaseSeatView);
        com.setData(info);
    }
}