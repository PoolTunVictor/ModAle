from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    telefono = Column(String(20), nullable=True)
    email = Column(String(150), unique=True, nullable=False)
    username = Column(String(100), unique=True, nullable=True)
    contraseña_hash = Column(String(255), nullable=False)
    rol = Column(String(20), nullable=False, default="cliente")
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    direcciones = relationship("Direccion", back_populates="usuario")
    pedidos = relationship("Pedido", back_populates="usuario")
