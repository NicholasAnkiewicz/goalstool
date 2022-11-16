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

@employees_router.get("/employees", response_model=List[schemas.EmployeeWithReports])
async def get_employees(sess: Session=Depends(get_db)):
    return sess.query(models.Employee).all()

@employees_router.get("/employees/{id}", response_model=schemas.EmployeeWithReports)
async def get_employee(id: int, sess: Session=Depends(get_db)):
    employee = sess.query(models.Employee).get(id)
    if employee:
        return employee
    else:
        raise HTTPException(404, detail=f"Employee with id {id} not found")

@employees_router.get("/employees/create_manager", response_model=schemas.Employee)
async def seed_test_manager(sess: Session=Depends(get_db)):
    test_employee = models.Employee(
               first_name="Manager",
               last_name="John",
               employee_id = "UKG245",
               email="manager-@ukg.com",
               company_id=2,
               company_name="UKG",
               position_title="Test User",
               current = True,
               password="easypeesylemonsqueezy"
               )

    sess.add(test_employee)
    sess.commit()
    
    sess.refresh(test_employee) # to add id and DB metadata to test_employee for use in response
    return test_employee

@employees_router.get("/employees/demo", response_model=schemas.Employee)
async def seed_test_employee(sess: Session=Depends(get_db)):
    test_employee = models.Employee( first_name="Saakshaat",
                last_name="Singh",
                employee_id = "UKG123",
                email="saakshaatsin@umass.edu",
                company_id=2,
                company_name="UKG",
                position_title="Test User",
                current = True,
                manager_id=1,
                password="easypeesylemonsqueezy"
                )

    sess.add(test_employee)
    sess.commit()

    sess.refresh(test_employee) # to add id and DB metadata to test_employee for use in response
    return test_employee

