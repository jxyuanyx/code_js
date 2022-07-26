export enum ClickWinTipTaskStep{
    CLICK=102
}

export const ClickWinTipTask = {
    name: '引导赢钱提示',
    debug: true,
    autorun: false,
    steps: [
        {
            id:ClickWinTipTaskStep.CLICK,
            desc: '点击游戏房间列表',
            command: { cmd: 'finger', args: ' pageview > MatchPageView > scrollview > view > content >  guideNode',offset:cc.v2(235,5)},
            hasAgent:true,
            delayTime: 0.5
        },
    ]
}