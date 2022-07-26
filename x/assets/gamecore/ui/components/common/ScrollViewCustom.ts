const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollviewCustom extends cc.ScrollView {
    
    _stopPropagationIfTargetIsMe(event){
        
    }

    _onTouchEnded (event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        //@ts-ignore
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        //@ts-ignore
        this._dispatchEvent('touch-up');

        let touch = event.touch;
        if (this.content) {
            //@ts-ignore
            this._handleReleaseLogic(touch);
        }
    }
}
