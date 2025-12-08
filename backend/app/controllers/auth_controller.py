from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ..models.usuarios import Usuario
from .base_controller import get_db
from passlib.context import CryptContext

router = APIRouter(tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ============================================================
#   OBTENER USUARIO ACTUAL DESDE EL TOKEN
# ============================================================
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(status_code=401, detail="Token no proporcionado")

    try:
        user_id = int(token)
    except:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(Usuario).filter(Usuario.id_usuario == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return user


# ============================================================
#   LOGIN CON email **o** username
# ============================================================
@router.post("/auth/login")
def login(data: dict, db: Session = Depends(get_db)):

    email_or_username = data.get("email_or_username")
    password = data.get("password")

    if not email_or_username or not password:
        raise HTTPException(status_code=400, detail="Faltan credenciales")

    # Buscar por username o email
    user = (
        db.query(Usuario)
        .filter(
            (Usuario.username == email_or_username) |
            (Usuario.email == email_or_username)
        )
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Verificar contraseña HASH
    if not pwd_context.verify(password, user.contraseña_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # TOKEN = id_usuario
    return {
        "token": str(user.id_usuario),
        "user": {
            "id_usuario": user.id_usuario,
            "nombre": user.nombre,
            "username": user.username,
            "email": user.email,
            "rol": user.rol
        }
    }
