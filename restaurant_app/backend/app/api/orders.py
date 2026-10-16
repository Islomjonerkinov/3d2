from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models import models
from app.schemas import schemas
from app.core.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.OrderOut)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    # 1. Total narxni hisoblash
    total_price = 0
    order_items = []

    for item in order.items:
        menu_item = db.query(models.MenuItem).filter(models.MenuItem.id == item.menu_item_id).first()
        if not menu_item:
            raise HTTPException(status_code=404, detail=f"Taom topilmadi: id {item.menu_item_id}")

        total_price += menu_item.price * item.quantity
        order_items.append(models.OrderItem(menu_item_id=item.menu_item_id, quantity=item.quantity))

    # 2. Orderni yaratish
    db_order = models.Order(
        user_id=order.user_id,
        total_price=total_price,
        status="Pending"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    # 3. Order itemlarni bog'lash
    for oi in order_items:
        oi.order_id = db_order.id
        db.add(oi)

    db.commit()
    return db_order

@router.get("/", response_model=List[schemas.OrderOut])
def get_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()

@router.patch("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Buyurtma topilmadi")

    order.status = status
    db.commit()
    return {"message": f"Buyurtma holati {status} ga o'zgartirildi"}
