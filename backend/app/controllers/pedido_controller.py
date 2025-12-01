from fastapi import Depends
from sqlalchemy.orm import Session, joinedload
from .base_controller import get_db, BaseController
from ..models.pedido import Pedido
from ..services.pedidos_service import PedidoService

class PedidoController(BaseController):
    def __init__(self):
        super().__init__(Pedido, "pedidos")

        # Obtener todos los pedidos con detalles, usuario y dirección
        @self.router.get("/")
        def get_pedidos(db: Session = Depends(get_db)):
            service = PedidoService(db)
            pedidos = service.get_pedidos_detalle()
            return [
                {
                    "id_pedido": p.id_pedido,
                    "fecha": p.fecha,  # fecha desde modelo
                    "total": float(p.total),
                    "estado": p.estado.value if p.estado else None,
                    "usuario": {
                        "id_usuario": p.usuario.id_usuario if p.usuario else None,
                        "nombre": p.usuario.nombre if p.usuario else 'Sin usuario'
                    },
                    "direccion": {
                        "colonia": p.direccion.colonia if p.direccion else None,
                        "localidad": p.direccion.lugar if p.direccion else None,
                    },
                    "detalles": [
                        {
                            "id_detalle": d.id_detalle,
                            "producto": d.producto.nombre if d.producto else None,
                            "cantidad": d.cantidad,
                            "precio_unitario": float(d.precio_unitario),
                            "subtotal": float(d.subtotal)
                        }
                        for d in p.detalles
                    ]
                }
                for p in pedidos
            ]