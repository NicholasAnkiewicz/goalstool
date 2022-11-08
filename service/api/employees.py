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

employees_router = APIRouter()

@employees_router.get("/employees", response_model=List[schemas.Employee])
async def get_employees(sess: Session=Depends(get_db)):
    return sess.query(models.Employee).all()

@employees_router.get("/employee/{id}", response_model=schemas.Employee)
async def get_employee(id: int, sess: Session=Depends(get_db)):
    employee = sess.query(models.Employee).get(id)
    if employee:
        return employee
    else:
        raise HTTPException(404, detail=f"Employee with id {id} not found")

@employees_router.get("/employees/demo", response_model=schemas.Employee)
async def seed_test_employee(sess: Session=Depends(get_db)):
    test_employee = models.Employee(
                firstname="Saakshaat",
                lastname="Singh",
                employeeid = "UKG123",
                email="saakshaatsin@umass.edu",
                companyid=2,
                companyname="UKG",
                title="Test User",
                managerid=123,
                password="easypeesylemonsqueezy"
                )

    sess.add(test_employee)
    sess.commit()

    sess.refresh(test_employee) # to add id and DB metadata to test_employee for use in response
    return test_employee

