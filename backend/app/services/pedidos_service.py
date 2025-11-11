from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.pedido import Pedido
from ..models.detalle_pedido import DetallePedido
from .base_service import BaseService 


class PedidoService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Pedido, db)
        
    def get_pedidos_por_cliente(self, id_cliente: int):
        pedidos = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .filter(Pedido.id_cliente == id_cliente)
            .all()
        )

        if not pedidos:
            raise HTTPException(status_code=404, detail="El cliente no tiene pedidos registrados")
        return pedidos
    
    def get_pedidos_detalle(self):
        pedidos = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .all()
        )
        if not pedidos:
            raise HTTPException(status_code=404, detail="El cliente no tiene pedidos registrados")
        return pedidos
    
    def get_pedido_detalle_id(self, id_pedido: int):
        pedido = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .filter(Pedido.id_pedido == id_pedido).first()
        )
        if not pedido:
            raise HTTPException(status_code=404, detail="El cliente no tiene pedidos registrados")
        return pedido