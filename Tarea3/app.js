const API_URL = 'http://www.raydelto.org/agenda.php';

// Función para cargar contactos
function cargarContactos() {
  fetch(API_URL)
    .then(response => response.json())
    .then(contactos => {
      const tbody = document.querySelector('#contactosTable tbody');
      tbody.innerHTML = ''; // Limpiar tabla
      contactos.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${c.nombre}</td>
          <td>${c.apellido}</td>
          <td>${c.telefono}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => console.error('Error al cargar contactos:', error));
}

// Función para agregar un nuevo contacto
function agregarContacto(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !apellido || !telefono) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const nuevo = { nombre, apellido, telefono };

fetch(API_URL, {
  method: 'POST',
  body: JSON.stringify(nuevo) 
})
.then(res => {
  if (res.ok) {
    alert('Contacto agregado correctamente');
    document.getElementById('contactForm').reset();
    cargarContactos();
  } else {
    alert('Error al agregar contacto');
  }
})
.catch(err => console.error('Error en POST:', err));

}


document.getElementById('contactForm').addEventListener('submit', agregarContacto);


cargarContactos();
