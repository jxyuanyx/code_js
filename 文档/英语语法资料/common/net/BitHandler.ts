import cv from "./../../components/lobby/cv"

export class BitHandler {

    /*
    *将数据逆转
    *比如将： “101001” 变成 "100101"
    *value 要交换的数据
    *bitLen: 交换的位数
    */
   static reverse_bits(value:number, bitLen:number){
        let uiValue = 0;
        for(let i=0;i<bitLen;i++)
        {
            uiValue = (uiValue << 1)+(value & 0x01);
            value = value >> 1;
        }    
        return uiValue;
    }

    /*
    *将32位以内的数据相邻两个位数进行交换
    *比如将： “101001” 变成 "010110"
    */
    static swapoddeven_32bits(value:number){
        return (((value & 0xaaaaaaaa) >>> 1) | ((value & 0x55555555) << 1));
    }
    
    /*
    *将16位以内的数据相邻两个位数进行交换 
    *比如将： “101001” 变成 "010110"
    */
    static swapoddeven_16bits(value:number){
        return (((value & 0xaaaa) >>> 1) | ((value & 0x5555) << 1))
    }

    /*
    *将8位以内的数据相邻两个位数进行交换 
    *比如将： “101001” 变成 "010110"
    */
    static swapoddeven_8bits(value:number){
        return (((value & 0xaa) >>> 1) | ((value & 0x55) << 1))
    }

    /*
    *取字节的个高几位
    *data: 被读取的数据
    *bitSize: 被数据的总位数  8 or 16 or 32
    *readLen: 读取的位数
    */
    static readLeftBitFromByte(data:number, bitSize: number, readLen:number):number{
        return data >>> (bitSize - readLen);
    }

    /*
    *取字节的低几位
    *data: 被读取的数据
    *bitSize: 被数据的总位数  8 or 16 or 32
    *readLen: 读取的位数
    */
    static readRightBitFromByte(data:number,  bitSize: number, readLen:number):number{
        let _bitV = 0xff;
        if(bitSize == 8){
            _bitV = 0xff;
        }else if(bitSize == 16){
            _bitV = 0xffff;
        }else if(bitSize == 32){
            _bitV = 0xffffffff;
        }
        let  mv = (_bitV >>> (bitSize - readLen));
        return data&mv;
    }

    /*
    *取字节的的中间几位
    *data: 被读取的数据
    *bitSize: 被数据的总位数  8 or 16 or 32
    *startIndex: 读取的开始位数
    *endIndex：被读取数据的结束位数
    */
    static getReadMidNumFromByte(data:number, bitSize: number, startIndex:number, endIndex:number):number{
        let _data = this.readLeftBitFromByte(data, bitSize, endIndex);//先取高几位
        let _read = this.readRightBitFromByte(_data,  bitSize, endIndex - startIndex);//再取低几位
        return _read;
    }

    /*
    * 连接合并两个二进制  比如:"1011" "0101"  合并后为 “1011 0101”
    *bin1: 二进制1
    *bin2: 二进制2
    *bin2BitSize: 二进制bin2的位数 比如："0100” “1011” 都为4位  
    */
    static  concatBinaryNumber(bin1:number, bin2:number, bin2BitSize:number){
        return (bin1 << bin2BitSize)|bin2;
    }


        
    static RunTestFunc(){
        
        let  data = 3481132477;
        console.log("###################current data :" + data);
        console.log("###################current data :" + data.toString(2));
        
        let rd1 = this.readLeftBitFromByte(data, 32, 3);
        console.log("###################current rd1 :" + rd1);
        console.log("###################current rd1 :" + rd1.toString(2));

        let rd2 = this.readRightBitFromByte(data, 32, 3);
        console.log("###################current rd2 :" + rd2);
        console.log("###################current rd2 :" + rd2.toString(2));


        let rd3 = this.getReadMidNumFromByte(data, 32, 4, 15);
        console.log("###################current rd3 :" + rd3);
        console.log("###################current rd3 :" + rd3.toString(2));
        
       /*
        let num1 = 3481132477;
        let num2 = 3014278315;
        console.log("###################current num1 :" + num1);
        console.log("###################current num1 :" + num1.toString(2));
        console.log("###################current num2 :" + num2);
        console.log("###################current num2 :" + num2.toString(2));

        let rd1 = this.readRightBitFromByte(num1, 32, 3);
        let rd2 = this.readLeftBitFromByte(num2, 32, 3);
        console.log("###################read num1 最后3位:" + rd1.toString(2));
        console.log("###################read num2 开始3位:" + rd2.toString(2));

        let _newNum = this.concatBinaryNumber(rd1, rd2, 3);
        console.log("###################read _newNum:" + _newNum);
        console.log("###################read _newNum:" + _newNum.toString(2));
        */

        // let rd3 = 34;
        // console.log("###################read rd3:" + rd3.toString(2));
        // let rd4 = this.reverse_bits(rd3, 8);
        // console.log("###################read rd4:" + rd4);
        // console.log("###################read rd4:" + rd4.toString(2));
    }
}