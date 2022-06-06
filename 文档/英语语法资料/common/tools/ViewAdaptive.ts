import cv from "../../components/lobby/cv";

export class ViewAdaptive {

    private static _g_instance: ViewAdaptive = null;

    public IPHONEX_OFFSETY: number = 100;       // 刘海屏刘海偏移量
    public isselfchange: boolean = false;       // 小游戏点击充值切换场景操作
    public cowboyroomid: number = 0;
    public videoCowboyRoomId: number = 0;
    public humanboyroomid: number = 0;
    public pokerMasterRoomID: number = 0;
    public bjpvpLevelId: number = 0;
    public isbackToClubScene: boolean = false;
    public static getInstance(): ViewAdaptive {
        if (!ViewAdaptive._g_instance) {
            ViewAdaptive._g_instance = new ViewAdaptive();
        }
        return ViewAdaptive._g_instance;
    }

    //重置缓存数据
    public reset() {
        this.isselfchange = false;
        this.cowboyroomid = 0;
        this.videoCowboyRoomId = 0;
        this.humanboyroomid = 0;
        this.pokerMasterRoomID = 0;
        this.isbackToClubScene = false;
    }
    public AdaptiveWidt(img: cc.Node) {
        if (!cv.config.IS_WIDESCREEN) return;
        img.setContentSize(cc.size(cc.winSize.width, img.getContentSize().height));
        img.setContentSize(cc.size(cc.winSize.width, img.getContentSize().height));
    }

    public AdaptiveHeight(img: cc.Node) {
        img.setContentSize(cc.size(img.getContentSize().width, cc.winSize.height));
    }

    public AdaptiveLeft(node: cc.Node, isScaleAdaptive: boolean = true) {
        let scaleX: number = 1;
        if (isScaleAdaptive) {
            scaleX = cv.config.DESIGN_WIDTH / cc.winSize.width;
        }
        let objX = node.x - (cc.winSize.width - cv.config.DESIGN_WIDTH) * scaleX / 2;
        node.setPosition(objX);
    }

    public AdaptiveRight(node: cc.Node, isScaleAdaptive: boolean = true) {
        if (!cv.config.IS_WIDESCREEN) return;
        let scaleX = 1;
        if (isScaleAdaptive) {
            scaleX = cv.config.DESIGN_WIDTH / cc.winSize.width;
        }
        let worldX = node.x + (cc.winSize.width - cv.config.DESIGN_WIDTH) * scaleX / 2;
        node.setPosition(node.x + (cc.winSize.width - cv.config.DESIGN_WIDTH) * scaleX / 2);
    }

    public AdaptiveMiddle(node: cc.Node) {
        let scale = 1.0;
        if (!cv.config.IS_WIDESCREEN) {
            return;
            scale = cc.winSize.width / 1080;
            node.setScale(scale);
        }
        node.setPosition((cc.winSize.width - cv.config.DESIGN_WIDTH) * scale / 2);
    }

    public getAdaptiveLeftX(posx: number, isScaleAdaptive: boolean): number {
        if (!cv.config.IS_WIDESCREEN) return posx;
        let scaleX = 1;
        if (isScaleAdaptive) {
            scaleX = cc.winSize.width / cv.config.DESIGN_WIDTH;
        }
        console.log("cc.winSize.width:" + cc.winSize.width + "  cv.config.DESIGN_WIDTH:" + cv.config.DESIGN_WIDTH);
        return posx * scaleX;
        return posx - (cc.winSize.width - cv.config.DESIGN_WIDTH) * scaleX / 2;
    }

    public getAdaptiveRightX(posx: number, isScaleAdaptive: boolean): number {
        if (!cv.config.IS_WIDESCREEN) return posx;
        let scaleX = 1;
        if (isScaleAdaptive) {
            scaleX = cc.winSize.width / cv.config.DESIGN_WIDTH;
        }
        return cv.config.WIDTH - (scaleX * (cv.config.DESIGN_WIDTH - posx));
        return posx + (cc.winSize.width - cv.config.DESIGN_WIDTH) * scaleX / 2;
    }

    /**
     * 将一个节点中的坐标位置转换为距该节点中心点的位置
     * @param targetNode 目标节点
     * @param posx 目标坐标
     */
    public getPosByMidAnchorPoint(targetNode: cc.Node, targetPos: cc.Vec2) {
        return cc.v2(targetPos.x + (0.5 - targetNode.anchorX) * targetNode.width, targetPos.y - (0.5 - targetNode.anchorY) * targetNode.height)
    }

    public getAdaptivePositionX(posx: number): number {
        let newX: number = posx / cv.config.DESIGN_WIDTH * cc.winSize.width;
        return newX;
    }

    public getAdaptivePositionY(posy: number, isAdaptiveIPhoneX: boolean): number {
        let newY: number = posy / cv.config.DESIGN_HEIGHT * cc.winSize.height;

        if (cv.native.isFullScreen() && isAdaptiveIPhoneX) {
            newY = posy / cv.config.DESIGN_HEIGHT * (cc.winSize.height - this.IPHONEX_OFFSETY)
        }
        return newY;
    }

    public getAdaptivePosition(x: number, y: number): cc.Vec2 {
        let newX: number = this.getAdaptivePositionX(x);
        let newY: number = this.getAdaptivePositionY(y, true);
        return cc.v2(newX, newY);
    }

    public adaptiveIPhoneX(panel: cc.Node, isAdaptiveScrollView: boolean) {
        if (!cv.native.isFullScreen()) {
            return;
        }

        let yy = panel.getContentSize().height;
        let panelSize = cc.size(panel.getContentSize().width, panel.getContentSize().height - this.IPHONEX_OFFSETY);
        let list = panel.children;
        let len = panel.childrenCount;
        let h = 2436; //cc.winSize.height;
        for (let i = 0; i < len; i++) {
            let newY = (list[i].getPosition().y / h) * panelSize.height;
            list[i].setPosition(list[i].getPosition().x, newY);
            if (isAdaptiveScrollView) {
                if (list[i].getComponent(cc.ScrollView) instanceof cc.ScrollView) {
                    let scrollView = list[i];
                    let size = scrollView.getContentSize();
                    scrollView.setContentSize(size.width, size.height - this.IPHONEX_OFFSETY);
                }
            }
        }
    }
}
