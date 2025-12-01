from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from ..database.database import Base

class Direccion(Base):
    __tablename__ = "direcciones"  # <- necesario
    id_direccion = Column(Integer, primary_key=True, index=True, autoincrement=True)
    colonia = Column(String(100), nullable=False)
    referencia = Column(Text)
    id_localidad = Column(Integer, ForeignKey("localidades.id_localidades"), nullable=False)

    # Relaciones
    localidad = relationship("Localidad", back_populates="direcciones")  # Relación bidireccional
    pedidos = relationship("Pedido", back_populates="direccion")
