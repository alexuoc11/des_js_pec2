const { animals, prices, hours, employees} = require("./data");

function entryCalculator(entrants) {
  if (arguments.length === 0 || Object.keys(entrants).length === 0) return 0; 
  
  return Object.entries(entrants).map(x => prices[x[0]] * x[1]).reduce((prev,curr) => prev + curr);
}

function schedule(dayName) {
  //Soy consciente que esto esta mal, me he dado cuenta al acabar la practica.
  const allSchedules = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED'
  };

  if (arguments.length === 0) return allSchedules;
    
  return Object.fromEntries(Object.entries(allSchedules).filter(x => x[0] == dayName));
}

function animalCount(species) {
  if (arguments.length === 0){
    const allAnimals = [];
    const res = {};

    animals.map(x => {
      res[x.name] = x.residents.length;
    });

    return res;
  }else{
    return animals.filter(x => x.name == species)[0].residents.length;
  }
}

function animalMap(options) {
  //NO ARGUMENTS
  if (arguments.length === 0 || (arguments.length > 0 && !options.hasOwnProperty('includeNames')) ){
    res = {};
    animals.map(x => {
      if(res[x.location] == undefined || res[x.location].length === 0)  res[x.location] = [x.name];
      else res[x.location].push(x.name);
    });
    return res;
  } //INCLUDE NAMES ON OPTIONS
  else if(options.hasOwnProperty('includeNames') && options.includeNames){
    res = {};
    animals.map(x => {
      //Este if esta porque no se como hacer un push dentro de una key que aun no existe.
      //Seguro que hay una forma mucho más sencilla de hacerlo.
      if(res[x.location] == undefined || res[x.location].length === 0){
        let aux = {};
        if (options.hasOwnProperty('sex')){
          aux[x.name] = x.residents.filter(x => x.sex == options.sex).map(x => x.name);
        }else aux[x.name] = x.residents.map(x => x.name);

        res[x.location] = [aux];
      } else {
        let aux = {};
        if (options.hasOwnProperty('sex')){
          aux[x.name] = x.residents.filter(x => x.sex == options.sex).map(x => x.name);
        }else aux[x.name] = x.residents.map(x => x.name);
  
        res[x.location].push(aux);
      };
    });
    aux = {};
    return res;
  }
}

function animalPopularity(rating) {
  let res = {};
  if (arguments.length === 0) {
    animals.map(x => {
      if(res[x.popularity] == undefined || res[x.popularity].length === 0){
        res[x.popularity] = [x.name];
      }else{
        res[x.popularity].push(x.name);
      }
    });
    return res;
  }else if (rating > 0){
    return animals.filter(x => x.popularity == rating).map(x => x.name);
  }
}

function animalsByIds(ids) {
  if (arguments.length === 0) {
    return [];
  }else if(typeof(ids) == 'string'){
    return animals.filter(x => x.id == ids);
  }else if(ids.length > 1){
    return animals.filter(x => ids.includes(x.id));
  }
}

function animalByName(animalName) {
  if (arguments.length === 0) {
    return {};
  } else {
    let res = {};
    animals.filter(x => {
      res = x.residents.filter(x => x.name == animalName)[0];
      if (res != undefined) res['species'] = x.name;
    });
    return res;
  }
}

function employeesByIds(ids) {
  if (arguments.length === 0) {
    return [];
  }else if (typeof(ids) == 'string'){
    return employees.filter(x => x.id == ids);
  }else if(ids.length > 1){
    return employees.filter(x => ids.includes(x.id));
  }
}

function employeeByName(employeeName) {
  if (arguments.length === 0) {
    return {};
  }else if(typeof(employeeName) == 'string'){
    return employees.filter(x => x.firstName == employeeName || x.lastName == employeeName)[0];
  }
}

function managersForEmployee(idOrName) {
  if (idOrName.length > 15){
    let a = employeesByIds(idOrName)[0];
    a.managers = a.managers.map(x => {
      let res = employeesByIds(x)[0];
      return res.firstName + ' ' + res.lastName;
    });
    return a;
  }else{
    let a = employeeByName(idOrName);
    a.managers = a.managers.map(x => {
      let res = employeesByIds(x)[0];
      return res.firstName + ' ' + res.lastName;
    });
    return a;
  }
}

function employeeCoverage(idOrName) {
  let employee = {};
  let res = {};

  if (arguments.length === 0) {
    employees.map(x => {
      let completeName = x.firstName + ' ' + x.lastName;
      res[completeName] = [];
      x.responsibleFor.map(t => {
        let b = animals.filter(a => a.id == t);
        b.map(r => {
          res[completeName].push(r.name);
        });
      });
    });
    return res;
  }else{
    if(idOrName.length > 15)  employee = employeesByIds(idOrName)[0];
    else employee = employeeByName(idOrName);

    let completeName = employee.firstName + ' ' + employee.lastName;
    res[completeName] = [];
    employee.responsibleFor.map(t => {
      let b = animals.filter(a => a.id == t);
      b.map(r => {
        res[completeName].push(r.name);
      });
    });
    return res;
  }
}
employeeCoverage();

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};