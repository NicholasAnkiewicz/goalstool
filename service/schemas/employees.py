from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Employee(BaseModel):
    id: Optional[int]
    first_name: str
    last_name: str
    employee_id: str
    email: str #TODO: add validator for email regex
    company_id: str
    company_name: str
    position_title: str
    start_date: datetime
    current: bool = True

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON

