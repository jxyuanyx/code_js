// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListItem from "./ListItem";

const {ccclass, property} = cc._decorator;

const DEFAULT_TEMPLATE="default_template";
export const ADAPTER_PROFIL="__adType";

const enum DIRECTION{
    UP=-1,
    DOWN=1
}

export enum  REQUEST_EVENTS{
    FLUSHING="flushing",
    END="end"
}

export const LIST_ITEM_CLICK="list_item_click";


@ccclass
export class ListViewNew extends cc.Component {
    @property(cc.ScrollView)
    scrollView:cc.ScrollView=null;

    @property(cc.Node)
    emptyView:cc.Node=null;

    @property(cc.Prefab)
    template:cc.Prefab=null;

    @property
    maxHeight:number=0;

    @property
    maxWidth:number=0;
    
    @property(cc.Vec2)
    private readonly spacing: cc.Vec2 = cc.v2(0, 0);

    // 四周距离.
    @property(cc.Rect)
    private readonly margin: cc.Rect = cc.rect(0, 0, 0, 0);

    private _nodePools:Map<string,cc.NodePool>=new Map();

    private _pageSize:number=0;
    
    private _pageNo:number=0;

    private _pageTotal:number=0;

    private _adapters:Map<string,BaseListViewAdapter>=new Map();

    private _listData:any[]=null;

    private _listItem:cc.Node[]=null;

    private _direction:DIRECTION=DIRECTION.DOWN;


    private _prvOffsetY:number=0;

    private _swapCount:number=2;

    private _height:number=0;

    private _needChangeHeight:boolean=true;

    private _addHeightMap:Map<number,boolean>;

    private _requesting:boolean=false;

    private _scrollEnd:boolean=true;

    onLoad(){
        this.scrollView.node.on("scroll-began",this.__onScrollBegan,this);
        this.scrollView.node.on("scroll-ended",this.__onScrollEnd,this);
        if(this.template){
            let adapter=new BaseListViewAdapter(DEFAULT_TEMPLATE,this.template);  
            this.addAdapter(adapter);
            this.maxHeight=adapter.height;
            this.maxWidth=adapter.width;
        }
        this.scrollView.enabled=false;
    }

    __onScrollEnd(e){
        this._scrollEnd=true;
    }

    __onScrollBegan(e){
        this._scrollEnd=false;
    }

