from fastapi import Depends
from sqlalchemy.orm import Session
from ..models.direccion import Direccion
from .base_controller import BaseController
from ..services.direccion_service import DireccionService

class DireccionController(BaseController):
    def __init__(self):
        super().__init__(Direccion, "direcciones")
    def crear(self, db: Session, data: dict):

        service = DireccionService(db)
        return service.crear_direccion(data)