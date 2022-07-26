// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import { ComDlgData } from "../../../dialogs/comdlg/ComDlg";
import { formatCurrency } from "../../../gameHelper/AthHelper";
import PageBase from "../../scripts/PageBase";
import InvateDetailItem from "./InvateDetailItem";
import InvateItem from "./InvateItem";

const {ccclass, property} = cc._decorator;

const HELP_CONTENT=`<b>How to become an inviter:</b>
Everyone can be an inviter without special restrictions.

<b>How to invite success:</b>
Need your friends to fill in your invitation code on the invite-code page <color=#CCA600>within 72 hours</color> of registered the APP

<b>Your reward</b>
1. You will get <color=#CCA600>₹3</color> rewards for every friend you invite

2. You will get <color=#CCA600>1%</color> rewards of your friend‘s deposit  for  life

3. You will get <color=#CCA600>1%</color> rewards of your friend‘s winning  cash game for  life

<b>The statement</b>
1. When you successfully invite other players, you are considered an existing user and cannot be invited by other players

2.If improper means (including, but not limited to, cheating, bulk registration, machine simulation with clients, etc.) appear to get rewards activities, are considered risk accounts, SKILL MASTER has the right to revoke your reward activities, and limit the continued participation in the activities.
`

const enum INDATA{
    copy_code=1,
    copy_link,
    share_tele,
    share_fb,
    share_whatsapp
}

@ccclass
export default class InvatePage extends PageBase {

    UIBindData={
        code:"0",
        chips:"0",
        inviteReward:"0",
        DepositReward:"0",
        GameReward:"0",
        pageInfo:"0/0",


        data1:"0%",
        data2:"0%",
        data3:"0",
        todayInvateCount:"0",
        totalInvateCount:"0",
        todayInvateChips:"0",
        totalInvateChips:"0",
        
        bindCode:""
    }

    @property(cc.Node)
    content:cc.Node;

    @property(cc.Node)
    nd_bind:cc.Node;

    @property(cc.Node)
    list:cc.Node;

    @property(cc.Node)
    scrollView:cc.Node;

    @property(cc.Prefab)
    detailInstance:cc.Prefab;

    @property(cc.Prefab)
    recordInstance:cc.Prefab;

    @property(cc.Node)
    detailListContent:cc.Node;


    @property(cc.Node)
    recordContent:cc.Node;

    @property(cc.Node)
    inputCodeContent:cc.Node;

    @property([cc.Node])
    views:cc.Node[]=[];

    @property(cc.Node)
    pager:cc.Node;

    @property(cc.Node)
    bindTab:cc.Node;


    private _task_instance:cc.Node;

    private _data:any;

    private _sortType:number=0;

    private _tabIndex:number=0;

    private _detailItemPool:cc.NodePool=new cc.NodePool();
    private _recordItemPool:cc.NodePool=new cc.NodePool();

    private _pageNo:number=0;

    private _totalPage:number=0;

    onLoad(): void {
        super.onLoad();
    }

    start(): void {
        this._flushScrollViewHeight();
    }

    _flushScrollViewHeight(){
        this.scrollView.height=this.node.height;
        if(this.content.height<this.scrollView.height){
            this.content.height=this.scrollView.height;
        }
    }

    onSortClick(event,data){
        this._sortType=parseInt(data);
        this._pageNo=0;
        this.getRecordList();
    }

    onTabClick(event,data){
        let index=parseInt(data);
        if(index!=this._tabIndex){
            this._pageNo=0;
            this._totalPage=0;
            this._tabIndex=index;
            this.pager.active=false;
            this.views.forEach(view=>view.active=false);
            if(this._tabIndex==0){
                this.getRecordList();
            }else if(this._tabIndex==1){
                this.getDetailList();
            }else{
                this.pager.active=false;
            }
            this.views[this._tabIndex].active=true;
        }

    }

    async onEnable() {
        let data=await App.HttpManager.postAsync("invite_api/invite_info",{});
        this._flushInfo(data);
    }

    async getRecordList(pageNo:number=0){
        let children=this.detailListContent.children;
        while(children.length>0){
            this._detailItemPool.put(children[0]);
        }
        let data=await App.HttpManager.postAsync("invite_api/invite_record",{sort_type:this._sortType,page_no:pageNo,page_size:10});
        this.UIBindData.inviteReward=formatCurrency(data.invite_reward,true);
        this.UIBindData.GameReward=formatCurrency(data.game_reward,true);
        this.UIBindData.DepositReward=formatCurrency(data.deposit,true);
        
        for(let i=0;i<data.invite_list.length;i++){
            let view=this._detailItemPool.get() || cc.instantiate(this.detailInstance);
            this.detailListContent.addChild(view);
            view.getComponent(InvateDetailItem).setData(i,data.invite_list[i]);
        }

        if(data.invite_list.length>0){
            GameHelper.removeEmptyDataView(this.detailListContent.parent);
        }else{
            GameHelper.addEmptyDataView(this.detailListContent.parent,cc.v2(0,-650));
        }
        this._totalPage=Math.ceil(data.count/10);
        this.pager.active=data.invite_list.length;
        this.UIBindData.pageInfo=`${this._pageNo+1}/${this._totalPage}`
    }


