import ws_protocol = require("../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class SportsScene extends cc.Component {
    @property(cc.WebView) web: cc.WebView = null;
    private webPos: cc.Vec2 = null;

    onLoad() {
        if (cv.roomManager.getCurrentGameID() === world_pb.GameId.TopMatches) {
            cv.config.adaptScreenHen(this.node);
        }
        else {
            cv.config.adaptScreen(this.node);
        }

        // 这行要注释掉, ipad上会引起webview视图紊乱放大, 解决方案要么注释, 要么widget后动态添加webview
        // cv.resMgr.adaptWidget(this.node, true);

        cv.MessageCenter.register("startSportsScene", this.startSportsScene.bind(this), this.node);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleSwitchServer.bind(this), this.node);
        cv.MessageCenter.register("showSportsScene", this.showSportsScene.bind(this), this.node);
        cv.MessageCenter.register("Exit_click", this.exitGame.bind(this), this.node);
    }

    start() {
        this.webPos = this.web.node.getPosition();
        this.setWebUrl();
        this.web.setJavascriptInterfaceScheme("ccjs");
        this.web.setOnJSCallback((webView: cc.WebView, url: string) => {
            console.log("sports ccjs ------ " + url);
            if (url.search("ccjs://back-normal") != -1) {
                this.exitGame();
                return;
            }
        });

        this.showSportsScene();
    }

    onDestroy() {
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
        cv.MessageCenter.unregister("startSportsScene", this.node);
        cv.MessageCenter.unregister("showSportsScene", this.node);
        cv.MessageCenter.unregister("Exit_click", this.node);
    }

    HandleSwitchServer(isView?: boolean) {
        isView = isView == true ? true : false;
        isView = (!cv.TP.getVisible()) && isView;
        this.setWebActive(isView);
    }

    exitGame() {
        let gameId = cv.roomManager.getCurrentGameID();
        cv.roomManager.reset();

        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene): void => {
            if (!cv.roomManager.isEnterMTT) {
                cv.MessageCenter.send("switchSceneToMiniGame");
            }

            switch (gameId) {
                case world_pb.GameId.Sports:
                case world_pb.GameId.TopMatches: cv.worldNet.SportsLeaveRequest(); break;
                case world_pb.GameId.PocketGames:{
                        cv.worldNet.PgLeaveRequest();
                        cv.worldNet.PgBonusAndFreeGamesRequest(); //退出电子小游戏后，请求电子小游戏福利数据
                    }
                    break;
                default: break;
            }

        });
    }

    startSportsScene(gameid: number) {
        this.setWebUrl();
        this.showSportsScene();
    }

    showSportsScene() {
        let isView = cv.TP.getVisible();
        this.setWebActive(!isView);
    }

    setWebUrl() {
        switch (cv.roomManager.getCurrentGameID()) {
            case world_pb.GameId.Sports:
            case world_pb.GameId.TopMatches: this.web.url = cv.roomManager.getSportsUrl(); break;
            case world_pb.GameId.PocketGames: this.web.url = cv.roomManager.getElcGamesUrl(); break;
            default: break;
        }
    }

    setWebActive(isView: boolean) {
        switch (cv.roomManager.getCurrentGameID()) {
            case world_pb.GameId.Sports:
            case world_pb.GameId.TopMatches: {
                this.web.node.active = isView;
            } break;

            case world_pb.GameId.PocketGames: {
                let posX = isView ? this.webPos.x : (this.webPos.x + cc.winSize.width * 1.5);
                this.web.node.setPosition(posX, this.webPos.y);
            } break;

            default: break;
        }
    }
}
