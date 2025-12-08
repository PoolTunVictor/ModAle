from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class DetallePedidoOut(BaseModel):
    id_detalle: int
    id_producto: int
    cantidad: int
    precio_unitario: float

    class Config:
        orm_mode = True
