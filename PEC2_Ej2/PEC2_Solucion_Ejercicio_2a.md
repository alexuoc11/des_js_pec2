## Ejercicio 2 A

**¿Por qué el valor de this es undefined?**
Esto es debido a que en la línea de código siguiente:
“this.view.bindAddTodo(this.service.addTodo);”
Llamamos a la variable this.service que desde la clase view no existe, ya que se instancia desde la clase Controller. Por lo tanto no podremos acceder a esta función desde la clase View y se la pasaremos como parámetro.