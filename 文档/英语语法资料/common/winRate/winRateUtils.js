import cv from "./../../components/lobby/cv"

const valCacheIdx = [1e12, 1e11, 1e10, 1e9, 1e8, 1e7, 1e6, 1e5, 1e4, 1000, 100, 10, 1]; // 值缓存key，累加的点位

// 拷贝新数组
var arrCopy = arr => arr.slice(0)
// 取数组中最大的值
var arrMax = arr => Math.max(...arr)

// 创建值为0的数组 例: [0,0,0]
function arrZero(n) {
  // 提升性能，常用的 判断创建
  if (n === 4) {
      return [0, 0, 0, 0]
  } else if (n === 9) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0];
  } else if (n === 13) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  } else {
      return Array(n).fill(0)
  }
}

function toPercent (n) {
    n = Number(n) * 100
    n = n.toFixed(2)
    return n + '%'
  }
  
  function randomPick (n, m) {
    if (Math.abs(parseInt(n)) !== n || Math.abs(parseInt(m)) !== m || n < m || n === 0 || m === 0) {
      console.log('randomPick的参数为两个正整数，且前者不能小于后者！')
      return
    }
    var result = []
    while (true) {
      var r = Math.floor(Math.random() * n)
      if (result.indexOf(r) === -1) {
        result.push(r)
      }
      if (result.length === m) {
        return result
      }
    }
  }
  
  // 去除部分牌
  function arrayWithout(arr, deletes) {
    let dMap = {}
    for (let i = 0; i < deletes.length; i++) {
        dMap[deletes[i].join("_")] = true
    }
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!dMap[arr[i].join("_")]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
  
  function myConcat (arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i].join('_'))
    }
    return result
  }
  
  // 计算牌的组合数量
  function combNumber (x, y) {
    var a = 1
    var b = 1
    for (var i = y; i > 0; i--) {
      a *= x
      x -= 1
      b *= i
    }
    return a / b
  }
  
  // 从 arr 中选出 num 张牌的组合方式
  function combination (arr, num) {
    var r = [];
    (function f (t, a, n) {
      if (n === 0) {
        return r.push(t)
      }
      for (var i = 0, l = a.length; i <= l - n; i++) {
        f(t.concat(a[i]), a.slice(i + 1), n - 1)
      }
    })([], arr, num)
    return r
  }
  
  function arrayMultiply (a1, a2) {
    var result = []
    for (var i = 0; i < a1.length; i++) {
      for (var j = 0; j < a2.length; j++) {
        result.push([a1[i], a2[j]])
      }
    }
    return result
  }
  

  //初始化长牌
  function arrayize(arr) {
      let mySuits = arrZero(4);
      let myValues = arrZero(13);
      for (let i = 0; i < arr.length; i++) {
          mySuits[arr[i][0]]++
          myValues[14 - arr[i][1]]++
      }
      return [mySuits, myValues]
  }

  //初始化短牌
  function arrayize_short(arr) {
    let mySuits = arrZero(4);
    let myValues = arrZero(9);
    for (let i = 0; i < arr.length; i++) {
        mySuits[arr[i][0]]++
        myValues[14 - arr[i][1]]++
    }

    return [mySuits, myValues]
}
  

 function getIndex(arr0, arr1) {
     let total = 0
     for (let i = 0; i < arr1.length; i++) {
         total += arr1[i] * valCacheIdx[i];
     }
     // 判断数组最大值是不是5 (判断是否是同花)
     if (arrMax(arr0) === 5) {
         total += 1e13
     }
     return total + "";
 }

  var cvCache = {}, cvCacheLen = 0;
  let getCardsValue = (function () {
      function getCardsValue(arr , gameMode) {
          if(gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){
            //短牌
            arr = arrayize_short(arr)
          }else{
            //长牌
            arr = arrayize(arr)
          }
        
          let index = getIndex(arr[0], arr[1])
          let cached = cvCache[index]
          if (cached) {
              return cached
          }
          let value = detect(arr, gameMode)[1]
          cvCache[index] = value
          cvCacheLen++
          return value
      }

      return getCardsValue
  })()

 // 超过缓存阈值就清空重置,防止缓存对象过大
  function clearCache(RANDOM_TIMES){
    if (cvCacheLen > RANDOM_TIMES * 5) {
        console.log("clearCache:clear calc cache now.");
        cvCache = {};
        cvCacheLen = 0;
    }
  }
  
  
var winRateUtils = /** @class */ (function () {

  function winRateUtils() {
  }
  winRateUtils.prototype.arrayWithout = arrayWithout;
  winRateUtils.prototype.combination = combination;
  winRateUtils.prototype.arrayMultiply = arrayMultiply;
  winRateUtils.prototype.getCardsValue = getCardsValue;
  winRateUtils.prototype.randomPick = randomPick;
  winRateUtils.prototype.myConcat = myConcat;
  winRateUtils.prototype.combNumber = combNumber;
  winRateUtils.prototype.arrCopy = arrCopy;
  winRateUtils.prototype.arrMax = arrMax;
  winRateUtils.prototype.clearCache = clearCache;
  winRateUtils.prototype.arrZero = arrZero;
  winRateUtils.prototype.toPercent = toPercent;
  return winRateUtils;
}());


window.winRateUtils = winRateUtils;
exports.winRateUtils = winRateUtils;
exports.default = winRateUtils;