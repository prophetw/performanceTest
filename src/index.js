import AllData from './data'
import { CustomBtn } from './UIComponent'

const { guidStr, guidAryStr } = AllData // 1 million guid from real project 
const testFeatureGuidAry = JSON.parse(guidAryStr)

function removePrefix0 (str){
  // input is   000e84   output is e84 
  return str.replace(/^0+/, '')  
}

function createGuid(i) {
  const randomNum = Math.floor(1011947 * Math.random());
  const str = randomNum.toString(16);
  const len = str.length;
  if (len < 6) {
    const zero = new Array(6 - len).fill('0').join('');
    return zero + str;
  }
  return str;
}

// 生成 1000 个 guid 数组

let featureAry;
let guidArr;
let regExp;
let isSorted = false;
let isRemovePrefix = false;
let map = new Map();

new CustomBtn('sorted', () => {
  isSorted = !isSorted;
  console.log(' isSorted: ', isSorted);
})

new CustomBtn('removePrefix0', () => {
  isRemovePrefix = !isRemovePrefix;
  console.log(' isRemovePrefix: ', isRemovePrefix);
})

new CustomBtn('realData1million', () => {
  // realData
  // 1007359
  // 1011947
  // real data
  guidArr = guidStr.split('|');

  // random data
  // guidArr = []
  // let count1 = 1007359;
  // let count2 = 1011947;
  // for (let i = 0; i < count1 ; i++) {
  //   const guid = createGuid(i);
  //   guidArr.push(guid);
  // }


  featureAry = [];
  map.clear()

  for (let i = 0; i < testFeatureGuidAry.length; i++) {
    featureAry.push(testFeatureGuidAry[i]);
  }

  if(isSorted) {
    // featureAry.sort();
    guidArr.sort();
  }

  if(isRemovePrefix){
    featureAry = featureAry.map(removePrefix0)
    guidArr = guidArr.map(removePrefix0)
  }

  console.log('regExp', guidArr);
  console.log(' search for ', featureAry);

  const guidStr2 = guidArr.join('|');
  // const guidStr2Exp = "((regExp('"+guidStr2+"').test(${guid})))";
  regExp = new RegExp(guidStr2);
  console.log(' featureAry length ', featureAry.length);

})

new CustomBtn('randomData1', () => {
  // random 1 million 
  featureAry = [];
  guidArr = []
  map.clear()

  // let count1 = 1007359;
  // let count2 = 1011947;

  let count1 = 100000;
  let count2 = 100000;


  for (let i = 0; i < count1 ; i++) {
    const guid = createGuid(i);
    guidArr.push(guid);
  }
  for (let i=0; i<count2; i++) {
    const guid = createGuid(i);
    featureAry.push(guid);
  }

  if(isSorted) {
    featureAry.sort();
    guidArr.sort();
  }

  if(isRemovePrefix){
    featureAry = featureAry.map(removePrefix0)
    guidArr = guidArr.map(removePrefix0)
  }

  console.log('guidArr ', guidArr);
  console.log('testAry ', featureAry);
  // const set = new Set(guidArr);
  // console.log('guidArr length ', guidArr.length);
  // console.log(' uniq guid is ', set.size)
  // console.log(' uniqguid/allguid percent', set.size / guidArr.length);

  const guidStr2 = guidArr.join('|');
  // const guidStr2Exp = "((regExp('"+guidStr2+"').test(${guid})))";
  regExp = new RegExp(guidStr2);
  console.log(' featureAry length ', featureAry.length);
})

new CustomBtn('testRegExpTestSpeed', () => {
  if (!regExp) {
    console.error('please create guidArr and featureAry first');
    return;
  }
  const featureLeng = featureAry.length
  console.log(' map start totalLen searchLength ', guidArr.length, featureLeng);

  let i = 0;
  console.time('reg exp test');
  while (i < featureLeng) {
    const feature = featureAry[i];
    const result = regExp.test(feature);
    i++;
  }
  console.timeEnd('reg exp test');
})



new CustomBtn('testMapSpeed', () => {
  if (!regExp) {
    console.error('please create guidArr and featureAry first');
    return;
  }
  const featureLeng = featureAry.length
  console.log(' map start totalLen searchLength ', guidArr.length, featureLeng);
  guidArr.forEach((guid) => {
    map.set(guid, 1);
  })
  let i = 0;
  console.time('map get');
  while (i < featureLeng) {
    const feature = featureAry[i];
    const result = map.get(feature);
    i++;
  }
  console.timeEnd('map get');
})

new CustomBtn('testStrIndexOfSpeed', () => {
  if (!regExp) {
    console.error('please create guidArr and featureAry first');
    return;
  }
  const featureLeng = featureAry.length
  console.log(' map start totalLen searchLength ', guidArr.length, featureLeng);
  const totalStr = guidArr.join('|');
  let i = 0;
  let lastIdx = 0;
  console.time('map get');
  while (i < featureLeng) {
    const feature = featureAry[i];
    // if(lastIdx > -1) {
    //   lastIdx = totalStr.indexOf(feature, lastIdx);
    //   if(lastIdx > -1){
    //     continue;
    //   }
    // }
    lastIdx = totalStr.indexOf(feature);
    i++;
  }
  console.timeEnd('map get');
})
