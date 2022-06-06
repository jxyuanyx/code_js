/**
 * @file 战绩脚本
 */

import cv from './../cv';
import { ScrollViewReuse } from '../../../common/tools/ScrollViewReuse';
import FightItem from './FightItem';
import PokerInfo from './../../../common/prefab/pokerInfo/PokerInfo';
import { CircleSprite } from '../../../common/tools/CircleSprite';
import { CreateGameMode } from '../../../common/tools/Enum';
import GameDataManager from '../../game/dzPoker/data/GameDataManager';
import pb_humanboy = require('../../../../Script/common/pb/humanboy');
import { JackfruitReview } from '../../game/jackfruit/JackfruitReview';
import humanboy_proto = pb_humanboy.humanboy_proto;
import { GameRecordsData, CollectPokerMapData } from '../../game/dzPoker/data/RecordData';
import { TableView } from '../../../common/tools/TableView';
import { BlindItem } from './BlindItem'
import { Bb100Info } from '../../../data/userData';

enum DataViewGameType {
  DataView_DZPK = 0, // 德州扑克
  DataView_DZPK_SHORT, // 德州扑克短牌
  DataView_AOF, // 极速扑克
  DataView_AOF_SHORT, // 极速扑克短牌
  DataView_BET, // 必下
  DataView_MTT = 6, // MTT
  DataView_JACKFRUIT = 7, // 菠萝蜜
  DataView_PLO = 8, //奥马哈
}

