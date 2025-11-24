from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..models.usuarios import Usuario
from .base_controller import BaseController

class UsuarioController(BaseController):
    def _init_(self):
        super()._init_(Usuario, "usuarios")

        # 🚀 Agregamos rutas extras que el BaseController NO tiene
@self.router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    service = UsuarioService(db)
    usuario = service.login(email, password)
    return {
        "id_usuario": usuario.id_usuario,
        "nombre": usuario.nombre,
        "email": usuario.email,
        "rol": usuario.rol
    }