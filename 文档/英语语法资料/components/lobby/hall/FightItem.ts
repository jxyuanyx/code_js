/**
 * @file 战绩列表项
 */

import cv from "../cv";

const { ccclass } = cc._decorator;

@ccclass
export default class FightItem extends cc.Component {
  private msg: any = null;
  private msgType: any = null;
  private canClick: boolean = true;
  private bMttGame: boolean = false; // 当前是否是MTT比赛数据
  private isJackfruit: boolean = false; // 当前是否是菠萝蜜游戏
  private parent: cc.Node = null;
  private thisJackfruitData: {} = null;

  onLoad() {
    cv.resMgr.adaptWidget(this.node, true);
  }

  // onDestroy(): void {
  //   cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
  // }

  /*i18n() {
    cc.log('来这里吗', this.msg);
    // if (this.msg) {
    //   cc.log('来了没啊', this.msg);

    //   const {
    //     room_param,
    //     gameid,
    //   } = this.msg;
    //   const {
    //     player_count_max,
    //     game_mode,
    //     isCriticismField,
    //     rule_blind_enum,
    //     rule_ante_amount,
    //     is_mirco,
    //     IscalcIncomePerhand,
    //     rule_time_limit,
    //     game_name,
    //     manual_created,
    //   } = room_param;

    //   if (this.msgType === 'common') {
    //     if (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
    //       if (gameid == 60) {
    //         const typeImg = cc.find('box/main/type', this.node);
    //         const num_text: cc.Label = cc.find('box/main/type/splash_num_text', this.node).getComponent(cc.Label);
    //         const word_text: cc.Label = cc.find('box/main/type/splash_word_text', this.node).getComponent(cc.Label);
    //         const cbAnte: number = cv.StringTools.serverGoldToShowNumber(rule_ante_amount);
    //         const anteStr: string = cbAnte >= 1000
    //           ? cv.StringTools.formatC('%sK', (cbAnte / 1000.0).toString())
    //           : cbAnte.toString();

    //         if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
    //           num_text.string = anteStr.toString();
    //           word_text.string = cv.config.getStringData('FindItem_bet_text');

    //           cv.resMgr.getLabelStringSize(num_text, anteStr.toString()); // 这里设置一下，以获得当前帧文本的真实宽高
    //           cv.resMgr.getLabelStringSize(word_text, cv.config.getStringData('FindItem_bet_text'));

    //           num_text.node.active = true;
    //           word_text.node.active = true;

    //           num_text.node.y = (typeImg.height / 2) + (word_text.node.getContentSize().height / 2) - 65;
    //           word_text.node.y = (typeImg.height / 2) - (num_text.node.getContentSize().width / 2) - 65;
    //         } else {
    //           num_text.string = cv.StringTools.formatC(cv.config.getStringData('FindItem_bet_text'), anteStr);

    //           num_text.node.active = true;

    //           num_text.node.y = typeImg.height / 2;

    //           word_text.node.active = false;
    //         }
    //       }
    //     }
    //   }
    // }
  }*/

  // protected start(): void {
  //   cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.i18n.bind(this), this.node);
  // }

