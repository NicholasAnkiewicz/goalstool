from fastapi import FastAPI
from traitlets import Bool
from api import router
import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()
app.include_router(router)

Base = declarative_base()

class MyEnum(enum.Enum):
    to_do = 0
    in_progress = 1
    completed = 2

class Goals(BaseModel):
    __tablename__ = 'Goals'
    goal_id = Column(Integer, primary_key=True)
    title = Column(String(50))
    add_description = Column(String(255))
    assigned_id = Column(Integer, primary_key=True)
    manager_id = Column(Integer, primary_key=True)
    comment_id  = Column(Integer, primary_key=True)
    status = Column(Enum(MyEnum))
    start_date = Column(DateTime)    
    end_date = Column(DateTime)
    type = Column(String(50))
