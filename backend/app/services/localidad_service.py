from sqlalchemy.orm import Session
from ..models.localidad import Localidad

class LocalidadService:
    def __init__(self, db: Session):
        self.db = db

    def get_todas_localidades(self):
        return self.db.query(Localidad).all()
