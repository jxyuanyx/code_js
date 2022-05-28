// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { HashMap } from "../../../common/tools/HashMap";
import * as Enums from "./../cowboy/CowboyEnum";
import cv from "../../lobby/cv";
import { VideoCowboyRoomData } from "./VideoCowboyRoomData";
class VideoCowboyManager {

    private static g_instance: VideoCowboyManager = null;
    private m_VideoCowboyCurrRoom: VideoCowboyRoomData = new VideoCowboyRoomData();
    public Enum = Enums;
    private VideoCowboyPlist: HashMap<string, cc.SpriteAtlas> = new HashMap();

    public static getInstance(): VideoCowboyManager {
        if (!VideoCowboyManager.g_instance) {
            VideoCowboyManager.g_instance = new VideoCowboyManager;
        }
        return VideoCowboyManager.g_instance;
    }

    public getVideoCowboyRoom(): VideoCowboyRoomData {// 德州牛仔相关数据
        return this.m_VideoCowboyCurrRoom;
    };

    public isPlayVideo(): boolean {
        return true;//(cv.config.GET_DEBUG_MODE() == 2);
    }

    public addPlist(name: string, plist: cc.SpriteAtlas) {
        this.VideoCowboyPlist.add(name, plist);
    }

    public getPlistAtlas(name: string): cc.SpriteAtlas {
        return this.VideoCowboyPlist.get(name);
    }

    public getTextureByName(plistName: string, imgName: string): cc.SpriteFrame {
        let plist = this.VideoCowboyPlist.get(plistName);
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
            cv.resMgr.loadSpriteTextureByPlist(this.VideoCowboyPlist.get("language_PLIST"), node, name);
        }
    }

    public loadButtonTextureByPlist(plist: cc.SpriteAtlas, node: cc.Node, normalPath: string, pressedPath?: string, HoverPath?: string, disabledPath?: string) {
        if (plist.getSpriteFrame(normalPath)) {
            cv.resMgr.loadButtonTextureByPlist(plist, node, normalPath, pressedPath, HoverPath, disabledPath);
        }
        else {
            cv.resMgr.loadButtonTextureByPlist(this.VideoCowboyPlist.get("language_PLIST"), node, normalPath, pressedPath, HoverPath, disabledPath);
        }
    }
}
let VideoCowboyManager_instance: VideoCowboyManager = null;
export default VideoCowboyManager_instance = VideoCowboyManager.getInstance();