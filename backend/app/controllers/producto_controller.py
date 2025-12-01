from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .base_controller import get_db
from ..models.producto import Producto
from .base_controller import BaseController
from ..services.productos_service import ProductosService


class ProductoController(BaseController):
    def __init__(self):
        super().__init__(Producto, "productos" )

        # Obtener productos por categoría
        @self.router.get("/categoria/{categoria}")
        def get_pedidos_cliente(categoria: str, db: Session = Depends(get_db)):
            service = ProductosService(db)
            return service.get_producto_por_categoria(categoria)

        # 🔥 Nuevo: descontar stock
        @self.router.put("/descontar/{id_producto}")
        def descontar_stock(id_producto: int, cantidad: int, db: Session = Depends(get_db)):
            service = ProductosService(db)

            try:
                producto = service.descontar_stock(id_producto, cantidad)
            except HTTPException as e:
                raise e

            return {
                "message": "Stock actualizado correctamente",
                "id_producto": id_producto,
                "nuevo_stock": producto.stock
            }
