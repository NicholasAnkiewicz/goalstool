from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas

comments_router = APIRouter()

@comments_router.get("/comments", response_model=List[schemas.Comment])
async def get_comments(sess: Session=Depends(get_db)):
    return sess.query(models.Comment).all()

@comments_router.get("/comments/demo", response_model=schemas.Comment)
async def get_test_comments(sess: Session=Depends(get_db)):
    test_comment = models.Comment(
                description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta magna non egestas sollicitudin. Maecenas ipsum nisl, imperdiet placerat condimentum.",
                goal_id = 12
                )

    sess.add(test_comment)
    sess.commit()

    sess.refresh(test_comment) # to add id and DB metadata to test_comment for use in response
    return test_comment

