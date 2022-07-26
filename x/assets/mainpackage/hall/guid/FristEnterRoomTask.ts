export enum FristEnterRoomStep{
    CLICKICON=1
}

export const FristEnterRoomTask = {
    name: '第一次进游戏引导进入房间',
    debug: true,
    autorun: false,
    steps: [
        {
            id:FristEnterRoomStep.CLICKICON,
            desc: '点击游戏图标',
            command: { cmd: 'finger', args: ' pageview > GamePageView > gamelist',offset:cc.v2(-230,280) },
            customTask:true,
            hasAgent:true,
            delayTime: 0.5
        },
        /*
        {
            desc: '比赛列表',
            command: { cmd: 'finger', args: ' pageview > MatchPageView > scrollview > view > content'},
            delayTime: 0.5,
        },

         /*

        {
            desc: '点击主界面设置按钮',
            command: { cmd: 'finger', args: 'Home > main_btns > btn_setting' },
        },

        {
            desc: '文本提示',
            command: { cmd: 'text', args: '点击主界面商店按钮' }
        },

        {
            desc: '点击主界面商店按钮',
            command: { cmd: 'finger', args: 'Home > main_btns > btn_shop' },
        },

        {
            desc: '文本提示',
            command: { cmd: 'text', args: '点击商店充值按钮' }
        },

        {
            desc: '点击商店充值按钮',
            command: { cmd: 'finger', args: 'Home > Shop > btnCharge' },
            onStart(callback) {
                setTimeout(() => {
                    callback();
                }, 1000);
            },

            onEnd(callback) {
                setTimeout(() => {
                    callback();
                }, 1000);
            },
        },

        {
            desc: '文本提示',
            command: { cmd: 'text', args: '点击充值界面关闭钮' }
        },

        {
            desc: '点击充值界面关闭钮',
            command: { cmd: 'finger', args: 'chargePanel > btn_close' },
            delayTime: 0.5
        },

        {
            desc: '回到主页',
            command: { cmd: 'finger', args: 'Home > main_btns > btn_home' },
        },*/
    ]
}