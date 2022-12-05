import os
import json
from models.base import Base, engine
from sqlalchemy.orm import Session
from fastapi import Depends
from models import Employee, AuthEnd

sess = Session(engine)

    
for file in os.listdir("seeds"):
   with open(f"seeds/{file}") as f:
        data = (json.load(f))
        for entry in data:
            employee = Employee(
               first_name=entry["firstName"],
               last_name=entry["lastName"],
               employee_id = entry["employeeId"],
               email=entry["email"],
               company_id=entry["companyId"],
               company_name=entry["companyName"],
               position_title=entry["positionTitle"],
               current = True,
               password=entry["password"]
               )
            sess.add(employee)
            sess.commit()
            sess.refresh(employee)

            login = AuthEnd(
                username = entry["email"],
                password = entry["password"],
                employee_ref = employee.id
            )
            sess.add(login)
            sess.commit()

print("Seed Complete!")
