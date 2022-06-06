import cv from "../cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.EditBox) search: cc.EditBox = null;

    start () {

    }

    onTextChanged()
    {
        let str = this.search.string;
        str = cv.StringTools.earseNoNumber(str);
        this.search.string = str;
    }

}
