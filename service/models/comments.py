from fastapi import FastAPI
from traitlets import Bool
from api import router
import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()
app.include_router(router)

Base = declarative_base()

class Comments(Base):
    __tablename__ = 'Comments'
    comment_id = Column(Integer, primary_key=True)
    description = Column(String(255))
    goal_id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, primary_key=True)
    manager_id = Column(Integer, primary_key=True)