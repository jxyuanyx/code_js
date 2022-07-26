export enum LudoFristPlayTaskStep{
    STEP1=1,
    STEP2,
    STEP3,
    STEP4,
    STEP5,
    STEP6
}

export const LudoFristPlayTask = {
    name: '第一次进游戏引导进入房间',
    debug: true,
    autorun: false,
    steps: [
        {
            id:LudoFristPlayTaskStep.STEP1,
            desc: '指引位置：列2-行2',
            command: { 
                cmd: 'finger', 
                args: 'guideZone',
                tip:'Move cards by <color=#FFD141>clicking or dragging</color>.<br />The 7 "Tableau Stacks" take cards of alternating colors in descreasing order (K to A).',
                clickRect:null
            },
            delayTime: 0.5,
        },
        {
            id:LudoFristPlayTaskStep.STEP2,
            desc: '指引位置：列1-行1',
            command: { 
                cmd: 'finger', 
                args: 'guideZone',
                tip:'Foundation stacks take cards of the same suit in increasing order (A to K)',
                clickRect:null
            },
            delayTime: 0.5,
        },
        {
            id:LudoFristPlayTaskStep.STEP3,
            desc: '指引位置：列3-行3',
            command: { 
                cmd: 'finger', 
                args: 'guideZone',
                tip:'Only kings may be placed on empty slots.',
                clickRect:null
            },
            delayTime: 0.5,
        },
        {
            id:LudoFristPlayTaskStep.STEP4,
            desc: '指引位置：随机牌堆',
            command: { 
                cmd: 'finger', 
                args: 'auto_btn_getCard',
            },
            delayTime: 0.5,
        },
        {
            id:LudoFristPlayTaskStep.STEP5,
            desc: '指引位置：随机牌堆2',
            command: { 
                cmd: 'finger', 
                args: 'dealCard3'
            },
            delayTime:0.7,
        }
    ]
}