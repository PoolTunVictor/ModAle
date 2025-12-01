from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..controllers.direccion_controller import DireccionController
from ..controllers.base_controller import get_db
from ..schemas.direccion_schema import DireccionCreate

router = APIRouter(prefix="/api/direcciones", tags=["Direcciones"])
controller = DireccionController()

@router.post("/")
def crear_direccion(direccion: DireccionCreate, db: Session = Depends(get_db)):
    return controller.crear(db, direccion)