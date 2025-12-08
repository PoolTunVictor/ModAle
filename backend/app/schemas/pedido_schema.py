from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class DetallePedidoSchema(BaseModel):
    id_producto: int
    cantidad: int
    precio_unitario: float

class PedidoSchema(BaseModel):
    id_pedido: Optional[int]
    id_usuario: Optional[int]   # lo inyectamos en el service
    id_direccion: int
    total: float
    fecha: Optional[datetime]
    estado: str
    detalles: Optional[List[DetallePedidoSchema]] = []   # 👈 AQUI ACEPTAMOS DETALLES

    class Config:
        orm_mode = True
