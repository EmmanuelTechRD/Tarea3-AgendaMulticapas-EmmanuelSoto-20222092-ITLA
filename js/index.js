let url = 'https://www.raydelto.org/agenda.php';

function obtenerlistaContactos() {
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        let body = ""
        for (var i = 0; i < data.length; i++) {
            body += `<tr><td>${data[i].nombre}</td><td>${data[i].apellido}</td><td>${data[i].telefono}</td></tr>`
        }
        document.getElementById('data').innerHTML = body
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addContactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        const nuevoContacto = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(nuevoContacto)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Tu contacto ha sido guardado exitosamente.');

                fetch(url)
                    .then(response => response.json())
                    .then(data => mostrarData(data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.error('Ha sucedido un error, no hemos podido guardar tu contacto:', error));

        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';
    });
});