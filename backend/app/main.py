from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine

# Routers correctos
from app.controllers.auth_controller import router as auth_router
from app.controllers.usuarios_controller import router as usuarios_router
from app.controllers.utils_controller import router as utils_router
from app.controllers.localidad_controller import router as localidad_router
from app.controllers.direcciones_router import router as direcciones_router

from app.controllers import (
    DetallePedidoController,
    ProductoController,
    DireccionController,
    MovimientoStockController,
    PedidoController,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ModAle API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "https://modale-production.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(usuarios_router)
app.include_router(utils_router)
app.include_router(localidad_router)
app.include_router(direcciones_router)

def register_controllers():
    app.include_router(DireccionController().router)
    app.include_router(ProductoController().router)
    app.include_router(PedidoController().router)
    app.include_router(DetallePedidoController().router)
    app.include_router(MovimientoStockController().router)

register_controllers()
