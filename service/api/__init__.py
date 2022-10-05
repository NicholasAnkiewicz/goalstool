from fastapi import FastAPI, APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Welcome to ByteGoals"}

# router.include_router(
