from pydantic import BaseModel

class AuthPost(BaseModel):
    username: str
    password: str    

class AuthEnd(AuthPost):
    employee_ref: int

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON
