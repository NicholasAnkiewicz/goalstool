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

class Employee(Base):
    __tablename__ = 'Employee'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(Integer, primary_key=True)
    email = Column(String(50))
    company_id = Column(String(50))
    company_name = Column(String(50))
    position_title = Column(String(50))
    current = Column(Boolean)
    manager_id = Column(Integer, primary_key=True)
    is_manager = Column(Boolean)
    password = Column(String(50))

class Goals(Base):
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

class Comments(Base):
    __tablename__ = 'Comments'
    comment_id = Column(Integer, primary_key=True)
    description = Column(String(255))
    goal_id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, primary_key=True)
    manager_id = Column(Integer, primary_key=True)

# access the mapped Table
print(Employee.__table__)
print(Goals.__table__)
print(Comments.__table__)

# access the Mapper
print(Goals.__mapper__)
print(Goals.status)
Goals.status = MyEnum.to_do  
print(Goals.status)