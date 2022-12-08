from .base import Base, BaseModel
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Comment(Base, BaseModel):
    __tablename__ = 'comments'
    description = Column(String(255)) # Maybe allow longer comments than this?
    goal_id = Column(Integer, ForeignKey("goals.id")) # Foreign Key
