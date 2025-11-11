from fastapi import Depends
from sqlalchemy.orm import Session
from .base_controller import get_db
from ..models.pedido import Pedido
from ..services.pedidos_service import PedidoService
from .base_controller import BaseController


class PedidoController(BaseController):
    def __init__(self):
        super().__init__(Pedido, "pedidos")

        @self.router.get("/cliente/{id_cliente}")
        def get_pedidos_cliente(id_cliente: int, db: Session = Depends(get_db)):
            service = PedidoService(db)
            pedidos = service.get_pedidos_por_cliente(id_cliente)
            return [
                {
                    "id_pedido": p.id_pedido,
                    "fecha": p.fecha,
                    "total": float(p.total),
                    "estado": p.estado.value if p.estado else None,
                    "direccion": {
                        "colonia": p.direccion.colonia if p.direccion else None,
                        "lugar": p.direccion.lugar if p.direccion else None,
                    },
                    "detalles": [
                        {
                            "id_detalle": d.id_detalle,
                            "producto": d.producto.nombre if d.producto else None,
                            "cantidad": d.cantidad,
                            "precio_unitario": float(d.precio_unitario),
                            "subtotal": float(d.subtotal),
                        }
                        for d in p.detalles
                    ],
                }
                for p in pedidos
            ]
        
        @self.router.get("/cliente/detalle/")
        def get_pedidos_cliente(db: Session = Depends(get_db)):
            service = PedidoService(db)
            pedidos = service.get_pedidos_detalle()
            return [
                {
                    "id_pedido": p.id_pedido,
                    "fecha": p.fecha,
                    "total": float(p.total),
                    "estado": p.estado.value if p.estado else None,
                    "direccion": {
                        "colonia": p.direccion.colonia if p.direccion else None,
                        "lugar": p.direccion.lugar if p.direccion else None,
                    },
                    "detalles": [
                        {
                            "id_detalle": d.id_detalle,
                            "producto": d.producto.nombre if d.producto else None,
                            "cantidad": d.cantidad,
                            "precio_unitario": float(d.precio_unitario),
                            "subtotal": float(d.subtotal),
                        }
                        for d in p.detalles
                    ],
                }
                for p in pedidos
            ]
            
            
        @self.router.get("/detalle/{id_pedido}")
        def get_pedido_detalle(id_pedido: int, db: Session = Depends(get_db)):
            service = PedidoService(db)
            pedido = service.get_pedido_detalle_id(id_pedido)
            return {
                    "id_pedido": pedido.id_pedido,
                    "fecha": pedido.fecha,
                    "total": float(pedido.total),
                    "estado": pedido.estado.value if pedido.estado else None,
                    "direccion": {
                        "colonia": pedido.direccion.colonia if pedido.direccion else None,
                        "lugar": pedido.direccion.lugar if pedido.direccion else None,
                    },
                    "detalles": [
                        {
                            "id_detalle": d.id_detalle,
                            "producto": d.producto.nombre if d.producto else None,
                            "cantidad": d.cantidad,
                            "precio_unitario": float(d.precio_unitario),
                            "subtotal": float(d.subtotal),
                        }
                        for d in pedido.detalles
                    ],
                }
                