import cv from "../../../components/lobby/cv";
import { MiniGameOld } from "./MiniGameOld";
import { MiniGameNew } from "./MiniGameNew";

/**
 * 小游戏入口类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameEntrance extends cc.Component {

    @property(cc.Prefab) prefab_minigame_old: cc.Prefab = null;                         // 旧版小游戏预制件
    @property(cc.Prefab) prefab_minigame_new: cc.Prefab = null;                         // 新版小游戏预制件

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {
    }

    protected onEnable(): void {
        let mode: number = 1;
        switch (mode) {
            case 0: {
                let inst: MiniGameOld = MiniGameOld.initSingleInst(this.prefab_minigame_old, this.node);
                inst.node.active = true;
            } break;

            case 1:
            default: {
                let inst: MiniGameNew = MiniGameNew.initSingleInst(this.prefab_minigame_new, this.node);
                inst.node.active = true;
            } break;
        }
    }

    protected onDisable(): void {
    }
}