from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional, Type, List, Any, Dict
from ..database.database import SessionLocal
from ..services.base_service import BaseService
from pydantic import create_model

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def generate_schemas(model: Type):
    fields = {}
    for column in model.__table__.columns:
        python_type = getattr(column.type, "python_type", Any)
        if python_type is Decimal:
            python_type = float
        if column.nullable or column.default is not None:
            python_type = Optional[python_type]
            default = None
        else:
            default = ...
        fields[column.name] = (python_type, default)
    Schema = create_model(f"{model.__name__}Schema", **fields)
    return Schema

class BaseController:
    def __init__(self, model: Type, prefix: str):
        self.model = model
        self.prefix = prefix
        self.router = APIRouter(prefix=f"/api/{prefix}", tags=[prefix.capitalize()])
        self.Schema = generate_schemas(model)

        @self.router.get("/", response_model=List[self.Schema])
        def read_all(db: Session = Depends(get_db)):
            return BaseService(model, db).read_all()

        @self.router.get("/{item_id}", response_model=self.Schema)
        def read(item_id: int, db: Session = Depends(get_db)):
            return BaseService(model, db).read(item_id)

        @self.router.post("/", response_model=self.Schema)
        def create(data: Dict[str, Any], db: Session = Depends(get_db)):
            return BaseService(model, db).create(data)

        @self.router.put("/{item_id}", response_model=self.Schema)
        def update(item_id: int, data: Dict[str, Any], db: Session = Depends(get_db)):
            return BaseService(model, db).update(item_id, data)

        @self.router.delete("/{item_id}", response_model=self.Schema)
        def delete(item_id: int, db: Session = Depends(get_db)):
            return BaseService(model, db).delete(item_id)
