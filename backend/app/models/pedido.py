from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, DateTime, Enum
from sqlalchemy.orm import relationship
from ..database.database import Base
from datetime import datetime
import enum

class EstadoPedido(enum.Enum):
    pendiente = "pendiente"
    enviado = "enviado"
    entregado = "entregado"

class Pedido(Base):
    __tablename__ = "pedidos"
    id_pedido = Column(Integer, primary_key=True, index=True, autoincrement=True)  
    id_cliente = Column(Integer, ForeignKey("clientes.id_cliente"))
    id_direccion = Column(Integer, ForeignKey("direcciones.id_direccion"))
    fecha = Column(DateTime, default=datetime.utcnow)
    total = Column(DECIMAL(10, 2))
    estado = Column(Enum(EstadoPedido))

    cliente = relationship("Cliente", back_populates="pedidos")
    direccion = relationship("Direccion", back_populates="pedidos")
    detalles = relationship("DetallePedido", back_populates="pedido")
