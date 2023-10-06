import { connectToDataBase } from "@/lib/connect-db";
import { StripeAppModel } from "@/schema/StripeApp";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  await connectToDataBase();
  const stripeApps = await StripeAppModel.find({})
  return NextResponse.json({
    data: stripeApps,
    timestamp: new Date().toISOString()
  })
}

