from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Comment(BaseModel):
    id: Optional[int]
    description: str
    goal_id: int

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON