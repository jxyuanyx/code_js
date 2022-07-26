export default class Game100Helper {
    
    static getLogicType(data:number){
        return (data>>4)-1;
    }

    static getLogicValue(data:number){
        return data&0xf;
    }
}