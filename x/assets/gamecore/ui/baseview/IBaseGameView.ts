export interface IBaseGameView{
    /**
     * 初始化座位
     * @param seatCount 座位数量
     * @param seatView  座位view
     * @param seatPos   坐标值
     */
    createSeatViews(seatCount:number,seatPos:cc.Vec2[],zIndex:number);

    /**
     * 重置桌子
     */
    resetTable();

    /**
     * 设置桌子信息
     * @param tableInfo
     */
    setTableInfo(tableInfo:any);


    /**
     * 发牌到指定的位置
     * @param seat
     * @param card
     * @param show
     */
    dealCardToSeat(seat:number,cardView:cc.Node|cc.Prefab,show?:boolean);

    /**
     *玩家设置手牌
     * @param cardView
     * @param cards
     */
    setSelfHandCards(cardView:cc.Node|cc.Prefab,cards:number[]);

    /**
     * 用户坐下
     * @param info
     */
    onUserSit(clientId:number,info: any): void

}
