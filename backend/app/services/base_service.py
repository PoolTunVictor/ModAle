from sqlalchemy.orm import Session
from fastapi import HTTPException

class BaseService:
    def __init__(self, model, db: Session):
        self.model = model
        self.db = db
        
    def create(self, data: dict):
        obj = self.model(**data)
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj
    
    
    def read(self, item_id: int):
        pk = self._get_pk()
        obj = self.db.query(self.model).filter(pk == item_id).first()
        if not obj:
            raise HTTPException(status_code=404, detail="Registro no encontrado")
        return obj
    
    
    def read_all(self):
        return self.db.query(self.model).all()

    def update(self, item_id: int, data: dict):
        obj = self.read(item_id)
        for key, value in data.items():
            setattr(obj, key, value)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def delete(self, item_id: int):
        obj = self.read(item_id)
        self.db.delete(obj)
        self.db.commit()
        return obj

    def _get_pk(self):
        return next(iter(self.model.__table__.primary_key.columns))
