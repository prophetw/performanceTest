import AllData from './data'
import { CustomBtn } from './UIComponent'

const { guidStr, guidAryStr } = AllData // 1 million guid from real project 
const testFeatureGuidAry = JSON.parse(guidAryStr)

function createGuid(i) {
  const randomNum = Math.floor(999999 * Math.random());
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

new CustomBtn('sorted', () => {
  isSorted = !isSorted;
  console.log(' isSorted: ', isSorted);
})

new CustomBtn('realData1million', () => {
  // 真实数据
  guidArr = guidStr.split('|');
  featureAry = [];
  for (let i = 0; i < testFeatureGuidAry.length; i++) {
    featureAry.push(testFeatureGuidAry[i]);
  }

  if(isSorted) {
    featureAry.sort();
    guidArr.sort();
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
  for (let i = 0; i < 1014567; i++) {
    const guid = createGuid(i);
    guidArr.push(guid);
    if (Math.random() > 0.1) {
      featureAry.push(guid);
    }
  }


  if(isSorted) {
    featureAry.sort();
    guidArr.sort();
  }
  console.log('guidArr ', guidArr);
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

  console.time('reg exp test');
  let i = 0;
  while (i < featureLeng) {
    const feature = featureAry[i];
    const result = regExp.test(feature);
    i++;
  }
  console.timeEnd('reg exp test');
})


let map = new Map();

new CustomBtn('testMapSpeed', () => {
  if (!regExp) {
    console.error('please create guidArr and featureAry first');
    return;
  }
  const featureLeng = featureAry.length
  console.log(' map start totalLen searchLength ', guidArr.length, featureLeng);
  guidArr.forEach((guid) => {
    map.set(guid, "");
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
