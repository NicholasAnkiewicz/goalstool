from fastapi import APIRouter
from sqlalchemy.orm import sessionmaker

from models import *

from .goals import goals_router
from .employees import employees_router

router = APIRouter()

Session = sessionmaker(bind=engine)
session = Session()
from datetime import date

test_employee = Employee(
                first_name="Saakshaat",
                last_name="Singh",
                employee_id = "UKG123",
                email="saakshaatsin@umass.edu",
                company_id="UKG",
                company_name="UKG",
                position_title="Test User",
                start_date=date.today(),
                current=True
                )

session.add(test_employee)
session.commit()

print(session.query(Employee).all())

@router.get("/")
async def root():
    return {"message": "Welcome to ByteGoals"}

router.include_router(goals_router)
router.include_router(users_router)

