// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { CowboyRoomData } from "./CowboyRoomData";
import * as Enums from "./CowboyEnum";
import { HashMap } from "../../../common/tools/HashMap";
import cv from "../../lobby/cv";
class CowboyManager {

    private static g_instance: CowboyManager = null;
    private m_cowboyCurrRoom: CowboyRoomData = new CowboyRoomData();
    public Enum = Enums;
    private cowboyPlist: HashMap<string, cc.SpriteAtlas> = new HashMap();

    public static getInstance(): CowboyManager {
        if (!CowboyManager.g_instance) {
            CowboyManager.g_instance = new CowboyManager;
        }
        return CowboyManager.g_instance;
    }

    public getCowboyRoom(): CowboyRoomData {// 德州牛仔相关数据
        return this.m_cowboyCurrRoom;
    };

    public addPlist(name: string, plist: cc.SpriteAtlas) {
        this.cowboyPlist.add(name, plist);
    }

    public getTextureByName(plistName: string, imgName: string): cc.SpriteFrame {
        let plist = this.cowboyPlist.get(plistName);
        if (plist) {
            let frame = plist.getSpriteFrame(imgName);
            if (frame) {
                return frame;
            }
            else {
                console.log("不存在图片:" + imgName);
            }
        }
        else {
            console.log("不存在图集:" + plistName);
        }
        return null;
    }

    public loadSpriteTextureByPlist(plist: cc.SpriteAtlas, node: cc.Sprite, name: string) {
        if (plist.getSpriteFrame(name)) {
            cv.resMgr.loadSpriteTextureByPlist(plist, node, name);
        }
        else {
            cv.resMgr.loadSpriteTextureByPlist(this.cowboyPlist.get("language_PLIST"), node, name);
        }
    }

    public loadButtonTextureByPlist(plist: cc.SpriteAtlas, node: cc.Node, normalPath: string, pressedPath?: string, HoverPath?: string, disabledPath?: string) {
        if (plist.getSpriteFrame(normalPath)) {
            cv.resMgr.loadButtonTextureByPlist(plist, node, normalPath, pressedPath, HoverPath, disabledPath);
        }
        else {
            cv.resMgr.loadButtonTextureByPlist(this.cowboyPlist.get("language_PLIST"), node, normalPath, pressedPath, HoverPath, disabledPath);
        }
    }
}
let cowboyManager_instance: CowboyManager = null;
export default cowboyManager_instance = CowboyManager.getInstance();