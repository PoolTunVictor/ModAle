from fastapi import Depends
from sqlalchemy.orm import Session
from ..models.movimiento_stock import MovimientoStock
from .base_controller import BaseController

class MovimientoStockController(BaseController):
    def __init__(self):
        super().__init__(MovimientoStock, "movimientos_stock")