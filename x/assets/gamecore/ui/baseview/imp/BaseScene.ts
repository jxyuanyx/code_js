import {DlgEnum} from "../../../enums/DlgEnum";
import { Package } from "../../../net/Package";
import { BaseComponent } from "./BaseComponent";
import { IBaseScene } from "../IBaseScene";
import { AutoBindHelper } from "../tools/AutoBindHelper";
import App from "../../../App";

export class BaseScene extends BaseComponent implements IBaseScene{
  
    onLoad(){
        super.onLoad();

        this._initCommonResource();

        this.beforeEnter();
    }

    _initCommonResource(){
        
    }

    start(){
        this.afterEnter();
    }

    onMessage(pkg: Package):any {
        //throw new Error("Method not implemented.");
        return 0;
    }

    beforeEnter(): void {
        //throw new Error("Method not implemented.");
    }

    afterEnter(): void {
        //throw new Error("Method not implemented.");
    }

    beforeExit(): void {
        //throw new Error("Method not implemented.");
    }

    back(): void {
        //throw new Error("Method not implemented.");
    }
    
    exit(): void {
        this.beforeExit()
        //throw new Error("Method not implemented.");
    }
}