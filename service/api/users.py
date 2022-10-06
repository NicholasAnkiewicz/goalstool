from fastapi import APIRouter

users_router = APIRouter()

fake_users = [
{"first_name": "John", "last_name": "Doe", "employee_id": "abc123", "email": "abc123@ukg.com", "company_id": "ukg1", "companyName": "UKG", "manager_id": "xyz456", "position_title": "SWE 1", "current": True}, {"first_name": "Jane", "last_name": "Doe", "employee_id": "mno234", "email": "mno234@ukg.com", "company_id": "ukg1", "companyName": "UKG", "manager_id": "xyz456", "position_title": "SWE 2", "current": True}, {"first_name": "Moltron", "last_name": "Speigmeister", "employee_id": "xyz456", "email": "xyz456@ukg.com", "company_id": "ukg1", "companyName": "UKG", "manager_id": "ceo999", "position_title": "SWE 1", "current": True}
]

@users_router.get("/users")
async def get_users():
    return fake_users
