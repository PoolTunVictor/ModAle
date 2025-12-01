from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from ..services.usuario_service import UsuarioService
from ..models.usuarios import Usuario
from ..controllers.base_controller import get_db
from pydantic import BaseModel

class RegisterRequest(BaseModel):
    nombre: str
    username: str
    email: str
    telefono: str | None = None
    password: str

class LoginRequest(BaseModel):
    email_or_username: str
    password: str

router = APIRouter()

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    service = UsuarioService(db)
    usuario = service.registrar(
        nombre=request.nombre,
        email=request.email,
        username=request.username,
        telefono=request.telefono,
        password=request.password
    )
    return {"message": "Usuario registrado correctamente", "user": usuario.id_usuario}

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    service = UsuarioService(db)
    usuario = service.login(request.email_or_username, request.password)
    return {"message": "Login exitoso", "user": usuario.id_usuario}
