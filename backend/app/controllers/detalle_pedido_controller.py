from fastapi import Depends
from sqlalchemy.orm import Session
from ..models.detalle_pedido import DetallePedido
from .base_controller import BaseController

class DetallePedidoController(BaseController):
    def __init__(self):
        super().__init__(DetallePedido, "detalles_pedido")