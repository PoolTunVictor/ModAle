from pydantic import BaseModel
from ..database.database import Base

class LoginData(BaseModel):
    email_or_username: str
    password: str
