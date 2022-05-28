const { ccclass, property } = cc._decorator;

@ccclass
export class JackpotData extends cc.Component {
    private static instance: JackpotData;

    public static getInstance(): JackpotData {
        if (!this.instance) {
            this.instance = new JackpotData();
        }
        return this.instance;
    };
    
    //当前查看的俱乐部奖池基础信息
	public club_id :number = 0;
	public club_name :string = "";
	public club_avatar :string = "";
	public club_area :string = "";
	public baseJackpotInfos :Jackpot[] = [];
	
	//当前查看的俱乐部奖池设置信息
	public jackpotSettings :JackpotInfo[] = [];
	public jackpotAwardTypes :AwardType[] = [];
	public toClubPercent :number = 0;

	//当前的推送信息
	public  Push_club_id :number = 0;
	public  Push_blind_level :number = 0;
	public  Push_prev_amount :number = 0;
	public  Push_current_amout :number = 0;

	//当前俱乐部牌局的奖池信息
	public  currentRoomJackpot :CurrentRoomJackpot = new CurrentRoomJackpot();

	//当前俱乐部奖池获奖历史记录
    public award_players :AwardInfo[] = [];

    public luckyDog :AwardInfo = new AwardInfo();

	//向奖池注入金额
	public InjectAmount :number;
	public noticeInjectAmount :NoticeJackpotInjectAmount = new NoticeJackpotInjectAmount();

	//当次击中奖励牌形信息
    public noticeJackPotAwardInfo :NoticeJackPotAwardInfo = new NoticeJackPotAwardInfo();
    
    public reset()
	{
		this.club_id = 0;
		this.club_name = "";
		this.club_avatar = "";
		this.club_area = "";
		this.baseJackpotInfos = [];
		this.jackpotSettings = [];
		this.jackpotAwardTypes = [];
		this.Push_club_id = 0;
		this.Push_blind_level = 0;
		this.Push_prev_amount = 0;
		this.Push_current_amout =0;
		this.currentRoomJackpot.clear();
		this.award_players = [];
		this.luckyDog = null;
    }
    
    public getJackPotSetTingsData(blindLevel :number) :Jackpot
	{
        for(let i = 0;i < this.jackpotSettings.length;i++)
        {
            if (this.jackpotSettings[i].blind_level == blindLevel){
                return this.jackpotSettings[i];
            }
        }
        let pot = new Jackpot();
        pot.blind_level = -1;
        return pot;
    }
    
    public eraseJackPotSetAmountdata(blindLevel :number)
	{
		for (let i =  0;i < this.jackpotSettings.length; i++)
		{
			if (this.jackpotSettings[i].blind_level == (blindLevel + 1)){
                this.jackpotSettings.splice(i,1);
                
				return;
			}
		}
    }
    
    public updateDateJackPotSetAmountData(blindLevel:number,amount:number)
	{
        let hasOpen :boolean = false;
        for(let i = 0;i < this.jackpotSettings.length;i++)
        {
            if (this.jackpotSettings[i].blind_level == blindLevel){
                this.jackpotSettings[i].amount = amount;
                hasOpen = true;
            }
        }

		if (!hasOpen)
		{
            let info = new JackpotInfo();
            info.amount = amount;
            info.blind_level = blindLevel;
			this.jackpotSettings.push(info);
		}
    }
    
    public getHandLevelScale(handLevel :number)
	{
		for (let i = 0; i < this.jackpotAwardTypes.length; i++)
		{
			if (this.jackpotAwardTypes[i].hand_level == handLevel){
				return this.jackpotAwardTypes[i].award_percent;
			}
		}
		return 0;
    }
    
    public getJackpotAmountByBlind(blind :number)
	{
		for (let i = 0; i < this.baseJackpotInfos.length; i++)
		{
			if (this.baseJackpotInfos[i].blind_level == blind)
			{
				return this.baseJackpotInfos[i].amount;
			}
		}
		return 0;
    }
    
    public updateDateBaseInfoAmountData(blindLevel :number, amount :number)
	{
        for (let i = 0; i < this.baseJackpotInfos.length; i++)
		{
			if (this.baseJackpotInfos[i].blind_level == blindLevel)
			{
                this.baseJackpotInfos[i].amount = amount
			}
		}
    }
    
    public eraseBaseJackpotInfos(blind :number)
	{
        for (let i = 0; i < this.baseJackpotInfos.length; i++)
		{
			if (this.baseJackpotInfos[i].blind_level == blind+1)
			{
                this.baseJackpotInfos.splice(i,1);
				return;
			}
		}
	}

	public pushJackPot(amount :number,blind_level :number)
	{
        let pot = new Jackpot();
		pot.blind_level = blind_level;
		pot.amount = amount;
		this.baseJackpotInfos.push(pot)
	}
	
	public pusHaward_players(data :any)
	{
		let info = <AwardInfo>data;
		this.award_players.push(info)
	}
	public lucky_Dog(data :any)
	{
		let info = <AwardInfo>data;
		this.luckyDog = info
	}
}

export class  CurrentRoomJackpot
{
	public profit_scale :number;
	public drawin_amout :number;
	public CurrentRoomAwardTypes :AwardType[];
	public clear(){
		this.profit_scale = 0;
		this.drawin_amout = 0;
		this.CurrentRoomAwardTypes = [];
	}

	public pushCurrentRoomJackpot(award_percent :number,hand_level :number)
	{
		let awa = new AwardType()
		awa.award_percent = award_percent;
		awa.hand_level = hand_level;
		this.CurrentRoomAwardTypes.push(awa)
    }
    
};

export class Jackpot{
    public amount:number = 0; //奖池金额
	public blind_level:number = 0;//盲注级别
}

export class JackpotInfo{
    public amount :number = 0; //奖池金额
	public blind_level :number = 0;//盲注级别
	public profit_scale :number = 0;//盈利规模
	public drawin_amout :number = 0;//抽水数额
}

export class AwardType{
    public hand_level :number = 0; //牌型
	public award_percent :number = 0;//奖励比例
}

export class currentRoomJackpot{
    public amount :number = 0; //奖池金额
	public blind_level :number = 0;//盲注级别
	public profit_scale :number = 0;//盈利规模
	public drawin_amout :number = 0;//抽水数额
}
export class AwardInfo{
    public player_id :number = 0; //牌型
	public hand_level :number = 0;//牌型
	public award_amount :number = 0;//奖励金额
    public award_time :number = 0;//奖励时间
	public player_name :string = ""; //玩家昵称
}
export class NoticeJackpotInjectAmount{
    public club_id :number = 0; 
	public blind_level :number = 0;
	public amount :number = 0;
}

export class NoticeJackPotAwardInfo{
	public awardInfo:AwardInfos[]  = [];
    public cur_time :number = 0;
    public msg_type :number = 0;
	public blind_level :number = 0;
	public sys_msg_type :number = 0; //自定义消息 1-中奖消息 2-跑马灯消息
}

export class AwardInfos{
	public award_playid :number = 0; 
	public award_amount :number = 0;
	public hand_level :number = 0;
	public award_player_name :string = "";
}