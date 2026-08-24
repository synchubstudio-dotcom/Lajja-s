import { NextResponse } from "next/server";
import { Order } from "@/types/order";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentMethod, subtotal, discount, shippingFee, total } = body;

    if (!items || items.length === 0 || !shippingAddress || !shippingAddress.fullName) {
      return NextResponse.json(
        { success: false, message: "Missing required order fields." },
        { status: 400 }
      );
    }

    const orderNumber = `LJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "upi",
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      subtotal,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      total,
      status: "confirmed",
      trackingNumber: `TRK-GUJ-${Math.floor(10000 + Math.random() * 90000)}`,
      carrier: "Gujarat Express Logistics",
      estimatedDelivery: "Within 24-48 Hours",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process order." },
      { status: 500 }
    );
  }
}
