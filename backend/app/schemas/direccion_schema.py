# app/schemas/direcciones_schema.py
from pydantic import BaseModel
from typing import Optional

class DireccionCreate(BaseModel):
    colonia: str
    referencia: Optional[str] = None
    id_localidad: int