from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.pedido import Pedido
from ..models.detalle_pedido import DetallePedido
from ..models.producto import Producto
from .base_service import BaseService
from datetime import datetime


class PedidoService(BaseService):
    def __init__(self, db: Session):
        super().__init__(Pedido, db)


    def get_pedidos_por_usuario(self, id_usuario: int):
        return (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion),
            )
            .filter(Pedido.id_usuario == id_usuario)
            .order_by(Pedido.fecha.desc())
            .all()
        )


    def get_pedidos_detalle(self):
        return (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion),
            )
            .order_by(Pedido.fecha.desc())
            .all()
        )


    def get_pedido_detalle_id(self, id_pedido: int):
        pedido = (
            self.db.query(Pedido)
            .options(
                joinedload(Pedido.detalles).joinedload(DetallePedido.producto),
                joinedload(Pedido.direccion),
            )
            .filter(Pedido.id_pedido == id_pedido)
            .first()
        )
        if not pedido:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        return pedido


    def crear_pedido(self, data: dict, id_usuario: int):
        try:
            id_usuario = data.get("id_usuario")
            id_direccion = data.get("id_direccion")
            total = data.get("total")
            detalles = data.get("detalles", [])

            if not detalles:
                raise HTTPException(status_code=400, detail="El pedido no tiene productos")

            # Crear pedido
            pedido = Pedido(
                id_usuario=id_usuario,
                id_direccion=id_direccion,
                total=total,
                fecha=datetime.now(),
                estado="pendiente"
            )

            self.db.add(pedido)
            self.db.flush()  # OBTENER id_pedido antes de agregar detalles

            # Procesar cada detalle del carrito
            for item in detalles:
                id_producto = item["id_producto"]
                cantidad = item["cantidad"]

                # Obtener producto
                producto = self.db.query(Producto).filter(Producto.id_producto == id_producto).first()

                if not producto:
                    raise HTTPException(status_code=404, detail=f"Producto {id_producto} no encontrado")

                # Validar stock
                if producto.stock < cantidad:
                    raise HTTPException(
                        status_code=400,
                        detail=f"No hay stock suficiente para {producto.nombre}. Disponible: {producto.stock}"
                    )

                # Descontar stock
                producto.stock -= cantidad
                self.db.add(producto)

                # Crear detalle del pedido
                detalle = DetallePedido(
                    id_pedido=pedido.id_pedido,
                    id_producto=id_producto,
                    cantidad=cantidad,
                    precio_unitario=producto.precio,
                    subtotal=producto.precio * cantidad
                )

                self.db.add(detalle)

            self.db.commit()
            self.db.refresh(pedido)

            return {"message": "Pedido creado correctamente", "id_pedido": pedido.id_pedido}

        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Error al crear el pedido: {str(e)}")
