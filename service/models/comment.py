from .base import Base, BaseModel
from sqlalchemy import Column, Integer, String, DateTime

class Comment(Base, BaseModel):
    __tablename__ = 'comments'
    description = Column(String(255)) # Maybe allow longer comments than this?
    goal_id = Column(Integer) # Foreign Key
