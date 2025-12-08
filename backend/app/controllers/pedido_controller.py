from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .base_controller import get_db, BaseController
from ..models.pedido import Pedido
from ..models.detalle_pedido import DetallePedido
from ..services.pedidos_service import PedidoService
from ..models.usuarios import Usuario
from .auth_controller import get_current_user
from ..schemas.pedido_schema import PedidoSchema


class PedidoController(BaseController):
    def __init__(self):
        super().__init__(Pedido, 'pedidos', schema=PedidoSchema)
        self.router.routes = []

        # =====================================================
        #                   GET /pedidos
        # =====================================================
        @self.router.get("/")
        def get_pedidos(db: Session = Depends(get_db)):
            service = PedidoService(db)
            pedidos = service.get_pedidos_detalle()

            return [
                {
                    "id_pedido": p.id_pedido,
                    "fecha": p.fecha,
                    "total": float(p.total) if p.total else 0,
                    "estado": p.estado.value if p.estado else None,
                    "usuario": {
                        "id_usuario": p.usuario.id_usuario if p.usuario else None,
                        "nombre": p.usuario.nombre if p.usuario else "Sin usuario"
                    },
                    "direccion": {
                        "colonia": p.direccion.colonia if p.direccion else None,
                        "localidad": (
                            p.direccion.localidad.nombre
                            if p.direccion and p.direccion.localidad
                            else None
                        ),
                        "referencias": p.direccion.referencia if p.direccion else None
                    },
                    "detalles": [
                        {
                            "id_detalle": d.id_detalle,
                            "producto": d.producto.nombre if d.producto else None,
                            "imagen": d.producto.imagen if d.producto else None,
                            "cantidad": d.cantidad,
                            "precio_unitario": float(d.precio_unitario),
                        }
                        for d in (p.detalles or [])
                    ]
                }
                for p in pedidos
            ]

        # =====================================================
        #          GET /pedidos/detalle/{id_pedido}
        # =====================================================
        @self.router.get("/detalle/{id_pedido}")
        def get_pedido_detalle(id_pedido: int, db: Session = Depends(get_db)):
            service = PedidoService(db)
            p = service.get_pedido_por_id(id_pedido)

            return {
                "id_pedido": p.id_pedido,
                "fecha": p.fecha,
                "total": float(p.total),
                "estado": p.estado.value,
                "usuario": {
                    "nombre": p.usuario.nombre if p.usuario else "Sin usuario",
                    "email": p.usuario.email if p.usuario else "Sin email"
                },
                "direccion": {
                    "colonia": p.direccion.colonia if p.direccion else None,
                    "localidad": p.direccion.localidad.nombre if p.direccion and p.direccion.localidad else None,
                    "referencias": p.direccion.referencia if p.direccion else None
                },
                "detalles": [
                    {
                        "producto": d.producto.nombre if d.producto else None,
                        "imagen": d.producto.imagen if d.producto else None,
                        "cantidad": d.cantidad,
                        "precio_unitario": float(d.precio_unitario)
                    }
                    for d in p.detalles
                ]
            }

        # =====================================================
        #     🔥 GET /pedidos/{id_pedido}/detalles
        # =====================================================
        @self.router.get("/{id_pedido}/detalles")
        def obtener_detalles_pedido(id_pedido: int, db: Session = Depends(get_db)):
            detalles = (
                db.query(DetallePedido)
                .filter(DetallePedido.id_pedido == id_pedido)
                .all()
            )

            if not detalles:
                raise HTTPException(
                    status_code=404,
                    detail="No hay detalles para este pedido"
                )

            return [
                {
                    "id_detalle": d.id_detalle,
                    "cantidad": d.cantidad,
                    "precio_unitario": float(d.precio_unitario),
                    "producto": d.producto.nombre if d.producto else None,
                    "imagen": d.producto.imagen if d.producto else None
                }
                for d in detalles
            ]

        # =====================================================
        #                   POST /pedidos
        # =====================================================
        @self.router.post("/")
        def crear_pedido(
            data: dict,
            current_user: Usuario = Depends(get_current_user),
            db: Session = Depends(get_db)
        ):
            if "id_direccion" not in data:
                raise HTTPException(
                    status_code=400,
                    detail="Falta id_direccion."
                )

            if "detalles" not in data or not isinstance(data["detalles"], list):
                raise HTTPException(
                    status_code=400,
                    detail="El pedido debe incluir una lista de detalles."
                )

            if len(data["detalles"]) == 0:
                raise HTTPException(
                    status_code=400,
                    detail="El pedido no puede crearse sin detalles."
                )

            service = PedidoService(db)
            return service.crear_pedido(data, current_user.id_usuario)
