import { HashMap } from "../../../common/tools/HashMap";


export class MiniGameInfo {
    GameId: number = 0;                     // gameID
    CNName: string = "";                  // 中文名称
    ENName: string = "";                  // 英文名称
}

export class MiniGameConfigs {

    private static _g_instence: MiniGameConfigs = null;

    public miniGameMap: HashMap<string, {}> = new HashMap();

    public init() {
        //1 - 20
        this.miniGameMap.add("diaochan",                {GameId: 1, CNName:"夜戏貂蝉", ENName:"Honey Trap of Diao Chan"});
        this.miniGameMap.add("fortune-gods",            {GameId: 3, CNName:"横财来啦", ENName:"Fortune Gods"});
        this.miniGameMap.add("win-win-won",             {GameId: 24, CNName:"旺旺旺", ENName:"Win Win Won"});
        this.miniGameMap.add("medusa2",                 {GameId: 6, CNName:"美杜莎 II", ENName:"Medusa II"});
        this.miniGameMap.add("fortune-tree",            {GameId: 26, CNName:"摇钱树", ENName:"Tree of Fortune"});
        this.miniGameMap.add("medusa",                  {GameId: 7, CNName:"美杜莎", ENName:"Medusa"});
        this.miniGameMap.add("blackjack-eu",            {GameId: 12, CNName:"欧式二十一点", ENName:"European Blackjack"});
        this.miniGameMap.add("blackjack-us",            {GameId: 11, CNName:"美式二十一点", ENName:"American Blackjack"});
        this.miniGameMap.add("plushie-frenzy",          {GameId: 25, CNName:"抓抓乐", ENName:"Plushie Frenzy"});
        this.miniGameMap.add("wizdom-wonders",          {GameId: 17, CNName:"巫师之书", ENName:"Wizdom Wonders"});
        this.miniGameMap.add("gem-saviour",             {GameId: 2, CNName:"宝石侠", ENName:"Gem Saviour"});
        this.miniGameMap.add("hood-wolf",               {GameId: 18, CNName:"逆袭的小红帽", ENName:"Hood vs Wolf"});
        this.miniGameMap.add("hotpot",                  {GameId: 28, CNName:"麻辣火锅", ENName:"Hotpot"});
        this.miniGameMap.add("dragon-legend",           {GameId: 29, CNName:"鱼跃龙门", ENName:"Dragon Legend"});
        this.miniGameMap.add("mr-hallow-win",           {GameId: 35, CNName:"万胜狂欢夜", ENName:"Mr. Hallow-Win"});
        this.miniGameMap.add("legend-of-hou-yi",        {GameId: 34, CNName:"后羿射日", ENName:"Legend of Hou Yi"});
        this.miniGameMap.add("prosperity-lion",         {GameId: 36, CNName:"舞狮进宝", ENName:"Prosperity Lion"});
        this.miniGameMap.add("hip-hop-panda",           {GameId: 33, CNName:"嘻哈熊猫", ENName:"Hip Hop Panda"});
        this.miniGameMap.add("santas-gift-rush",        {GameId: 37, CNName:"圣诞欢乐送", ENName:"Santa's Gift Rush"});
        this.miniGameMap.add("baccarat-deluxe",         {GameId: 31, CNName:"至尊百家乐", ENName:"Baccarat Deluxe"});
        //21 - 40
        this.miniGameMap.add("gem-saviour-sword",       {GameId: 38, CNName:"宝石侠-大宝剑", ENName:"Gem Saviour Sword"});
        this.miniGameMap.add("piggy-gold",              {GameId: 39, CNName:"金猪报财", ENName:"Piggy Gold"});
        this.miniGameMap.add("symbols-of-egypt",        {GameId: 41, CNName:"埃及寻宝", ENName:"Symbols of Egypt"});
        this.miniGameMap.add("emperors-favour",         {GameId: 44, CNName:"皇上吉祥", ENName:"Emperor's Favour"});
        this.miniGameMap.add("ganesha-gold",            {GameId: 42, CNName:"象财神", ENName:"Ganesha Gold"});
        this.miniGameMap.add("three-monkeys",           {GameId: 43, CNName:"三只猴子", ENName:"Three Monkeys"});
        this.miniGameMap.add("jungle-delight",          {GameId: 40, CNName:"水果丛林", ENName:"Jungle Delight"});
        this.miniGameMap.add("double-fortune",          {GameId: 48, CNName:"双囍临门", ENName:"Double Fortune"});
        this.miniGameMap.add("the-great-icescape",      {GameId: 53, CNName:"冰雪大冲关", ENName:"The Great Icescape"});
        this.miniGameMap.add("journey-to-the-wealth",   {GameId: 50, CNName:"嘻游记", ENName:"Journey to the Wealth"});
        this.miniGameMap.add("captains-bounty",         {GameId: 54, CNName:"赏金船长", ENName:"Captain's Bounty"});
        this.miniGameMap.add("leprechaun-riches",       {GameId: 60, CNName:"爱尔兰精灵", ENName:"Leprechaun Riches"});
        this.miniGameMap.add("flirting-scholar",        {GameId: 61, CNName:"唐伯虎点秋香", ENName:"Flirting Scholar"});
        this.miniGameMap.add("ninja-vs-samurai",        {GameId: 59, CNName:"忍者vs武侍", ENName:"Ninja vs Samurai"});
        this.miniGameMap.add("muay-thai-champion",      {GameId: 64, CNName:"拳霸", ENName:"Muay Thai Champion"});
        this.miniGameMap.add("dragon-tiger-luck",       {GameId: 63, CNName:"龙虎争霸", ENName:"Dragon Tiger Luck"});
        this.miniGameMap.add("mahjong-ways",            {GameId: 65, CNName:"麻将胡了", ENName:"Mahjong Ways"});
        this.miniGameMap.add("dragon-hatch",            {GameId: 57, CNName:"寻龙探宝", ENName:"Dragon Hatch"});
        this.miniGameMap.add("fortune-mouse",           {GameId: 68, CNName:"鼠鼠福福", ENName:"Fortune Mouse"});
        this.miniGameMap.add("reel-love",               {GameId: 20, CNName:"亲爱的", ENName:"Reel Love"});
        //41 - 60
        this.miniGameMap.add("gem-saviour-conquest",    {GameId: 62, CNName:"宝石侠 - 宝藏征途", ENName:"Gem Saviour Conquest"});
        this.miniGameMap.add("shaolin-soccer",          {GameId: 67, CNName:"少林足球", ENName:"Shaolin Soccer"});
        this.miniGameMap.add("cai-shen-wins",           {GameId: 71, CNName:"赢财神", ENName:"Caishen Wins"});
        this.miniGameMap.add("candy-burst",             {GameId: 70, CNName:"糖果连连爆", ENName:"Candy Burst"});
        this.miniGameMap.add("bikini-paradise",         {GameId: 69, CNName:"比基尼天堂", ENName:"Bikini Paradise"});
        this.miniGameMap.add("mahjong-ways2",           {GameId: 74, CNName:"麻将胡了2", ENName:"Mahjong Ways 2"});
        this.miniGameMap.add("egypts-book-mystery",     {GameId: 73, CNName:"埃及探秘宝典", ENName:"Egypt's Book of Mystery"});
        this.miniGameMap.add("ganesha-fortune",         {GameId: 75, CNName:"福运象财神", ENName:"Ganesha Fortune"});
        this.miniGameMap.add("phoenix-rises",           {GameId: 82, CNName:"凤凰传奇", ENName:"Phoenix Rises"});
        this.miniGameMap.add("dreams-of-macau",         {GameId: 79, CNName:"澳门壕梦", ENName:"Dreams of Macau"});
        this.miniGameMap.add("wild-fireworks",          {GameId: 83, CNName:"火树赢花", ENName:"Wild Fireworks"});
        this.miniGameMap.add("genies-wishes",           {GameId: 85, CNName:"阿拉丁神灯", ENName:"Genie's 3 Wishes"});
        this.miniGameMap.add("treasures-aztec",         {GameId: 87, CNName:"寻宝黄金城", ENName:"Treasures of Aztec"});
        this.miniGameMap.add("circus-delight",          {GameId: 80, CNName:"欢乐嘉年华", ENName:"Circus Delight"});
        this.miniGameMap.add("thai-river",              {GameId: 92, CNName:"水上泰神奇", ENName:"Thai River Wonders"});
        this.miniGameMap.add("sct-cleopatra",           {GameId: 90, CNName:"艳后之谜", ENName:"Secrets of Cleopatra"});
        this.miniGameMap.add("vampires-charm",          {GameId: 58, CNName:"德古拉女爵", ENName:"Vampire's Charm"});
        this.miniGameMap.add("queen-bounty",            {GameId: 84, CNName:"赏金女王", ENName:"Queen of Bounty"});
        this.miniGameMap.add("jewels-prosper",          {GameId: 88, CNName:"金玉满堂", ENName:"Jewels of Prosperity"});
        this.miniGameMap.add("lucky-neko",              {GameId: 89, CNName:"招财喵", ENName:"Lucky Neko"});
        //61 - 75
        this.miniGameMap.add("jack-frosts",             {GameId: 97, CNName:"冰锋奇侠", ENName:"Jack Frost's Winter"});
        this.miniGameMap.add("galactic-gems",           {GameId: 86, CNName:"星旅淘金", ENName:"Galactic Gems"});
        this.miniGameMap.add("gdn-ice-fire",            {GameId: 91, CNName:"冰火双娇", ENName:"Guardians of Ice and Fire"});
        this.miniGameMap.add("opera-dynasty",           {GameId: 93, CNName:"新国粹", ENName:"Opera Dynasty"});
        this.miniGameMap.add("fortune-ox",              {GameId: 98, CNName:"十倍金牛", ENName:"Fortune Ox"});
        this.miniGameMap.add("bali-vacation",           {GameId: 94, CNName:"巴厘之旅", ENName:"Bali Vacation"});
        this.miniGameMap.add("crypto-gold",             {GameId: 103, CNName:"比特淘金", ENName:"Crypto Gold"});
        this.miniGameMap.add("majestic-ts",             {GameId: 95, CNName:"宝石传奇", ENName:"Majestic Treasures"});
        this.miniGameMap.add("candy-bonanza",           {GameId: 100, CNName:"糖心风暴", ENName:"Candy Bonanza"});
        this.miniGameMap.add("wild-bandito",            {GameId: 104, CNName:"亡灵大盗", ENName:"Wild Bandito"});
        this.miniGameMap.add("ways-of-qilin",           {GameId: 106, CNName:"麒麟送宝", ENName:"Ways of the Qilin"});
        this.miniGameMap.add("heist-stakes",            {GameId: 105, CNName:"霹雳神偷", ENName:"Heist  Stakes"});
        this.miniGameMap.add("rise-of-apollo",          {GameId: 101, CNName:"太阳神传说", ENName:"Rise of Apollo"});
        this.miniGameMap.add("sushi-oishi",             {GameId: 109, CNName:"寿司之道", ENName:"Sushi Oishi"});
        this.miniGameMap.add("jurassic-kdm",            {GameId: 110, CNName:"恐龙帝国", ENName:"Jurassic Kingdom"});
    }


