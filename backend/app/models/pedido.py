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
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    id_direccion = Column(Integer, ForeignKey("direcciones.id_direccion"), nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)
    total = Column(DECIMAL(10, 2))
    estado=EstadoPedido.pendiente 

    # Relación con Usuario en lugar de Cliente
    usuario = relationship("Usuario", back_populates="pedidos")
    direccion = relationship("Direccion", back_populates="pedidos")
    detalles = relationship("DetallePedido", back_populates="pedido")
