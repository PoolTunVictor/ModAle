document.addEventListener('DOMContentLoaded', () => {
     const form = document.getElementById('comentariosForm');
     const lista = document.getElementById('comentariosDinamicos');
   
     form.addEventListener('submit', (e) => {
       e.preventDefault();
   
       const nombre = document.getElementById('nombre').value.trim();
       const mensaje = document.getElementById('mensaje').value.trim();
   
       if (nombre && mensaje) {
         const nuevoComentario = document.createElement('div');
         nuevoComentario.classList.add('comentario-card');
   
         nuevoComentario.innerHTML = `
           <h4>${nombre}</h4>
           <p>${mensaje}</p>
         `;
   
         // Añadir el comentario con animación y mismo estilo
         lista.appendChild(nuevoComentario);
   
         form.reset();
       }
     });
   });
   