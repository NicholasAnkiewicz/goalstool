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

@goals_router.get("/goals/{eid}", response_model=List[schemas.Goal])
async def get_goals(eid: int, sess: Session=Depends(get_db)):
    goals = sess.query(models.Goal).all()
    goals_list = []
    for goal in goals:
        if goal.assignee_id == eid:
            goals_list.append(goal)
    return goals_list

@goals_router.post("/goals", status_code=201)
async def post_goals(item: schemas.Goal, Session = Depends(get_db)):
    SQLitem = models.Goal(
        title=item.title,
        description=item.description,
        assignee_id=item.assignee_id,
        status=item.status,
        start_date=item.start_date,
        end_date = item.end_date
    )
    Session.add(SQLitem)
    Session.commit()
    Session.refresh(SQLitem)
    return SQLitem
@goals_router.put("/goals/{gid}", status_code=200)
async def update_goals(gid: int, item: schemas.Goal, Session = Depends(get_db)):
    goals = Session.query(models.Goal).all()
    for goal in goals:
        if goal.id == gid:
            Session.delete(goal)
            Session.commit()
            goal = models.Goal(
                id = item.id,
                title=item.title,
                description=item.description,
                assignee_id=item.assignee_id,
                status=item.status,
                start_date=item.start_date,
                end_date = item.end_date
            )
    Session.add(goal)
    Session.commit()
    Session.refresh(goal)
    return "Done"
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