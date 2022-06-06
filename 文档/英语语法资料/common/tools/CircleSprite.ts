// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { HashMap } from "./HashMap";
import cv from "./../../components/lobby/cv"
const { ccclass, property } = cc._decorator;

export enum Head_Mode {
    CIRCLE,
    CLUB,
    IRREGULAR,
}

export class CreateHead {
    node: cc.Node = null;
    url: string = "";
    isHaveBg: boolean = false;
    mode: number = 0;
    isDownload: boolean = false;
    forceMask: boolean = false;
    CUSTOM_DEFAULT_URL: string = "";
    plat: number = 0;//0.pkw玩家 1. wpk玩家
    isScale: boolean = true;
}

@ccclass
export class CircleSprite extends cc.Component {
    maskNode: cc.Node = null;
    spriteNode: cc.Node = null;
    HEAD_DEFAULT_URL: string = "zh_CN/common/icon/Head_01";
    CLUB_DEFAULT_URL: string = "zh_CN/common/icon/club";
    IRREGULAR_DEFAULT_HEAD: string = "zh_CN/game/cowboy/head/head_1";
    static HEAD_NAME: string = "CircleSprite_mask_head";
    CIRCLE_IMAGE_FOLDER: string = "circleimage/";
    mode: number = 0;
    isScale: boolean = true;
    CUSTOM_DEFAULT_URL: string = "";
    isDownload: boolean = false;
    nodeSize: cc.Size;
    private static createArr: CreateHead[] = [];
    /**
     * 使用：(CircleSprite).setCircleSprite(dayu_img, headUrl);
     * @param node "common_head.png"圆环对应的节点
     * @param url 头像地址
     * @param isHaveBg true=>node和头像的层级会变为最高，false=>没有背景遮盖，头像层级设置为-10
     * @param mode 设置为true,默认头像就是俱乐部的默认头像
     * @param isDownload 是否下载，默认下载
     */
    static clean() {
        CircleSprite.createArr = [];
    }

    static updateCreateHead() {
        if (CircleSprite.createArr.length <= 0) return;
        let len = CircleSprite.createArr.length;
        for (let i = 0; i < len; i++) {
            let info = CircleSprite.createArr[i];
            (new CircleSprite).set(info.node, info.url, info.plat, info.isHaveBg, info.mode, info.isDownload, info.CUSTOM_DEFAULT_URL, info.forceMask, info.isScale);
        }
        CircleSprite.clean();
    }

    static updateBigCreateHead() {
        if (CircleSprite.createArr.length <= 0) return;
        let len = CircleSprite.createArr.length;
        for (let i = 0; i < len; i++) {
            let info = CircleSprite.createArr[i];
            (new CircleSprite).setBig(info.node, info.url, info.plat, info.isHaveBg, info.mode, info.isDownload, info.CUSTOM_DEFAULT_URL, info.forceMask);
        }
        CircleSprite.clean();
    }

    static setBigCircleSprite(node: cc.Node, url: string = "", plat: number = 0, isHaveBg: boolean = true, mode?: any/*number | string */, isDownload: boolean = true, forceMask: boolean = false) {
        if (node == undefined || node == null) {
            console.log("设置头像的节点为空");
            return;
        }
        let info = new CreateHead();
        info.node = node;
        info.url = url;
        info.isHaveBg = isHaveBg;
        info.plat = plat;
        if (typeof mode == "number" || mode == undefined) {
            info.mode = mode == undefined ? 0 : mode;
        }
        else {
            info.CUSTOM_DEFAULT_URL = mode;
        }

        info.isDownload = isDownload;
        info.forceMask = forceMask;
        CircleSprite.createArr.push(info);

        CircleSprite.updateBigCreateHead();
        // cc.director.getScheduler().schedule(CircleSprite.updateCreateHead, cc.director.getScene(), 0, 0, 0.2);
    }

