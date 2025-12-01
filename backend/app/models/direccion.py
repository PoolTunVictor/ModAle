from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from ..database.database import Base

class Direccion(Base):
    __tablename__ = "direcciones"
    id_direccion = Column(Integer, primary_key=True, index=True, autoincrement=True)  
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    colonia = Column(String(100))
    lugar = Column(String(100))
    referencia = Column(Text)
    link_maps = Column(String(500))

    # Relación apuntando a Usuario en lugar de Cliente
    usuario = relationship("Usuario", back_populates="direcciones")
    pedidos = relationship("Pedido", back_populates="direccion")
