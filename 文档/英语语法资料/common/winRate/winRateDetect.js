import cv from "./../../components/lobby/cv"

(function () {
    
  
    // 取数组中最大的值
    let arrMax = arr => Math.max(...arr);


    // 判断是否是同花
    function detectTonghua(suits) {
      for (let i = 0; i < suits.length; i++) {
          if (suits[i] === 5) {
              return true
          }
      }
      return false
    }
  
    // 判断是否是单牌
    function detectAllSingle(values) {
      for (let i = 0; i < values.length; i++) {
          if (values[i] > 1) {
              return false
          }
      }
      return true
    }
  
    function detectGaopai (suits, values) {
      if (!detectTonghua(suits) && !detectShunzi(values) && !detectAShunzi(values)) {
        for (var i = 0; i < values.length; i++) {
          if (values[i] > 1) {
            return false
          }
        }
        return true
      }
      return false
    }
  
    // 判断是否是顺子 (不包括A顺)
    function detectShunzi(values) {
      for (let i = 0; i < values.length - 4; i++) {
          if (values[i] === 1 && values[i + 1] === 1 && values[i + 2] === 1 && values[i + 3] === 1 && values[i + 4] === 1) {
              return true;
          }
      }
      return false;
  }
  
    // 最小的顺子判断 (A顺)
    function detectAShunzi(values) { // 最小的顺子 A,2,3,4,5
      let len = values.length
      return values[len - 4] === 1 && values[len - 3] === 1 && values[len - 2] === 1 && values[len - 1] === 1 && values[0] === 1
  }
  
    // 判断四条
    function detectSitiao(values) {
      return arrMax(values) === 4;
  }
  
    // 判断葫芦
    function detectHulu(values) {
      let maxNum = arrMax(values)
      if (maxNum === 3) {
          let valuesCopy = values.slice(0)
          valuesCopy[valuesCopy.indexOf(maxNum)] = 0
          if (arrMax(valuesCopy) === 2) {
              return true
          }
      }
      return false
  }
  
    // 是否是三条
    function detectSantiao(values) {
        let maxNum = arrMax(values)
        if (maxNum === 3) {
            let valuesCopy = values.slice(0)
            valuesCopy[valuesCopy.indexOf(maxNum)] = 0;
            if (arrMax(valuesCopy) < 2) {
                return true
            }
        }
        return false
    }
  
    // 是否是2对
    function detectLiangdui(values) {
      let maxNum = arrMax(values)
      if (maxNum === 2) {
          let valuesCopy = values.slice(0)
          valuesCopy[valuesCopy.indexOf(maxNum)] = 0
          if (arrMax(valuesCopy) === 2) {
              return true
          }
      }
      return false
  }
  
    // 是否是1对
    function detectDuizi(values) {
      let maxNum = arrMax(values)
      if (maxNum === 2) {
          let valuesCopy = values.slice(0)
          valuesCopy[valuesCopy.indexOf(maxNum)] = 0
          if (arrMax(valuesCopy) < 2) {
              return true
          }
      }
      return false
  }
  
    function detect (arr, gameMode) { // 判断牌型为levels[i]
      var high = 0 // 初始值为高牌
      var arrValue = arr[1].join('')
      var myArrValue = parseInt(arrValue) // 默认为高牌
  
      function toNum (i) {
        return 12 - parseInt(arr[1].indexOf(i))
      }
  
      // if (detectGaopai(arr[0], arr[1])) { // 高牌，可比
      if (detectAllSingle(arr[1]) && !detectTonghua(arr[0]) && !detectShunzi(arr[1]) && !detectAShunzi(arr[1])) {
        return [high, myArrValue]
      } else if (detectDuizi(arr[1])) { // 对子，不可比
        high = 1
        myArrValue = high * 1e13 + toNum(2) * 1e11 + parseInt(arrValue) / 100
      } else if (detectLiangdui(arr[1])) { // 两对，不可比
        high = 2
        var arrCopy = arr[1].slice(0)
        arrCopy[arrCopy.indexOf(1)] = 0
        myArrValue = high * 1e13 + parseInt(arrCopy.join('')) + (toNum(1) / 100)
      } else if (detectSantiao(arr[1])) { // 三条，不可比
        high = 3
        myArrValue = high * 1e13 + toNum(3) * 1e11 + parseInt(arrValue) / 100
      } else if (detectTonghua(arr[0])) { // 同花, 同类可直接比大小
        if (detectShunzi(arr[1])) {
          high = 8
          myArrValue = high * 1e13 + parseInt(arrValue)
        } else if (detectAShunzi(arr[1])) {
          high = 8
          myArrValue = high * 1e13
        } else {
          if(gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){ //短牌花比葫芦大 ，长牌葫芦比花大
            high = 6;
          }else{
            high = 5;
          }
    
          myArrValue = high * 1e13 + parseInt(arrValue)
        }
      } else if (detectShunzi(arr[1])) { // 顺子，可比
        high = 4
        myArrValue = high * 1e13 + parseInt(arrValue)
      } else if (detectAShunzi(arr[1])) { // A,2,3,4,5
        high = 4
        myArrValue = high * 1e13
      } else if (detectHulu(arr[1])) { // 葫芦，不可比
  
        if(gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){  //短牌花比葫芦大 ，长牌葫芦比花大
          high = 5;
        }else{
          high = 6;
        }
        myArrValue = high * 1e13 + toNum(3) * 100 + toNum(2)
      } else if (detectSitiao(arr[1])) { // 四条，不可比
        high = 7
        myArrValue = high * 1e13 + toNum(4) * 100 + toNum(1)
      }
  
      return [high, myArrValue]
    }
  
    window.detect = detect
  })()
  