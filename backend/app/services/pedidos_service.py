from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.pedido import Pedido, EstadoPedido
from ..models.detalle_pedido import DetallePedido
from .base_service import BaseService
from datetime import datetime

class PedidoService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Pedido, db)

    # =====================================================
    #   GETS (los de antes los dejo igual)
    # =====================================================
    def get_pedidos_por_usuario(self, id_usuario: int):
        return (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .filter(Pedido.id_usuario == id_usuario)
            .order_by(Pedido.fecha.desc())
            .all()
        )
    
    def get_pedido_por_id(self, id_pedido: int):
        pedido = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion),
                joinedload(Pedido.usuario)
            )
            .filter(Pedido.id_pedido == id_pedido)
            .first()
        )
        if not pedido:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        return pedido


    def get_pedidos_detalle(self):
        return (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion)
            )
            .order_by(Pedido.fecha.desc())
            .all()
        )

    # =====================================================
    #   CREAR PEDIDO + DETALLES (ACTUALIZADO)
    # =====================================================
    def crear_pedido(self, data: dict, id_usuario: int):

        if "detalles" not in data or not isinstance(data["detalles"], list):
            raise HTTPException(400, "El pedido debe incluir lista de detalles")

        try:
            # 1️⃣ Crear pedido
            pedido = Pedido(
                id_usuario=id_usuario,
                id_direccion=data["id_direccion"],
                total=data["total"],
                fecha=datetime.now(),
                estado=EstadoPedido.pendiente
            )

            self.db.add(pedido)
            self.db.flush()  # ✔ Necesario para obtener id_pedido ANTES del commit

            # 2️⃣ Crear detalles del pedido
            for d in data["detalles"]:
                detalle = DetallePedido(
                    id_pedido=pedido.id_pedido,
                    id_producto=d["id_producto"],
                    cantidad=d["cantidad"],
                    precio_unitario=d["precio_unitario"],
                )
                self.db.add(detalle)

            # 3️⃣ Confirmar cambios
            self.db.commit()
            self.db.refresh(pedido)

            return {
                "message": "Pedido y detalles creados correctamente",
                "id_pedido": pedido.id_pedido
            }

        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=500,
                detail=f"Error al crear pedido con detalles: {e}"
            )
        
        
