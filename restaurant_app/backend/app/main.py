from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import menu, orders, auth

app = FastAPI(title="Restaurant Management System API")

# CORS sozlamalari - Frontend bilan bog'lanish uchun
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Restaurant Management API!"}
