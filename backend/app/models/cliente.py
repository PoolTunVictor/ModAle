from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database.database import Base

class Cliente(Base):
    __tablename__ = "clientes"
    id_cliente =  Column(Integer, primary_key=True, index=True, autoincrement=True)  
    nombre = Column(String(100))
    apellido = Column(String(100))
    telefono = Column(String(20))
    direcciones = relationship("Direccion", back_populates="cliente")
    pedidos = relationship("Pedido", back_populates="cliente")
