import { NextResponse } from "next/server";
import { isRateLimited } from "@/utils/rate-limit";
import { verifyRecaptcha } from "@/utils/verify-recaptcha";

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(`recaptcha:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests.", success: false }, { status: 429 });
  }

  try {
    const reqBody = await request.json();
    const success = await verifyRecaptcha(reqBody.token);

    if (success) {
      return NextResponse.json({
        message: "Captcha verification success!!",
        success: true,
      });
    };

    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
  }
};
