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
from app.controllers.auth_controller import router as auth_router
from .controllers.usuarios_controller import router as UsuariosRouter
from .models import *
from app.controllers.utils_controller import router as utils_router
from app.controllers.localidad_controller import router as localidad_router
from app.controllers.direcciones_router import router as direcciones_router


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
app.include_router(auth_router, prefix="/api/auth")
app.include_router(UsuariosRouter, prefix="/usuarios")
app.include_router(utils_router)

def register_controllers():
    app.include_router(DireccionController().router)
    app.include_router(ProductoController().router)
    app.include_router(PedidoController().router)
    app.include_router(DetallePedidoController().router)
    app.include_router(MovimientoStockController().router)
    
register_controllers()
app.include_router(localidad_router)
app.include_router(direcciones_router)