  /**
   * @function 渲染项
   */
  renderItem(data, type, parent) {
    this.msg = data;
    this.parent = parent;
    this.msgType = type;

    switch (type) {
      case 'mtt':
        this.bMttGame = true;
        this.isJackfruit = false;

        break;
      case 'jackfruit':
        this.bMttGame = false;
        this.isJackfruit = true;

        break;
      default:
        this.bMttGame = false;
        this.isJackfruit = false;

        break;
    }

    const title: cc.Node = cc.find('box/main/data/title', this.node);
    const typeImg = cc.find('box/main/type', this.node);
    const typeText = cc.find('box/main/type/pokerTypes_text', this.node);
    const fraction = cc.find('box/main/fraction/text', this.node);
    const num_text: cc.Label = cc.find('box/main/type/splash_num_text', this.node).getComponent(cc.Label);
    const word_text: cc.Label = cc.find('box/main/type/splash_word_text', this.node).getComponent(cc.Label);

    cc.find('box/main/data/meta/common', this.node).active = type === 'common';
    cc.find('box/main/data/meta/mtt', this.node).active = type === 'mtt';
    cc.find('box/main/data/meta/jackfruit', this.node).active = type === 'jackfruit';

    let thisTimestamp = 0; // 数据时间戳
    let thisDay = ''; // 数据格式化后的日期
    // let preDay = ''; // 前一个数据格式化后的日期

    switch (type) {
      case 'jackfruit': {
        // 菠萝蜜
        const {
          recordTime, // 时间戳
          ante, // 赌注
          playerCount, // 人数
          // totalWinbet,
          netMargin,
        } = data;

        this.thisJackfruitData = data;

        // 时间处理
        thisTimestamp = recordTime;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        // preDay = preData !== null ? cv.StringTools.formatTime(preData.recordTime, cv.Enum.eTimeType.Month_Day) : '';

        // 标题处理
        const level = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(ante), 2);

        let levelText = cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_level_1');

        // 切换多语言
        if (level < 1) {
          levelText = cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_level_1');
        } else if (level >= 1 && level < 5) {
          levelText = cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_level_2');
        } else if (level >= 5 && level < 50) {
          levelText = cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_level_3');
        } else if (level >= 50) {
          levelText = cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_level_4');
        }

        title.getComponent(cc.Label).string = `${cv.config.getStringData('DataView_gameType_panel_button_7_text')}-${levelText}`;

        cc.find('box/main/data/meta/jackfruit/ante/text', this.node).getComponent(cc.Label).string = cv.StringTools.numberToShowString(level);
        cc.find('box/main/data/meta/jackfruit/people/text', this.node).getComponent(cc.Label).string = playerCount;

        cv.StringTools.setLabelValueAndColor(fraction, netMargin);
        fraction.getComponent(cc.Label).fontSize = 42;

        num_text.node.active = false;
        word_text.node.active = false;

        cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_jackfruit'));

        cc.find('box/header/time', this.node).active = false;

        break;
      }
      case 'mtt': {
        // mtt
        const {
          startingTime,
          mttName,
          numPlayers,
          fee,
          rank,
          levelMode,
          display_currency,  //货币单位
        } = data;

        // 时间处理
        thisTimestamp = startingTime;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        // preDay = preData !== null ? cv.StringTools.formatTime(preData.startingTime, cv.Enum.eTimeType.Month_Day) : '';

        // 标题处理
        let _curName = mttName.En; // 默认英文

        switch (cv.config.getCurrentLanguage()) {
          case cv.Enum.LANGUAGE_TYPE.zh_CN:
            // 中文
            _curName = mttName.Ch;
            break;
          case cv.Enum.LANGUAGE_TYPE.yn_TH:
            // 越南文
            _curName = mttName.Vn;
            break;
          case cv.Enum.LANGUAGE_TYPE.th_PH:
            // 泰文
            _curName = mttName.Th;
            break;
          default:
            // 英文
            _curName = mttName.En;
            break;
        }

        title.getComponent(cc.Label).string = _curName;

        cc.find('box/main/data/meta/mtt/people/text', this.node).getComponent(cc.Label).string = numPlayers;
        cc.find('box/main/data/meta/mtt/money/text', this.node).getComponent(cc.Label).string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(fee));

        // 第几名
        const rankStr = cv.StringTools.formatC(cv.config.getStringData('DataView_data_panel_dataInfo_panel_MTT_Rank_txt'), rank);

        fraction.color = cc.color(208, 171, 110);
        fraction.getComponent(cc.Label).string = rankStr;
        fraction.getComponent(cc.Label).fontSize = 36;

        const matchTypeName = cc.find('box/main/data/meta/mtt/type/text', this.node); // 比赛类型名称
        const matchIcon = cc.find('box/main/data/meta/mtt/type/icon', this.node);
        const matchSpeedIcon = cc.find('box/main/data/meta/mtt/type/icon2', this.node);

        if (levelMode == 0) {
          // 高速
          matchTypeName.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_MTT_matchType_txt'); // 高速比赛

          matchSpeedIcon.active = false;
          matchIcon.active = true;
        } else {
          // 超高速
          matchTypeName.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_MTT_matchPlusType_txt'); // 超高速赛

          matchSpeedIcon.active = true;
          matchIcon.active = false;
        }

        const mttCurrencyIcon = cc.find('box/main/data/meta/mtt/money/icon', this.node);
        if(display_currency == "USD"){
          cv.resMgr.setSpriteFrame(mttCurrencyIcon, 'zh_CN/hall/lobby/icon_usd');
        }else if(display_currency == "GOLD"){
          cv.resMgr.setSpriteFrame(mttCurrencyIcon, 'zh_CN/hall/lobby/icon_rmb');
        }

        num_text.node.active = false;
        word_text.node.active = false;

        cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_mtt'));

        cc.find('box/header/time', this.node).active = true;

        break;
      }
      default: {
        const {
          create_time,
          room_param,
          self_winbet,
          gameid,
        } = data;
        const {
          player_count_max,
          game_mode,
          isCriticismField,
          rule_blind_enum,
          rule_ante_amount,
          is_mirco,
          IscalcIncomePerhand,
          rule_time_limit,
          game_name,
          manual_created,
          rule_switch_force_straddle,
        } = room_param;

        // 时间处理
        thisTimestamp = create_time;
        thisDay = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Month_Day);
        // preDay = preData !== null ? cv.StringTools.formatTime(preData.create_time, cv.Enum.eTimeType.Month_Day) : '';
        
