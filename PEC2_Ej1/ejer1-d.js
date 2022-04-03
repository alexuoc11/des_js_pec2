// El cambio más grande es que ahora podremos realizar las dos llamadas a la vez mediante 
// el método Promise.all
async function doAll(){
    const findOne = (list, { key, value }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            const element = list.find(element => element[key] === value);
            element ? resolve(element) : reject('ERROR: Element Not Found');
            }, 2000);
        })
    };

    //Aqui se puede ver como utilizamos el método Promise.all, en este caso no habrá ningún problema
    //ya que podrá encontrar los dos valores en la lista.
    console.log('Success');
    const result = await Promise.all([findOne (users, { key: 'name', value: 'Ana' }), findOne (users, { key: 'name', value: 'Carlos' })])
    .then((element) => console.log(element))
    .catch((err) => console.log('ERROR: Element Not Found'));

    //Por lo contrario, aquí tendremos problemas ya que la persona 'Pepe' no figura en nuestra lista.
    //Cuando pasa esto, el método Promise.all terminara la ejecución y seguirá con el programa sin devolver nada más que el error.
    console.log('Error');
    const result2 = await Promise.all([findOne (users, { key: 'name', value: 'Ana' }), findOne (users, { key: 'name', value: 'Pepe' })])
    .then((element) => console.log(element))
    .catch((err) => console.log('ERROR: One Element Not Found'));
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

/*
findOne success
findOne error
//wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
