import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../components/lobby/cv";

/**
 * 俱乐部结构 自定义扩充的字段
 */
class ClubDataExtra {
    club_owner_name: string = "";                                                                       // 俱乐部创建者的名字
    club_owner_thumb: string = "";                                                                      // 俱乐部创建者的头像
    cur_maxIncreaseIndex: number = 0;                                                                   // 成员列表当前最大自增id(服务器依据此索引值顺序下发分页数据)
    allianceInfo: world_pb.NoticeSearchAlliance = world_pb.NoticeSearchAlliance.create();               // 当前查看的联盟信息
    club_member_list: world_pb.ClubMemberSnapshot[] = [];                                               // 俱乐部成员列表
    club_member_search_list: world_pb.ClubMemberSnapshot[] = [];                                        // 俱乐部成员搜索列表(临时缓存搜索到的成员)
    allianceList: world_pb.AllianceListParams[] = [];                                                   // 当前俱乐部的联盟列表

    constructor() {
        this.rest();
    }

    rest(): void {
        this.club_owner_name = "";
        this.club_owner_thumb = "";
        this.cur_maxIncreaseIndex = 0;
        this.allianceInfo = world_pb.NoticeSearchAlliance.create();
        cv.StringTools.clearArray(this.club_member_list);
        cv.StringTools.clearArray(this.club_member_search_list);
        cv.StringTools.clearArray(this.allianceList);
    }

    copyFrom(param: ClubDataExtra): void {
        cv.StringTools.deepCopy(param, this);
    }
}

/**
 * 俱乐部结构
 */
export class ClubData {
    club: world_pb.ClubSnapshotListParams = null;                                                       // 俱乐部数据结构
    clubExtra: ClubDataExtra = new ClubDataExtra();                                                     // 自定义扩充的字段

    constructor() {
        this.reset();
    }

    /**
     * 重置
     */
    reset(): void {
        let club_obj: any = world_pb.ClubSnapshotListParams.toObject(world_pb.ClubSnapshotListParams.create(), {
            enums: Number,
            longs: Number,
            bytes: String,
            defaults: true,
            arrays: true,
            objects: true,
            oneofs: true
        });
        this.club = world_pb.ClubSnapshotListParams.fromObject(club_obj);
        this.clubExtra.rest();
    }

    /**
     * 深拷贝(可局部拷贝, 剩余部分保持原样)
     */
    copyFrom(param: ClubData): void {
        cv.StringTools.deepCopy(param, this);
    }

    /**
     * 是否包含在联盟内 (0:不在, 1:在, 2:在且是盟主)
     */
    isIncludedInAlliance(clubID: number): number {
        let retValue: number = 0;
        if (clubID === this.clubExtra.allianceInfo.creater_club_id) {
            retValue = 2;
        }
        else {
            for (let i = 0; i < this.clubExtra.allianceInfo.clubItems.length; ++i) {
                if (clubID === this.clubExtra.allianceInfo.clubItems[i].club_id) {
                    retValue = 1;
                    break;
                }
            }
        }
        return retValue;
    }
}