        let _game_name = "";
        if(gameid == cv.Enum.GameId.StarSeat){
            var roomArray = game_name.split('#');
            if(cv.Enum.LANGUAGE_TYPE.zh_CN ==  cv.config.getCurrentLanguage()){ //中文
              _game_name = roomArray[0];
            }else if(cv.Enum.LANGUAGE_TYPE.en_US == cv.config.getCurrentLanguage()){ //英文
              _game_name = roomArray[1];
            }else if(cv.Enum.LANGUAGE_TYPE.yn_TH == cv.config.getCurrentLanguage()){  //越南文
              _game_name = roomArray[2];
            }else{ //其它默认为英文
              _game_name = roomArray[1];
            }
        }else{
            _game_name = game_name;
        }

        if (manual_created) {
          cv.resMgr.getLabelStringSize(title.getComponent(cc.Label), _game_name);
        } else {
          cv.resMgr.getLabelStringSize(title.getComponent(cc.Label), cv.tools.displayChineseName(_game_name)); 
        }
        
        let txtPeople =  cc.find('box/main/data/meta/common/people', this.node);
        txtPeople.getChildByName("text").getComponent(cc.Label).string = player_count_max;
   
        cv.StringTools.setLabelValueAndColor(fraction, self_winbet);
        fraction.getComponent(cc.Label).fontSize = 42;

        const ante = cc.find('box/main/data/meta/common/ante/text', this.node);
        const time = cc.find('box/main/data/meta/common/time', this.node);

        num_text.node.active = false;
        word_text.node.active = false;

