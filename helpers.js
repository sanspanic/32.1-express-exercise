//convert request query nums=1,2,3,4,5,5 to array of strings
function makeArray(req) {
  return req.query.nums.split(",");
}

//convert to nums and validate nums
function convertValidate(arrOfStrings) {
  let numsArray = [];

  for (let i = 0; i < arrOfStrings.length; i++) {
    let num = Number(arrOfStrings[i]);

    if (Number.isNaN(num)) {
      return new Error(
        `The value you entered at index ${i} of ${arrOfStrings[i]} is not a valid number`
      );
    }

    numsArray.push(num);
  }
  return numsArray;
}

//calc mean
function mean(arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

//calc mode
function mode(arr) {
  let count = {};
  for (let num of arr) {
    if (!count[num]) {
      count[num] = 1;
    } else {
      count[num] += 1;
    }
  }
  const max = Math.max(...Object.values(count));
  //mode doesn't exist if max frequency is 1
  if (max === 1) {
    return null;
  }
  //collect multiple modes or return single mode
  let arrOfModes = [];
  for (const key in count) {
    console.log(key, count[key]);
    if (count[key] === max) {
      arrOfModes.push(key);
    }
  }
  if (arrOfModes.length === 1) {
    return arrOfModes[0];
  } else return arrOfModes;
}

//calc median
function median(arr) {
  let ascArr = arr.sort((a, b) => a - b);
  if (arr.length % 2 === 1) {
    let medianIndex = (arr.length - 1) / 2;
    return ascArr[medianIndex];
  } else {
    let arrOfMedians = [];
    let arrOfIndices = [arr.length / 2, (arr.length - 2) / 2];
    for (let indx of arrOfIndices) {
      arrOfMedians.push(ascArr[indx]);
    }
    return (arrOfMedians[0] + arrOfMedians[1]) / 2;
  }
}

module.exports = {
  median,
  mode,
  mean,
  convertValidate,
  makeArray,
};
