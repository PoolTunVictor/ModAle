from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.usuarios import Usuario
from .auth_service import AuthService

class UsuarioService:
    def __init__(self, db: Session):
        self.db = db

    def registrar(self, nombre: str, email: str, username: str, password: str, telefono: str = None, rol: str = "cliente"):
        existing = self.db.query(Usuario).filter(Usuario.email == email).first()
        if existing:
            raise HTTPException(status_code=400, detail="El correo ya está registrado")

        new_user = Usuario(
            nombre=nombre,
            email=email,
            username=username,
            telefono=telefono,
            rol=rol,
            contraseña_hash=AuthService.hash_password(password)
        )
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user

    def login(self, email_or_username: str, password: str):
        user = (
            self.db.query(Usuario)
            .filter((Usuario.email == email_or_username) | (Usuario.username == email_or_username))
            .first()
        )
        if not user:
            raise HTTPException(status_code=400, detail="Usuario no encontrado")

        if not AuthService.verify_password(password, user.contraseña_hash):
            raise HTTPException(status_code=400, detail="Contraseña incorrecta")

        return user
