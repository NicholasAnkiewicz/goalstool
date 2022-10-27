from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from models import GoalStatus

class Goal(BaseModel):
    id: Optional[int]
    title: str
    description: str
    assignee_id: int
    status: GoalStatus
    start_date: datetime
    end_date: Optional[datetime]

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON
