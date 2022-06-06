/**
 * 扑克大师类定义定义
 */
export namespace PokerMasterDef {
    let inst_sounds: PokerMasterSounds = null;
    let inst_localMsg: PokerMasterLocalMsg = null;

    export function Sounds(): Readonly<PokerMasterSounds> {
        if (!inst_sounds) {
            inst_sounds = new PokerMasterSounds();
        }
        return inst_sounds;
    }
    export function LocalMsg(): Readonly<PokerMasterLocalMsg> {
        if (!inst_localMsg) {
            inst_localMsg = new PokerMasterLocalMsg();
        }
        return inst_localMsg;
    }

    /**
     * 清除所有引用
     */
    export function clear(): void {
        inst_sounds = null;
        inst_localMsg = null;
    }

    /**
     * 主界面层级枚举
     */
    export enum LayerZorder {
        Z_IDX_DUMMY = 0,																				                    // 默认

        Z_IDX_IMG_HEAD = 9,																				                    // 头像
        Z_IDX_IMG_HEAD_TXT,																				                    // 头像文本
        Z_IDX_IMG_HEAD_FLAG,																			                    // 头像标签
        Z_IDX_IMG_WIN_COUNT,																			                    // 玩家连胜

        Z_IDX_COIN_POOL,																				                    // 金币池节点
        Z_IDX_ANIM_NODE,																				                    // 动画节点
        Z_IDX_ANIM_NODE_0,																				                    // 动画节点0
        Z_IDX_ANIM_NODE_1,																				                    // 动画节点1
        Z_IDX_ANIM_NODE_2,																				                    // 动画节点2
        Z_IDX_ANIM_NODE_3,																				                    // 动画节点3

        Z_IDX_PANEL_COUNT_DOWN,																			                    // 开局倒计时面板
        Z_IDX_PANEL_ADVANCE_AUTO_SELECT,																                    // 高级续投选择面板
        Z_IDX_PANEL_REWRAD_TIP,																			                    // 中奖提示面板
        Z_IDX_PANEL_RED_PACKET,																			                    // 红包面板
        Z_IDX_PANEL_AUTO_SELECT,																		                    // 高级续投选择面板
        Z_IDX_PANEL_RECORD,																				                    // 牌局记录面板
        Z_IDX_PANEL_SETTING,																			                    // 设置面板   
        Z_IDX_PANEL_SQUINT,                                                                                                   // 眯牌面板
        Z_IDX_PANEL_GUID,																				                    // 引导面板
        Z_IDX_PANEL_SERVER_TOAST,																		                    // 提示面板
    };

    /**
     * 桌布样式
     */
    export enum TableStyle {
        TABLE_NONE = 0,                                                                                                     // 无
        TABLE_TURN,                                                                                                         // turn轮
        TABLE_RIVER                                                                                                         // river轮
    }

    /**
     * 音乐名定义
     */
    class PokerMasterSounds {
        sound_bgm: Readonly<string> = "zh_CN/game/cowboy/audio/back";												    // 背景
        sound_begin_bet: Readonly<string> = "zh_CN/game/cowboy/audio/begin_bet";									    // 开始下注
        sound_end_bet: Readonly<string> = "zh_CN/game/cowboy/audio/end_bet";										    // 停止下注
        sound_kaipai: Readonly<string> = "zh_CN/game/cowboy/audio/kaipai";										        // 发牌、开牌
        sound_fapai: Readonly<string> = "zh_CN/game/cowboy/audio/fapai";											    // 发牌、开牌
        sound_start_round: Readonly<string> = "zh_CN/game/cowboy/audio/half_time";								        // 开局提示
        sound_betin: Readonly<string> = "zh_CN/game/cowboy/audio/chip";											        // 投少量金币
        sound_betin_many: Readonly<string> = "zh_CN/game/cowboy/audio/hechip";									        // 投大量金币
        sound_win_lose: Readonly<string> = "zh_CN/game/cowboy/audio/bx_getCoin";									    // 输赢
        sound_get_win_coin: Readonly<string> = "zh_CN/game/cowboy/audio/bigying";									    // 收金币
        sound_button: Readonly<string> = "zh_CN/game/cowboy/audio/press";											    // 按钮
        sound_time_tick: Readonly<string> = "zh_CN/game/cowboy/audio/time";										        // 时间滴答
        sound_dealer_vd: Readonly<string> = "zh_CN/game/cowboy/audio/dealer_vd";									    // 庄家完胜完败
        sound_special_card_type_small: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_small";		    // 特殊牌型小牌
        sound_special_card_type_middle: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_middle";	        // 特殊牌型中牌
        sound_special_card_type_big: Readonly<string> = "zh_CN/game/cowboy/audio/special_card_type_big";			    // 特殊牌型大牌
        sound_jackpot: Readonly<string> = "zh_CN/game/cowboy/audio/jackpot";										    // jackpot音效

