from fastapi import Depends
from sqlalchemy.orm import Session
from ..models.cliente import Cliente
from .base_controller import BaseController

class ClienteController(BaseController):
    def __init__(self):
        super().__init__(Cliente, "clientes")