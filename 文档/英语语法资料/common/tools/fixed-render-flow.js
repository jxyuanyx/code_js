// 修复2.4.3版本Cocos引擎中render-flow.js 中出现 Uncaught TypeError: Cannot read property '_assembler' of null 报错卡住的问题
/** 补丁支持的版本 */
const VERSIONS = ["2.4.0", "2.4.1", "2.4.2", "2.4.3", "2.4.4", "2.4.5"];

if (VERSIONS.indexOf(cc.ENGINE_VERSION) > -1) {
    console.log("应用修复Uncaught TypeError: Cannot read property '_assembler' of null问题的补丁");
    let _proto = cc.RenderFlow.prototype;
    let original_updateRenderData = _proto._updateRenderData;
    _proto._updateRenderData = function (node) {
        let comp = node._renderComponent;
        if (comp) {
            comp._assembler.updateRenderData(comp);
            node._renderFlag &= ~cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
        }
        this._next._func(node);
    };
    let original_render = _proto._render;
    _proto._render = function (node) {
        let comp = node._renderComponent;
        if (comp) {
            let _batcher = cc.RenderFlow.getBachther();
            comp._checkBacth(_batcher, node._cullingMask);
            comp._assembler.fillBuffers(comp, _batcher);
        }
        this._next._func(node);
    };
    let original_postRender = _proto._postRender;
    _proto._postRender = function (node) {
        let comp = node._renderComponent;
        if (comp) {
            let _batcher = cc.RenderFlow.getBachther();
            comp._checkBacth(_batcher, node._cullingMask);
            comp._assembler.postFillBuffers(comp, _batcher);
        }
        this._next._func(node);
    };
    let original_draw = _proto._draw;
    _proto._draw = function (node, func) {
        let batcher = cc.RenderFlow.getBachther();
        let ctx = batcher._device._ctx;
        let cam = batcher._camera;
        ctx.setTransform(cam.a, cam.b, cam.c, cam.d, cam.tx, cam.ty);
        ctx.scale(1, -1);

        let comp = node._renderComponent;
        if (comp) {
            comp._assembler[func](ctx, comp);
        }
        this._next._func(node);
    }
}


