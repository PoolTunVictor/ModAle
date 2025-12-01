from fastapi import APIRouter
from passlib.context import CryptContext

router = APIRouter(
    prefix="/utils",
    tags=["Utils"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/generar-hash/{password}")
def generar_hash(password: str):
    """
    Genera un hash bcrypt para cualquier contraseña.
    """
    hashed = pwd_context.hash(password)
    return {"hash": hashed}
