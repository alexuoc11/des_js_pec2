function sum(array) {
  return array.reduce((prev, curr) => prev + curr);
}

function productAll(array) {
  return array.reduce((prev, curr) => {
    return [prev.reduce((p,c) => p * c) * curr.reduce((p,c) => p * c)];
  });
}

function objectify(array) {
  return Object.fromEntries(array);
  //se que no es lo que se espera de este ejercicio, pero me parece lo mas eficiente.
}

function luckyNumbers(array) {
  return array.reduce((prev, curr, index) => {
    if (index == 0){
      return prev + curr;
    }
    return index === (array.length-1) ?  prev + ', and ' + curr : prev + ', ' + curr ;
  }, 'Your lucky numbers are: ');
}
//'Your lucky numbers are: 30, 48, 11, 5, and 32'

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
