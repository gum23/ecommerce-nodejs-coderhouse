Ecommerce tienda de instrumentos y accesorios musicales

En esta api backend se pueden reslizar diversas acciones:
  - Crear un usuario: Teniendo la posibilidad de crearlo ingresando datos o mediante logueo por github
  - Nos podemos loguear y recuperar la contraseña en caso de haber perdido la misma
      * El recupero de contraseña se hace mediante email, donde se envia un link que posee un token que expirará en untiempo
      * Pasado el tiempo de vida del token, se deberá volver a recuperar la contraseña
  - Una vez logueado, se listan los productos, esta es la vista principal donde podemos:
      * filtrar los productos por categorias, disponibilidad, paginas, cantidad de productos que deseamos ver
      * Se puede acceder al chat
      * Se puede cambiar nuestro rol
      * Podemos ver la vista de nuestro carrito, donde se listan los productos que ingresamos en el
      * Solo los usuarios pueden ver tanto la vista de carrito como la de cambio de rol
      * Como pasa con el admin que solo el ve la lista de usuarios
  - El carrito posee los productos ingresados, si continuamos con la compra se genera un ticket
      * El ticket se guarda en la base de datos
      * Si terminamos la compra, es decir, se hace el pago, el carrito se vacía y se envia un mail confirmando la compra y el pago
      * Si el pago se cancela, los productos permaneceran en el carrito y el ticket se eliminará
      * Para realizar el pago se sale de la api para entrar en stripe y así terminar con el mismo

  
