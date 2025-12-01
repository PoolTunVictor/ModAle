from fastapi import FastAPI
from .database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from .controllers import (
    DetallePedidoController,
    ProductoController,
    DireccionController,
    MovimientoStockController,
    PedidoController,
)
from .controllers.auth_controller import router as AuthRouter
from .controllers.usuarios_controller import router as UsuariosRouter
from .models import *

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ModAle API", version="1.0")

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers globales
app.include_router(AuthRouter, prefix="/auth")
app.include_router(UsuariosRouter, prefix="/usuarios")

def register_controllers():
    app.include_router(DireccionController().router)
    app.include_router(ProductoController().router)
    app.include_router(PedidoController().router)
    app.include_router(DetallePedidoController().router)
    app.include_router(MovimientoStockController().router)

register_controllers()