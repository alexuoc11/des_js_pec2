function onlyEven(array) {
  return array.filter(x => x % 2 === 0);
}

function onlyOneWord(array) {
  return array.filter(x => !x.includes(' '));
}

function positiveRowsOnly(array) {
  return array.filter((x, _, a) => {
    return a.length === x.filter(n => n > 0).length;
  });
}

function allSameVowels(array) {
  return array.filter(x => {;
     let vowels = x.match(/[aeiou]/gi);
     return vowels.length === vowels.filter((v, _, a) => a[0] === v).length;
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
