from fastapi import APIRouter

goals_router = APIRouter()

fake_goals = [
    {"title": "Goal 1", "description": "This is a test goal", "assignee_id": "abc123", "manager_id": "xyz456", "status": "To Do"}, {"title": "Goal 2", "description": "This is the second test goal", "assignee_id": "mno234", "manager_id": "xyz456", "status": "In Progress"}, {"title": "Goal 3", "description": "This is the third goal", "assignee_id": "abc123", "manager_id": "xyz456", "status": "Completed"}, {"title": "Goal 4", "description": "This is another test goal", "assignee_id": "xyz456", "manager_id": "ceo999", "status": "To Do"}
]

@goals_router.get("/goals")
async def get_goals():
    return fake_goals
