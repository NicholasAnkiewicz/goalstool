import enum

from .base import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum

class Employee(Base):
    __tablename__ = 'Employee'
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
