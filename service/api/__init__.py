from fastapi import APIRouter
from .goals import goals_router

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to ByteGoals"}

router.include_router(goals_router)

