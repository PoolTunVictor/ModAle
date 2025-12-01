from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..services.usuario_service import UsuarioService
from ..schemas.usuario_schema import RegisterRequest, LoginRequest, UsuarioResponse
from .base_controller import get_db

# Crear el router que luego se importa en main.py
router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# Endpoint para registrar usuarios
@router.post("/register", response_model=UsuarioResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    service = UsuarioService(db)
    try:
        user = service.registrar(
            nombre=data.nombre,
            email=data.email,
            username=data.username,
            password=data.password,
            telefono=data.telefono
        )
        return user
    except HTTPException as e:
        raise e

# Endpoint para login
@router.post("/login", response_model=UsuarioResponse)
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    service = UsuarioService(db)
    try:
        user = service.login(data.email_or_username, data.password)
        return user
    except HTTPException as e:
        raise e
