import ListItem from "./ListItem";
import {AbsAdapter} from "./ListView";

export default class ListAdapter extends AbsAdapter {

    public updateView(item: cc.Node, posIndex: number,data?:any) {
        const itemComp = item.getComponent(ListItem);
        if(itemComp)itemComp.setData(posIndex,data);
    }

}