        // private static _g_Instance: PokerMasterSounds = null;
        // static getInstance(): PokerMasterSounds {
        //     if (!PokerMasterSounds._g_Instance) {
        //         PokerMasterSounds._g_Instance = new PokerMasterSounds();
        //     }
        //     return PokerMasterSounds._g_Instance;
        // }
    }

    /**
     * 本地消息定义
     */
    class PokerMasterLocalMsg {
        // 非拼接消息
        SWITCH_SCENEB_EGAN: string = "switchSceneBegan";                                                                    // 切出场景
        SWITCH_SCENE_TO_MINIGAME: string = "switchSceneToMiniGame";                                                         // 切到小游戏场景
        SHOW_MEDAL: string = "showMedalMsg";                                                                                // 红包中奖提示

        // 拼接前缀
        MsgPrefix: Readonly<string> = "on_msg_pokermaster_";                                                                // 消息前缀

        // 可拼接消息
        SWITCH_SOUND: string = "switch_sound";                                                                              // 声音开关
        RECHARGE: string = "recharge";                                                                                      // 充值

        ERROR: string = "error";                                                                                            // 游戏内错误提示
        ROOM_KICK: string = "room_kick";                                                                                    // 房间踢人
        ROOM_PARAM_CHANGE: string = "room_param_change";                                                                    // 房间参数变更
        UPDATE_PLAYER_LIST: string = "update_player_list";                                                                  // 更新玩家列表

        GAME_DATA_SYN: string = "game_data_syn";                                                                            // 房间同步
        STATUS_DEAL: string = "status_deal";                                                                                // 游戏状态变更 - 新开一局
        STATUS_SHOW_ODDS: string = "status_show_odds";                                                                      // 游戏状态变更 - 公布赔率
        STATUS_START_BET: string = "status_start_bet";                                                                      // 游戏状态变更 - 开始下注
        STATUS_STOP_BET: string = "status_stop_bet_one";                                                                    // 游戏状态变更 - 停止结束
        STATUS_ROUND_END: string = "status_round_end";                                                                      // 游戏状态变更 - 一局结束/结算
        STATUS_READY: string = "status_ready_game";                                                                         // 游戏状态变更 - 清屏准备

        BET: string = "bet";                                                                                                // 下注
        AUTO_BET: string = "auto_bet";                                                                                      // 续投
        AUTO_BET_MERGE: string = "merge_auto_bet";                                                                          // 续投

        ADVANCE_AUTOBET: string = "advance_autobet";                                                                        // 高级续投
        ADVANCE_AUTOBET_SET: string = "advance_autobet_set";                                                                // 高级续投设置
        ADVANCE_AUTOBET_CANCEL: string = "advance_autobet_cancel";                                                          // 高级续投取消
        ADVANCE_BET_LEVEL_CHANGE: string = "advance_bet_level_change";                                                      // 自定义下注金额选项、续投按钮级别

        REWARD_TIPS: string = "showMedalMsg";                                                                               // 红包中奖提示
        UPDATE_WORLDSERVER_GOLD: string = "update_gold";                                                                    // world服金币有变动通知
        SHOW_LUCK_BUTTON: string = "showLuckButton";                                                                        // 显示"红包节"按钮
        TURN_TABLE_REWARD: string = "turntableResultNotice";                                                                // 红包转盘中奖结果通知

        UPDATE_TREND: string = "update_trend";                                                                              // 刷新路单
        UPDATE_REVIEW: string = "update_review";                                                                            // 刷新路单

        // private static _g_Instance: PokerMasterLocalMsg = null;
        // static getInstance(): PokerMasterLocalMsg {
        //     if (!PokerMasterLocalMsg._g_Instance) {
        //         PokerMasterLocalMsg._g_Instance = new PokerMasterLocalMsg();
        //     }
        //     return PokerMasterLocalMsg._g_Instance;
        // }
    }
}