    /**
     * 设置头像
     * @param node             头像框(圆框或方框)对应的节点
     * @param url              头像下载地址或资源路径
     * @param plat             平台字段(0 pwk, 1 wpk) 默认0
     * @param isHaveBg         是否存在传入的node参数同一父节点的其他子节点被node位置覆盖，有——true，没有——false
     * @param mode             头像的遮罩资源类型如Head_Mode.CIRCLE，或者自定义的遮罩资源路径
     * @param isDownload       头像资源是否需要下载，考虑遮罩毛边，下载的资源会有微小缩放
     * @param forceMask        是否强制遮罩，为true时，强制添加cc.Mask组件
     * @param isScale          缩放是掩盖锯齿,默认为true，当遮盖背景不存在的时候，为了保持尺寸，使用false
     */
    static setCircleSprite(node: cc.Node, url: string = "", plat: number = 0, isHaveBg: boolean = true, mode?: any/*number | string */, isDownload: boolean = true, forceMask: boolean = false, isScale: boolean = true) {
        if (node == undefined || node == null) {
            console.log("设置头像的节点为空");
            return;
        }
        let info = new CreateHead();
        info.node = node;
        info.url = url;
        info.isHaveBg = isHaveBg;
        info.plat = plat;
        info.isScale = isScale;
        if (typeof mode == "number" || mode == undefined) {
            info.mode = mode == undefined ? 0 : mode;
        }
        else {
            info.CUSTOM_DEFAULT_URL = mode;
        }

        info.isDownload = isDownload;
        info.forceMask = forceMask;
        CircleSprite.createArr.push(info);

        CircleSprite.updateCreateHead();
        // cc.director.getScheduler().schedule(CircleSprite.updateCreateHead, cc.director.getScene(), 0, 0, 0.2);
    }

    static cleanHeadNode(node: cc.Node) {
        if (!node) {
            return;
        }
        let headNode = node.getParent().getChildByName(node.uuid + CircleSprite.HEAD_NAME);
        if (headNode) {
            console.log("cleanHeadNode--------");
            headNode.removeFromParent(true);
            headNode.destroy();
        }
    }

    static cleanVideoNode(node: cc.Node) {
        if (!node) {
            return;
        }
        let headNodeV = node.getParent().getChildByName(node.uuid + CircleSprite.HEAD_NAME + "_VEDIO");
        if (headNodeV) {
            console.log("cleanHeadNode Video--------");
            headNodeV.removeFromParent(true);
            headNodeV.destroy();
        }
    }

