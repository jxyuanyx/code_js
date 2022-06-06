const { ccclass, property } = cc._decorator;
@ccclass
export class JackPotNumber extends cc.Component {
	@property(cc.Node) root: cc.Node = null;
	@property(cc.Node) panel: cc.Node = null;
	@property(cc.Node) panel_new: cc.Node = null;

	private _imgPos: cc.Vec2[] = [];
	private _imgList: any[] = [];
	private _posY: number[] = [];
	private _objNum: number = 0;
	private _curShowNum: number = 0;
	private _runTime: number = 0;
	private _isRuning: boolean = false;

	protected onLoad(): void {
	}

	protected start(): void {
	}

	init(isSmall: boolean): void
	{
		this.panel.active = !isSmall;
		this.panel_new.active = isSmall;
		if(!isSmall)
		{
			for (let i = 0; i < 10; i++) {
				let spr: cc.Sprite = this.panel.getChildByName(`img${i}`).getComponent(cc.Sprite)
				spr.node.name = i.toString();
				this._imgList.push(spr);
				this._posY[i] = -i * 110;
			}
			this._imgPos.push(cc.v2(0, 0));
			this._imgPos.push(cc.v2(0, -110));
			this._imgPos.push(cc.v2(0, -220));
			this._imgPos.push(cc.v2(0, -330));
			this._imgPos.push(cc.v2(0, -440));
			this._imgPos.push(cc.v2(0, -550));
			this._imgPos.push(cc.v2(0, -660));
			this._imgPos.push(cc.v2(0, -770));
			this._imgPos.push(cc.v2(0, -880));
			this._imgPos.push(cc.v2(0, 110));
		}else
		{
			for (let i = 0; i < 10; i++) {
				let spr: cc.Label = this.panel_new.getChildByName(`num${i}`).getComponent(cc.Label)
				spr.node.name = i.toString();
				this._imgList.push(spr);
				this._posY[i] = -i * 110;
			}
	
			this._imgPos.push(cc.v2(0, 0));
			this._imgPos.push(cc.v2(0, -33));
			this._imgPos.push(cc.v2(0, -66));
			this._imgPos.push(cc.v2(0, -99));
			this._imgPos.push(cc.v2(0, -132));
			this._imgPos.push(cc.v2(0, -165));
			this._imgPos.push(cc.v2(0, -198));
			this._imgPos.push(cc.v2(0, -231));
			this._imgPos.push(cc.v2(0, -264));
			this._imgPos.push(cc.v2(0, 33));
		}
	}

	hideBg(): void {
		this.root.active = false;
	}

	showNum(num: number, time: number = 1): void {
		this._objNum = num;
		if (this._isRuning) return;
		if (this._objNum === this._curShowNum) return;
		this._runTime = time;
		this.run();
	}

	run(): void {
		for (let i = 0; i < 10; i++) {
			if (parseInt(this._imgList[i].node.name) === 9) {
				this._imgList[i].node.opacity = 0;
			}
			this._imgList[i].node.stopAllActions();
			let objPosIndex: number = parseInt(this._imgList[i].node.name) - 1 === -1 ? 9 : parseInt(this._imgList[i].node.name) - 1;
			let runTime: number = 0;
			if (this._runTime != 1) {
				runTime = this._runTime;
			}
			else {
				runTime = this._objNum * 0.1;
			}
			let moveTo = cc.moveTo(runTime, this._imgPos[objPosIndex]);
			this._imgList[i].node.name = objPosIndex.toString();
			if (i === 9) {
				let callBack = cc.callFunc(this.moveCallBack, this, this._imgList[i]);
				this._imgList[i].node.runAction(cc.sequence(moveTo, callBack));
			}
			else {
				this._imgList[i].node.runAction(moveTo);
			}
			this._isRuning = true;
		}
	}

	moveCallBack(node: cc.Node): void {
		for (let i = 0; i < 10; i++) {
			if (parseInt(this._imgList[i].node.name) === 8) {
				this._imgList[i].node.opacity = 0xFF;
			}
		}
		this._curShowNum += 1;
		if (this._curShowNum >= 10) {
			this._curShowNum = 0;
		}
		if (this._curShowNum != this._objNum) {
			this.run();
		}
		else {
			this._isRuning = false;
		}
	}

	setGameStyle(scale: number = 0.4): void {
		this.panel.setScale(scale);
		this.root.setScale(scale);
	}

	setNumberImg(idx: number, frame: cc.SpriteFrame): void {
		if (idx < 0 || idx >= this._imgList.length) return;
		let img_num: cc.Sprite = this._imgList[idx];
		img_num.spriteFrame = frame;
	}
}
