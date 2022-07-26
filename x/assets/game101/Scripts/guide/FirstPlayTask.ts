export enum FristPlayTaskStep{
    STEP1,
    STEP2,
    STEP3,
    STEP4,
    STEP5,
    STEP6,
    STEP7,
    STEP8,
    STEP9,
    STEP10
}

export const FristPlayTask = {
    name: '第一次进游戏引导进入房间',
    debug: true,
    autorun: false,
    steps: [
        {
            id:FristPlayTaskStep.STEP1,
            desc: '指引位置：列4',
            command: { 
                cmd: 'finger', 
                args: 'guigroup3',
                tip:"<color=#9CFFCB>Tap a column to add a card.</color>",
                
                clickRect:null
            },
            hasAgent:true,
            delayTime: 0.2,
        },
        {
            id:FristPlayTaskStep.STEP2,
            desc: '指引位置：列2',
            command: {
                cmd: 'finger', 
                args: 'guigroup1',
                tip:'<color=#9CFFCB>Clear stacks by reaching<br /> 21 points in a column.</color>',
                
                clickRect:null
            },
            hasAgent:true,
            delayTime: 0.2,
        },
        {
            id:FristPlayTaskStep.STEP3,
            desc: '指引位置：暂存位',
            command: {
                cmd: 'finger', 
                args: 'guideZone2',
                tip:'<color=#9CFFCB>Card can be holded for <br />later use with limit times.</color>',
                
                clickRect:null
            },
            hasAgent:true,
            delayTime: 0.2,
        },
        {
            id:FristPlayTaskStep.STEP4,
            desc: '指引位置：列3',
            command: { 
                cmd: 'finger', 
                args: 'guigroup2',
                tip:'<color=#9CFFCB>Combine 21,5 cards bonuses<br /> for more points.</color>',
                
            },
            hasAgent:true,
            delayTime: 0.2,
        },
        {
            id:FristPlayTaskStep.STEP5,
            desc: '指引位置：列4',
            command: { 
                cmd: 'finger',
                args: 'guigroup3',
                tip:'',
                
            },
            hasAgent:true,
            delayTime:0.2,
        },
        {
            id:FristPlayTaskStep.STEP6,
            desc: '指引位置：暂存位',
            command: { 
                cmd: 'finger', 
                args: 'guideZone2',
                tip:"<color=#9CFFCB>It's time to use the hold card.</color>",
                
            },
            hasAgent:true,
            delayTime:0.2,
        },
        {
            id:FristPlayTaskStep.STEP7,
            desc: '指引位置：列4',
            command: { 
                cmd: 'finger', 
                args: 'guigroup3',
               
                tip:'',
            },
            hasAgent:true,
            delayTime:0.2,
        },
        {
            id:FristPlayTaskStep.STEP8,
            desc: '指引位置：列1',
            command: { 
                cmd: 'finger', 
                args: 'guigroup0',
                
                tip:'',
            },
            hasAgent:true,
            delayTime:0.2,
        },
        {
            id:FristPlayTaskStep.STEP9,
            desc: '指引位置：列1',
            command: { 
                cmd: 'finger', 
                args: 'guigroup0',
                tip:'<color=#9CFFCB>Black Jacks are wild.</color>',
                
            },
            hasAgent:true,
            delayTime:0.2,
        }
    ]
}