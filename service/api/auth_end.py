from datetime import datetime
from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas

auth_router = APIRouter()

@auth_router.post("/auth", response_model=schemas.Employee)
async def auth(credentials: schemas.AuthPost, sess: Session=Depends(get_db)):
    auth = sess.query(models.Employee).filter(models.Employee.email == credentials.username, models.Employee.password == credentials.password).first()
    if auth:
        return auth
    else:
        raise HTTPException(404, detail=f"Username, password doesn't match!")
