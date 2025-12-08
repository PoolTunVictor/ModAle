from pydantic import BaseModel, EmailStr
from datetime import datetime

# Para recibir datos de registro
class RegisterRequest(BaseModel):
    nombre: str
    username: str
    email: EmailStr
    telefono: str | None = None
    password: str

# Para login
class LoginRequest(BaseModel):
    email_or_username: str
    password: str

# Para devolver usuario en respuesta
class UsuarioResponse(BaseModel):
    id_usuario: int
    nombre: str
    username: str
    email: EmailStr
    telefono: str | None = None
    rol: str
    fecha_registro: datetime

    class Config:
        orm_mode = True
