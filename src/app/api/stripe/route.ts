import { connectToDataBase } from "@/lib/connect-db";
import { get_html } from "@/lib/email_html";
import { StripeAppModel } from "@/schema/StripeApp";
import { StripeApiResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";


export const revalidate = 0;

export async function GET(request: NextRequest) {
  const stripeResponse: StripeApiResponse = await (
    await fetch(process.env.STRIPE_MARKETPLACE_URL as string, { cache: 'no-store' })
  ).json()

  await connectToDataBase();

  const existingApps = await StripeAppModel.find({}).select('id')
  const toBeAdded = stripeResponse.data.filter((app) => {
    return !existingApps.some((exist) => exist.id === app.id)
  })

  if (toBeAdded.length > 0) {
    await StripeAppModel.insertMany(toBeAdded, { ordered: false })
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: "StripeScrapper <onboarding@resend.dev>",
        to: [process.env.RECIPIENT_EMAIL as string],
        subject: `${process.env.APP_NAME || "Stripe Scrapper"} | New Apps Added`,
        html: get_html(toBeAdded.length, toBeAdded)
      }),
    });
  }

  return NextResponse.json({
    newApps: toBeAdded,
    timestamp: new Date().toISOString()
  })
}


