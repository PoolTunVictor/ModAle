from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..models.direccion import Direccion
from .base_service import BaseService

class DireccionService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Direccion, db)
    
    def crear_direccion(self, data: dict):
        """
        Crear una nueva dirección.
        data debe contener: colonia, referencia (opcional), id_localidad
        """
        nueva_direccion = Direccion(
            colonia=data.colonia,
            referencia=data.referencia,
            id_localidad=data.id_localidad
        )

        self.db.add(nueva_direccion)
        self.db.commit()
        self.db.refresh(nueva_direccion)
        return nueva_direccion
    
    def get_direcciones_por_localidad(self, id_localidad: int):
        """
        Obtener todas las direcciones asociadas a una localidad.
        """
        direcciones = self.db.query(Direccion).filter(Direccion.id_localidad == id_localidad).all()
        if not direcciones:
            raise HTTPException(status_code=404, detail="No se encontraron direcciones para esta localidad")
        return direcciones
