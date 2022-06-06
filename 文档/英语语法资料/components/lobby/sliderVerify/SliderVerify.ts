import ws_protocol = require("./../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";

/**
 * 滑块验证
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class SliderVerify extends cc.Component {
    @property(cc.Sprite) img_bg: cc.Sprite = null;                                      // 背景图

    @property(cc.Node) node_drag: cc.Node = null;                                       // 遮罩根节点
    @property(cc.Node) node_match: cc.Node = null;                                      // 目标匹配节点

    @property(cc.Node) panel_view: cc.Node = null;                                      // 主面板
    @property(cc.Node) panel_result: cc.Node = null;                                    // 验证结果面板

    @property(cc.Node) panel_detail: cc.Node = null;                                    // 详情面板
    @property(cc.Label) txt_detail: cc.Label = null;                                    // 详情文本描述

    @property(cc.Node) view_shield: cc.Node = null;                                     // 视图屏蔽层
    @property(cc.Node) panel_shield: cc.Node = null;                                    // 根节点屏蔽层

    @property(cc.Slider) slider: cc.Slider = null;                                      // 滑条
    @property(cc.Button) btn_drag: cc.Button = null;                                    // 拖拽按钮
    @property(cc.Button) btn_close: cc.Button = null;                                   // 关闭按钮
    @property(cc.Button) btn_flush: cc.Button = null;                                   // 刷新按钮
    @property(cc.Button) btn_detail: cc.Button = null;                                  // 详情按钮

    static g_class_name: string = "SliderVerify";                                       // 类名
    private static g_instance: SliderVerify = null;                                     // 伪单例(随着节点移除而清空)

    private _mask: cc.Mask = null;                                                      // 遮罩节点
    private _mask_img: cc.Sprite = null;                                                // 遮罩裁剪图

    private _node_drag_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                 // 遮罩根节点初始坐标
    private _node_drag_tar_pos: cc.Vec2 = cc.Vec2.ZERO;                                 // 遮罩根节点结束坐标
    private _node_drag_range_size: cc.Size = cc.size(15, 0);                            // 遮罩根节点的偏移误差阈值

    private _btn_drag_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                  // 拖拽按钮初始坐标
    private _btn_drag_tar_pos: cc.Vec2 = cc.Vec2.ZERO;                                  // 拖拽按钮结束坐标

    private _result_time: number = 0;                                                   // 开始检测时标记的时间
    private _result_icon: cc.Sprite = null;                                             // 检测结果图标
    private _result_txt: cc.Label = null;                                               // 检测结果文本描述
    private _result_callback: Function = null;                                          // 验证结果回调
    private _isDragVerify: boolean = false;                                             // 当前认证方式是否是拖拽方式(点击关闭按钮也算作发送认证请求)

    private _title_txt: cc.Label = null;                                                // 标题文本
    private _detail_txt_bg_src_size: cc.Size = cc.Size.ZERO;                            // 详情文本描述背景原始大小
    private _detail_txt_content_src_size: cc.Size = cc.Size.ZERO;                       // 详情文本描述内容原始大小

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): SliderVerify {
        if (!(prefab instanceof cc.Prefab)) return null;

        parentNode = parentNode ? parentNode : cc.director.getScene();
        zorder = zorder ? zorder : 0;

        if (!SliderVerify.g_instance || !cc.isValid(SliderVerify.g_instance)) {
            let inst: cc.Node = cc.instantiate(prefab);
            SliderVerify.g_instance = inst.getComponent(SliderVerify);
            if (SliderVerify.g_instance) {
                let v2_size: cc.Vec2 = cc.v2(inst.width, inst.height);
                let v2_scale: cc.Vec2 = cc.v2(inst.scaleX, inst.scaleY);
                pos = pos ? pos : (inst.getAnchorPoint().sub(parentNode.getAnchorPoint())).scaleSelf(v2_size).scaleSelf(v2_scale);
                inst.setPosition(pos);
                inst.active = false;
                parentNode.addChild(inst, zorder);
            }
            else {
                inst.destroy();
                inst = null;
            }
        }

        return SliderVerify.g_instance;
    }

    /**
     * 显示视图
     * @param callback  - 验证结果成功回调
     * @param isAnim    - 是否动画
     */
    autoShow(callback: Function, isAnim: boolean = true): void {
        this.node.active = true;
        this.panel_shield.active = true;
        this._result_callback = callback;
        this._resetView();

        this.panel_view.active = true;
        this.panel_view.stopAllActions();
        if (isAnim) {
            this.panel_view.setScale(0.5);
            this.panel_view.runAction(cc.sequence(cc.scaleTo(0.2, 1).easing(cc.easeOut(3)), cc.callFunc((): void => {
                this.panel_shield.active = false;
            })));
        }
        else {
            this.panel_view.setScale(1);
            this.panel_shield.active = false;
        }
    }

    /**
     * 隐藏视图
     * @param isAnim    - 是否动画
     * @param callback  - 动画结束回调
     */
    autoHide(isAnim: boolean = true, callback: Function = null): void {
        this.panel_view.setScale(1);
        this.panel_shield.active = true;

        this.panel_view.active = true;
        this.panel_view.stopAllActions();
        if (isAnim) {
            this.panel_view.runAction(cc.sequence(cc.scaleTo(0.2, 0.5).easing(cc.easeIn(3)), cc.callFunc((): void => {
                this.node.active = false;
                this.panel_shield.active = false;
                if (callback) callback();
            })));
        }
        else {
            this.node.active = false;
            this.panel_shield.active = false;
            if (callback) callback();
        }
    }

    protected onLoad(): void {
        if (!SliderVerify.g_instance) SliderVerify.g_instance = this;
        cv.resMgr.adaptWidget(this.node, true);

        this._title_txt = this.panel_view.getChildByName("txt_title").getComponent(cc.Label);

        let panel_detail_bg: cc.Node = this.panel_detail.getChildByName("img_bg");
        this._detail_txt_bg_src_size = cc.size(panel_detail_bg.getContentSize());
        this._detail_txt_content_src_size = cc.size(this.txt_detail.node.parent.getContentSize());

        this._mask = this.node_drag.getChildByName("mask").getComponent(cc.Mask);
        this._mask_img = this._mask.node.getChildByName("img").getComponent(cc.Sprite);

        this._result_icon = this.panel_result.getChildByName("img_icon").getComponent(cc.Sprite);
        this._result_txt = this.panel_result.getChildByName("txt_desc").getComponent(cc.Label);

        // 计算拖拽按钮初始/结束位置
        let start_x: number = (0 - this.slider.node.anchorX) * this.slider.node.width - 10;
        let start_y: number = (0.5 - this.slider.node.anchorY) * this.slider.node.height;
        this._btn_drag_src_pos.x = start_x + this.btn_drag.node.width * this.btn_drag.node.anchorX;
        this._btn_drag_src_pos.y = start_y + this.btn_drag.node.height * (this.btn_drag.node.anchorY - 0.5);

        start_x = (1 - this.slider.node.anchorX) * this.slider.node.width + 10;
        this._btn_drag_tar_pos.x = start_x - this.btn_drag.node.width * (1 - this.btn_drag.node.anchorX);
        this._btn_drag_tar_pos.y = this._btn_drag_src_pos.y;

        // 隐藏相关控件
        this.img_bg.node.active = false;
        this.panel_result.active = false;
        this.panel_detail.active = false;
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterEvent();
        }
    }

    protected onDestroy(): void {
        SliderVerify.g_instance = null;
        console.log(`${SliderVerify.g_class_name}: onDestroy`);
    }

    private _registerEvent(): void {
        // 控件事件
        this.btn_close.node.on("click", this._onClickClose, this);
        this.btn_flush.node.on("click", this._onClickFlush, this);
        this.btn_detail.node.on("click", this._onClickDetail, this);

        this.panel_detail.on(cc.Node.EventType.TOUCH_END, this._onDetailPanelTouchEnd, this);
        this.btn_drag.node.on(cc.Node.EventType.TOUCH_START, this._onDragBtnTouchStart, this);
        this.btn_drag.node.on(cc.Node.EventType.TOUCH_MOVE, this._onDragBtnToucMove, this);
        this.btn_drag.node.on(cc.Node.EventType.TOUCH_END, this._onDragBtnToucEnd, this);
        this.btn_drag.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onDragBtnToucCancel, this);

        // 消息事件
        cv.MessageCenter.register("on_update_slider_verify_result", this._onMsgUpdateSliderVerifyResult.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        // 控件事件
        this.btn_close.node.off("click", this._onClickClose, this);
        this.btn_flush.node.off("click", this._onClickFlush, this);
        this.btn_detail.node.off("click", this._onClickDetail, this);

        this.panel_detail.off(cc.Node.EventType.TOUCH_END, this._onDetailPanelTouchEnd, this);
        this.btn_drag.node.off(cc.Node.EventType.TOUCH_START, this._onDragBtnTouchStart, this);
        this.btn_drag.node.off(cc.Node.EventType.TOUCH_MOVE, this._onDragBtnToucMove, this);
        this.btn_drag.node.off(cc.Node.EventType.TOUCH_END, this._onDragBtnToucEnd, this);
        this.btn_drag.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onDragBtnToucCancel, this);

        // 消息事件
        cv.MessageCenter.unregister("on_update_slider_verify_result", this.node);
    }

    /**
     * 更新静态文本
     */
    private _updateStaticText(): void {
        this._title_txt.string = cv.config.getStringData("slider_verify_ui_title_txt");
    }

    /**
     * 重置视图
     */
    private _resetView(): void {
        this._updateStaticText();

        this.view_shield.active = true;

        this.node_drag.active = false;
        this.node_match.active = false;
        this.btn_drag.node.active = false;

        this.img_bg.node.active = false;
        this.panel_result.active = false;
        this.panel_detail.active = false;

        this.btn_drag.node.stopAllActions();
        this.btn_drag.unscheduleAllCallbacks();
        this.btn_drag.node.setPosition(this._btn_drag_src_pos);

        this.node.stopAllActions();
        this.unscheduleAllCallbacks();

        // 本地加载背景图
        if (true) {
            this._loadLoadingBG((): void => {
                this._updateView();
            });
        }
        // 远程加载背景图
        else {
            this._remoteLoadingBG((): void => {
                this._updateView();
            });
        }
    }

    /**
     * 更新视图
     */
    private _updateView(): void {
        this.view_shield.active = false;
        this.img_bg.node.active = true;
        this.btn_drag.node.active = true;

        this._generateMatchPos();
    }

    /**
     * 远程加载背景图(基于免费在线图库"https://picsum.photos")
     */
    private _remoteLoadingBG(cb: () => void): void {
        let w: number = this.img_bg.node.width;
        let h: number = this.img_bg.node.height;
        let index: number = Math.floor(cv.StringTools.randomRange(0, 1030));
        let str_url: string = cv.StringTools.formatC("https://picsum.photos/id/%d/%d/%d", index, w, h);
        let str_type: string = "png";

        // 远程加载资源背景图
        cv.resMgr.loadRemote(`${str_url}${str_type}`, (error: Error, texture: cc.Texture2D) => {
            if (error) {
                console.error(error.message || error);
                return;
            }
            this.img_bg.spriteFrame = new cc.SpriteFrame(texture);
            if (cb) cb();
        });
    }

    /**
     * 本地加载背景图
     */
    private _loadLoadingBG(cb: () => void): void {
        let index: number = Math.floor(cv.StringTools.randomRange(0, 30));
        let fileName: string = `zh_CN/common/sliderVerify/bg/${index}`;
        cv.resMgr.setSpriteFrame(this.img_bg.node, fileName, (param: cc.SpriteFrame) => {
            if (cb) cb();
        });
    }

    /**
     * 生成匹配坐标(计算都以左下角为原点)
     */
    private _generateMatchPos(): void {
        // 计算原点坐标(左下角 -> 右上角)
        let start_x: number = -this.img_bg.node.anchorX * this.img_bg.node.width;
        let start_y: number = -this.img_bg.node.anchorY * this.img_bg.node.height;
        let ended_x: number = start_x + this.img_bg.node.width;
        let ended_y: number = start_y + this.img_bg.node.height;

        // 设置偏移增量
        let offset_extra: cc.Vec2 = cc.v2(20, 20);

        // 计算偏移范围
        let rang_min_x: number = start_x + this.node_match.width * this.node_match.scaleX;
        rang_min_x += this.node_match.width * this.node_match.anchorX * this.node_match.scaleX;
        rang_min_x += offset_extra.x;

        let rang_min_y: number = start_y;
        rang_min_y += this.node_match.height * this.node_match.anchorY * this.node_match.scaleY;
        rang_min_y += offset_extra.y;

        let rang_max_x: number = ended_x;
        rang_max_x -= this.node_match.width * (1 - this.node_match.anchorX) * this.node_match.scaleX;
        rang_max_x -= offset_extra.x;

        let rang_max_y: number = ended_y;
        rang_max_y -= this.node_match.height * (1 - this.node_match.anchorY) * this.node_match.scaleY;
        rang_max_y -= offset_extra.y;

        // 生成随机坐标
        let random_x: number = cv.StringTools.randomRange(rang_min_x, rang_max_x);
        let random_y: number = cv.StringTools.randomRange(rang_min_y, rang_max_y);

        // 设置匹配节点坐标
        this.node_match.setPosition(random_x, random_y);
        this.node_match.active = true;

        // 生成遮罩精灵
        this._mask_img.spriteFrame = this.img_bg.spriteFrame.clone();
        this._mask_img.node.setPosition(-this.node_match.x, -this.node_match.y);

        // 设置拖拽节点位置
        this.node_drag.setPosition(start_x + this.node_drag.width * this.node_drag.anchorX, this.node_match.y);
        this.node_drag.active = true;

        // 记录拖拽节点始/末坐标
        this._node_drag_src_pos.x = this.node_drag.x;
        this._node_drag_src_pos.y = this.node_drag.y;
        this._node_drag_tar_pos.x = ended_x - this.node_drag.width * (1 - this.node_drag.anchorX);
        this._node_drag_tar_pos.y = this.node_drag.y;
    }

    /**
     * 更新匹配坐标
     */
    private _updateMatchPos(): void {
        let offset_x: number = this.btn_drag.node.x - this._btn_drag_src_pos.x;
        let pos_x: number = Math.min(this._node_drag_src_pos.x + offset_x, this._node_drag_tar_pos.x);
        this.node_drag.x = pos_x;
    }

    /**
     * 复原拖拽按钮位置
     * @param isAnim 
     */
    private _recoverDragBtnPos(isAnim: boolean = true): void {
        this.view_shield.active = true;

        this.btn_drag.node.active = true;
        this.btn_drag.node.stopAllActions();
        this.btn_drag.unscheduleAllCallbacks();

        if (isAnim) {
            let during: number = 0.3;
            let moveTo: cc.ActionInterval = cc.moveTo(during, this._btn_drag_src_pos).easing(cc.easeOut(3));
            this.btn_drag.node.runAction(cc.sequence(moveTo, cc.callFunc((): void => {
                this.view_shield.active = false;
                this.btn_drag.unscheduleAllCallbacks();
                console.log(`${SliderVerify.g_class_name}: drag btn action recover pos`);
            })));

            // 同步更新"遮罩根节点"位置
            this.btn_drag.schedule((): void => {
                this._updateMatchPos();
            }, 0);
        }
        else {
            this.view_shield.active = false;
            this.btn_drag.node.setPosition(this._btn_drag_src_pos);
            this._updateMatchPos();
        }
    }

    /**
     * 检测验证结果
     */
    private _checkVerifyResult(): void {
        let result: boolean = false;
        let dev_x: number = Math.abs(this.node_drag.x - this.node_match.x);
        let dev_y: number = Math.abs(this.node_drag.y - this.node_match.y);

        let result_time: number = (new Date().getTime() - this._result_time) / 1000;
        result_time = cv.StringTools.toFixed(result_time, 1);
        if (dev_x <= this._node_drag_range_size.width && dev_y <= this._node_drag_range_size.height) {
            result = true;

            // 耗时 <= 1s
            let result_desc: string = "";
            if (result_time <= 1) {
                result_desc = cv.StringTools.formatC(cv.config.getStringData("slider_verify_ui_result_success_txt_1"), result_time);
            }
            // 耗时 > 1s
            else {
                result_desc = cv.StringTools.formatC(cv.config.getStringData("slider_verify_ui_result_success_txt_2"), result_time);
            }

            // 成功直接显示ui, 然后在发送远程请求
            this._showResultPanel(true, result_desc);
        }
        else {
            result = false;
        }

        // 设置当前验证方式为拖拽方式
        this._isDragVerify = true;

        // 开启屏蔽界面
        this.view_shield.active = true;

        // 发送远程验证结果
        let result_code: number = result ? 0 : 1;
        cv.worldNet.requestAuthVerify(result_code);
    }

    /**
     * 显示验证结果面板
     * @param result_success    是否认证成功
     * @param result_desc       结果描述语
     */
    private _showResultPanel(result_success: boolean, result_desc: string): void {
        let result_icon_fileName: string = "";
        let result_color: cc.Color = cc.Color.WHITE;

        if (result_success) {
            result_color = cc.color(0x18, 0x9D, 0x73);
            result_icon_fileName = "zh_CN/common/sliderVerify/icon_result_success";
        }
        else {
            result_color = cc.color(0xFF, 0x49, 0x49);
            result_icon_fileName = "zh_CN/common/sliderVerify/icon_result_faild";
        }

        this.view_shield.active = true;
        this.panel_result.active = true;
        this._result_txt.string = result_desc;
        this._result_txt.node.color = result_color;
        cv.resMgr.setSpriteFrame(this._result_icon.node, result_icon_fileName);
    }

    /**
     * 显示详情面板
     * @param isShow 
     * @param isAnim 
     */
    private _showDetailPanel(isShow: boolean, isAnim: boolean = true): void {
        this.panel_detail.active = true;
        let panel_detail_bg: cc.Node = this.panel_detail.getChildByName("img_bg");
        let scrollView: cc.ScrollView = panel_detail_bg.getChildByName("scrollview").getComponent(cc.ScrollView);
        panel_detail_bg.active = true;
        panel_detail_bg.stopAllActions();

        // 显示的时候才排版
        if (isShow) {
            let wrapReplace: string = "\n  ";
            let skipSplit: boolean = cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN;
            let srcStrDesc: string = cv.config.getStringData("slider_verify_ui_detail_txt");
            let tarStrDesc: string = cv.StringTools.calculateAutoWrapString(this.txt_detail.node, srcStrDesc, wrapReplace, skipSplit);
            // tarStrDesc = tarStrDesc.replace(/(\n *)/ig, "\n");       // 去除换行紧邻的空格
            // tarStrDesc = tarStrDesc.replace(/(\n)(?!• )/ig, "\n  "); // 零宽度负先行断言(治标不治本, 还得修改"calculateAutoWrapString"换行替换串去根治)
            this.txt_detail.string = tarStrDesc;

            let sz_inner: cc.Size = scrollView.content.getContentSize();                    // 内框滚动区大小
            let sz_content: cc.Size = cv.resMgr.getLabelStringSize(this.txt_detail);        // 填充内容后的大小
            let offset_h: number = sz_content.height - sz_inner.height;
            if (offset_h > 0) {
                // 自适应长文本, 相关控件大小, 位置等
                // 真实高度差
                let ratio: number = 1.0;
                let real_h: number = Math.min(offset_h, ratio * sz_inner.height);

                // layer
                let sz_layer: cc.Size = panel_detail_bg.getContentSize();
                sz_layer.height += real_h;
                panel_detail_bg.setContentSize(sz_layer);

                // scrollview
                sz_inner.height += real_h;
                scrollView.node.setContentSize(sz_inner);
                scrollView.content.setContentSize(sz_inner.width, sz_content.height);
            }
        }

        // 动画
        let seq: cc.Action = null;
        let duration: number = 0.3;

        if (isShow) {
            panel_detail_bg.setScale(0);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                panel_detail_bg.setScale(1.0);
                this.panel_shield.active = false;
            });

            if (isAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 1.0);
                let ebo: cc.ActionInterval = st.easing(cc.easeBackOut());
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            panel_detail_bg.setScale(1);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                panel_detail_bg.setScale(0);
                this.panel_shield.active = false;
                this.panel_detail.active = false;
                scrollView.scrollToOffset(cc.Vec2.ZERO);

                // 复原详情面板文本描述原始大小(防止中英文面板切换一直停留历史最大尺寸)
                panel_detail_bg.setContentSize(this._detail_txt_bg_src_size);
                scrollView.node.setContentSize(this._detail_txt_content_src_size);
                scrollView.content.setContentSize(this._detail_txt_content_src_size);
            });

            if (isAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 0.0);
                let ebi: cc.ActionInterval = st.easing(cc.easeBackIn());
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            panel_detail_bg.runAction(seq);
            this.panel_shield.active = true;
        }
    }

    /**
     * 详情面板触摸事件
     * @param event 
     */
    private _onDetailPanelTouchEnd(event: cc.Event.EventTouch): void {
        console.log(`${SliderVerify.g_class_name}: detail panel_view touch end`);

        this._showDetailPanel(false);
        event.stopPropagation();
    }

    /**
     * 拖拽按钮触摸事件
     * @param event 
     */
    private _onDragBtnTouchStart(event: cc.Event.EventTouch): void {
        console.log(`${SliderVerify.g_class_name}: drag touch start`);

        this._result_time = new Date().getTime();
        event.stopPropagation();
    }

    /**
     * 拖拽按钮触摸事件
     * @param event 
     */
    private _onDragBtnToucMove(event: cc.Event.EventTouch): void {
        // console.log(`${SliderVerify.g_class_name}: drag touch move`);

        let location: cc.Vec2 = event.getLocation();
        // let wMinPos: cc.Vec2 = cc.Vec2.ZERO;
        // let wMaxPos: cc.Vec2 = cc.Vec2.ZERO;
        // this.btn_drag.node.parent.convertToWorldSpaceAR(this._btn_drag_src_pos, wMinPos);
        // this.btn_drag.node.parent.convertToWorldSpaceAR(this._btn_drag_tar_pos, wMaxPos);
        // if (location.x <= wMinPos.x || location.x >= wMaxPos.x) return;

        let pos: cc.Vec2 = cc.Vec2.ZERO;
        this.btn_drag.node.parent.convertToNodeSpaceAR(location, pos);
        pos.x = Math.min(pos.x, this._btn_drag_tar_pos.x);
        pos.x = Math.max(pos.x, this._btn_drag_src_pos.x);
        this.btn_drag.node.x = pos.x;

        this._updateMatchPos();
        event.stopPropagation();
    }

    /**
     * 拖拽按钮触摸事件
     * @param event 
     */
    private _onDragBtnToucEnd(event: cc.Event.EventTouch): void {
        console.log(`${SliderVerify.g_class_name}: drag touch end`);

        this._checkVerifyResult();
        event.stopPropagation();
    }

    /**
     * 拖拽按钮触摸事件
     * @param event 
     */
    private _onDragBtnToucCancel(event: cc.Event.EventTouch): void {
        console.log(`${SliderVerify.g_class_name}: drag touch cancel`);

        let location: cc.Vec2 = event.getLocation();
        if (location.x <= 0 || location.x >= cc.winSize.width || location.y <= 0 || location.y >= cc.winSize.height) {
            this._recoverDragBtnPos();
        }
        else {
            this._checkVerifyResult();
        }

        event.stopPropagation();
    }

    /**
     * 点击关闭
     * @param event 
     */
    private _onClickClose(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        this._isDragVerify = false;
        cv.worldNet.requestAuthVerify(1);

        // 直接关闭窗口
        this.autoHide(true, (): void => {
            cv.TT.showMsg(cv.config.getStringData("slider_verify_toast_result_faild_txt"), cv.Enum.ToastType.ToastTypeError);
        });
    }

    /**
     * 点击刷新
     * @param event 
     */
    private _onClickFlush(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._resetView();
    }

    /**
     * 点击详情
     * @param event 
     */
    private _onClickDetail(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._showDetailPanel(!this.panel_detail.active);
    }

    /**
     * 真人验证服务端返回结果
     * @param resp 
     */
    private _onMsgUpdateSliderVerifyResult(resp: world_pb.AuthVerifyResponse): void {
        console.log(`${SliderVerify.g_class_name}: response msg slider verify result: ${resp.error}`);

        switch (resp.error) {
            // 验证成功
            case 1: {
                let during: number = 1;
                this.scheduleOnce((): void => {
                    // 关闭验证窗口
                    this.autoHide(true, (): void => {
                        cv.TT.showMsg(cv.config.getStringData("slider_verify_toast_result_success_txt"), cv.Enum.ToastType.ToastTypeSuccess);

                        // 执行验证结果回调
                        if (this._result_callback) this._result_callback();
                    });
                }, during);
            } break;

            // 验证失败
            case 239: {
                // 正常拖拽验证
                if (this._isDragVerify) {
                    // 显示结果界面
                    this._showResultPanel(false, cv.config.getStringData("slider_verify_ui_result_faild_txt_1"));

                    // 延时后重置验证界面
                    let during: number = 1;
                    this.scheduleOnce((): void => { this._resetView(); }, during);
                }
                // 点击了关闭按钮
                else {
                    // this.autoHide(true, (): void => {
                    //     cv.TT.showMsg(cv.config.getStringData("slider_verify_toast_result_faild_txt"), cv.Enum.ToastType.ToastTypeError);
                    // });
                }
            } break;

            // 超过默认验证错误次数
            case 240: {
                // 显示结果界面
                this._showResultPanel(false, cv.config.getStringData("slider_verify_ui_result_faild_txt_2"));

                // 延时关闭
                let during: number = 1;
                this.scheduleOnce((): void => { this.autoHide(); }, during);
            } break;

            // 其他错误, 直接关闭验证框
            default: {
                this.autoHide(true, (): void => {
                    cv.TT.showMsg(cv.config.getStringData(`ServerErrorCode${resp.error}`), cv.Enum.ToastType.ToastTypeError);
                });
            } break;
        }
    }
}
