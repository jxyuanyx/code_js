import ListItem from "./ListItem";
import { AbsAdapterDynamic } from "./ListViewSeasonDynamic";
export default class ListAdapterDynamic extends AbsAdapterDynamic {

    public updateView(item: cc.Node, posIndex: number,data?:any) {
        const itemComp = item.getComponent(ListItem);
        if(itemComp)itemComp.setData(posIndex,data);
    }

}