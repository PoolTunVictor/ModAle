from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database.database import Base

class Localidad(Base):
    __tablename__ = "localidades"
    id_localidad = Column("id_localidades",Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), unique=True, nullable=False)

    direcciones = relationship("Direccion", back_populates="localidad")
