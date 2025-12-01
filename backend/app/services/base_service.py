from sqlalchemy.orm import Session
from sqlalchemy import inspect

class BaseService:
    def __init__(self, model, db: Session):
        self.model = model
        self.db = db

    def _get_pk(self):
        return inspect(self.model).primary_key[0].name

    def read_all(self):
        return self.db.query(self.model).all()

    def read(self, item_id):
        pk = self._get_pk()
        return self.db.query(self.model).filter(getattr(self.model, pk) == item_id).first()

    def create(self, data: dict):
        item = self.model(**data)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def update(self, item_id, data: dict):
        pk = self._get_pk()
        item = self.db.query(self.model).filter(getattr(self.model, pk) == item_id).first()
        for key, value in data.items():
            setattr(item, key, value)
        self.db.commit()
        self.db.refresh(item)
        return item

    def delete(self, item_id):
        pk = self._get_pk()
        item = self.db.query(self.model).filter(getattr(self.model, pk) == item_id).first()
        self.db.delete(item)
        self.db.commit()
        return item