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

# connection.execute(t.insert(), {"value": MyEnum.two})
# assert connection.scalar(t.select()) is MyEnum.two

class SomeClass(Base):
    __tablename__ = 'some_table'
    ## missing columms: manager_id, goals, assignee_id
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(String(50))
    email = Column(String(50))
    company_id = Column(String(50))
    company_name = Column(String(50))
    position_title = Column(String(50))
    start_date =  Column(DateTime)
    current = Column(Boolean)
    title =  Column(String(50))
    description = Column(String(50))
    assignee_id = Column(String(50))
    status = Column(Enum(MyEnum))
    
# access the mapped Table
print(SomeClass.__table__)

# access the Mapper
print(SomeClass.__mapper__)
print(SomeClass.status)
SomeClass.status = MyEnum.to_do  
print(SomeClass.status)