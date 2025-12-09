from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .base_controller import get_db
from ..models.usuarios import Usuario
from ..schemas.usuario_schema import RegisterRequest, UsuarioResponse, LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ============================
#        REGISTER
# ============================
@router.post("/register", response_model=UsuarioResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    # Verificar si usuario ya existe
    existe = (
        db.query(Usuario)
        .filter(
            (Usuario.email == data.email) |
            (Usuario.username == data.username)
        )
        .first()
    )

    if existe:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    hashed_password = pwd_context.hash(data.password)

    nuevo = Usuario(
        nombre=data.nombre,
        email=data.email,
        username=data.username,
        telefono=data.telefono,
        contraseña_hash=hashed_password,
        rol="cliente"
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


# ============================
#        LOGIN
# ============================
@router.post("/login")
def login_user(data: LoginRequest, db: Session = Depends(get_db)):

    user = (
        db.query(Usuario)
        .filter(
            (Usuario.username == data.email_or_username) |
            (Usuario.email == data.email_or_username)
        )
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not pwd_context.verify(data.password, user.contraseña_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "token": str(user.id_usuario),
        "user": {
            "id_usuario": user.id_usuario,
            "nombre": user.nombre,
            "username": user.username,
            "email": user.email,
            "rol": user.rol,
            "telefono": user.telefono
        }
    }
