from sqlalchemy.orm import Session
from ..models.usuarios import Usuario
from fastapi import HTTPException

class UsuarioService:
    def __init__(self, db: Session):
        self.db = db

    def login(self, email: str, password: str):
        usuario = self.db.query(Usuario).filter(Usuario.email == email).first()
        if not usuario:
            raise HTTPException(status_code=401, detail="Correo no encontrado")
        if usuario.contraseña_hash != password:
            raise HTTPException(status_code=401, detail="Contraseña incorrecta")
        return usuario