    async getDetailList(pageNo:number=0){
        let children=this.recordContent.children;
        while(children.length>0){
            this._recordItemPool.put(children[0]);
        }
        let data=await App.HttpManager.postAsync("invite_api/invite_income_details",{page_no:pageNo,page_size:9});

        for(let i=0;i<data.record_list.length;i++){
            let view=this._recordItemPool.get() || cc.instantiate(this.recordInstance);
            this.recordContent.addChild(view);
            view.getComponent(InvateItem).setData(i,data.record_list[i]);
        }
        if(data.record_list.length>0){
            GameHelper.removeEmptyDataView(this.recordContent.parent);
        }else{
            GameHelper.addEmptyDataView(this.recordContent.parent);
        }
        this._totalPage=Math.ceil(data.count/9);
        this.pager.active=data.record_list.length;
        this.UIBindData.pageInfo=`${this._pageNo+1}/${this._totalPage}`
    }


    _flushInfo(data:any){
        this._data=data;
        this.UIBindData.code=data.invite_code;
        this.UIBindData.chips=formatCurrency(data.claim_reward || 0);
        this.bindTab.active=data.can_bind;
        //取第record的数据
        this.getRecordList();
    }

    public onStartMove(): void {

    }
    public onMoveFinished(): void {

    }
    public flushData(): void {

    }

    public onCopyCodeClick(){

        this._postDta(INDATA.copy_code);


        App.NativeManager.copyTextToClipboard(this._data.invite_code);
        App.DlgManager.showDlg("toast",{title:"Tips",content:"Copy successfully"});

    }

    _postDta(dataType:INDATA){
        App.HttpManager.post("user_api/report_user_operate",{operate:dataType})
    }

    public onCopyLinkClick(){
        this._postDta(INDATA.copy_link);

        App.NativeManager.copyTextToClipboard(this._data.link);
        App.DlgManager.showDlg("toast",{title:"Tips",content:"Invitation information copied to your clipboard"});
    }

    public onMoreTaskClick(){
        App.DlgManager.showDlg("invatelist");
    }

    onDetailClick(){
        App.DlgManager.showDlg("invateDetail");
    }

    onShareToTgClick(){

        this._postDta(INDATA.share_tele);


        let packageName="org.telegram.messenger";
        if(!App.NativeManager.checkApp(packageName)){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Telegram have not been installed"});
            return;
        }
        App.NativeManager.shareToApp(packageName,this._data.link);
    }

    onShareToFbClick(){

        this._postDta(INDATA.share_fb);


        let packageName="com.facebook.katana";
        if(!App.NativeManager.checkApp(packageName)){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"FaceBook have not been installed"});
            return;
        }
        App.NativeManager.copyTextToClipboard(this._data.link);
        let data:ComDlgData = new ComDlgData();
        data.title = "Tips"
        data.group = [{name:"To FaceBook",isExit:true,cb:()=>{
            App.NativeManager.shareToApp(packageName,this._data.link);
        }}];
        data.txt = "The invitation information has been copied to your clipboard, you can paste it into social platforms";
        data.clickSpaceHide=true;
        App.DlgManager.showDlg("comdlg",data);
    }

    onShareToWsappClick(){

        this._postDta(INDATA.share_whatsapp);


        let packageName="com.whatsapp";
        if(!App.NativeManager.checkApp(packageName)){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Whatsapp have not been installed"});
            return;
        }
        App.NativeManager.shareToApp(packageName,this._data.link);
    }

    async onBindClick(){
        let code:string=this.UIBindData.bindCode;
        let reg=/[A-Za-z0-9]{6,6}$/g;
        if(!code || !reg.test(code)){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Please enter the correct invite code."});
            return;
        }
        let data=await App.HttpManager.postAsync("invite_api/bind_invite_code",{invite_code:this.UIBindData.bindCode});
        this._hideBindView();
        let tdata:ComDlgData = new ComDlgData();
        tdata.title = "Tips"
        tdata.group = [{name:"Claim gift",isExit:true,cb:()=>{
            App.DlgManager.showDlg("rewardGoods",{Data:data.reward_list});
        }}];
        tdata.txt = "Thank you for joining the game by invitation, we have prepared a little gift";
        App.DlgManager.showDlg("comdlg",tdata);
    }

    onLeftClick(){
        if(this._pageNo<=0){
            return;
        }
        this._pageNo--;
        if(this._tabIndex==0){
            this.getRecordList(this._pageNo);
        }else{
            this.getDetailList(this._pageNo);
        }
    }

    onRightClick(){
        if(this._pageNo>=(this._totalPage-1)){
            return;
        }
        this._pageNo++;
        if(this._tabIndex==0){
            this.getRecordList(this._pageNo);
        }else{
            this.getDetailList(this._pageNo);
        }
    }

    async onRewardClick(){
        if(!this._data.claim_reward){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"There is no balance to claim, invite friends to get rewards"});
            return
        }
        let data=await App.HttpManager.postAsync("invite_api/receive_invite_reward");
        App.DlgManager.showDlg("rewardGoods",{Data:data.reward_list})

        this._data.claim_reward=0;
        this.UIBindData.chips=formatCurrency(this._data.claim_reward);
    }

    onHelpClick(){
        App.DlgManager.showDlg("ruleCom",{title:"Hi, Here is the system description",content:HELP_CONTENT});
    }

    _hideBindView(){
        this.bindTab.active=false;
        this.inputCodeContent.active=false;
        this.bindTab.parent.children[0].getComponent(cc.Toggle).isChecked=true;
        this.onTabClick(null,0);
    }
}
