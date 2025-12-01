from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..models.detalle_pedido import DetallePedido
from .base_service import BaseService

class DetallePedidoService(BaseService):
    def __init__(self, db: Session):
        super().__init__(DetallePedido, db)

    def crear_detalle(self, data: dict):
        """
        Crea un detalle de pedido.
        data debe contener:
        - id_pedido
        - id_producto
        - cantidad
        - precio_unitario
        """
        nuevo_detalle = DetallePedido(
            id_pedido=data['id_pedido'],
            id_producto=data['id_producto'],
            cantidad=data['cantidad'],
            precio_unitario=data['precio_unitario']
        )
        self.db.add(nuevo_detalle)
        self.db.commit()
        self.db.refresh(nuevo_detalle)
        return nuevo_detalle

    def get_detalles_por_pedido(self, id_pedido: int):
        detalles = self.db.query(DetallePedido).filter(DetallePedido.id_pedido == id_pedido).all()
        if not detalles:
            raise HTTPException(status_code=404, detail="No se encontraron detalles para este pedido")
        return detalles