        if (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
          if (gameid == 20) {
            // Aof
            cv.resMgr.setSpriteFrame(typeImg, 'zh_CN/hall/lobby/common_aof');

            time.active = false;

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_aofGame_button');
          } else if (gameid == 60) {
            // BET
            cv.resMgr.setSpriteFrame(typeImg, 'zh_CN/hall/lobby/common_Splash');

            time.active = false;

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_bet_button');

            const cbAnte: number = cv.StringTools.serverGoldToShowNumber(rule_ante_amount);
            const anteStr: string = cbAnte >= 1000
              ? cv.StringTools.formatC('%sK', (cbAnte / 1000.0).toString())
              : cbAnte.toString();

            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
              num_text.string = anteStr.toString();
              word_text.string = cv.config.getStringData('FindItem_bet_text');

              cv.resMgr.getLabelStringSize(num_text, anteStr.toString()); // 这里设置一下，以获得当前帧文本的真实宽高
              cv.resMgr.getLabelStringSize(word_text, cv.config.getStringData('FindItem_bet_text'));

              num_text.node.active = true;
              word_text.node.active = true;

              num_text.node.y = (typeImg.height / 2) + (word_text.node.getContentSize().height / 2) - 65;
              word_text.node.y = (typeImg.height / 2) - (num_text.node.getContentSize().width / 2) - 65;
            } else {


              num_text.string = cv.StringTools.formatC(cv.config.getStringData('FindItem_bet_text'), anteStr);

              num_text.node.active = true;

              num_text.node.y = (typeImg.height / 2) - 65;

              word_text.node.active = false;
            }
          } else {
            // 暴击场
            const isShort = (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);

            if (is_mirco == 1 || IscalcIncomePerhand || isShort) {
              time.active = false;
            } else {
              time.active = true;

              cc.find('box/main/data/meta/common/time/text', this.node).getComponent(cc.Label).string = `${cv.config.timeArr[rule_time_limit - 1]}h`;
            }

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_normalGame_button');

            // 奥马哈
            if(gameid == cv.Enum.GameId.Plo){
              cv.resMgr.setSpriteFrame(typeImg,  cv.config.getLanguagePath('hall/lobby/common_omaha'));
            }else{
              if (isCriticismField == true) {
                //暴击
                cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_baojiDezhou'));
              } else {
                //德州
                cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_normalju'));
              }
            }
          }

          const mangZhu: string = cv.config.getblindString(rule_blind_enum - 1);
          const splitArr: string[] = mangZhu.split('/');
          const bigBlind = Number(splitArr[1]) >= 1000 ? cv.StringTools.formatC('%dk', Number(splitArr[1]) / 1000) : splitArr[1];
          const smallBlind = Number(splitArr[0]) >= 1000 ? cv.StringTools.formatC('%dk', Number(splitArr[0]) / 1000) : splitArr[0];

          if (rule_switch_force_straddle === 1) {
            const straddle = Number(splitArr[1]) >= 1000
              ? cv.StringTools.formatC('%dk', (Number(splitArr[1]) * 2) / 1000)
              : (Number(splitArr[1]) * 2);

            ante.getComponent(cc.Label).string = cv.StringTools.formatC('%s/%s/%s', smallBlind, bigBlind, straddle);
          } else {
            ante.getComponent(cc.Label).string = cv.StringTools.formatC('%s/%s', smallBlind, bigBlind);
          }