enum DataViewButtonType {
  DataView_Data = 0,
  DataView_Fight,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class DataView extends cc.Component {
  @property(cc.Button)
  private dataBtn: cc.Button = null;
  @property(cc.Button)
  private fightBtn: cc.Button = null;
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null; // 战绩列表组件
  @property(cc.Prefab)
  FightItem: cc.Prefab = null;
  @property(cc.Prefab)
  jackfruitReviewPrefab: cc.Prefab = null; // 菠萝蜜牌局回顾
  jackfruitReviewPanel: cc.Node = null;
  @property(cc.Node) _question_btn: cc.Node = null;
  @property(cc.Node) _bb_scrollview: cc.Node = null;
  @property(cc.Node) _bigblind: cc.Node = null;
  @property(cc.Node) _bb: cc.Node = null;

  itemData: Array<any> = [];

  private enterData: number = 0; // 入池率
  private enterWinData: number = 0; // 入池胜率
  private enterData_run: number = 0; // 入池率_动态值
  private enterWinData_run: number = 0; // 入池胜率_动态值

  private vpipData: number = 0; // 主动入池率VPIP
  private vpipData_run: number = 0; // 主动入池率VPIP_动态值
  private pfrData: number = 0; // 加注入池率VPIP
  private pfrData_run: number = 0; // 加注入池率VPIP_动态值
  private kanfanData: number = 0; // 看翻牌率
  private kanfanData_run: number = 0; // 看翻牌率_动态值
  private fanhouWinData: number = 0; // 翻后胜率
  private fanhouWinData_run: number = 0; // 翻后胜率_动态值
  private tanpaiData: number = 0; // 摊牌率
  private tanpaiData_run: number = 0; // 摊牌率_动态值
  private tanpaiWinData: number = 0; // 摊牌胜率
  private tanpaiWinData_run: number = 0; // 摊牌胜率_动态值
  private _3BETData: number = 0; // 3BET
  private _3BETData_run: number = 0; // 3BET_动态值
  private CBETData: number = 0; // CBET
  private CBETData_run: number = 0; // CBET_动态值

  private dataPanel_height: number = 0;
  private fightPanel_height: number = 0;
  private fightPos: cc.Vec2;

  private roomRecordListCount: number = 0;

  private gameType: DataViewGameType = DataViewGameType.DataView_DZPK;
  private buttonType: DataViewButtonType = DataViewButtonType.DataView_Data;
  private gameid: number = 0;
  private mode: number = 0;

  //保存两个偏移位置以及两个列表数据
  private offset_pos1: cc.Vec2 = new cc.Vec2();
  private offset_pos2: cc.Vec2;
  private offset_pos3: cc.Vec2;
  private offset_pos4: cc.Vec2;
  private offset_pos5: cc.Vec2;

  private vArray1: Array<any> = [];
  private vArray2: Array<any> = [];
  private vArray3: Array<any> = [];
  private vArray4: Array<any> = []; // 存储MTT战绩列表数据
  private vArray5: Array<any> = []; // 存储菠萝蜜战绩列表数据
  private vArray6: Array<any> = []; // 存储奥马哈战绩列表数据
  private bPull: boolean = false;
  private detailNode: cc.Node = null;
  private detailNode_MTT: cc.Node = null;
  private detailNode_Jackfruit: cc.Node = null;
  private curMttListCount: number = 0; // MTT战绩统计条数
  private MttRequestCount: number = 30; // MTT战绩统计每次请求条数
  private JackfruitListPageNum: number = 1; // 菠萝蜜战绩统计页码
  private JackfruitRequestCount: number = 30; // 菠萝蜜战绩统计每次请求条数
  private JackfruitListReq: boolean = true; // 是否继续加载，判断是否数据到底
  private fightListLoading: boolean = false; // 战绩加载列表是否在加载中
  private fightListReqNum: number = 0; // 普通的战绩列表请求条数

  @property(cc.Prefab)
  PokerInfo_fab: cc.Prefab = null;
  @property(cc.Prefab)
  PokerInfo_fab_new: cc.Prefab = null;
  @property(cc.Prefab)
  PokerInfo_Mtt_fab: cc.Prefab = null;

  private pokerInfoNode: cc.Node = null;
  private pokerInfoNode_new: cc.Node = null;
  private pokerInfoNode_mtt: cc.Node = null;

  _gamebuttonList: Array<any> = new Array<any>();
  _gamebuttonTextList: Array<any> = new Array<any>();
  gameType_panel: cc.ScrollView = null;

  private PKW_LIST: number[] = [6, 0, 1, 8, 4, 7]; // 可配置  0 全部 1德州 2短牌 3AOF 4必下 5急速 6 mtt 7 菠萝蜜（数组包含的游戏 可以打乱顺序）       6是MTT  //[6, 0, 1, 2, 3, 4]  8奥马哈
  private PKC_LIST: number[] = [0, 1, 4]; // 德州、短牌、必下
  private MTT_NUM: number = 6;
  private MTT_ZJ_URL: string = '&page=1';
  private mtt_web: cc.WebView = null;
  private web_viewPos: cc.Vec2 = cc.v2(0, 0);
  private openMttRecord: boolean = true; // 是否打开MTT战绩

  private jfWinrate: number = 0; // 菠萝蜜总胜率
  private jfWinrate_run: number = 0;
  private jfWinallrate: number = 0; // 菠萝蜜全胜率
  private jfWinallrate_run: number = 0;
  private jfHeadwinrate: number = 0; // 菠萝蜜头道胜率
  private jfHeadwinrate_run: number = 0;
  private jfMidwinrate: number = 0; // 菠萝蜜中道胜率
  private jfMidwinrate_run: number = 0;
  private jfTailwinrate: number = 0; // 菠萝蜜尾道胜率
  private jfTailwinrate_run: number = 0;

  fightListScript = null;

  onLoad() {
    cv.resMgr.adaptWidget(this.node, true);

    // 不显示MTT战绩
    if (!this.openMttRecord) {
      this.PKW_LIST.splice(0, 1);
      this.MTT_NUM = this.PKW_LIST.length;
    }

    // 获取战绩 Tab 列表节点的 ScrollView 组件
    this.gameType_panel = cc.find('gameType_panel', this.node).getComponent(cc.ScrollView);
    // 添加滑动到最后的事件
    this.gameType_panel.node.on('scroll-ended', () => {
      const index = this.gameType_panel.content.x > 0 ? 1 : -1;

      this.updateBtnsMove(-1, index);
    }, this);

    const arr: number[] = cv.config.isOverSeas()
      ? this.PKC_LIST
      : this.PKW_LIST;
    const len = arr.length;
    const cell = cc.find('button_0', this.gameType_panel.node); // 获取战绩类型按钮节点
    const cellSize = cc.size(this.gameType_panel.content.width / len - 3, cell.height); // 计算一个按钮的 Size


    // 设置战绩 Tab 列表的尺寸
    this.gameType_panel.content.setContentSize(cc.size(cellSize.width * len, this.gameType_panel.node.height));

    for (let i = 0; i < len; i++) {
      const btn = cc.instantiate(cell); // 复制一个战绩类型的 Tab 按钮

      btn.active = true;

      // 设置按钮的位置
      btn.setPosition(cc.v2(cellSize.width / 2 + cellSize.width * i, cellSize.height / 2));

      // 向战绩 Tab 列表中添加一个按钮
      this.gameType_panel.content.addChild(btn);

      const lbl = cc.find('Label', btn);

      btn.attr({ _gameType: arr[i] });

      this._gamebuttonList.push(btn);
      this._gamebuttonTextList.push(lbl);

      // 设置战绩 Tab 按钮的点击事件
      btn.on('click', (event, customEventData) => {
        cv.AudioMgr.playButtonSound('tab');

        cc.find("bg", this._question_btn).active = false;
        const name = arr[i];

        // 如果点了相同的按钮，就不做反应
        if (this.gameType == name) {
          return;
        }

        // this.setMatchWebPos(false);

        // this.itemData = [];
        this.vArray1 = []; // 德州
        this.vArray2 = []; // 短牌
        this.vArray3 = []; // 必下
        this.vArray4 = []; // MTT 战绩列表数据
        this.vArray5 = []; // 菠萝蜜战绩列表数据
        this.vArray6 = []; //奥马哈

        GameDataManager.tGameRecords.nRecordsTexasCount = 0; // 德州
        GameDataManager.tGameRecords.nRecordsAofCount = 0; // 极速
        GameDataManager.tGameRecords.nRecordsBetCount = 0; // 必下

        this.curMttListCount = 0; // MTT 战绩列表数据总条数
        // this.bPull = false;

        this.JackfruitListPageNum = 1; // 菠萝蜜战绩数据页码

        // 获取战绩列表组件的脚本
        // const sv: ScrollViewReuse = this.scrollView.getComponent('ScrollViewReuse');

        // if (this.gameType == DataViewGameType.DataView_DZPK || this.gameType == DataViewGameType.DataView_DZPK_SHORT) {
        //   // 点击前所处的标签位置
        //   this.offset_pos1 = sv.scrollView.getScrollOffset(); // 获取滚动视图相对于左上角原点的当前滚动偏移
        // } else if (this.gameType == DataViewGameType.DataView_AOF || this.gameType == DataViewGameType.DataView_AOF_SHORT) {
        //   this.offset_pos2 = sv.scrollView.getScrollOffset(); // 获取滚动视图相对于左上角原点的当前滚动偏移
        // } else if (this.gameType == DataViewGameType.DataView_BET) {
        //   this.offset_pos3 = sv.scrollView.getScrollOffset(); // 获取滚动视图相对于左上角原点的当前滚动偏移
        // } else if (this.gameType == DataViewGameType.DataView_MTT) {
        //   this.offset_pos4 = sv.scrollView.getScrollOffset(); // 获取滚动视图相对于左上角原点的当前滚动偏移
        // } else if (this.gameType == DataViewGameType.DataView_JACKFRUIT) {
        //   this.offset_pos5 = sv.scrollView.getScrollOffset(); // 获取滚动视图相对于左上角原点的当前滚动偏移
        // }

        // sv.removeAll(); // 调用列表组件中的删除方法，移除列表中的所有子项
        this.setViewGameType(name);
        this.scrollView.scrollToTop(0.05);

      }, this);
    }

    this.gameid = cv.Enum.GameId.Texas;
    this.mode = CreateGameMode.CreateGame_Mode_Normal;

    GameDataManager.tGameRecords.nRecordsTexasCount = 0;
    GameDataManager.tGameRecords.nRecordsAofCount = 0;
    GameDataManager.tGameRecords.nRecordsBetCount = 0;

    if (this.openMttRecord) {
      this.setViewGameType(DataViewGameType.DataView_MTT);
    } else {
      this.setViewGameType(DataViewGameType.DataView_DZPK);
    }

    // 这里设置显示界面 DataView_JACKFRUIT
    this.detailNode = cc.find('dataInfo_panel/content/vip_panel', this.node);
    this.detailNode_MTT = cc.find('dataInfo_panel/content/vip_panel_mtt', this.node);
    this.detailNode_Jackfruit = cc.find('dataInfo_panel/content/vip_panel_jackfruit', this.node);
    this._question_btn = cc.find("dataInfo_panel/content/question_btn", this.node);
    this._bb_scrollview = cc.find("bg/bb_scrollview", this._question_btn);
    this._bigblind = cc.find("bg/bigblind", this._question_btn);
    this._bb = cc.find("bg/bb", this._question_btn);

    // cc.find("bg/tip_nodata1", this._question_btn).getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_no_data");
    // cc.find("bg/tip_nodata2", this._question_btn).getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_no_data");

    this._question_btn.on("click", (event: cc.Event): void => {
      if (cc.find("bg", this._question_btn).active) {
        cc.find("bg", this._question_btn).active = false;
      }
      else {
        cc.find("bg", this._question_btn).active = true;
        cc.find("bg/tip_nodata1", this._question_btn).active = false;
        cc.find("bg/tip_nodata2", this._question_btn).active = false;

        let tb = this._bb_scrollview.getComponent(TableView);
        if (cv.dataHandler.getUserData().pokerdata.Bb100s.length < 3) {
          //特殊处理
          if (cv.dataHandler.getUserData().pokerdata.Bb100s.length == 0) {
            cc.find("bg/tip_nodata1", this._question_btn).active = true;
            cc.find("bg/tip_nodata2", this._question_btn).active = true;
            cc.find("bg", this._question_btn).setContentSize(cc.find("bg", this._question_btn).width, 220);
          }
          else {
            cc.find("bg/tip_nodata1", this._question_btn).active = false;
            cc.find("bg/tip_nodata2", this._question_btn).active = false;
            cc.find("bg", this._question_btn).setContentSize(cc.find("bg", this._question_btn).width, 370 - (3 - cv.dataHandler.getUserData().pokerdata.Bb100s.length) * 80)
          }
          cc.find("view", this._bb_scrollview).setContentSize(606, cv.dataHandler.getUserData().pokerdata.Bb100s.length * 80)
        }
        else {
          cc.find("bg", this._question_btn).setContentSize(606, 370);
          cc.find("view", this._bb_scrollview).setContentSize(606, 240);
        }
        tb.bindScrollEventTarget(this);
        let objs: any[] = [];
        for (let i = 0; i < cv.dataHandler.getUserData().pokerdata.Bb100s.length; i++) {
          //数据处理下
          let bb100s: Bb100Info = new Bb100Info;
          // if (this.gameType == DataViewGameType.DataView_DZPK_SHORT) {
          //   bb100s.bb_100 = cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_100;
          //   bb100s.bb_value = cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_value;

          //   let win = cv.StringTools.clientGoldByServer(bb100s.bb_value);
          //   bb100s.bb_value = win / 2;
          // }
          // else {
            bb100s.bb_100 = cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_100;
            bb100s.bb_value = cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_value;

            let win = cv.StringTools.clientGoldByServer(bb100s.bb_value);
            bb100s.bb_value = win;
          //}
          objs.push({ prefab_type: 0, prefab_component: BlindItem, prefab_datas: bb100s });
        }
        tb.bindData(objs);
        tb.reloadView();
      }
    }, this);

    switch (this.gameType) {
      case DataViewGameType.DataView_MTT:
        // MTT
        this.detailNode_MTT.active = true;
        this.detailNode_Jackfruit.active = false;
        this.detailNode.active = false;

        break;
      case DataViewGameType.DataView_JACKFRUIT:
        // 菠萝蜜
        this.detailNode_MTT.active = false;
        this.detailNode_Jackfruit.active = true;
        this.detailNode.active = false;

        break;
      default:
        // 其他
        this.detailNode_MTT.active = false;
        this.detailNode_Jackfruit.active = false;
        this.detailNode.active = true;

        break;
    }

    // 添加菠萝蜜牌局回顾预制体
    this.jackfruitReviewPanel = JackfruitReview.getSinglePrefabInst(this.jackfruitReviewPrefab);
    this.jackfruitReviewPanel.active = false;

    const reviewNode = ['bg', 'title_panel', 'view_panel', 'view_panel_empty', 'button_panel'];

    // 牌局回顾全屏适配
    for (let i = 0; i < reviewNode.length; i++) {
      const nodeName = reviewNode[i];
      const thisNode = cc.find(nodeName, this.jackfruitReviewPanel);

      thisNode.width = cc.winSize.width;
      const widgets = thisNode.getComponentsInChildren(cc.Widget);
      for (let j = 0; j < widgets.length; j++) {
        const widget = widgets[j];
        if (cc.isValid(widget)) {
          widget.updateAlignment();
        }
      }
    }

    // 初始化列表组件
    const thisNode = this.node;

    this.fightListScript = this.scrollView.getComponent('ListView');
    this.fightListScript.init((item, data) => {
      let itemType = 'common';

      if (typeof (data.mttId) !== 'undefined' && data.mttId != null) {
        // MTT
        itemType = 'mtt';
      } else if (typeof (data.jfId) !== 'undefined' && data.jfId != null) {
        // 菠萝蜜
        itemType = 'jackfruit';
      } else {
        // 普通
        itemType = 'common';
      }

      item.getComponent('FightItem').renderItem(data, itemType, thisNode);
    }, (data, index, result) => {
      const preData = index > 0 ? result[index - 1] : null; // 上一个数据

      let itemType = 'common';
      let thisTimestamp = 0; // 数据时间戳
      let thisDay = ''; // 数据格式化后的日期
      let preDay = ''; // 前一个数据格式化后的日期

      if (typeof (data.mttId) !== 'undefined' && data.mttId != null) {
        // MTT
        itemType = 'mtt';
        // 时间处理
        thisTimestamp = data.startingTime;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        preDay = preData !== null ? cv.StringTools.formatTime(preData.startingTime, cv.Enum.eTimeType.Month_Day) : '';
      } else if (typeof (data.jfId) !== 'undefined' && data.jfId != null) {
        // 菠萝蜜
        itemType = 'jackfruit';
        // 时间处理
        thisTimestamp = data.recordTime;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        preDay = preData !== null ? cv.StringTools.formatTime(preData.recordTime, cv.Enum.eTimeType.Month_Day) : '';
      } else {
        // 普通
        itemType = 'common';
        // 时间处理
        thisTimestamp = data.create_time;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        preDay = preData !== null ? cv.StringTools.formatTime(preData.create_time, cv.Enum.eTimeType.Month_Day) : '';
      }

      if (thisDay === preDay && itemType === 'jackfruit') {
        return 1;
      }

      return 0;
    });
  }

  start() {
    cv.resMgr.adaptWidget(this.node, true);

    cv.config.adaptSize([cc.find('fightInfo_panel/linebg/background', this.node), cc.find('fightInfo_panel/bluebg/background', this.node), this.scrollView.node]);

    this.fightPos = cc.find('fightInfo_panel', this.node).getPosition();

    cc.find('fightInfo_panel', this.node).setPosition(this.fightPos.x + cv.config.WIDTH, this.fightPos.y);

    // let sv: ScrollViewReuse = this.scrollView.getComponent('ScrollViewReuse');

    // sv.bindPrefab(this.FightItem, 'FightItem', this.itemData);
    // sv.generateItemPool();
    // sv.bindScrollEventTarget(this);

    this.initLanguage();
    this.changeStatus(false);
    this.initUser();
    this.initPokerInfo();

    cc.find('bg_0', this.node).on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
      event.stopPropagation();
    });

    // cv.MessageCenter.register("update_info", this.updateView.bind(this));
    // cv.MessageCenter.register("")

    //GameDataManager.tGameRecords.trecordsTexasCount = 0;

    //cv.httpHandler.requestUserData(mode, gameid);
    // cv.httpHandler.requestRoomRecordList(0, mode, gameid, this.roomRecordListCount, this.initFight.bind(this));

    //cv.httpHandler.requestMTTUserData();

    this.scrollView.scrollToTop(0.05);

    if (this.openMttRecord) {
      cv.worldNet.RequestMttUserInfoData(cv.dataHandler.getUserData().user_id);
    }

