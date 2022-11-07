from fastapi import APIRouter

from typing import List

from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas
import random

goals_router = APIRouter()

@goals_router.get("/goals", response_model=List[schemas.Goal])
async def get_goals(sess: Session=Depends(get_db)):
    return sess.query(models.Goal).all()

@goals_router.post("/goals", status_code=201)
async def post_goals(item: schemas.Goal, Session = Depends(get_db)):
    print(item)
    item.id = random.randint(0, 999999)
    SQLitem = models.Goal(
        id=item.id,
        title=item.title,
        description=item.description,
        assignee_id=item.assignee_id,
        status=item.status,
        start_date=item.start_date,
        end_date = item.end_date
    )
    Session.add(SQLitem)
    Session.commit()
    return item
'''
@goals_router.get("/goals/demo", response_model=schemas.Goal)
async def seed_test_goal(sess: Session=Depends(get_db)):
    goal = models.Goal(
            title="Demo this route :p",
            description="This is a dummy goal. The purpose of this goal is to create a goal row in the database for the demo on Thursday. This seed will be replaced by a POST route for the frontend to use",
            assignee_id=1,
            status=models.GoalStatus.to_do,
            start_date=(datetime.date.today() + datetime.timedelta(days=1))
            )
    sess.add(goal)
    sess.commit()

    sess.refresh(goal)
    return goal
'''
