from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..services.localidad_service import LocalidadService
from .base_controller import get_db

router = APIRouter(
    prefix="/localidades",
    tags=["Localidades"]
)

@router.get("/")
def listar_localidades(db: Session = Depends(get_db)):
    service = LocalidadService(db)
    localidades = service.get_todas_localidades()
    return [{"id_localidad": loc.id_localidad, "nombre": loc.nombre} for loc in localidades]
