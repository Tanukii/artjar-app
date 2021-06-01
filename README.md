# ArtjarApp

App principal de ArtJar para uso del cliente

Componente del Registro/Login
-----------------------------

    Ambos formularios se condensan en un unico componente, tienen la capacidad de que dependiendo de la
    respuesta del servidor informar de algun error o problema en la peticion mediante iconos 
    y en el caso del formulario de registro texto adicional para informar de si el Nombre de Usuario
    escogido ya esta en uso.

    La variable de registro recibida como respuesta a estos formularios es recogida por "LogSign.service"
    quien se encarga de cargarla en multiples Subjects dependiendo si se trata de informacion estatica
    o dinamica que requiera de un Observable para accederla. Tambien contiene informacion de si hay
    un usuario con sesion iniciada