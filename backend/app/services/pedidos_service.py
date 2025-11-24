from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.pedido import Pedido
from ..models.detalle_pedido import DetallePedido
from .base_service import BaseService 

class PedidoService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Pedido, db)
        
    # Obtener pedidos por usuario (antes cliente)
    def get_pedidos_por_usuario(self, id_usuario: int):
        pedidos = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .filter(Pedido.id_usuario == id_usuario)
            .all()
        )

        if not pedidos:
            raise HTTPException(status_code=404, detail="El usuario no tiene pedidos registrados")
        return pedidos
    
    # Obtener todos los pedidos con detalle
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
            raise HTTPException(status_code=404, detail="No hay pedidos registrados")
        return pedidos
    
    # Obtener detalle de un pedido por ID
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
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        return pedido