    lateUpdate(){
        if(this._scrollEnd || !this._listData)return;
        let y=this.scrollView.getScrollOffset().y;
        let targetY:number=0;
        let node:cc.Node;
        if(y>=this._prvOffsetY){
            this._prvOffsetY=y;
            this._direction=DIRECTION.DOWN;
            node=this._listItem[0];
            targetY=node.height*node.anchorY+Math.abs(node.y)+this.spacing.y;
            if(y>=this.scrollView.getMaxScrollOffset().y)return;
            if(y>=targetY){
                //添加新的数据
                let lastItem=this._listItem[this._listItem.length-1].getComponent(ListItem);
                let index=lastItem.getIndex()+1;
                if(index>=this._listData.length){
                    this._needChangeHeight=false;
                    if(!this._requesting){
                        this._requesting=true;
                        if(this._pageNo>=Math.ceil(this._pageTotal/this._pageSize)){
                            this.node.emit(REQUEST_EVENTS.END);
                        }else{
                            this.node.emit(REQUEST_EVENTS.FLUSHING,this._pageNo,this._pageSize);
                        }
                    }
                    return;
                }   
                //返还node
                let view=this._listItem.shift();
                let item=view.getComponent(ListItem);
                let data=item.getData();
                let adType=data[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                
                let newData=this._listData[index];
                let newAdType=newData[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                if(adType!=newAdType){
                    this._nodePools.get(adType).put(view);
                    view=this.__addItem(newData,index);
                }
                //adType=data[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                this._adapters.get(newAdType).updateView(view,index,newData);
                view.setPosition(0,lastItem.node.y-lastItem.node.height/2-this.spacing.y-view.height/2);
                this._listItem.push(view);
                if(this._needChangeHeight&&!this._addHeightMap.get(index)){
                    this._height+=view.height+this.spacing.y;
                    this.scrollView.content.height=this._height;
                    this._addHeightMap.set(index,true);
                }
            }
        }else{
            this._prvOffsetY=y;
            this._direction=DIRECTION.UP;
            node=this._listItem[0];
            if(y<=0)return;
            let firstItemY=-node.y-node.height*node.anchorY-this.spacing.y;
            if(y<=firstItemY){
                 //添加新的数据
                let lastItem=this._listItem[0].getComponent(ListItem);
                let index=lastItem.getIndex()-1;
                if(index<0){
                    return;
                }
                let view=this._listItem.pop();
                //返还node
                let item=view.getComponent(ListItem);
                let data=item.getData();
                let adType=data[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                //this._nodePools.get(adType).put(view);

                let newData=this._listData[index];
                let newAdType=newData[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                if(adType!=newAdType){
                    this._nodePools.get(adType).put(view);
                    view=this.__addItem(newData,index);
                }
               
               // data=this._listData[index];
               // view=this.__addItem(data,index);
              //  adType=data[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
                this._adapters.get(newAdType).updateView(view,index,newData);
                view.setPosition(0,lastItem.node.y+lastItem.node.height/2+this.spacing.y+view.height/2);
                this._listItem.unshift(view)
            }
        }
    }
    /**
     * 设置适配器
     * @param key 
     * @param adapter 
     */
    public addAdapter(adapter:BaseListViewAdapter){
        this._adapters.set(adapter.key,adapter);
        this._nodePools.set(adapter.key,new cc.NodePool());
        return this;
    }

    /**
     * 初始化数据
     * @param list 
     */

    public setData(list:any[],hasAnim:boolean=true){
        this.scrollView.enabled=false;
        this._listItem=[];
        this._addHeightMap=new Map();
        this._listData=list;
        this.scrollView.content.removeAllChildren();
        let count=Math.min(list.length,this.__getVisibleCount());
        let offsetY:number=-this.margin.y;
        this._height=this.margin.y*2;
        for(let i=0;i<count;i++){
            let view=this.__addItem(list[i],i);
            this._listItem.push(view);
            this._height+=view.height+this.spacing.y;
            this._addHeightMap.set(i,true);
            let y=offsetY-view.height*view.anchorY;
            if(hasAnim){
                view.opacity=0;
                view.y=y-100;
                cc.tween(view).stop().delay(0.05*i).to(0.2,{opacity:255,y:y}).start();
            }else{
                view.setPosition(0,y);
            }
            offsetY=y-view.height/2-this.spacing.y;
        }
        this.scrollView.content.height=this._height;

        if(list.length<this._pageSize){
            this.node.emit(REQUEST_EVENTS.END);
            this._requesting=true;
        }
    
        this.scheduleOnce(()=>{
            this.scrollView.enabled=true;
        },0.05*count)
    }

    __addItem(data:any,index:number){
        let adapterType=data[ADAPTER_PROFIL] || DEFAULT_TEMPLATE;
        let adapter=this._adapters.get(adapterType);
        let nodePool=this._nodePools.get(adapterType);
        let view=nodePool.get() || cc.instantiate(adapter.template);
        this.scrollView.content.addChild(view);
        adapter.updateView(view,index,data);
        return view
    }

    /**
     * 添加数据
     */
    public addData(list:any[]){
        if(!list || list.length==0)return
       this._requesting=false;
       if(this._listData==null){
           this._pageNo=0;
           this.scrollView.enabled=false;
           this.setData(list,true);
       }else{
            //如果原来的数据过少的情况
            let oldCount=this._listData.length;
            this._listData=this._listData.concat(list);
            if(oldCount<this.__getVisibleCount()){
                //重新设置
                this.setData(this._listData,false);
            }
            if(list.length>0){
                this._needChangeHeight=true;
            }
       }
       this._pageNo++;
    }

    /**
     * 重置数据
     */
    public reset(){
        this._listData=null;
        this._pageTotal = 0;
        this._pageNo = 0;
        this._pageSize = 0;
        this.scrollView.content.y=0;
        this._needChangeHeight=true;
        this._requesting=false;
        this._scrollEnd=true;
    }

    __getVisibleCount():number{
        let content:cc.Node=this.scrollView.node;
        let count=Math.ceil((content.height-this.margin.y*2)/(this.maxHeight+this.spacing.y))+this._swapCount+2;
        return count;
    }

    /**
     * 设置分页信息
     * @param pageSize 
     * @param pageNo 
     */
    public setPageInfo(pageSize:number,totalSize:number){
        this._pageSize=pageSize;
        this._pageTotal=totalSize;
        this._pageNo=0;
    }

}

export  class BaseListViewAdapter extends cc.EventTarget{

    private _template:cc.Prefab=null;

    private _height:number=0;

    private _width:number=0;

    private _key:string="";

    private _clickCb:Function=null;
    private _clickCbTarget:any=null;

    constructor(key:string,template?:cc.Prefab){
        super();
        this._key=key;
        if(template){
            this.setTemplate(template);
        }
    }

    get key(){
        return this._key;
    }

    setTemplate(template:cc.Prefab){
        this._template=template;
        this._height=template.data.height;
        this._width=template.data.width;
    }

    get width(){return this._width};
    get height(){return this._height};
    get template(){return this._template};
    
    /**
     * 更新界面
     * @param item 
     * @param posIndex 
     * @param data 
     */
    public updateView(item: cc.Node, posIndex: number, data?: any){
        let listItem=item.getComponent(ListItem);
        listItem.setAdapter(this);
        listItem.setData(posIndex,data);
    }
}
