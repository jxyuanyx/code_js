import cv from "./../../components/lobby/cv"

const SUITS = [0, 1, 2, 3]; // 牌花色   0:黑桃, 1:红心, 2:梅花， 3:方块
const VALUES = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 牌点数   14:A,13:K,12:Q,11:J
const VALUES_SHORT = [14, 13, 12, 11, 10, 9, 8, 7, 6]; // 短牌点数 

export class WinRateTools {

    private static _g_instance: WinRateTools = null;                                             

    private gameMode = cv.Enum.CreateGameMode.CreateGame_Mode_Normal; //cv.Enum.CreateGameMode.CreateGame_Mode_Normal
    private gameId = cv.Enum.GameId.Texas;
    private handCards = [];
    private publicCards = [];
    private allCards = [];
    private winRecords = [];

    private winRateUtils:any = new window.winRateUtils(); //胜率计算工具类
    private RANDOMTIMES:number = 2000;  //最大模拟发牌次数, 翻墙

    private combs = [];
    private combs75 = []; // // 从7张牌中选出5张牌的组合方式
    private combs95 = []; // // 从7张牌中选出5张牌的组合方式
    /**
     * 获取单例
     */
    static getInstance(): WinRateTools {
        if (!WinRateTools._g_instance) {
            WinRateTools._g_instance = new WinRateTools();
        }
        return WinRateTools._g_instance;
    }
 
    //获取胜率
    //gameId: 游戏类型  德州，奥马哈等
    //gameMode:  长牌或者短牌
    //playerCards: allin玩家的信息，包括座位号，手牌
    //publicCards: 当前桌面上已经发的公共牌，翻牌前无公共牌为[]
    public getWinRateByCards(gameId, gameMode, playerCards, publicCards){

        this.resetCalc();

        this.gameId = gameId; //游戏类型
        this.gameMode = gameMode;

        this._initCombsAarray();
        
        if(gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){ //短牌
            this.allCards = this.winRateUtils.arrayMultiply(SUITS, VALUES_SHORT);
        }else{
            this.allCards = this.winRateUtils.arrayMultiply(SUITS, VALUES);
        }
  
        if(gameId === cv.Enum.GameId.Plo){
            this.RANDOMTIMES = 1000;
        }else{
            this.RANDOMTIMES = 2000; // 对于翻前来说，发牌的可能存在几十万种以上，2000次和10000次得到的胜率相差不大。所以此处设置为2000，可以提高运算速度。
        }
        
        this.winRateUtils.clearCache(this.RANDOMTIMES);

        this.handCards = []; //所有Allin玩家的手牌
        this.publicCards = [];  //所有的公共牌
        let _seatIDArray = [];  //所有Allin玩家的SeatID

        //转换手牌
        for(let i = 0; i < playerCards.length; i++){
            let _seatId = playerCards[i].seatID;
            _seatIDArray.push(_seatId);
            let _handCards = playerCards[i].handCards;
            let _playerHCard = [];
            for(let j = 0; j < _handCards.length; j++){
                let _suit = _handCards[j].suit;
                let _num = _handCards[j].num;
                _playerHCard.push([this._cardSuitMap(_suit), this._cardNumMap(_num)]);
            }
            this.handCards.push(_playerHCard);
        }

        //转换公共牌
        for(let i = 0; i < publicCards.length; i++){
            let _suit = publicCards[i].suit;
            let _num = publicCards[i].num;
            this.publicCards.push([this._cardSuitMap(_suit), this._cardNumMap(_num)]);
        }

        // console.log("$$$###当前玩家手牌:" + this.handCards);
        // console.log("$$$###当前玩家公牌:" + this.publicCards);
        // console.time("CalcTime");
        let winRates = this.calculateWinRate(this.handCards, this.publicCards);
        // console.timeEnd("CalcTime");
        // console.log("计算结果:" + winRates);

        let  _rateResult = [];
        //将座位号和胜率配对返回

        let maxRates:number = 0; //最大胜率
        for(let i = 0; i < winRates.length; i++){
            winRates[i] = Math.round(winRates[i]*100);
            if(winRates[i] > maxRates){
                maxRates = winRates[i];
            }
        }
        
        for(let i = 0; i < _seatIDArray.length; i++){
            let _bLead = false;  //是否胜率领先
            if(winRates[i] == maxRates){
                _bLead = true;
            }
            _rateResult.push({seatId:_seatIDArray[i], winRate:winRates[i], bLead:_bLead}); //胜率结果四舍五入
        }
        
        return _rateResult;
    }

