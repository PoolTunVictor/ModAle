from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.producto import Producto
from .base_service import BaseService


class ProductosService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Producto, db)

    def get_producto_por_categoria(self, categoria: str):
        productos = (
            self.db.query(Producto)
            .filter(Producto.categoria == categoria)
            .all()
        )
        return productos

    # 🔥 NUEVO: descontar stock
    def descontar_stock(self, id_producto: int, cantidad: int):
        producto = (
            self.db.query(Producto)
            .filter(Producto.id_producto == id_producto)
            .first()
        )

        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        if producto.stock < cantidad:
            raise HTTPException(status_code=400, detail="Stock insuficiente")

        producto.stock -= cantidad
        self.db.commit()
        self.db.refresh(producto)

        return producto
