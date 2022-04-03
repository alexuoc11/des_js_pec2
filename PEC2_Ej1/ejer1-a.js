//Aqui tenemos la variable findOne, incorpora una función que tiene como parametros: una lista, una key y un value y por ultimo otras dos funciones.
const findOne = (list, { key, value }, { onSuccess, onError }) => {
    //Aqui vemos un timeout de 2000ms, es decir mientras ejecuta las acciones correspondientes si o si pasarán 2 segundos para que el programa pueda seguir.
    setTimeout(() => {
      //Aqui buscaremos dentro de la lista 'list' un valor para 'key' que sea igual a 'value'.
      const element = list.find(element => element[key] === value);
      //Aquí encontramos el callback ya que se ejecutará la funcion onSuccess o onError si se cumple una circunstancia especifica.
      //onSuccess se ejecutará si hemos encontrado el elemento correctamente y onError si no lo encontramos.
      element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });
    }, 2000);
  };

//Aqui vemos lo que harán las funciones onSuccess y onError.
//onSuccess mostrará por consola el output `user: Nombre`.
const onSuccess = ({ name }) => console.log(`user: ${name}`);
//onError mostrara el mensaje 'ERROR: Element Not Found' por consola.
const onError = ({ msg }) => console.log(msg);

//Esta será la lista que pasaremos por parametro a la primera función comentada. 
//Como vemos tiene dos keys 'name' y 'rol'.
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

//Hacemos un console log de findOne
console.log('findOne success');
//llamamos a la función antes comentada con los parametros que requiere, en este caso sera onSuccess ya que el nombre 'Carlos' esta en la lista.
findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });

//Mostramos por consola findOne error
console.log('findOne error');
//llamamos a la función antes comentada con los parametros que requiere, en este caso sera onError ya que el nombre 'Fermin' no esta en la lista.
findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });

/* Ahora veremos el orden de ejecución de nuestro programa: 
   Primero se mostrarán los dos console.log ya que no hemos indicado que el segundo console.log espere al resultado de la primera llamada a la función findOne.
   Después de los dos segundos de timeout que contiene la función findOne, se mostrará el resultado de las dos funciones.
*/

/*
findOne success
findOne error
//wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
  