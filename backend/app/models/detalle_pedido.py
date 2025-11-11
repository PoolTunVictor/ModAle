from sqlalchemy import Column, Integer, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from ..database.database import Base

class DetallePedido(Base):
    __tablename__ = "detalles_pedido"
    id_detalle = Column(Integer, primary_key=True, index=True, autoincrement=True)  
    id_pedido = Column(Integer, ForeignKey("pedidos.id_pedido"))
    id_producto = Column(Integer, ForeignKey("productos.id_producto"))
    cantidad = Column(Integer)
    precio_unitario = Column(DECIMAL(10, 2))
    subtotal = Column(DECIMAL(10, 2))

    pedido = relationship("Pedido", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles")
