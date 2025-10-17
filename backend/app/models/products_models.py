import datetime as _dt
import sqlalchemy as _sql
import database as _database

class Product(_database.Base):
    __tablename__ = "products"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, index=True)
    description = _sql.Column(_sql.String, index=True)
    characteristics = _sql.Column(_sql.String, index=True)
    price = _sql.Column(_sql.Double, index=True)
    stock = _sql.Column(_sql.Integer, index=True)
    active = _sql.Column(_sql.Boolean, index=True) 


