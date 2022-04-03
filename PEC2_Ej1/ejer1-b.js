const findOne = (list, { key, value }, { onSuccess, onError }) => {
    //Esta linea será la mayor diferencia en el ejercicio. Como podemos ver aqui devolveremos una promesa.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const element = list.find(element => element[key] === value);
        //Si logramos encontrar el elemento en la lista devolveremos la función resolve() de la promise y podremos continuar con el .then()
        //Por lo contrario, si no lo encontramos, usaremos la funcion reject() que devolvera un error que cogeremos con el .catch()
        element ? resolve(element) : reject('ERROR: Element Not Found');
        }, 2000);
    })
  };
  
  const users = [
    {
      name: 'Carlos',
      rol: 'Teacher'
    },
    {
      name: 'Ana',
      rol: 'Boss'
    }
  ];
  
  //Primero haremos la prueba con un elemento que SI esta en la lista.
  console.log('findOne success');
  findOne(users, { key: 'name', value: 'Ana' }, { onSuccess, onError })
  //Si todo va bien dentro del .then() mostraremos por consola el resultado.
  .then((element) => console.log(element))
  //Si no va bien, mostraremos el error por consola.
  .catch((err) => console.log(err));
  
  //Aquí haremos lo mismo pero esta vez mostraremos el error.
  console.log('findOne error');
  findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError })
  .then((element) => onSuccess(element))
  .catch((err) => onError({ msg: err }));

  /* Podemos ver que el output no ha cambiado, sigue sin ser un codigo secuencial ya que se ejecutará la accion correcta y la incorrecta a la vez. */
  
  /*
  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found
  */
  