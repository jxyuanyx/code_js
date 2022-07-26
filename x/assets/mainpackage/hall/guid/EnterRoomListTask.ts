export enum EnterRoomListTaskStep{
    CLICKLIST=101
}

export const EnterRoomListTask = {
    name: '引导点击房间列表',
    debug: true,
    autorun: false,
    steps: [
        {
            id:EnterRoomListTaskStep.CLICKLIST,
            desc: '点击游戏房间列表',
            command: { cmd: 'finger', args: ' pageview > MatchPageView > scrollview > view > content >  guideNode',offset:cc.v2(235,5)},
            hasAgent:true,
            delayTime: 0.5
        },
    ]
}