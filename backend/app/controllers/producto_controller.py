from fastapi import Depends
from sqlalchemy.orm import Session
from .base_controller import get_db
from ..models.producto import Producto
from .base_controller import BaseController
from ..services.productos_service import ProductosService


class ProductoController(BaseController):
    def __init__(self):
        super().__init__(Producto, "productos")

        @self.router.get("/categoria/{categoria}")
        def get_pedidos_cliente(categoria: str, db: Session = Depends(get_db)):
            service = ProductosService(db)
            return service.get_producto_por_categoria(categoria)
        
        
       