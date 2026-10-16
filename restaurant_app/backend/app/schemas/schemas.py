from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_admin: bool
    class Config:
        from_attributes = True

# --- Menu Schemas ---
class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    is_available: bool = True

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemOut(MenuItemBase):
    id: int
    class Config:
        from_attributes = True

# --- Order Schemas ---
class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int

class OrderCreate(BaseModel):
    user_id: Optional[int] = None
    items: List[OrderItemCreate]

class OrderOut(BaseModel):
    id: int
    total_price: float
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