          if (rule_ante_amount && rule_ante_amount > 0) {
            ante.getComponent(cc.Label).string = ante.getComponent(cc.Label).string + cv.StringTools.formatC('(%s)', cv.StringTools.numToFloatString(rule_ante_amount));
          }
        } else if (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
          if (gameid == 20) {
            // Aof
            time.active = false;

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_aofGameShort_button');

            cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_aofshort'));
          } else if (gameid == 60) {
            // BET
            time.active = false;

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_bet_button');

            cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_bet'));
          } else {
            // 暴击场
            const isShort = (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);

            if (is_mirco == 1 || IscalcIncomePerhand || isShort) {
              time.active = false;
            } else {
              time.active = true;

              cc.find('box/main/data/meta/common/time/text', this.node).getComponent(cc.Label).string = `${cv.config.timeArr[rule_time_limit - 1]}h`;
            }

            typeText.getComponent(cc.Label).string = cv.config.getStringData('DataView_data_panel_dataInfo_panel_short_button');

    
            // 奥马哈
            if(gameid == cv.Enum.GameId.Plo){
              cv.resMgr.setSpriteFrame(typeImg,  cv.config.getLanguagePath('hall/lobby/common_omaha'));
            }else{
                if (isCriticismField == true) {
                  //暴击短牌
                  cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_baojiDezhouShort'));
                } else {
                  //德州短牌
                  cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_shortju'));
                }
            }
          }

          ante.getComponent(cc.Label).string = cv.StringTools.numberToShowString(cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(rule_ante_amount), 2));
        }

        const isZoom: boolean = cv.roomManager.checkGameIsZoom(gameid);

        if (isZoom) {
          if (game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_zoom'));
          } else {
            cv.resMgr.setSpriteFrame(typeImg, cv.config.getLanguagePath('hall/lobby/common_zoomShort'));
          }
        }

        cc.find('box/header/time', this.node).active = true;

        break;
      }
    }

    // const boxSize = this.node.getContentSize();

    // 时间显示处理
    cc.find('box/header/date', this.node).getComponent(cc.Label).string = thisDay;
    cc.find('box/header/time', this.node).getComponent(cc.Label).string = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Hour_Minute);

    // if (thisDay === preDay) {
    //   // 此时说明日期已经显示了，不需要显示日期
    //   cc.find('box/header', this.node).active = false;

    //   // this.node.setContentSize(cc.size(boxSize.width, 160));
    //   // cc.find('box', this.node).setContentSize(cc.size(boxSize.width, 160));
    //   // cc.find('box/main', this.node).getComponent(cc.Widget).top = 0;
    // } else {
    //   cc.find('box/header', this.node).active = true;

    //   // this.node.setContentSize(cc.size(boxSize.width, 208));
    //   // cc.find('box', this.node).setContentSize(cc.size(boxSize.width, 208));
    //   // cc.find('box/main', this.node).getComponent(cc.Widget).top = 48;

    //   cc.find('box/header/date', this.node).getComponent(cc.Label).string = thisDay;
    //   cc.find('box/header/time', this.node).getComponent(cc.Label).string = cv.StringTools.formatTime(thisTimestamp, cv.Enum.eTimeType.Hour_Minute);
    // }

    // const widgets = this.node.getComponentsInChildren(cc.Widget);

    // for (const j in widgets) {
    //   const widget = widgets[j];

    //   widget.updateAlignment();
    // }
  }

  /**
   * @function 点击战绩项
   */
  onBtnItemClick(event: cc.Component.EventHandler) {
    if (!this.canClick) {
      return;
    }

    this.canClick = false;

    this.scheduleOnce(function (dt) {
      this.canClick = true;
    }.bind(this), 2.0);

    if (this.bMttGame) {
      // MTT数据
      // cv.httpHandler.requestMTTMatchDetailData(this.msg.mttId);
      cv.worldNet.RequestMttDetail(cv.dataHandler.getUserData().user_id, this.msg.mttId);
    } else if (this.isJackfruit) {
      // 菠萝蜜数据
      if (this.parent) {
        const reviewPanel = this.parent.getComponent('DataView').jackfruitReviewPanel;

        if (reviewPanel && this.thisJackfruitData) {
          const {
            jfId,
            ante,
            recordTime,
          } = this.thisJackfruitData;

          cv.httpHandler.requestJackfruitGameUUID(jfId, ante, recordTime, this.openJackfruitReview.bind(this));
        }
      }
    } else {
      cv.httpHandler.requestRoomRecord(this.msg.room_uuid_js);
    }

    // 因为战绩详情页面不需要显示邮件 此处隐藏
    cv.MessageCenter.send('hide_mail_entrance');
  }

  /**
   * @function 打开菠萝蜜牌局回顾
   */
  openJackfruitReview(value: any) {
    const { ante } = this.thisJackfruitData;
    const { gameUUidsJs } = value;
    const reviewPanel = this.parent.getComponent('DataView').jackfruitReviewPanel;
    const newAnte = cv.StringTools.toFixed(cv.StringTools.clientGoldByServer(ante), 2);
    const title = `${cv.config.getStringData('DataView_gameType_panel_button_7_text')}-${cv.config.getStringData('DataView_data_panel_fightInfo_panel_Jackfruit_ante')}${newAnte}`;

    if (!reviewPanel.activeInHierarchy) {
      reviewPanel.active = true;

      reviewPanel.getComponent('JackfruitReview').show(cv.Enum.GameReviewDataType.EDST_RECORD, 0, gameUUidsJs, title);
    }
  }
}
