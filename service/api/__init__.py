from fastapi import APIRouter
from .goals import goals_router
from .users import users_router

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to ByteGoals"}

router.include_router(goals_router)
router.include_router(users_router)