    this.registerMsg();
    this.initData();
  }

  /**
   * @function 注册监听事件
   */
  registerMsg() {
    cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    cv.MessageCenter.register('update_userPokerData', this.initData.bind(this), this.node);
    cv.MessageCenter.register('updateUserJackfruitData', this.initJackfruitData.bind(this), this.node);
    cv.MessageCenter.register('sendMttMatchListData', this.initMttFight.bind(this), this.node);
    cv.MessageCenter.register('ResponseMTTUserInfoData', this.initMttUserInfo.bind(this), this.node);
    cv.MessageCenter.register('sendDoRequestMttList', this.onDoRequestMttList.bind(this), this.node);
  }

  /**
   * @function 注销监听事件
   */
  unregisterMsg() {
    cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    cv.MessageCenter.unregister('update_userPokerData', this.node);
    cv.MessageCenter.unregister('updateUserJackfruitData', this.node);
    cv.MessageCenter.unregister('sendMttMatchListData', this.node);
    cv.MessageCenter.unregister('ResponseMTTUserInfoData', this.node);
    cv.MessageCenter.unregister('sendDoRequestMttList', this.node);
    // cv.MessageCenter.unregister("remove_mtt", this.node);
  }

  onDestroy() {
    this.unregisterMsg();
  }

  /**
   * @function 多语言设置
   */
  initLanguage() {
    let arr: number[] = cv.config.isOverSeas() ? this.PKC_LIST : this.PKW_LIST;
    let len = arr.length;

    // 设置战绩 Tab 按钮的多语言
    for (let i = 0; i < len; i++) {
      let label = this._gamebuttonTextList[i].getComponent(cc.Label);
      // if (arr[i] == 6) {
      //     label.string = cv.config.getStringData("MainScene_Scene_gameType_panel_button6_text");
      // }
      // else {
      label.string = cv.config.getStringData(cv.StringTools.formatC('DataView_gameType_panel_button_%d_text', arr[i]));
      // }

      // 根据不同的语言设置字符大小
      if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
        label.fontSize = (42);
      } else {
        label.fontSize = (30);
      }
    }

    const data_panel: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel', this.node);
    const vip_panel: string = 'dataInfo_panel/content/vip_panel/';
    const vip_panel_mtt: string = 'dataInfo_panel/content/vip_panel_mtt/';

    // 菠萝蜜
    const baseInfoPanelJackfruit: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_jackfruit', this.node);
    const vipPanelJackfruit: cc.Node = cc.find('dataInfo_panel/content/vip_panel_jackfruit', this.node);

    cv.StringTools.setLabelString(baseInfoPanelJackfruit, 'text', 'DataView_data_panel_dataInfo_panel_baseData_title_txt');
    cv.StringTools.setLabelString(baseInfoPanelJackfruit, 'content/total_item/total', 'DataView_data_panel_dataInfo_panel_Jackfruit_total_txt');
    cv.StringTools.setLabelString(baseInfoPanelJackfruit, 'content/maxScore_item/maxScore', 'DataView_data_panel_dataInfo_panel_Jackfruit_maxScore_txt');
    cv.StringTools.setLabelString(baseInfoPanelJackfruit, 'content/average_item/average', 'DataView_data_panel_dataInfo_panel_Jackfruit_average_txt');
    cv.StringTools.setLabelString(baseInfoPanelJackfruit, 'content/record_item/record', 'DataView_data_panel_dataInfo_panel_Jackfruit_record_txt');

    cv.StringTools.setLabelString(vipPanelJackfruit, 'text', 'DataView_data_panel_dataInfo_panel_detailData_title_txt');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row1/win_item/win_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_win_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row1/allWin_item/allWin_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_allWin_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row1/draw_item/draw_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_draw_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row2/best_item/best_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_best_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row2/total_item/total_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_total_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row2/allWin_rate_item/allWin_rate_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_allWin_rate_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row3/first_item/first_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_first_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row3/mid_item/mid_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_mid_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row3/last_item/last_title', 'DataView_data_panel_dataInfo_panel_Jackfruit_last_title');
    cv.StringTools.setLabelString(vipPanelJackfruit, 'content/row4/item3/moreData_txt', 'DataView_data_panel_dataInfo_panel_vip_panel_moreData_txt');

    // MTT
    const baseInfo_panel_mtt: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_mtt', this.node);

    // 总局数
    cv.StringTools.setLabelString(baseInfo_panel_mtt, 'box/item1/totalPoker', 'DataView_data_panel_dataInfo_panel_MTT_TotalJu_txt');
    cv.StringTools.setLabelString(baseInfo_panel_mtt, 'box/item2/qianquan', 'DataView_data_panel_dataInfo_panel_MTT_Qianquanshu_txt');
    cv.StringTools.setLabelString(baseInfo_panel_mtt, 'box/item3/juesaizhuo', 'DataView_data_panel_dataInfo_panel_MTT_Zhuoshu_txt');
    cv.StringTools.setLabelString(baseInfo_panel_mtt, 'box/item4/totalHand', 'DataView_data_panel_dataInfo_panel_MTT_TotalShoushu_txt');
    cv.StringTools.setLabelString(baseInfo_panel_mtt, 'title', 'DataView_data_panel_dataInfo_panel_baseData_title_txt');

    // 适配总局数txt的高度
    do {
      let item_tmp: cc.Node = null;
      let item_tmps: cc.Node[] = [];
      let item_tmp_max_h: number = 0;
      let item_tmp_offset: number = 7;
      let txt_pos_y: number = 0;

      let item1: cc.Node = cc.find(`box/item1/totalPoker`, baseInfo_panel_mtt);
      let item2: cc.Node = cc.find(`box/item2/qianquan`, baseInfo_panel_mtt);
      let item3: cc.Node = cc.find(`box/item3/juesaizhuo`, baseInfo_panel_mtt);
      let item4: cc.Node = cc.find(`box/item4/totalHand`, baseInfo_panel_mtt);
      item_tmps.push(item1);
      item_tmps.push(item2);
      item_tmps.push(item3);
      item_tmps.push(item4);

      for (let i = 0; i < item_tmps.length; ++i) {
        let t: cc.Node = item_tmps[i];
        let h: number = cv.resMgr.getLabelStringSize(t.getComponent(cc.Label)).height;
        if (h >= item_tmp_max_h) {
          item_tmp_max_h = h;
          item_tmp = t;
        }
      }
      txt_pos_y = item_tmp.y - item_tmp.anchorY * item_tmp_max_h - item_tmp_offset;

      let txt1: cc.Node = cc.find('box/item1/totalPoker_txt', baseInfo_panel_mtt);
      let txt2: cc.Node = cc.find('box/item2/qianquan_txt', baseInfo_panel_mtt);
      let txt3: cc.Node = cc.find('box/item3/juesaizhuo_txt', baseInfo_panel_mtt);
      let txt4: cc.Node = cc.find('box/item4/totalHand_txt', baseInfo_panel_mtt);

      let txt1_h: number = cv.resMgr.getLabelStringSize(txt1.getComponent(cc.Label)).height;
      txt_pos_y -= (1 - txt1.anchorY) * txt1_h;

      // 设置"txt"纵坐标
      txt1.y = txt_pos_y;
      txt2.y = txt_pos_y;
      txt3.y = txt_pos_y;
      txt4.y = txt_pos_y;
    } while (false);

    cv.StringTools.setLabelString(this.node, 'Text_4', 'selfView_ScrollView_Button_3_Text_3_0');
    cv.StringTools.setLabelString(this.node, 'btnbg/fight_button/Label', 'DataView_data_panel_fight_button');
    cv.StringTools.setLabelString(this.node, 'btnbg/data_button/Label', 'DataView_data_panel_data_button');
    cv.StringTools.setLabelString(data_panel, 'title', 'DataView_data_panel_dataInfo_panel_baseData_title_txt');


    cv.StringTools.setLabelString(data_panel, 'box/row1/item1/totalPoker', 'DataView_data_panel_dataInfo_panel_data_panel_totalGame_txt');
    cv.StringTools.setLabelString(data_panel, 'box/row1/item2/averageFight', 'DataView_data_panel_dataInfo_panel_data_panel_fightAverage_txt');
    cv.StringTools.setLabelString(data_panel, 'box/row2/item2/averageBring', 'DataView_data_panel_dataInfo_panel_data_panel_buyinAverage_txt');
    cv.StringTools.setLabelString(data_panel, 'box/row2/item1/totalHand', 'DataView_data_panel_dataInfo_panel_data_panel_totalHand_txt');
    cv.StringTools.setLabelString(data_panel, 'box/row1/item3/BB100Hand', 'DataView_data_panel_dataInfo_panel_vip_panel_damang_txt');
    //cv.StringTools.setLabelString(data_panel, 'box/row2/item3/fight100Hand', 'DataView_data_panel_dataInfo_panel_vip_panel_zhanJibaishou_txt');
    cv.StringTools.setLabelString(data_panel, 'box/row2/item3/moreData_txt', 'DataView_data_panel_dataInfo_panel_vip_panel_moreData_txt');

    cv.StringTools.setLabelString(this.node, vip_panel + 'title', 'DataView_data_panel_dataInfo_panel_detailData_title_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row3/item3/jijin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_jiJindu_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row1/item1/kanfan_title', 'DataView_data_panel_dataInfo_panel_vip_panel_kanFanpailv_txt');
    //cv.StringTools.setLabelString(this.node, vip_panel + 'box/row2/item3/tanpai_title', 'DataView_data_panel_dataInfo_panel_vip_panel_tanPailv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row3/item1/3BET_title', 'DataView_data_panel_dataInfo_panel_vip_panel_zaiJiazhulu_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row1/item4/PFR_title', 'DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt');
    //cv.StringTools.setLabelString(this.node, vip_panel + 'box/row2/item2/fanhouWin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_fanHoushenglv_txt');
    //cv.StringTools.setLabelString(this.node, vip_panel + 'box/row2/item4/tanpaiWin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_tanPaishenglv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row3/item2/CBET_title', 'DataView_data_panel_dataInfo_panel_vip_panel_chiXuxiazhulv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/row1/item3/VPIP_title', 'DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt');
    cv.StringTools.setLabelString(this.node, vip_panel + 'box/item4/item4/moreData_txt', 'DataView_data_panel_dataInfo_panel_vip_panel_moreData_txt');

    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'title', 'DataView_data_panel_dataInfo_panel_detailData_title_txt');
    //cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row1/item1/enter_title', 'DataView_data_panel_dataInfo_panel_data_panel_enter_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row1/item2/enterWin_title', 'DataView_data_panel_dataInfo_panel_data_panel_enterWin_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row1/item3/VPIP_title', 'DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row1/item4/PFR_title', 'DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row1/item1/kanfan_title', 'DataView_data_panel_dataInfo_panel_vip_panel_kanFanpailv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row2/item2/fanhouWin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_fanHoushenglv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row2/item3/tanpai_title', 'DataView_data_panel_dataInfo_panel_vip_panel_tanPailv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row2/item4/tanpaiWin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_tanPaishenglv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row3/item1/3BET_title', 'DataView_data_panel_dataInfo_panel_vip_panel_zaiJiazhulu_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row3/item2/CBET_title', 'DataView_data_panel_dataInfo_panel_vip_panel_chiXuxiazhulv_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/row3/item3/jijin_title', 'DataView_data_panel_dataInfo_panel_vip_panel_jiJindu_txt');
    cv.StringTools.setLabelString(this.node, vip_panel_mtt + 'box/item4/item3/moreData_txt', 'DataView_data_panel_dataInfo_panel_vip_panel_moreData_txt');

    cv.StringTools.setLabelString(this.node, `dataInfo_panel/content/baseInfo_panel/box/row1/item3/detail_txt`, 'Insurance_bg_detail_btn_text');
    cc.find("bg/tip_nodata1", this._question_btn).getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_no_data");
    cc.find("bg/tip_nodata2", this._question_btn).getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_no_data");
    // let totalHand_txt = data_panel.getChildByName("totalHand_txt");
    // let total_text = data_panel.getChildByName("total_text");
    // let temp = total_text.x - totalHand_txt.width;
    // let txt_size = cv.resMgr.getLabelStringSize(totalHand_txt.getComponent(cc.Label));
    // total_text.setPosition(totalHand_txt.width + temp, total_text.y);
    // let img1 = data_panel.getChildByName("img1");
    // img1.setPosition(totalHand_txt.x - txt_size.width - 34, img1.y);

    // let sv: ScrollViewReuse = this.scrollView.getComponent('ScrollViewReuse');

    // sv.reloadView();
  }

  /**
   * @function 战绩统计列表滑动到底部的分页加载
   */
  // onSVEventScrollToBottom(arg: cc.ScrollView): void {
  //   if (this.buttonType == DataViewButtonType.DataView_Data) {
  //     // console.log("current DataView_Data.");
  //     return;
  //   }

  //   let recordsCount = 0;

  //   if (this.gameType === DataViewGameType.DataView_DZPK || this.gameType === DataViewGameType.DataView_DZPK_SHORT) {
  //     recordsCount = GameDataManager.tGameRecords.nRecordsTexasCount;
  //   } else if (this.gameType == DataViewGameType.DataView_BET) {
  //     recordsCount = GameDataManager.tGameRecords.nRecordsBetCount;
  //   } else {
  //     recordsCount = GameDataManager.tGameRecords.nRecordsAofCount;
  //   }

  //   if (this.gameType === DataViewGameType.DataView_MTT) {
  //     // MTT战绩数据页面
  //     recordsCount = this.curMttListCount;

  //     cv.worldNet.RequestMttListData(cv.dataHandler.getUserData().user_id, recordsCount, this.MttRequestCount);
  //     //cv.httpHandler.requestMTTMatchListData(recordsCount, this.MttRequestCount);
  //   } else if (this.gameType === DataViewGameType.DataView_JACKFRUIT) {
  //     // 菠萝蜜数据请求
  //     if (!this.fightListLoading && this.JackfruitListReq) {
  //       this.fightListLoading = true;

  //       cv.httpHandler.requestJFRoomRecordList(this.JackfruitListPageNum, this.JackfruitRequestCount, this.initJackfruitFight.bind(this));
  //     }
  //   } else {
  //     cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, recordsCount, this.initFight.bind(this));
  //   }

  //   this.bPull = true;
  // }

  fightListScrollToBotton(event, type) {
    switch (type) {
      case cc.ScrollView.EventType.BOUNCE_BOTTOM: {
        // 滚动到底部
        switch (this.gameType) {
          case DataViewGameType.DataView_MTT:
            // MTT
            if (!this.fightListLoading) {
              this.fightListLoading = true;

              cv.worldNet.RequestMttListData(cv.dataHandler.getUserData().user_id, this.curMttListCount, this.MttRequestCount);
            }

            break;
          case DataViewGameType.DataView_DZPK:
            // 德州
            if (!this.fightListLoading) {
              this.fightListLoading = true;

              cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, this.fightListReqNum, this.initFight.bind(this));
            }

            break;
          case DataViewGameType.DataView_DZPK_SHORT:
            // 短牌
            if (!this.fightListLoading) {
              this.fightListLoading = true;

              cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, this.fightListReqNum, this.initFight.bind(this));
            }

            break;
          case DataViewGameType.DataView_BET:
            // 必下
            if (!this.fightListLoading) {
              this.fightListLoading = true;

              cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, this.fightListReqNum, this.initFight.bind(this));
            }

            break;

          case DataViewGameType.DataView_PLO:
            //奥马哈
            if (!this.fightListLoading) {
              this.fightListLoading = true;

              cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, this.fightListReqNum, this.initFight.bind(this));
            }
            break;


          case DataViewGameType.DataView_JACKFRUIT:
            // 菠萝蜜
            if (!this.fightListLoading && this.JackfruitListReq) {
              this.fightListLoading = true;

              cv.httpHandler.requestJFRoomRecordList(this.JackfruitListPageNum, this.JackfruitRequestCount, this.initJackfruitFight.bind(this));
            }

            break;
          default:
            break;
        }

        break;
      }
      case cc.ScrollView.EventType.BOUNCE_TOP: {
        // 滚动到顶部
        // cc.log('到头了');

        break;
      }
      case cc.ScrollView.EventType.SCROLL_ENDED:
        // 滚动结束
        // console.log('滚动结束', type);
        break;
      case cc.ScrollView.EventType.SCROLLING:
        // 滚动中
        // console.log('滚动中', type);
        break;
      default:
        break;
    }
  }

  update(dt: number) {
    let detail_panel: cc.Node = this.detailNode;
    this._question_btn.active = true;
    if (this.gameType == DataViewGameType.DataView_MTT || this.gameType == DataViewGameType.DataView_JACKFRUIT) {
      detail_panel = this.detailNode_MTT;
      this._question_btn.active = false;
    }

    if (this.gameType == DataViewGameType.DataView_DZPK_SHORT) {
      this._bigblind.getComponent(cc.Label).string = cv.config.getStringData("Cell4");
      this._bb.getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_ante_txt");
    }
    else {
      this._bigblind.getComponent(cc.Label).string = cv.config.getStringData("ToastMessage4");
      this._bb.getComponent(cc.Label).string = cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_damang_txt");
    }

    let isVip: boolean = cv.dataHandler.getUserData().u32CardType >= 2;

    if (!this.node.active) {
      return;
    }

    if (this.gameType == DataViewGameType.DataView_MTT) {
      if ((this.enterData_run) >= (this.enterData) && (this.enterWinData_run) >= (this.enterWinData)) {
        //cc.find('box/row1/item1/enter_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.enterData;
        //cc.find('box/row1/item2/enterWin_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.enterWinData;
      } else {
        //cc.find('box/row1/item1/enter_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.enterData_run;
        //cc.find('box/row1/item2/enterWin_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.enterWinData_run;
      }

      if ((this.enterData_run) < (this.enterData)) {
        this.enterData_run += 0.005;
      }

      if ((this.enterWinData_run) < (this.enterWinData)) {
        this.enterWinData_run += 0.005;
      }
    }

    if (isVip) {
      cc.find('box/row1/item3/VPIP_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.vpipData_run;
      cc.find('box/row1/item4/PFR_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.pfrData_run;

      if (this.gameType == DataViewGameType.DataView_MTT) {
        cc.find('box/row1/item1/kanfan_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.kanfanData_run;
      }
      else {
        if (this.gameType != DataViewGameType.DataView_JACKFRUIT) {
          cc.find('box/row1/item1/kanfan_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.kanfanData_run;
        }
      }
      //cc.find('box/row2/item2/fanhouWin_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.fanhouWinData_run;
      //cc.find('box/row2/item3/tanpai_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.tanpaiData_run;
      //cc.find('box/row2/item4/tanpaiWin_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.tanpaiWinData_run;
      cc.find('box/row3/item1/3BET_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this._3BETData_run;
      cc.find('box/row3/item2/CBET_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.CBETData_run;

      if (this.vpipData_run < this.vpipData) {
        this.vpipData_run += 0.005;
      }

      if (this.pfrData_run < this.pfrData) {
        this.pfrData_run += 0.005;
      }

      if (this.kanfanData_run < this.kanfanData) {
        this.kanfanData_run += 0.005;
      }

      if (this.fanhouWinData_run < this.fanhouWinData) {
        this.fanhouWinData_run += 0.005;
      }

      if (this.tanpaiData_run < this.tanpaiData) {
        this.tanpaiData_run += 0.005;
      }

      if (this.tanpaiWinData_run < this.tanpaiWinData) {
        this.tanpaiWinData_run += 0.005;
      }

      if (this._3BETData_run < this._3BETData) {
        this._3BETData_run += 0.005;
      }

      if (this.CBETData_run < this.CBETData) {
        this.CBETData_run += 0.005;
      }
    }

    if (this.buttonType === DataViewButtonType.DataView_Data && this.gameType === DataViewGameType.DataView_JACKFRUIT) {
      detail_panel = this.detailNode_Jackfruit;
      this._question_btn.active = false;

      // 总胜率
      cc.find('content/row2/total_item/total_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.jfWinrate_run;
      // 全胜率
      cc.find('content/row2/allWin_rate_item/allWin_rate_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.jfWinallrate_run;
      // 头道胜率
      cc.find('content/row3/first_item/first_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.jfHeadwinrate_run;
      // 中道胜率
      cc.find('content/row3/mid_item/mid_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.jfMidwinrate_run;
      // 尾道胜率
      cc.find('content/row3/last_item/last_bar/ProgressBar', detail_panel).getComponent(cc.ProgressBar).progress = this.jfTailwinrate_run;

      if (this.jfWinrate_run < this.jfWinrate) {
        this.jfWinrate_run += 0.005;
      }

      if (this.jfWinallrate_run < this.jfWinallrate) {
        this.jfWinallrate_run += 0.005;
      }

      if (this.jfHeadwinrate_run < this.jfHeadwinrate) {
        this.jfHeadwinrate_run += 0.005;
      }

      if (this.jfMidwinrate_run < this.jfMidwinrate) {
        this.jfMidwinrate_run += 0.005;
      }

      if (this.jfTailwinrate_run < this.jfTailwinrate) {
        this.jfTailwinrate_run += 0.005;
      }
    }
  }

  initUser() {
    cv.dataHandler.getUserData().setNickName(cc.find('dataInfo_panel/content/name_text_0', this.node));
    CircleSprite.setCircleSprite(cc.find('dataInfo_panel/content/Image_2_0/Image_4', this.node), cv.dataHandler.getUserData().headUrl);

    cv.dataHandler.getUserData().setNickName(cc.find('fightInfo_panel/name_text', this.node));
    CircleSprite.setCircleSprite(cc.find('fightInfo_panel/Image_2/Image_4', this.node), cv.dataHandler.getUserData().headUrl);
  }

  initPokerInfo() {
    this.pokerInfoNode = cv.action.addChildToScene(this, this.PokerInfo_fab, [], undefined, true);//"backGroundBg", "back_button"
    this.pokerInfoNode_new = cv.action.addChildToScene(this, this.PokerInfo_fab_new, [], undefined, true);
    this.pokerInfoNode_mtt = cv.action.addChildToScene(this, this.PokerInfo_Mtt_fab, [], undefined, true);
  }

  /**
   * @function 重置MTT各类信息的值
   */
  resetUserBarInfo() {
    this.enterData = 0;
    this.enterWinData = 0; // 入池胜率
    this.vpipData = 0;  // 主动入池率VPIP
    this.pfrData = 0; // 加注入池率PFR
    this.kanfanData = 0; // 看翻牌率
    this.fanhouWinData = 0; // 翻后胜率
    this.tanpaiData = 0; // 摊牌率
    this.tanpaiWinData = 0; // 摊牌胜率
    this._3BETData = 0; // 3BET
    this.CBETData = 0; // CBET

    this.enterData_run = 0;
    this.enterWinData_run = 0;
    this.vpipData_run = 0;
    this.pfrData_run = 0;
    this.kanfanData_run = 0;
    this.fanhouWinData_run = 0;
    this.tanpaiData_run = 0;
    this.tanpaiWinData_run = 0;
    this._3BETData_run = 0;
    this.CBETData_run = 0;

    this.jfWinrate = 0; // 菠萝蜜总胜率
    this.jfWinallrate = 0; // 菠萝蜜全胜率
    this.jfHeadwinrate = 0; // 菠萝蜜头道胜率
    this.jfMidwinrate = 0; // 菠萝蜜中道胜率
    this.jfTailwinrate = 0; // 菠萝蜜尾道胜率

    this.jfWinrate_run = 0; // 菠萝蜜总胜率
    this.jfWinallrate_run = 0; // 菠萝蜜全胜率
    this.jfHeadwinrate_run = 0; // 菠萝蜜头道胜率
    this.jfMidwinrate_run = 0; // 菠萝蜜中道胜率
    this.jfTailwinrate_run = 0; // 菠萝蜜尾道胜率
  }

  /**
   * @function 处理和展示MTT的值
   * @param {string|object|null} value 数据
   */
  initMttUserInfo(value: any) {
    if (value === null || value === '') {
      return;
    }

    const result = typeof value === 'string' ? JSON.parse(value) : value;
    const { data } = result;
    const baseInfo_panel: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel', this.node);
    const baseInfo_panel_mtt: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_mtt', this.node);
    const baseInfo_panel_jackfruit: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_jackfruit', this.node);

    let _detailNode = this.detailNode_MTT;

    if (this.gameType === DataViewGameType.DataView_MTT) {
      // MTT
      this.detailNode_MTT.active = true;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = false;

      _detailNode = this.detailNode_MTT;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = true;
      baseInfo_panel_jackfruit.active = false;
    } else if (this.gameType === DataViewGameType.DataView_JACKFRUIT) {
      // 菠萝蜜
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = true;
      this.detailNode.active = false;

      _detailNode = this.detailNode_Jackfruit;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = true;

      return;
    } else {
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = true;

      _detailNode = this.detailNode;

      baseInfo_panel.active = true;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = false;

      return;
    }

    this.resetUserBarInfo(); // 重置各种数据的值

    // 如果是个空对象，就不往下执行了
    if (data === null || Object.keys(data).length === 0) {
      return;
    }

    // 比赛次数
    cc.find('box/item1/totalPoker_txt', baseInfo_panel_mtt).getComponent(cc.Label).string = data.tour_count;
    // 钱圈数
    cc.find('box/item2/qianquan_txt', baseInfo_panel_mtt).getComponent(cc.Label).string = data.reward_count;
    // 决赛桌
    cc.find('box/item3/juesaizhuo_txt', baseInfo_panel_mtt).getComponent(cc.Label).string = data.final_count;
    // 总手数
    cc.find('box/item4/totalHand_txt', baseInfo_panel_mtt).getComponent(cc.Label).string = data.hand_count;

    if (this.gameType == DataViewGameType.DataView_MTT) {
      //cc.find('box/row1/item1/enter_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.enterData;
      //cc.find('box/row1/item2/enterWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.enterWinData;

      cc.find('box/row1/item1/kanfan_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.kanfanData_run;
      //cc.find('box/row2/item2/fanhouWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.fanhouWinData_run;
    }

    cc.find('box/row1/item3/VPIP_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.vpipData_run;
    cc.find('box/row1/item4/PFR_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.pfrData_run;

    //cc.find('box/row2/item3/tanpai_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.tanpaiData_run;
    //cc.find('box/row2/item4/tanpaiWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.tanpaiWinData_run;
    cc.find('box/row3/item1/3BET_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this._3BETData_run;
    cc.find('box/row3/item2/CBET_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.CBETData_run;

    this.enterData = cv.StringTools.toFixed(parseFloat(data.join_ratio), 2); // 入池率
    this.enterWinData = cv.StringTools.toFixed(parseFloat(data.join_win_ratio), 2); // 入池胜率
    this.vpipData = cv.StringTools.toFixed(parseFloat(data.active_join_ratio), 2);  // 主动入池率VPIP
    this.pfrData = cv.StringTools.toFixed(parseFloat(data.raise_join_ratio), 2); // 加注入池率PFR
    this.kanfanData = cv.StringTools.toFixed(parseFloat(data.flop_ratio), 2); // 看翻牌率
    this.fanhouWinData = cv.StringTools.toFixed(parseFloat(data.flop_win_ratio), 2); // 翻后胜率
    this.tanpaiData = cv.StringTools.toFixed(parseFloat(data.show_ratio), 2); // 摊牌率
    this.tanpaiWinData = cv.StringTools.toFixed(parseFloat(data.show_win_ratio), 2); // 摊牌胜率
    this._3BETData = cv.StringTools.toFixed(parseFloat(data.three_bet), 2); // 3BET
    this.CBETData = cv.StringTools.toFixed(parseFloat(data.c_bet), 2); // CBET

    if (this.gameType == DataViewGameType.DataView_MTT) {
      // 入池率
      //cc.find('box/row1/item1/enter_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.enterData, 100).toString()}%`;
      // 入池胜率
      cc.find('box/row1/item2/enterWin_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.enterWinData, 100).toString()}%`;

      // 看翻牌率
      cc.find('box/row1/item1/kanfan_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.kanfanData, 100).toString()}%`;
    }
    else {
      // 看翻牌率
      cc.find('box/row1/item1/kanfan_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.kanfanData, 100).toString()}%`;
    }

    // 主动入池率VPIP
    cc.find('box/row1/item3/VPIP_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.vpipData, 100).toString()}%`;
    // 加注入池率PFR
    cc.find('box/row1/item4/PFR_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.pfrData, 100).toString()}%`;
    // 看翻牌率
    cc.find('box/row1/item1/kanfan_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.kanfanData, 100).toString()}%`;
    // 翻后胜率
    //cc.find('box/row2/item2/fanhouWin_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.fanhouWinData, 100).toString()}%`;
    // 摊牌率
    //cc.find('box/row2/item3/tanpai_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.tanpaiData, 100).toString()}%`;
    // 摊牌胜率
    //cc.find('box/row2/item4/tanpaiWin_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.tanpaiWinData, 100).toString()}%`;
    // 3BET 再加注率
    cc.find('box/row3/item1/3BET_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this._3BETData, 100).toString()}%`;
    // CBET  持续下注率
    cc.find('box/row3/item2/CBET_txt', _detailNode).getComponent(cc.Label).string = `${cv.StringTools.times(this.CBETData, 100).toString()}%`;
    // 激进度
    cc.find('box/row3/item3/jijin_txt', _detailNode).getComponent(cc.Label).string = cv.StringTools.toFixed(parseFloat(data.active_ratio), 1).toString();
  }

  /**
   * @function 处理和展示菠萝蜜的值
   */
  initJackfruitData() {
    const data: any = cv.dataHandler.getUserData().pokerdata;
    const baseInfo_panel: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel', this.node);
    const baseInfo_panel_mtt: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_mtt', this.node);
    const baseInfo_panel_jackfruit: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_jackfruit', this.node);

    let _detailNode = this.detailNode;

    if (this.gameType === DataViewGameType.DataView_MTT) {
      // MTT
      this.detailNode_MTT.active = true;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = false;

      _detailNode = this.detailNode_MTT;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = true;
      baseInfo_panel_jackfruit.active = false;

      return;
    } else if (this.gameType === DataViewGameType.DataView_JACKFRUIT) {
      // 菠萝蜜
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = true;
      this.detailNode.active = false;

      _detailNode = this.detailNode_Jackfruit;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = true;
    } else {
      // 其他牌局
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = true;

      _detailNode = this.detailNode;

      baseInfo_panel.active = true;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = false;

      return;
    }

    this.resetUserBarInfo(); // 重置各种数据的值

    const baseInfoUrl = 'dataInfo_panel/content/baseInfo_panel_jackfruit/content';
    // 总手数
    cc.find(`${baseInfoUrl}/total_item/total_txt`, this.node).getComponent(cc.Label).string = data.handcount;
    // 最大获胜分数
    cc.find(`${baseInfoUrl}/maxScore_item/maxScore_txt`, this.node).getComponent(cc.Label).string = cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.maxwinscore), 2));
    // 场均分数
    let str = '';

    if (data.avescore > 0) {  //场均成绩
      str = '+';

      cc.find(`${baseInfoUrl}/average_item/average_txt`, this.node).color = cv.tools.getWinColor();
    } else if (data.avescore < 0) {
      cc.find(`${baseInfoUrl}/average_item/average_txt`, this.node).color = cv.tools.getLoseColor();
    } else {
      cc.find(`${baseInfoUrl}/average_item/average_txt`, this.node).color = cc.color(31, 137, 192);
    }

    cc.find(`${baseInfoUrl}/average_item/average_txt`, this.node).getComponent(cc.Label).string = str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.avescore), 2));
    // 战绩/百手
    str = '';

    if (data.hands100amount > 0) {  //场均成绩
      str = '+';

      cc.find(`${baseInfoUrl}/record_item/record_txt`, this.node).color = cv.tools.getWinColor();
    } else if (data.hands100amount < 0) {
      cc.find(`${baseInfoUrl}/record_item/record_txt`, this.node).color = cv.tools.getLoseColor();
    } else {
      cc.find(`${baseInfoUrl}/record_item/record_txt`, this.node).color = cc.color(31, 137, 192);
    }

    cc.find(`${baseInfoUrl}/record_item/record_txt`, this.node).getComponent(cc.Label).string = str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.hands100amount), 2));

    // 获胜次数
    cc.find('content/row1/win_item/win_bar/win_txt', _detailNode).getComponent(cc.Label).string = data.wincount;
    // 全胜次数
    cc.find('content/row1/allWin_item/allWin_bar/allWin_txt', _detailNode).getComponent(cc.Label).string = data.winallcount;
    // 平局次数
    cc.find('content/row1/draw_item/draw_bar/draw_txt', _detailNode).getComponent(cc.Label).string = data.equalcount;
    // 最好成绩
    cc.find('content/row2/best_item/best_bar/best_txt', _detailNode).getComponent(cc.Label).string = cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.bestrecord), 2));
    // 总胜率
    cc.find('content/row2/total_item/total_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.jfWinrate;
    cc.find('content/row2/total_item/total_bar/total_txt', _detailNode).getComponent(cc.Label).string = `${data.winrate}%`;
    // 全胜率
    cc.find('content/row2/allWin_rate_item/allWin_rate_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.jfWinallrate;
    cc.find('content/row2/allWin_rate_item/allWin_rate_bar/allWin_rate_txt', _detailNode).getComponent(cc.Label).string = `${data.winallrate}%`;
    // 头道胜率
    cc.find('content/row3/first_item/first_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.jfHeadwinrate;
    cc.find('content/row3/first_item/first_bar/first_txt', _detailNode).getComponent(cc.Label).string = `${data.headwinrate}%`;
    // 中道胜率
    cc.find('content/row3/mid_item/mid_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.jfMidwinrate;
    cc.find('content/row3/mid_item/mid_bar/mid_txt', _detailNode).getComponent(cc.Label).string = `${data.midwinrate}%`;
    // 尾道胜率
    cc.find('content/row3/last_item/last_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.jfTailwinrate;
    cc.find('content/row3/last_item/last_bar/last_txt', _detailNode).getComponent(cc.Label).string = `${data.tailwinrate}%`;

    this.jfWinrate = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.winrate), 2); // 菠萝蜜总胜率
    this.jfWinallrate = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.winallrate), 2); // 菠萝蜜全胜率
    this.jfHeadwinrate = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.headwinrate), 2); // 菠萝蜜头道胜率
    this.jfMidwinrate = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.midwinrate), 2); // 菠萝蜜中道胜率
    this.jfTailwinrate = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.tailwinrate), 2); // 菠萝蜜尾道胜率
  }

  /**
   * @function 处理和展示其他牌局的值
   */
  initData() {
    let data: any = cv.dataHandler.getUserData().pokerdata;
    let Fight_average = 0;
    let Buyin_average = 0;

    if (Number(data.Total_end_room_count) > 0) {
      Fight_average = Number(data.Total_win_money) / Number(data.Total_end_room_count);
      Buyin_average = Number(data.Total_buyin) / Number(data.Total_end_room_count);
    }

    // let data_panel: cc.Node = cc.find("dataInfo_panel/content/baseInfo_panel/data_panel", this.node);
    const baseInfo_panel: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel', this.node);
    const baseInfo_panel_mtt: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_mtt', this.node);
    const baseInfo_panel_jackfruit: cc.Node = cc.find('dataInfo_panel/content/baseInfo_panel_jackfruit', this.node);

    let _detailNode = this.detailNode;

    if (this.gameType === DataViewGameType.DataView_MTT) {
      // MTT
      this.detailNode_MTT.active = true;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = false;

      _detailNode = this.detailNode_MTT;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = true;
      baseInfo_panel_jackfruit.active = false;

      return;
    } else if (this.gameType === DataViewGameType.DataView_JACKFRUIT) {
      // 菠萝蜜
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = true;
      this.detailNode.active = false;

      _detailNode = this.detailNode_Jackfruit;

      baseInfo_panel.active = false;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = true;

      return;
    } else {
      this.detailNode_MTT.active = false;
      this.detailNode_Jackfruit.active = false;
      this.detailNode.active = true;

      _detailNode = this.detailNode;

      baseInfo_panel.active = true;
      baseInfo_panel_mtt.active = false;
      baseInfo_panel_jackfruit.active = false;
    }

    let isVip: boolean = cv.dataHandler.getUserData().u32CardType >= 2;
    // console.log("====> isVip = " + isVip + ",data.Etf_rate = " + data.Etf_rate);
    let vip_panel = cc.find('dataInfo_panel/content/vip_panel', this.node);
    let Fight_100 = 0;

    if (Number(data.Total_hand_card_count) != 0 && Number(data.Total_win_money) != 0) {
      Fight_100 = Number(data.Total_win_money) / Number(data.Total_hand_card_count) * 100.0;
    }

    // cc.find("ruchiWin_text", data_panel).getComponent(cc.Label).string = data.Win_rate + "%";
    // console.log("====>this.enterData = " + this.enterData + ", this.enterWinData = " + this.enterWinData);
    // 比赛次数
    cc.find('box/row1/item1/totalPoker_txt', baseInfo_panel).getComponent(cc.Label).string = data.Total_end_room_count.toString();
    // 总手数
    cc.find('box/row2/item1/totalHand_txt', baseInfo_panel).getComponent(cc.Label).string = data.Total_hand_card_count.toString();
    // 场均带入
    cc.find('box/row2/item2/averageBring_txt', baseInfo_panel).getComponent(cc.Label).string = cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Buyin_average), 2));

    let str = '';

    if (Fight_average > 0) {  // 场均成绩
      str = '+';

      cc.find('box/row1/item2/averageFight_txt', baseInfo_panel).color = cv.tools.getWinColor();
    } else if (Fight_average < 0) {
      cc.find('box/row1/item2/averageFight_txt', baseInfo_panel).color = cv.tools.getLoseColor();
    } else {
      cc.find('box/row1/item2/averageFight_txt', baseInfo_panel).color = cc.color(31, 137, 192);
    }

    cc.find('box/row1/item2/averageFight_txt', baseInfo_panel).getComponent(cc.Label).string = str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Fight_average), 2));

    str = '';

    if (data.Bb100 > 0) { // 大盲百手
      str = '+';

      cc.find('box/row1/item3/BB100Hand_txt', baseInfo_panel).color = cv.tools.getWinColor();
    } else if (data.Bb100 < 0) {
      cc.find('box/row1/item3/BB100Hand_txt', baseInfo_panel).color = cv.tools.getLoseColor();
    } else {
      cc.find('box/row1/item3/BB100Hand_txt', baseInfo_panel).color = cc.color(31, 137, 192);
    }

    cc.find('box/row1/item3/BB100Hand_txt', baseInfo_panel).getComponent(cc.Label).string = isVip
      ? str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Number(data.Bb100)), 2))
      : '-';

    str = '';

    // if (Fight_100 > 0) { // 战绩百手
    //   str = '+';

    //   cc.find('box/row2/item3/fight100Hand_txt', baseInfo_panel).color = cv.tools.getWinColor();
    // } else if (Fight_100 < 0) {
    //   cc.find('box/row2/item3/fight100Hand_txt', baseInfo_panel).color = cv.tools.getLoseColor();
    // } else {
    //   cc.find('box/row2/item3/fight100Hand_txt', baseInfo_panel).color = cc.color(31, 137, 192);
    // }

    // cc.find('box/row2/item3/fight100Hand_txt', baseInfo_panel).getComponent(cc.Label).string = isVip
    //   ? str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Fight_100), 2))
    //   : '-';

    let winMoney = cv.StringTools.clientGoldByServer(Number(data.Total_win_money));
    let totalWin_text = cc.find('fightInfo_panel/totalWin_text', this.node);
    let totalWin_text_0 = cc.find('dataInfo_panel/content/totalWin_text_0', this.node);

    str = '';

    if (winMoney > 0) {
      str = '+';

      totalWin_text.color = cv.tools.getWinColor();
      totalWin_text_0.color = cv.tools.getWinColor();
    } else if (winMoney == 0) {
      totalWin_text.color = cc.Color.WHITE;
      totalWin_text_0.color = cc.Color.WHITE;
    } else {
      totalWin_text.color = cv.tools.getLoseColor();
      totalWin_text_0.color = cv.tools.getLoseColor();
    }

    totalWin_text.getComponent(cc.Label).string = str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(winMoney, 0));
    totalWin_text_0.getComponent(cc.Label).string = str + cv.StringTools.numberToShowString(cv.StringTools.toFixed(winMoney, 0));

    this.enterData_run = 0;
    this.enterWinData_run = 0;
    this.vpipData_run = 0;
    this.pfrData_run = 0;
    this.kanfanData_run = 0;
    this.fanhouWinData_run = 0;
    this.tanpaiData_run = 0;
    this.tanpaiWinData_run = 0;
    this._3BETData_run = 0;
    this.CBETData_run = 0;

    //cc.find('box/row1/item1/enter_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.enterData;
    //cc.find('box/row1/item2/enterWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.enterWinData;
    cc.find('box/row1/item3/VPIP_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.vpipData_run;
    cc.find('box/row1/item4/PFR_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.pfrData_run;
    cc.find('box/row1/item1/kanfan_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.kanfanData_run;
    //cc.find('box/row2/item2/fanhouWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.fanhouWinData_run;
    //cc.find('box/row2/item3/tanpai_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.tanpaiData_run;
    //cc.find('box/row2/item4/tanpaiWin_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.tanpaiWinData_run;
    cc.find('box/row3/item1/3BET_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this._3BETData_run;
    cc.find('box/row3/item2/CBET_bar/ProgressBar', _detailNode).getComponent(cc.ProgressBar).progress = this.CBETData_run;

    this.enterData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Enter_rate), 2); // 入池率
    this.enterWinData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Win_rate), 2); // 入池胜率
    this.vpipData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Vpip_rate), 2);  // 主动入池率VPIP
    this.pfrData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Pfr_rate), 2); // 加注入池率PFR
    this.kanfanData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Etf_rate), 2); // 看翻牌率
    this.fanhouWinData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Wsf_rate), 2); // 翻后胜率
    this.tanpaiData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Wtsd_rate), 2); // 摊牌率
    this.tanpaiWinData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Wsd_rate), 2); // 摊牌胜率
    this._3BETData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Rate_3bet), 2); // 3BET
    this.CBETData = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(data.Cbet_rate), 2); // CBET

    // 入池率
    //cc.find('box/row1/item1/enter_txt', _detailNode).getComponent(cc.Label).string = `${data.Enter_rate.toString()}%`;

    // 入池胜率
    //cc.find('box/row1/item2/enterWin_txt', _detailNode).getComponent(cc.Label).string = `${data.Win_rate.toString()}%`;
    // cc.find("damang100", vip_panel).getComponent(cc.Label).string = isVip ? cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Number(data.Bb100)), 2)) : "-";

    // 看翻牌率
    cc.find('box/row1/item1/kanfan_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? `${data.Etf_rate.toString()}%`
      : '-';

    // 翻后胜率
    // cc.find('box/row2/item2/fanhouWin_txt', _detailNode).getComponent(cc.Label).string = isVip
    //   ? `${data.Wsf_rate.toString()}%`
    //   : '-';

    // // 摊牌率
    // cc.find('box/row2/item3/tanpai_txt', _detailNode).getComponent(cc.Label).string = isVip
    //   ? `${data.Wtsd_rate.toString()}%`
    //   : '-';

    // 摊牌胜率
    // cc.find('box/row2/item4/tanpaiWin_txt', _detailNode).getComponent(cc.Label).string = isVip
    //   ? `${data.Wsd_rate.toString()}%`
    //   : '-';

    // 3BET 再加注率
    cc.find('box/row3/item1/3BET_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? `${data.Rate_3bet.toString()}%`
      : '-';
    // cc.find("zhanJibaishou", vip_panel).getComponent(cc.Label).string = isVip ? cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Fight_100), 2)) : "-";

    // 主动入池率VPIP
    cc.find('box/row1/item3/VPIP_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? `${data.Vpip_rate.toString()}%`
      : '-';

    // 加注入池率PFR
    cc.find('box/row1/item4/PFR_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? `${data.Pfr_rate.toString()}%`
      : '-';

    // CBET  持续下注率
    cc.find('box/row3/item2/CBET_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? `${data.Cbet_rate.toString()}%`
      : '-';

    // 激进度
    cc.find('box/row3/item3/jijin_txt', _detailNode).getComponent(cc.Label).string = isVip
      ? cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(Number(data.Af_rate)), 1).toString()
      : '-';
  };

  isHaveMttId(mttId: string): boolean {
    for (let i = 0; i < this.vArray4.length; ++i) {
      if (this.vArray4[i].mttId === mttId) {
        return true;
      }
    }

    return false;
  }

  /**
   * @function MTT战绩列表
   */
  initMttFight(value: any) {
    this.fightListLoading = false;

    if (value == null) {
      return;
    }

    const json_str = value.replace(/\\/g, '');
    const data = JSON.parse(json_str);
    const gameResults = data.gameResults;
    const length = cv.StringTools.getArrayLength(gameResults);

    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (!this.isHaveMttId(gameResults[i].mttId)) {
          this.vArray4.push(gameResults[i]);
        }
      }

      this.vArray4.sort((a: any, b: any): number => {
        return b.startingTime - a.startingTime;
      });

      this.curMttListCount = this.vArray4.length;

      this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray4);
    } else {
      if (this.vArray4.length === 0) {
        this.vArray4 = [];

        this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
      }
    }
  }

  /**
   * @function 菠萝蜜战绩列表
   */
  initJackfruitFight(value: any) {
    if (value === null) {
      this.fightListLoading = false;
      this.JackfruitListReq = false;

      return;
    }

    const data = value.jfRooms;
    const length = cv.StringTools.getArrayLength(data);

    if (length < this.JackfruitRequestCount) {
      this.JackfruitListReq = false;
    }

    if (length > 0) {
      for (let i = 0; i < length; i++) {
        this.vArray5.push(data[i]);
      }
    }

    this.vArray5.sort((a: any, b: any): number => {
      return b.recordTime - a.recordTime;
    });

    this.fightListLoading = false;

    this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray5);

    if (length <= 0) {
      if (this.vArray5.length === 0) {
        this.vArray5 = [];

        this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
      }

      return;
    }

    this.JackfruitListPageNum = this.JackfruitListPageNum + 1;
  }

  /**
   * @function 其它类型战绩列表
   */
  initFight(value: any) {
    this.fightListLoading = false;

    const length = cv.StringTools.getArrayLength(value.rooms);

    if (length > 0) {
      this.fightListReqNum = value.havecount;

      for (let i = 0; i < value.rooms.length; i++) {
        const room = value.rooms[i];

        switch (this.gameType) {
          case DataViewGameType.DataView_DZPK:
            // 德州
            this.vArray1.push(room);
            break;
          case DataViewGameType.DataView_DZPK_SHORT:
            // 短牌
            this.vArray2.push(room);
            break;
          case DataViewGameType.DataView_BET:
            // 必下
            this.vArray3.push(room);
            break;
          case DataViewGameType.DataView_PLO:
            //奥马哈
            this.vArray6.push(room);
            break;

          default:

            break;
        }
      }

      switch (this.gameType) {
        case DataViewGameType.DataView_DZPK:  //德州
          this.vArray1.sort((a: any, b: any): number => { return b.create_time - a.create_time; });

          this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray1);
          break;
        case DataViewGameType.DataView_DZPK_SHORT: //短牌
          this.vArray2.sort((a: any, b: any): number => { return b.create_time - a.create_time; });

          this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray2);
          break;
        case DataViewGameType.DataView_BET:  //必下
          this.vArray3.sort((a: any, b: any): number => { return b.create_time - a.create_time; });

          this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray3);
          break;

        case DataViewGameType.DataView_PLO: //奥马哈
          this.vArray6.sort((a: any, b: any): number => { return b.create_time - a.create_time; });
          this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray6);
          break;

        default:

          break;
      }
    } else {
      switch (this.gameType) {
        case DataViewGameType.DataView_DZPK: {
          if (this.vArray1.length === 0) {
            this.vArray1 = [];

            this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
          }
          break;
        }
        case DataViewGameType.DataView_DZPK_SHORT: {
          if (this.vArray2.length === 0) {
            this.vArray2 = [];

            this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
          }
          break;
        }
        case DataViewGameType.DataView_BET: {
          if (this.vArray3.length === 0) {
            this.vArray3 = [];

            this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
          }
          break;
        }

        case DataViewGameType.DataView_PLO: {
          if (this.vArray6.length === 0) {
            this.vArray6 = [];

            this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
          }
          break;
        }

        default:
          break;
      }
    }
  }

  /**
   * @function 点击战绩统计Tab
   */
  onBtnFightClick(event: cc.Component.EventHandler) {
    cv.AudioMgr.playButtonSound('tab');

    this.changeStatus(true); // 切换按钮样式

    let fightInfo_panel = cc.find('fightInfo_panel', this.node)

    cc.find('fightInfo_panel', this.node).setPosition(this.fightPos);

    cv.action.showActionBothLeft(fightInfo_panel,
      cc.find('dataInfo_panel', this.node),
      cv.action.delay_type.NORMAL
      , (target: cc.Node, actIO: number): void => { }
      , (target: cc.Node, actIO: number): void => {
        // 在适配ipad，添加widget后。战绩列表左右切换需要刷新下widget。
        cv.resMgr.adaptWidget(fightInfo_panel, false);
      }
    );

    this.buttonType = DataViewButtonType.DataView_Fight;
    this.getData();
  }

  /**
   * @function 点击数据统计Tab
   */
  onBtnDataClick(event: cc.Component.EventHandler) {
    cv.AudioMgr.playButtonSound('tab');

    this.changeStatus(false); // 切换按钮样式

    cv.action.showActionBothRight(cc.find('dataInfo_panel', this.node), cc.find('fightInfo_panel', this.node), cv.action.delay_type.NORMAL);

    this.buttonType = DataViewButtonType.DataView_Data;
    this.getData();
    cc.find("bg", this._question_btn).active = false;
  }

  /**
   * @function 返回事件
   */
  onBtnBackClick() {
    cv.AudioMgr.playButtonSound('back_button');
    cc.find("bg", this._question_btn).active = false;
    cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);

    this.vArray1 = [];
    this.vArray2 = [];
    this.vArray3 = [];
    this.vArray4 = [];
    this.vArray5 = [];
    this.vArray6 = [];
    this.fightListScript && this.fightListScript.notifyDataSetChanged([]);
  }

  /**
   * @function 数据统计和战绩统计两个按钮的样式切换
   * @param {boolean} isFight 是否为战绩统计
   */
  changeStatus(isFight: Boolean) {
    if (isFight) {
      this.fightBtn.interactable = false;
      this.dataBtn.interactable = true;

      cc.find('line', this.fightBtn.node).active = true;
      cc.find('line', this.dataBtn.node).active = false;
      cc.find('Label', this.fightBtn.node).color = new cc.Color(208, 171, 110);
      cc.find('Label', this.dataBtn.node).color = new cc.Color(148, 149, 149);
    } else {
      this.fightBtn.interactable = true;
      this.dataBtn.interactable = false;

      cc.find('line', this.fightBtn.node).active = false;
      cc.find('line', this.dataBtn.node).active = true;
      cc.find('Label', this.fightBtn.node).color = new cc.Color(148, 149, 149);
      cc.find('Label', this.dataBtn.node).color = new cc.Color(208, 171, 110);
    }
  }

  /**
   * @function 切换列表类型
   * @param {number} type 列表类型
   */
  setViewGameType(type: DataViewGameType): void {
    this.gameType = type;

    this.updateBtnsMove(this.gameType, 0); // 更新按钮更多选项
    this.getData(); // 获取数据
    this.updateGameType(); // 更新Tab按钮选中的状态
  }

  /**
   * @function 更新Tab按钮选中的状态
   */
  updateGameType() {
    const arr: number[] = cv.config.isOverSeas()
      ? this.PKC_LIST
      : this.PKW_LIST;
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      const curGameType = this._gamebuttonList[i]._gameType;

      if (curGameType === Number(this.gameType)) {
        // 选中
        cc.find('selectimg', this._gamebuttonList[i]).active = true;

        this._gamebuttonTextList[i].color = new cc.Color(39, 39, 50);
      } else {
        // 取消选中
        cc.find('selectimg', this._gamebuttonList[i]).active = false;

        this._gamebuttonTextList[i].color = new cc.Color(137, 138, 138);
      }
    }
  }

  onDoRequestMttList() {
    if (this.gameType === DataViewGameType.DataView_MTT) {  // MTT 清理掉数据，重新获取。
      this.curMttListCount = 0;
      this.vArray4 = [];
      this.fightListScript && this.fightListScript.notifyDataSetChanged(this.vArray4);
    }

    this.getData();
  }

  /**
   * @function 获取数据
   */
  getData() {
    // 处理请求参数
    switch (this.gameType) {
      case DataViewGameType.DataView_MTT:
        // MTT

        break;
      case DataViewGameType.DataView_DZPK:
        // 德州
        this.gameid = cv.Enum.GameId.Texas;
        this.mode = CreateGameMode.CreateGame_Mode_Normal;

        break;
      case DataViewGameType.DataView_DZPK_SHORT:
        // 短牌
        this.gameid = cv.Enum.GameId.Texas;
        this.mode = CreateGameMode.CreateGame_Mode_Short;

        break;
      case DataViewGameType.DataView_BET:
        // 必下
        this.gameid = cv.Enum.GameId.Bet;
        this.mode = CreateGameMode.CreateGame_Mode_Normal;

        break;
      case DataViewGameType.DataView_JACKFRUIT:
        // 菠萝蜜
        this.gameid = cv.Enum.GameId.Jackfruit;
        this.mode = CreateGameMode.CreateGame_Mode_Short;
        break;

      case DataViewGameType.DataView_PLO:
        //奥马哈
        this.gameid = cv.Enum.GameId.Plo;
        this.mode = CreateGameMode.CreateGame_Mode_Normal;
        break;

      default:
        break;
    }

    if (this.buttonType === DataViewButtonType.DataView_Data) {
      // 请求数据统计
      this.fightListScript && this.fightListScript.notifyDataSetChanged([]);

      if (this.gameType === DataViewGameType.DataView_MTT) {
        // 请求MTT数据
        this.curMttListCount = 0;
        this.vArray4 = [];

        cv.worldNet.RequestMttUserInfoData(cv.dataHandler.getUserData().user_id);
      } else {
        switch (this.gameType) {
          case DataViewGameType.DataView_DZPK:
            this.fightListReqNum = 0;
            this.vArray1 = [];

            break;
          case DataViewGameType.DataView_DZPK_SHORT:
            this.fightListReqNum = 0;
            this.vArray2 = [];

            break;
          case DataViewGameType.DataView_BET:
            this.fightListReqNum = 0;
            this.vArray3 = [];

            break;
          case DataViewGameType.DataView_JACKFRUIT:
            this.JackfruitListReq = true;
            this.JackfruitListPageNum = 1;
            this.vArray5 = [];

            break;

          case DataViewGameType.DataView_PLO:
            this.fightListReqNum = 0;
            this.vArray6 = [];
            break;

          default:
            break;
        }

        cv.httpHandler.requestUserData(this.mode, this.gameid);
      }
    } else {
      // 请求战绩数据
      if (this.gameType === DataViewGameType.DataView_MTT) {
        // MTT数据请求
        this.fightListLoading = true;

        cv.worldNet.RequestMttListData(cv.dataHandler.getUserData().user_id, this.curMttListCount, this.MttRequestCount);
      } else if (this.gameType === DataViewGameType.DataView_JACKFRUIT) {
        // 菠萝蜜数据请求
        this.fightListLoading = true;
        this.JackfruitListReq = true;
        this.JackfruitListPageNum = 1;
        this.vArray5 = [];

        cv.httpHandler.requestJFRoomRecordList(this.JackfruitListPageNum, this.JackfruitRequestCount, this.initJackfruitFight.bind(this));
      } else {
        this.fightListLoading = true;
        this.fightListReqNum = 0;

        cv.httpHandler.requestRoomRecordList(0, this.mode, this.gameid, this.fightListReqNum, this.initFight.bind(this));
      }
    }

    const vip_panel: string = 'dataInfo_panel/content/baseInfo_panel/';

    if (this.gameType === DataViewGameType.DataView_AOF ||
      this.gameType === DataViewGameType.DataView_DZPK ||
      this.gameType === DataViewGameType.DataView_BET ||
      this.gameType === DataViewGameType.DataView_PLO
    ) {
      // 大盲/百手
      cv.StringTools.setLabelString(this.node, `${vip_panel}box/row1/item3/BB100Hand`, 'DataView_data_panel_dataInfo_panel_vip_panel_damang_txt');
      cv.StringTools.setLabelString(this.node, `${vip_panel}box/row1/item3/detail_txt`, 'Insurance_bg_detail_btn_text');
    } else if (this.gameType != DataViewGameType.DataView_JACKFRUIT) {
      //前注/百手
      cv.StringTools.setLabelString(this.node, `${vip_panel}box/row1/item3/BB100Hand`, 'DataView_data_panel_dataInfo_panel_vip_panel_ante_txt');
    }
  }

  initMTTWeb(): void {
    if (cv.config.HAVE_MTT && false) {
      if (!this.mtt_web) {
        let topSize = cc.find('bg_top_img', this.node).getContentSize();

        this.web_viewPos = cc.v2(cc.winSize.width * 0.5, (cc.winSize.height - topSize.height + 6) * 0.5);
        this.mtt_web = (new cc.Node()).addComponent(cc.WebView);
        this.mtt_web.node.setContentSize(topSize.width, cc.winSize.height - topSize.height + 6);
        this.setMatchWebPos(true);
        this.mtt_web.url = cv.dataHandler.getUserData().mtt_url + this.MTT_ZJ_URL;
        cc.director.getScene().addChild(this.mtt_web.node);
        // if (cc.sys.isNative) {
        //     this.mtt_web.setJavascriptInterfaceScheme("ccjs");
        //     this.mtt_web.setOnJSCallback((webView: cc.WebView, url: string) => {
        //         if (url.search("ccjs://back") != -1) {
        //             self.mtt_web.node.removeFromParent(true);
        //         }
        //     });
        // }
      } else {
        let url = cv.dataHandler.getUserData().mtt_url + this.MTT_ZJ_URL;

        if (this.mtt_web.url != url) {
          this.mtt_web.url = url;
        }
      }
    }
  }

  setMatchWebPos(isView: boolean): void {
    if (!this.mtt_web) {
      return;
    }

    let pos = cc.v2(cc.winSize.width * 4, cc.winSize.height * 0.5);

    this.mtt_web.node.setPosition(isView === false ? pos : this.web_viewPos);

    let bg = cc.find('bg', this.node);

    if (bg) {
      bg.active = !isView;
    }
  }

  /**
   * @function 更新按钮更多选项
   * @param index 点击按钮参数，正常情况为gameType,异常情况为-1
   * @param move scroll参数
   */
  updateBtnsMove(index: number, move: number): void {
    const arr: number[] = cv.config.isOverSeas()
      ? this.PKC_LIST
      : this.PKW_LIST;
    const len = arr.length;

    if (len < 6) {
      return;
    }

    let selectNum = -1;

    if (index != -1) {
      for (let i = 0; i < len; i++) {
        if (arr[i] == index) {
          selectNum = i;
        }
      }
    }

    // 下面只处理有6个的情况
    for (let i = 0; i < len; i++) {
      let right_image = this._gamebuttonList[i].getChildByName('right_image');
      let left_image = this._gamebuttonList[i].getChildByName('left_image');

      if (right_image) {
        right_image.active = false;
      }

      if (left_image) {
        left_image.active = false;
      }
    }

    /*
    if ((selectNum < 3 && move == 0) || (selectNum == -1 && move == 1)) {
        this.gameType_panel.scrollToLeft(0.25);
        let right_image = this._gamebuttonList[4].getChildByName("right_image");
        if (right_image) {
            right_image.active = true;
        }
    }
    else {
        this.gameType_panel.scrollToRight(0.25);
        let left_image = this._gamebuttonList[1].getChildByName("left_image");
        if (left_image) {
            left_image.active = true;
        }
    }
    */
  }

  removeMtt(): void {
    if (this.mtt_web) {
      this.mtt_web.node.removeFromParent(true);
      this.mtt_web.node.destroy();
      this.mtt_web = null;
    }
  }
}
