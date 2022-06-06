import cv from "../../lobby/cv";
import { TableView } from "../../../common/tools/TableView";
import { CustomToggle } from "../../lobby/customToggle/CustomToggle";

export class ChangeCardCardFaceItemData {
    index: number = 0;
    isCheck: boolean = false;
}

/**
 * 牌面设置子项
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ChangeCardCardFaceItem extends cc.Component {
    @property(CustomToggle) toggle: CustomToggle = null;

    private _data: ChangeCardCardFaceItemData = null;
    static g_class_name: string = "ChangeCardCardFaceItem";

    protected onLoad(): void {
        // 默认非勾选
        this.toggle.isChecked = false;
        this.toggle.node.on("toggle", (toggle: CustomToggle): void => {
            cv.MessageCenter.send(`${ChangeCardCardFaceItem.g_class_name}_toggle`, this._data);
        });
    }

    protected start(): void {
    }

    updateSVReuseData(index: number, data: ChangeCardCardFaceItemData, view?: TableView): void {
        this._data = data;
        this.toggle.isChecked = data.isCheck;

        let fileName: string = cv.StringTools.formatC("game/jackfruit/setting/cardstyle_%02d", data.index + 1);
        cv.resMgr.setSpriteFrame(this.node, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.zh_CN));
    }
}
