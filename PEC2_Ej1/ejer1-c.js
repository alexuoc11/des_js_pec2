// El cambio más grande es que hemos creado una funcion asincrona que espera a 
// que la función findOne le devuelva un valor para poder continuar y mostrar los resultados.
async function doAll(){
    const findOne = (list, { key, value }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            const element = list.find(element => element[key] === value);
            element ? resolve(element) : reject('ERROR: Element Not Found');
            }, 2000);
        })
    };

    //Esperara a que la funcion findOne le devuelva una promesa y si hay un error lo recoge con el catch()
    console.log('Success');
    const result = await findOne (users, { key: 'name', value: 'Ana' })
    .then((element) => console.log(element))
    .catch((err) => console.log('ERROR: Element Not Found'));

    //Esperara a que la funcion findOne le devuelva una promesa y si hay un error lo recoge con el catch()
    console.log('Error');
    const result2 = await findOne (users, { key: 'name', value: 'Pepita' })
    .then((element) => console.log(element))
    .catch((err) => console.log('ERROR: Element Not Found'));
}

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

doAll();

/* Como podemos ver el codigo se ha vuelto secuencial ya que haremos las dos llamadas una detras de la otra esperando a las 
    Promesas que nos devuelve la función findOne. */

/*
findOne success
findOne error
//wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
