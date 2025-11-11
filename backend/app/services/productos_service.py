from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.producto import Producto
from .base_service import BaseService 


class ProductosService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Producto, db)
        
    def get_producto_por_categoria(self, categoria: str):
        productos = (
            self.db.query(Producto).filter(Producto.categoria == categoria).all()
        )

        return productos
    
   