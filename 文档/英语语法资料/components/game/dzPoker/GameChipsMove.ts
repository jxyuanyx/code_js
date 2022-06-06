import cv from "../../lobby/cv";
import { Seat } from "./Seat";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameChipsMove extends cc.Component {
    @property(cc.Prefab) chips: cc.Prefab = null;

    public m_kFadeInPos: cc.Vec2 = new cc.Vec2();
    public m_pkTarget: any = null;
    private seat: Seat;
    onLoad() {

    }
    public setSeat(sat: Seat) {
        this.seat = sat;
    }
    public SetFadeInPos(kFadeIn: cc.Vec2) {
        this.m_kFadeInPos = cc.v2(this.node.convertToNodeSpaceAR(kFadeIn));
    }

    public MoveIn(f32Delay: number = 0) {
        if(f32Delay == 0)
        {
            this._MoveInDelay(0);
        }else
        {
            this.scheduleOnce(this._MoveInDelay, f32Delay);
        }
    }

    public MoveOut(isAnte: boolean, outpos:cc.Vec2, inpos:cc.Vec2, f32Delay: number = 0) {
        if(f32Delay == 0)
        {
            this._MoveOutDelay(isAnte, cc.v2(this.node.convertToNodeSpaceAR(outpos)), cc.v2(this.node.convertToNodeSpaceAR(inpos)));
        }else
        {
            this.scheduleOnce(() => { this._MoveOutDelay(isAnte, cc.v2(this.node.convertToNodeSpaceAR(outpos)), cc.v2(this.node.convertToNodeSpaceAR(inpos))); }, f32Delay);
        }
    }

    public MoveOutToTarget(pkTarget: cc.Node, outpos:cc.Vec2, f32Delay: number = 0) {
        this.m_pkTarget = pkTarget.getComponent(Seat);
        if(f32Delay == 0)
        {
            this._MoveOutToTargetDelay(cc.v2(this.node.convertToNodeSpaceAR(outpos)));
        }
        else
        {
            this.scheduleOnce(() => { this._MoveOutToTargetDelay(cc.v2(this.node.convertToNodeSpaceAR(outpos))); }, f32Delay);
        }
    }

    public _MoveInDelay(f32Delay: number) {
        let u32ShowChips = 3;
        for (let i = 0; i < u32ShowChips; ++i) {
            let pkChips: cc.Node = cc.instantiate(this.chips);
            pkChips.setScale(1);
            this.node.addChild(pkChips);

            let u32Inv = u32ShowChips - 1 - i;
            pkChips.setPosition(this.m_kFadeInPos);
            pkChips.opacity = 0;
            
            let pkCallback = cc.callFunc(this._MoveInHide.bind(this));
            pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.fadeIn(0.1)));
            if(i == 0)
            {
                pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.moveTo(0.1, new cc.Vec2(0, 0)), pkCallback));
            }else
            {
                pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.moveTo(0.1, new cc.Vec2(0, 0))));
            }
            pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.scaleTo(0.1, 1.0), cc.fadeOut(0.1), cc.destroySelf()));
        }
    }
    public _MoveOutDelay(isAnte, outpos:cc.Vec2, inpos:cc.Vec2) {
        let u32ShowChips = 3;
        for (let i = 0; i < u32ShowChips; ++i) {
            let pkChips: cc.Node = cc.instantiate(this.chips);
            pkChips.scale = 0.5;
            this.node.addChild(pkChips);
            
            let u32Inv = u32ShowChips - 1 - i;
            if(isAnte)
            {
                pkChips.setPosition(inpos);
            }else
            {
                pkChips.setPosition(new cc.Vec2(0, 0));
            }
            pkChips.opacity = 0;
            pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.fadeIn(0.2), cc.delayTime(0.19), cc.destroySelf()));
            pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.moveTo(0.2, outpos)));
            pkChips.runAction(cc.sequence(cc.delayTime(0.02 * u32Inv), cc.scaleTo(0.2, 1.0)))
        }
    
        this.seat.hideChips();
    }

    public _MoveOutToTargetDelay(outpos:cc.Vec2) {
        let u32ShowChips = 3;
        for (let i = 0; i < u32ShowChips; ++i) {
            let pkChips: cc.Node = cc.instantiate(this.chips);
            pkChips.scale = (Math.random()-0.5)*2;
            this.node.addChild(pkChips);
            
            let u32Inv = u32ShowChips - 1 - i;
            pkChips.stopAllActions();
            pkChips.setPosition(new cc.Vec2(0, 0));
            pkChips.opacity = 0;
            pkChips.runAction(cc.sequence( cc.fadeIn(0.3), cc.delayTime(1)));
            pkChips.runAction(cc.scaleTo(0.3, 1));
            let pkCallback = cc.callFunc(this.TargetCallback.bind(this));
            if(i  == 0)
            {
                var fun = cc.callFunc(function () {
                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_pot");
                    }
                }, this);
                pkChips.runAction( cc.sequence(cc.moveTo(0.3,this._RandPos(this.m_kFadeInPos)), fun, cc.moveTo(0.3 + Math.random()*0.2, outpos), pkCallback, cc.destroySelf()));
            }else
            {
                pkChips.runAction( cc.sequence(cc.moveTo(0.3,this._RandPos(this.m_kFadeInPos)),cc.moveTo(0.3 + Math.random()*0.2, outpos), pkCallback, cc.destroySelf()));
            }
        }
        this.scheduleOnce(this._MoveOutTargetHide, 0.05 * u32ShowChips + 1);
    }

    public _MoveInHide(f32Delta) {
        if(this.seat){
            this.seat.showChips();
        }
    }

    public _MoveOutTargetHide(f32Delta) {
        this.node.destroy();
    }

    public _RandPos(kPos: cc.Vec2): cc.Vec2 {
        let i32RandX, i32RandY = 0;
        i32RandX =  (Math.random() - 0.5) * 2 * 100;
        i32RandY = Math.random() * 200;
        return new cc.Vec2(kPos.x + i32RandX, kPos.y + i32RandY);
        
    }

    public TargetCallback() {
        if(this.m_pkTarget) {
            (this.m_pkTarget as Seat).ShakeSeat();
        }
    }
}