    //获取电子小游戏总大小
    public getElectMiniGameSize(): number {
        return this.miniGameMap.length;
    }

    /**
     * 判断目前是否有这个小游戏
     * @param gameCode,小游戏code 
     */
    public ishaveGame(gameCode: string): boolean {
        return this.miniGameMap.has(gameCode);
    }

    /**
     * 获取小游戏信息
     * @param gameCode 
     */
    public getElectGameInfoByGamecode(gameCode: string): {}{
        return this.miniGameMap.get(gameCode);
    }


      /**
     * 获取小游戏信息  根据游戏的GameID
     * @param gameID 
     */
    public getElectGameInfoByGameID(gameID: number):MiniGameInfo{
        
        for(let index = 0; index < this.miniGameMap.length; index++){
            let data = this.miniGameMap.getValueByIndex(index);
            if(data != null){
                let gameInfo:MiniGameInfo = data.value;
                if(gameInfo.GameId === gameID){  //根据GameID获取信息
                    return gameInfo;
                }
            }
        }
        return null;
    }

    /*
    * 获取支持的游戏列表信息
    *gameIDs: 需要获取信息的GameIDs列表
    *bGetSupport： true 获取支持的的游戏  false：获取不支持的阿信息
    */
    public getElectGameSupport(gameIDs:number[], bGetSupport:boolean = true): MiniGameInfo[]{
        
        let gameInfoArray:MiniGameInfo[] = [];
        for(let index = 0; index < this.miniGameMap.length; index++){
            let data = this.miniGameMap.getValueByIndex(index);
            if(data != null){
                let gameInfo:MiniGameInfo = data.value;
                let haveGame = false;
                for(let i = 0; i < gameIDs.length; i++){
                    if(gameInfo.GameId == gameIDs[i]){
                        haveGame = true;
                        break;
                    }
                }

                if(bGetSupport){
                    //添加支持的
                    if(haveGame){
                        gameInfoArray.push(gameInfo);
                    }
                }else{
                    //添加不支持的
                    if(!haveGame){
                        gameInfoArray.push(gameInfo);
                    }
                }
            }
        }
        return gameInfoArray;
    }
   


    public static getInstance(): MiniGameConfigs {
        if (!MiniGameConfigs._g_instence) {
            MiniGameConfigs._g_instence = new MiniGameConfigs();
            MiniGameConfigs._g_instence.init();
        }
        return MiniGameConfigs._g_instence;
    }

}


