function multiplyBy10(array) {
  return array.map(x => x * 10);
}

function shiftRight(array) {
  let b = [];
  array.map((element, index, a) => {
    b[(index + 1) % a.length] = element;
  });
  return b;
}

function onlyVowels(array) {
  return array.map(e => {
    return e.match('/[aeiou]/ig').join('');
  });
} 

function doubleMatrix(array) {
  return array.map((e) => {
    return e.map(x => x * 2);
  });
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
