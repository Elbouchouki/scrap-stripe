import { connectToDataBase } from "@/lib/connect-db";
import { get_html } from "@/lib/email_html";
import { resend } from "@/lib/resend";
import { StripeAppModel } from "@/schema/StripeApp";
import { StripeApiResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";


const dynamic = 'force-dynamic'
const revalidate = 0


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
    resend.sendEmail({
      from: 'StripeScrapper <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL as string,
      subject: `${process.env.APP_NAME || "Stripe Scrapper"} | New Apps Added`,
      html: get_html(toBeAdded.length, toBeAdded)
    })
  }
  let response = NextResponse.json({
    newApps: toBeAdded,
    timestamp: new Date().toISOString()
  })

  response.headers.set('Cache-Control', 's-maxage=0, stale-while-revalidate')

  return response
}

