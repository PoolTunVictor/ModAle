from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..models.direccion import Direccion
from .base_service import BaseService

class DireccionService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Direccion, db)
    
    def crear_direccion(self, data: dict):
        nueva_direccion = Direccion(
            colonia=data['colonia'],
            lugar=data['lugar'],
            referencia=data.get('referencia', ''),
            id_usuario=data['id_usuario']
        )
        self.db.add(nueva_direccion)
        self.db.commit()
        self.db.refresh(nueva_direccion)
        return nueva_direccion
    
    def get_direcciones_por_usuario(self, id_usuario: int):
        direcciones = self.db.query(Direccion).filter(Direccion.id_usuario == id_usuario).all()
        if not direcciones:
            raise HTTPException(status_code=404, detail="No se encontraron direcciones")
        return direcciones
