Ecommerce tienda de instrumentos y accesorios musicales

Descripcion de las acciones que se pueden tomar:
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

Descripción de endpoints:
  Loguin
  * /api/login - Llega la iformacion del usuario, que primeramente es pasada por passport para filtrar el usuario por rol y si este existe.
                  Luego viene a este endpoint y si todo es correcto redirecciona a la vista de productos.
  * /api/current - Muestra en el navegador un json con los datos del  usuario que está logueado actualmente.
  * /api/register - Muestra un formulario donde se carga los datos de la creacion del usuario.
                    Estos datos son enviados a passport corroborando que no exista un usuario con ese email.
                    Si no existe usuari, se crea el carrito y seguarda toda la informacion en la base de datos.
                    Despues de eset proceso, redireccionamos a /api/login.
  * /api/forgot-password - Recibe un email al cual se le va a enviar un link que posee un token para recuperar la contraseña.
                            Luego de enviar el link, redireccinamos a /api/login.
  * /api/newPasswordControl - Recibe la nueva contraseña, corrobora que no sea igual a la anterior, si es así la guarda o no y redirecciona a /api/login.
                              Si el token del link esta vencido, que tiene como duracion 1 hora, redirecciona a una vista informando su vencimiento.

  Carrito
  * /api/carts/:cid  (get) - Trae todos los productos de un determinado carrito
  * /api/carts/:cid  (delete) - Elimina todos los productos de un carrito
  * /api/carts/:cid/product/:pid  (post) - Añade un producto determinado al carrito identificado con su id
  * /api/carts/:cid/product/:pid  (put) - Si agregando un producto que ya existe en el carrito, se suman las cantidades
  * /api/carts/:cid/product/:pid  (delete) - Elimina un producto determinado por su id del carrito
  * /api/contacto - renderiza la vista  de chat, este chat esta hecho con socket.io
  * /api/:cid/purchase - Separa entre productos con y sin stock, crea el ticket de la compra

  Nodemailer
  * /api/mail - Desde aquí se envía un email luego de finalizada una compra
  * /api/recoverPassword - Envía un email con el link para recuperar la contraseña
  * /api/deleteUsers - Envía un email al usuario que ha sido eliminado
  * /api/deleteProduct - Envía un email al usuario premium el cual era dueño de un producto que eliminó el Admin

  Payments
  * /api/payment-intents - Crea el intento de pago y redirecciona a una vista de Stripe para realizarlo
  * /api/succes - Si el pago fue realizado, desde aquí se accede /api/mail, también se eliminan los productos del carrito y se descuenta la cantidad del stock
  * /api/cancel - Si el pago fue cancelado, se elimina el ticket que fue creado en /api/:cid/purchase

  Products
  * /api/products (get) - Renderiza la vista principal con los productos y datos de logueo.
                          Es una ruta protegida, por lo que no se puede acceder sin loguearse.
  * /api/products (post) - En esta ruta se crea un nuevo producto, teniendo en cuenta que no se repita el codigo, si se repite no se crea el producto
  * /api/products/:pid (delete) - Desde aquí eliminamos un producto determinado.

  Users
  * /api/users/premium - Recibe del formulario nuevo rol. Actuliza el rol y genera una nueva cookie para actualizar los permisos
  * /api/users (get) - No da informacion de la inactividad de los usuarios
  * /api/users (delete) - En este endpoint podemos eliminar todos los usuarios que permanecieron inactivos por 2 o más días.
                          Los administradores son quienes puede hacer esta acción.
                          Luego de la eliminación, se envía un email informando de esto mediante /api/deleteUsers
  * /api/premium - Este endpoint sirve para actualizar el rol de un usuario. A esta acción la hace el Admin desde este endpoint.