    static setHeadTexture(node: cc.Node, headImg: cc.Texture2D, scale: number = 0.95, isDownload?: boolean) {
        if (!node || !node.getParent()) return;
        let nodeName = node.uuid;
        let maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME);
        if (!maskNode) {
            console.log("不存在头像节点");
            maskNode = new cc.Node();
            node.getParent().addChild(maskNode);
            maskNode.name = nodeName + CircleSprite.HEAD_NAME;
            maskNode.setAnchorPoint(node.getAnchorPoint());
            maskNode.setPosition(node.getPosition());
            maskNode.setScale(scale);
            maskNode.setContentSize(node.getContentSize().width, node.getContentSize().height);//* 0.99

            let spriteNode = new cc.Node();
            spriteNode.addComponent(cc.Sprite);
            maskNode.addChild(spriteNode);
            spriteNode.name = "sprite_node";
        }
        let tempMask = maskNode.getComponent(cc.Mask);
        if (!tempMask) {
            let msk: any = maskNode.addComponent(cc.Mask);
            if (msk) {
                // msk._createGraphics();
                maskNode.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
                maskNode.getComponent(cc.Mask).alphaThreshold = 0.1;
                cv.resMgr.setSpriteFrame(maskNode, "zh_CN/common/head/head_1", null, cc.Mask);
            }
        }
        else if (!tempMask.enabled) {
            tempMask.enabled = true;
        }
        let nodeSize = node.getContentSize();
        let spriteNode = cc.find("sprite_node", maskNode);
        let frame: cc.SpriteFrame = new cc.SpriteFrame(headImg);
        let defaultSprite = spriteNode.getComponent(cc.Sprite);
        defaultSprite.spriteFrame = frame;
        if (isDownload) {
            maskNode.setContentSize(nodeSize.width * scale, nodeSize.height * scale);//* 0.99
        }
        spriteNode.setScale(CircleSprite.getScaleData(maskNode, spriteNode));
    }

    static setHeadTextureWithData(node: cc.Node, pixelData: DataView, pixelFormat: number, pixelsWidth: number, pixelsHeight: number, rotation: number = 0, scaleX: number = 1, scaleY: number = 1) {
        if (!node || !node.getParent()) return;
        let nodeName = node.uuid;
        let maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME + "_VEDIO");
        if (!maskNode) {
            console.log("不存在头像节点");
            maskNode = new cc.Node();
            node.getParent().addChild(maskNode);
            maskNode.name = nodeName + CircleSprite.HEAD_NAME + "_VEDIO";
            maskNode.setAnchorPoint(node.getAnchorPoint());
            maskNode.setPosition(node.getPosition());
            maskNode.setScale(node.scale);
            maskNode.setContentSize(node.getContentSize().width, node.getContentSize().height);
            maskNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_1;

            let spriteNode = new cc.Node();
            spriteNode.width = node.width;
            spriteNode.height = node.height;
            let sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(new cc.Texture2D());
            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            maskNode.addChild(spriteNode);
            spriteNode.name = "sprite_node";
        }
        let tempMask = maskNode.getComponent(cc.Mask);
        if (!tempMask) {
            let msk: any = maskNode.addComponent(cc.Mask);
            if (msk) {
                // msk._createGraphics();
                maskNode.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
                maskNode.getComponent(cc.Mask).alphaThreshold = 0.1;
                cv.resMgr.setSpriteFrame(maskNode, "zh_CN/common/head/head_1", null, cc.Mask);
            }
        }
        else if (!tempMask.enabled) {
            tempMask.enabled = true;
        }
        let spriteNode = cc.find("sprite_node", maskNode);
        spriteNode.scaleX = scaleX;
        spriteNode.scaleY = scaleY;
        spriteNode.angle = -rotation;
        let texture = spriteNode.getComponent(cc.Sprite).spriteFrame.getTexture();
        texture.initWithData(pixelData, pixelFormat, pixelsWidth, pixelsHeight);
    }

    static getScaleData(maskNode: cc.Node, spriteNode: cc.Node): number {
        if (!maskNode || !spriteNode) return 1;
        let maskSize = maskNode.getContentSize();
        let spriteSize = spriteNode.getContentSize();

        return (spriteSize.width > spriteSize.height) ? maskSize.width / spriteSize.height : maskNode.width / spriteNode.width;
    }

    static getHeadNode(node: cc.Node): cc.Node {
        if (!node || (!node.getParent())) return null;
        let nodeName = node.uuid;
        let maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME);
        if (maskNode) {
            let sprite_node = maskNode.getChildByName("sprite_node");
            return sprite_node;
        }
        return null;
    }

    static getVideoNode(node: cc.Node): cc.Node {
        if (!node || (!node.getParent())) return null;
        let nodeName = node.uuid;
        let maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME + "_VEDIO");
        if (maskNode) {
            let sprite_node = maskNode.getChildByName("sprite_node");
            return sprite_node;
        }
        return null;
    }

    setBig(node: cc.Node, url: string, plat: number, isHaveBg: boolean, mode: number, isDownload: boolean, customDefaultUrl: string, forceMask: boolean) {
        if (!node || (!node.getParent())) return;

        // 运行在编辑器或预览中(构建之前), 有些情况下 node.uuid 字符串会有 '/', 此时作为 node 的 name 会报错
        // 因此这里做个正则替换
        let uuid: string = node.uuid;
        if (CC_DEV) {
            let regex: RegExp = /[\/\\]+/ig;
            uuid = uuid.replace(regex, "_");
        }

        let nodeName = uuid;
        this.CUSTOM_DEFAULT_URL = customDefaultUrl;
        this.mode = mode;
        this.maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME);
        if (!this.maskNode) {
            this.maskNode = new cc.Node();
            node.getParent().addChild(this.maskNode);
            this.maskNode.name = nodeName + CircleSprite.HEAD_NAME;
            this.maskNode.setAnchorPoint(node.getAnchorPoint());
            if (isHaveBg) {
                node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_1;
            }
            else {
                this.maskNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_low;
            }

            this.spriteNode = new cc.Node();
            this.spriteNode.addComponent(cc.Sprite);
            this.maskNode.addChild(this.spriteNode);
            this.spriteNode.name = "sprite_node";
        }

        this.maskNode.setPosition(node.getPosition());
        this.maskNode.setScale(node.scale);
        this.maskNode.setContentSize(node.getContentSize().width, node.getContentSize().height);//* 0.99
        this.maskNode._xurl = url;

        let isMask: boolean = true;
        if (url != "") {
            let temp = url.lastIndexOf("/");
            let tempStr = url.slice(temp + 1);
            isMask = !cv.StringTools.isNumber(tempStr);
        }
        let haveMsk: boolean = false;
        if (this.maskNode.getComponent(cc.Mask)) {
            haveMsk = true;
        }

        this.maskNode.active = true;
        this.nodeSize = node.getContentSize();
        this.spriteNode = cc.find("sprite_node", this.maskNode);
        // if (!this.spriteNode.getComponent(cc.Sprite).spriteFrame) {
        this.setSpriteByUrl();
        // }

        // return;
        if (url == "") return;
        let temp = url.lastIndexOf("/");
        let tempStr = url.slice(temp + 1);
        if (cv.StringTools.isNumber(tempStr)) {
            let tempNum = cv.Number(tempStr);
            if (tempNum <= 0 || tempNum > cv.config.HEAD_LENGTH) {
                tempNum = 1;
            }
            if (this.mode != Head_Mode.IRREGULAR) {
                url = "zh_CN/common/head/head_" + tempNum;
            }
            else {
                url = "zh_CN/game/cowboy/head/head_" + tempNum;
            }
            this.setSpriteByPath(url);
            return;
        }

        if (isDownload) {
            url = cv.dataHandler.getUserData().getImageUrlByPlat(url, plat);
            let texture: cc.Texture2D = cv.resMgr.get(url, cc.Texture2D);
            if (texture) {
                this.isDownload = true;
                this.setSpriteByTexture(texture);
            }
            else {
                this.updateSpriteByUrl(url);
            }
        }
        else {
            this.setSpriteByUrl(url);
        }

        this.setSpriteScale();
    }

    set(node: cc.Node, url: string, plat: number, isHaveBg: boolean, mode: number, isDownload: boolean, customDefaultUrl: string, forceMask: boolean, isScale: boolean) {
        if (!node || (!node.getParent())) return;

        // 运行在编辑器或预览中(构建之前), 有些情况下 node.uuid 字符串会有 '/', 此时作为 node 的 name 会报错
        // 因此这里做个正则替换
        let uuid: string = node.uuid;
        if (CC_DEV) {
            let regex: RegExp = /[\/\\]+/ig;
            uuid = uuid.replace(regex, "_");
        }

        let nodeName = uuid;
        this.CUSTOM_DEFAULT_URL = customDefaultUrl;
        this.mode = mode;
        this.isScale = isScale;
        this.maskNode = node.getParent().getChildByName(nodeName + CircleSprite.HEAD_NAME);
        if (!this.maskNode) {
            this.maskNode = new cc.Node();
            node.getParent().addChild(this.maskNode);
            this.maskNode.name = nodeName + CircleSprite.HEAD_NAME;
            this.maskNode.setAnchorPoint(node.getAnchorPoint());
            if (isHaveBg) {
                node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_0;
            }
            else {
                this.maskNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_low;
            }

            this.spriteNode = new cc.Node();
            this.spriteNode.addComponent(cc.Sprite);
            this.maskNode.addChild(this.spriteNode);
            this.spriteNode.name = "sprite_node";

            let msk: any = this.maskNode.addComponent(cc.Mask);
            if (msk) {
                // msk._createGraphics();

                this.maskNode.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
                this.maskNode.getComponent(cc.Mask).alphaThreshold = 0.1;
                // let spriteFrame = cv.resMgr.get(this.getDefaultUrl(mode), cc.SpriteFrame);
                //this.maskNode.getComponent(cc.Mask).spriteFrame = spriteFrame;
                cv.resMgr.setSpriteFrame(this.maskNode, this.getDefaultUrl(mode), null, cc.Mask);
            }
        }

        this.maskNode.setPosition(node.getPosition());
        this.maskNode.setScale(node.scale);
        this.maskNode.setContentSize(node.getContentSize().width, node.getContentSize().height);//* 0.99
        this.maskNode._xurl = url;

        let isMask: boolean = true;
        if (url != "") {
            let temp = url.lastIndexOf("/");
            let tempStr = url.slice(temp + 1);
            isMask = !cv.StringTools.isNumber(tempStr);
        }
        let haveMsk: boolean = false;
        if (this.maskNode.getComponent(cc.Mask).enabled) {
            haveMsk = true;
        }

        if ((isMask || forceMask) && !haveMsk) {
            this.maskNode.getComponent(cc.Mask).enabled = true;
            console.log("(cc.Mask).enabled--------------true------------>" + url);
        }
        else if (!isMask && haveMsk && !forceMask) {
            this.maskNode.getComponent(cc.Mask).enabled = false;
            console.log("(cc.Mask).enabled--------------false------------>" + url);
        }

        this.maskNode.active = true;
        this.nodeSize = node.getContentSize();
        this.spriteNode = cc.find("sprite_node", this.maskNode);
        // if (!this.spriteNode.getComponent(cc.Sprite).spriteFrame) {
        this.setSpriteByUrl();
        // }

        // return;
        if (url == "") return;
        let temp = url.lastIndexOf("/");
        let tempStr = url.slice(temp + 1);
        if (cv.StringTools.isNumber(tempStr)) {
            let tempNum = cv.Number(tempStr);
            if (tempNum <= 0 || tempNum > cv.config.HEAD_LENGTH) {
                tempNum = 1;
            }
            if (this.mode != Head_Mode.IRREGULAR) {
                url = "zh_CN/common/head/head_" + tempNum;
            }
            else {
                url = "zh_CN/game/cowboy/head/head_" + tempNum;
            }
            this.setSpriteByPath(url);
            return;
        }

        if (isDownload) {
            url = cv.dataHandler.getUserData().getImageUrlByPlat(url, plat);
            let texture: cc.Texture2D = cv.resMgr.get(url, cc.Texture2D);
            if (texture) {
                this.isDownload = true;
                this.setSpriteByTexture(texture);
            }
            else {
                this.updateSpriteByUrl(url);
            }
        }
        else {
            this.setSpriteByUrl(url);
        }

        this.setSpriteScale();
    }

    setSpriteByUrl(url: string = "") {
        if (url == "") {
            url = this.getDefaultUrl(this.mode);
        }

        this.setSpriteByPath(url);
    }

    setSpriteByTexture(texture: cc.Texture2D) {
        if (cv.tools.isValidNode(texture) && cv.tools.isValidNode(this.spriteNode)) {
            let defaultSprite: cc.Sprite = this.spriteNode.getComponent(cc.Sprite);
            defaultSprite.spriteFrame = new cc.SpriteFrame(texture);
            this.setSpriteScale();
        }
    }

    setSpriteByPath(url: string) {
        // console.log("loadEnd__path 4 : " + img + ", this.spriteNode" + this.spriteNode);
        if (!this.spriteNode || !cc.isValid(this.spriteNode, true)) return;
        cv.resMgr.setSpriteFrame(this.spriteNode, url, this.setSpriteScale.bind(this));
    }

    private setSpriteScale() {
        if (this.isDownload && this.isScale) {
            this.maskNode.setContentSize(this.nodeSize.width * 0.95, this.nodeSize.height * 0.95);//* 0.99
        }
        this.spriteNode.setScale(CircleSprite.getScaleData(this.maskNode, this.spriteNode));
    }

    updateSpriteByUrl(url: string) {
        let name: string = url.substr(url.lastIndexOf("/") + 1);
        // console.log("updateSpriteByUrl ==> name :" + name);
        if (name != "") {
            this.downloadImage(url);
        }
    }

    downloadImage(url: string) {
        cv.resMgr.loadRemote(url, (error: Error, texture: cc.Texture2D): void => {
            if (error) {
                console.log(error.message || error);
                return;
            }
            cv.resMgr.addRemoteHeadRes(url, texture);
            let temp = url.lastIndexOf("/");
            let tempStr0 = url.slice(temp + 1);
            let temp1 = this.maskNode._xurl.lastIndexOf("/");
            let tempStr1 = this.maskNode._xurl.slice(temp1 + 1);
            if (tempStr1 != tempStr0) return;
            this.isDownload = true;
            this.setSpriteByTexture(texture);
        });
    }

    getDefaultUrl(mode: number): string {
        if (this.CUSTOM_DEFAULT_URL.length > 0) {
            return this.CUSTOM_DEFAULT_URL;
        }

        let url = this.HEAD_DEFAULT_URL;
        switch (mode) {
            case Head_Mode.CIRCLE: {
                url = this.HEAD_DEFAULT_URL;
                break;
            }
            case Head_Mode.CLUB: {
                url = this.CLUB_DEFAULT_URL;
                break;
            }
            case Head_Mode.IRREGULAR: {
                url = this.IRREGULAR_DEFAULT_HEAD;
                break;
            }
            default: {
                console.log("头像模式错误！！！");
                break;
            }

        }

        return url;
    }
}
