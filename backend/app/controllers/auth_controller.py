from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..models.Usuario import Usuario  # Asegúrate de que existe tu modelo

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(email: str, password: str, db: Session = get_db()):
    user = db.query(Usuario).filter(Usuario.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Correo no encontrado")

    # Como dijiste: NO usar bcrypt (usuarios demo)
    if user.password != password:
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    return {
        "message": "Login exitoso",
        "user": {
            "id": user.id,
            "nombre": user.nombre,
            "email": user.email,
            "rol": user.rol
        }
    }