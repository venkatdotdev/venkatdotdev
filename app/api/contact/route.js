import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isValidEmail } from '@/utils/check-email';
import { isRateLimited } from '@/utils/rate-limit';
import { verifyRecaptcha } from '@/utils/verify-recaptcha';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

transporter.verify((err) => {
  if (err) console.error('[SMTP] Connection failed:', err.message);
  else console.log('[SMTP] Gmail ready to send');
});

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const stripLineBreaks = (str) => str.replace(/[\r\n]+/g, ' ').trim();

const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f5f7fa; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(135deg,#054bad,#008080); padding:24px 30px;">
        <h2 style="color:#fff; margin:0; font-size:20px;">New Portfolio Message</h2>
        <p style="color:rgba(255,255,255,0.75); margin:4px 0 0; font-size:13px;">from venkatraman-nagarajan.vercel.app</p>
      </div>
      <div style="padding:28px 30px;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <tr><td style="padding:8px 0; color:#888; font-size:13px; width:80px;">From</td><td style="padding:8px 0; font-weight:600; color:#111;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0; color:#888; font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#054bad;">${escapeHtml(email)}</a></td></tr>
        </table>
        <div style="background:#f8f9fb; border-left:4px solid #054bad; border-radius:4px; padding:16px 20px;">
          <p style="margin:0; color:#333; line-height:1.7; font-size:14px; white-space:pre-wrap;">${escapeHtml(userMessage)}</p>
        </div>
        <p style="margin-top:24px; font-size:12px; color:#aaa;">Hit reply to respond directly to ${escapeHtml(name)}.</p>
      </div>
    </div>
  </div>
`;

export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, message, website, recaptchaToken } = await request.json();

    // Honeypot: real users never fill this hidden field, bots usually do.
    if (website) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 100 || message.length > 500) {
      return NextResponse.json({ success: false, message: 'Input is too long.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json({ success: false, message: 'Captcha verification failed.' }, { status: 400 });
    }

    if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
      return NextResponse.json({ success: false, message: 'Email service not configured.' }, { status: 500 });
    }

    const safeName = stripLineBreaks(name);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_ADDRESS}>`,
      to: process.env.EMAIL_ADDRESS,
      replyTo: email,
      subject: `[Portfolio] New message from ${safeName}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: generateEmailTemplate(name, email, message),
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error.message);
    return NextResponse.json({ success: false, message: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
