from .base import Base, BaseModel
from sqlalchemy import Column, Integer, String, DateTime

class Comment(Base, BaseModel):
    __tablename__ = 'comments'
    description = Column(String)
    goal_id = Column(Integer) # Foreign Key (Track goal comment is for)
    employee_id = Column(Integer) # Foreign Key (Track author of comment)