    //生成组牌组合
    private _initCombsAarray(){
        this.combs75 = [];
        this.combs95 = [];
        this.combs = [];
        if(this.gameId == cv.Enum.GameId.Plo){  //奥马哈
            //奥马哈 从9张牌里面取5张   0，1，2，3，4 对应的是下面公共牌索引，5，6，7，8 对应的是手牌
            let _tempCombs = this.winRateUtils.combination([0, 1, 2, 3, 4, 5, 6, 7, 8], 5);
            for (let j = 0; j < _tempCombs.length; j++){
                //奥马哈组合成五张牌，必须包含两张手牌、三张公共牌, 所以5，6，7，8索引只能存在两个
                let _hIndex = 0;  //手牌数量
                for (let k = 0; k < _tempCombs[j].length; k++) { 
                    let _value = _tempCombs[j][k];
                    if(_value >= 5 && _value <= 8){ //当前是手牌索引
                        _hIndex++;
                    }
                }
                if(_hIndex == 2){  //手牌是两个的组合，才算可以
                    this.combs95.push(_tempCombs[j]);
                }
            }
        }else{
            //德州 从7张牌里面取5张  0，1，2，3，4 对应的是下面公共牌索引，5，6 对应的是手牌
            this.combs75 = this.winRateUtils.combination([0, 1, 2, 3, 4, 5, 6], 5);
        }

        if(this.gameId == cv.Enum.GameId.Plo){
            this.combs = this.combs95;
        }else{
            this.combs = this.combs75;
        }
    }

    private _cardSuitMap(suit:number):number{

        if(suit == cv.Enum.CardSuit.CARD_CLUB){  //梅花
            return 2;
        }else if(suit == cv.Enum.CardSuit.CARD_DIAMOND){  //方块
            return 3;
        }else if(suit == cv.Enum.CardSuit.CARD_HEART){  //红心
            return 1;
        }else if(suit == cv.Enum.CardSuit.CARD_SPADE){  //黑桃
            return 0;
        }
        return -1;
    }

    private _cardNumMap(num:number):number{
        let _carNum =0;
        switch(num){
            case cv.Enum.CardNum.CARD_2:
                _carNum = 2;
            break;
            case cv.Enum.CardNum.CARD_3:
                _carNum = 3;
            break;
            case cv.Enum.CardNum.CARD_4:
                _carNum = 4;
            break;
            case cv.Enum.CardNum.CARD_5:
                _carNum = 5;
            break;
            case cv.Enum.CardNum.CARD_6:
                _carNum = 6;
            break;
            case cv.Enum.CardNum.CARD_7:
                _carNum = 7;
            break;
            case cv.Enum.CardNum.CARD_8:
                _carNum = 8;
            break;
            case cv.Enum.CardNum.CARD_9:
                _carNum = 9;
            break;
            case cv.Enum.CardNum.CARD_10:
                _carNum = 10;
            break;
            case cv.Enum.CardNum.CARD_J:
                _carNum = 11;
            break;        
            case cv.Enum.CardNum.CARD_Q:
                _carNum = 12;
            break;
            case cv.Enum.CardNum.CARD_K:
                _carNum = 13;
            break;
            case cv.Enum.CardNum.CARD_A:
                _carNum = 14;
            break;
        }

        return _carNum;
    }
    //重置计算
    private resetCalc(){
        this.winRecords = [0, 0, 0];
        this.handCards = [];
        this.publicCards = [];
        this.allCards = [];
    }

    //打印结果
    private showResult(winRates) {
        let s = '';
        for (let i = 0; i < winRates.length; i++) {
           s =  this.winRateUtils.toPercent(winRates[i]);
           console.log("%d showResult#################: %s",i,s);
        }
    }

    private calculateWinRate(handCards, publicCards):any[] {
        let winRates = []; 


        let winRecords = this.winRateUtils.arrZero(handCards.length)
        let allSelectedCards = []
      
        //将所有人的手牌加入 选中的牌
        for (let i = 0; i < handCards.length; i++) {
            for (let j = 0; j < handCards[i].length; j++) {
                allSelectedCards.push(handCards[i][j]);
            }
        }

        //将公共牌加入选中的牌
        allSelectedCards = allSelectedCards.concat(publicCards);
  
        // this.winRateUtils.myConcat(this.allCards);
        // this.winRateUtils.myConcat(allSelectedCards);
        //剩余的牌
        let leftCards = this.winRateUtils.arrayWithout(this.winRateUtils.arrCopy(this.allCards), 
                                                        this.winRateUtils.arrCopy(allSelectedCards));
        let short = 5 - publicCards.length  //剩余需要的公共牌数量
      
        let possibilities = this.winRateUtils.combNumber(leftCards.length, short)  //组合可能性
        console.log("剩余可用牌的数量:" + leftCards.length);
        console.log("剩余的公共牌数量:" + short);
        console.log("剩余组合存在数量:" + possibilities);

        if (possibilities < this.RANDOMTIMES) {
            console.log("###possibilities less than RANDOMTIMES");
            let indexes = Array(leftCards.length).fill(0).map((v, i) => i)
            let combs = this.winRateUtils.combination(indexes, short)
            for (let i = 0; i < combs.length; i++) {
                let addedCards = [].concat(publicCards);
                combs[i].forEach(v => addedCards.push(leftCards[v]));
                let winners = this.whoWin(addedCards, handCards);
                winners.forEach(v => winRecords[v]++);
            }
            winRates = winRecords.map(v => (v / possibilities).toPrecision(4))
        } else {

            console.log("###possibilities more than RANDOMTIMES");
            for (let count = 0; count < this.RANDOMTIMES; count++) {
                let randomPickedCards = [];
                let publicCardsCopy = publicCards.slice(0);
                let randomPickedNums = this.winRateUtils.randomPick(leftCards.length, 5 - publicCards.length);
        
                for (let i = 0; i < randomPickedNums.length; i++) {
                    randomPickedCards.push(leftCards[randomPickedNums[i]]);
                }
                for (let i = 0; i < randomPickedCards.length; i++) {
                    publicCardsCopy.push(randomPickedCards[i]);
                }

                let winners = this.whoWin(publicCardsCopy, handCards);
                for (let i = 0; i < winners.length; i++) {
                    winRecords[winners[i]]++
                }
            }
            winRates = winRecords.map(v => v/this.RANDOMTIMES);
        }

        return winRates;
      }
      
    // 创建值为0的数组 例: [0,0,0]
    private  _arrZero(n) {
        // 提升性能，常用的 判断创建
        if(n === 2){
            return [0, 0];
        }else if(n === 3){
            return [0, 0, 0];
        }else if (n === 4) {
            return [0, 0, 0, 0];
        }else if(n === 8){
            return [0, 0, 0, 0, 0, 0, 0, 0];
        } else if (n === 9) {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0];
        } else {
            return Array(n).fill(0)
        }
    }

      //输入5张公共牌和所有玩家手牌，输出胜利的玩家(们)的index数组
      //publicCards: 所有的存在的公共牌可能组合
      //handCards: 所有需要计算的玩家手牌
      whoWin(publicCards, handCards) {

        let maxes = this._arrZero(handCards.length);
        for (let i = 0; i < handCards.length; i++) {
          //此处必须public concat handCards 保证手牌在后面。
          //因为combs数组手牌索引在后面, 而且奥马哈必须要保留两张手牌
          let sevenCards = publicCards.concat(handCards[i]); //加公共牌和手牌组合 奥马哈是9张，德州是7张,
          for (let j = 0; j < this.combs.length; j++) { //遍历组合索引
            let fiveCards = [];
            for (let k = 0; k < this.combs[j].length; k++) {  
                fiveCards.push(sevenCards[this.combs[j][k]]) //根据组合索引，获取组合成的5张牌的数组
            }
            let cardsValue = this.winRateUtils.getCardsValue(fiveCards, this.gameMode); //比较大小
            if (maxes[i] < cardsValue) {
                maxes[i] = cardsValue; //保存目前最大的牌
            }
          }
        }

        let result = [];
        let max = Math.max.apply(null, maxes);
        maxes.map(function (x, i) {
          if (x === max) {
            result.push(i)
          }
        });

        return result;
    }

    //测试函数
    public testFunc(){


        this._initCombsAarray();
        this.winRateUtils.clearCache(this.RANDOMTIMES);

        if(this.gameMode ==  cv.Enum.CreateGameMode.CreateGame_Mode_Short){ //短牌
            this.allCards = this.winRateUtils.arrayMultiply(SUITS, VALUES_SHORT);
        }else{
            this.allCards = this.winRateUtils.arrayMultiply(SUITS, VALUES);
        }
    
        console.log("############################ allCards:" + this.allCards);
        let testPlayerCount = 2;   // 2 - 8 人之间
        let testPubCardCount = 4; // 0 - 4 张公共牌

        let player1, player2, player3, player4,player5,player6,player7,player8;

        //花色   0:黑桃, 1:红心, 2:梅花， 3:方块
        //14:A,13:K,12:Q,11:J
        if(this.gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal && this.gameId != cv.Enum.GameId.Plo){ 
            //德州长牌
            console.log("##################德州长牌");
            player1 = [[1, 8], [0, 12]];
            player2 = [[3, 8], [1, 14]];
            // player3 = [[2, 6], [0, 12]];
            // player4 = [[3, 2], [1, 14]];
            // player5 = [[0, 13], [1, 10]];
            // player6 = [[0, 8], [1, 7]];
            // player7 = [[2, 14], [3, 14]];
            // player8 = [[0, 6], [1, 3]];

        }else if(this.gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short && this.gameId != cv.Enum.GameId.Plo){
            //德州短牌
            console.log("##################德州短牌");

            player1 = [[0, 14], [1, 14]];
            player2 = [[0, 6], [0, 7]];

            // player1 = [[2, 7], [3, 6]];
            // player2 = [[0, 9], [1, 14]];
            // player3 = [[2, 6], [0, 12]];
            // player4 = [[3, 7], [1, 14]];
            // player5 = [[0, 13], [1, 10]];
            // player6 = [[0, 8], [1, 7]];
            // player7 = [[2, 14], [3, 14]];
            // player8 = [[0, 6], [1, 11]];

        }else if(this.gameId == cv.Enum.GameId.Plo){  
            //奥马哈
            console.log("##################奥马哈");
            player1 = [[0, 14], [0, 5], [3, 5], [3, 13]];
            player2 = [[3, 11], [2, 8], [2, 5], [1, 2]];
            //player3 = [[2, 11], [0, 2], [2, 8], [0, 5]];
            // player4 = [[3, "2"], [1, 14]];
            // player5 = [[0, 13], [1, "10"]];
            // player6 = [[0, "8"], [1, "7"]];
            // player7 = [[2, 14], [3, 14]];
            // player8 = [[0, "6"], [1, "3"]];
        }


        //公共牌
        let pc1,pc2,pc3,pc4, pc5;
                //花色   0:黑桃, 1:红心, 2:梅花， 3:方块
        //14:A,13:K,12:Q,11:J
        if(this.gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){ 
            //短牌
            console.log("##################短牌");
            // pc1 = [3, 9];
            // pc2 = [2, 13];
            // pc3 = [2, 11];
            // pc4 = [3, 9];

            pc1 = [2, 14];
            pc2 = [0, 10];
            pc3 = [1, 10];
            pc4 = [0, 11];
            pc5 = [0, 12];

          

        }else{
            //长牌
            console.log("##################长牌");
             pc1 = [0, 2];
             pc2 = [0, 6];
             pc3 = [1, 10];
             pc4 = [3, 12];
           //  pc5 = [1, 5];
        
        }

        //组合手牌
        if(testPlayerCount == 2){
            this.handCards.push(player1);
            this.handCards.push(player2);
        }else if(testPlayerCount == 3){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
        }else if(testPlayerCount == 4){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
            this.handCards.push(player4);
        }else if(testPlayerCount == 5){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
            this.handCards.push(player4);
            this.handCards.push(player5);
        }else if(testPlayerCount == 6){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
            this.handCards.push(player4);
            this.handCards.push(player5);
            this.handCards.push(player6);
        }else if(testPlayerCount == 7){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
            this.handCards.push(player4);
            this.handCards.push(player5);
            this.handCards.push(player6);
            this.handCards.push(player7);
        }else if(testPlayerCount == 8){
            this.handCards.push(player1);
            this.handCards.push(player2);
            this.handCards.push(player3);
            this.handCards.push(player4);
            this.handCards.push(player5);
            this.handCards.push(player6);
            this.handCards.push(player7);
            this.handCards.push(player8);
        }
   
        if(testPubCardCount == 1){
            this.publicCards.push(pc1);
        }else if(testPubCardCount == 2){
            this.publicCards.push(pc1);
            this.publicCards.push(pc2);
        }else if(testPubCardCount == 3){
            this.publicCards.push(pc1);
            this.publicCards.push(pc2);
            this.publicCards.push(pc3);
        }else if(testPubCardCount == 4){
            this.publicCards.push(pc1);
            this.publicCards.push(pc2);
            this.publicCards.push(pc3); 
            this.publicCards.push(pc4); 
        }else if(testPubCardCount == 5){
            this.publicCards.push(pc1);
            this.publicCards.push(pc2);
            this.publicCards.push(pc3); 
            this.publicCards.push(pc4); 
            this.publicCards.push(pc5); 
        }


        console.time("CalcTime");
        let winRates = this.calculateWinRate(this.handCards, this.publicCards);
        console.timeEnd("CalcTime");
        this.showResult(winRates);
    }
}
