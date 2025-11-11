from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Enum
from sqlalchemy.orm import relationship
from ..database.database import Base
from datetime import datetime
import enum

class TipoMovimiento(enum.Enum):
    entrada = "entrada"
    salida = "salida"

class MovimientoStock(Base):
    __tablename__ = "movimientos_stock"
    id_movimiento =  Column(Integer, primary_key=True, index=True, autoincrement=True)  
    id_producto = Column(Integer, ForeignKey("productos.id_producto"))
    tipo = Column(Enum(TipoMovimiento))
    cantidad = Column(Integer)
    motivo = Column(String(150))
    fecha = Column(DateTime, default=datetime.utcnow)

    producto = relationship("Producto", back_populates="movimientos")
