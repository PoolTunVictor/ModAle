from fastapi import Depends
from sqlalchemy.orm import Session
from ..models.direccion import Direccion
from .base_controller import BaseController

class DireccionController(BaseController):
    def __init__(self):
        super().__init__(Direccion, "direcciones")