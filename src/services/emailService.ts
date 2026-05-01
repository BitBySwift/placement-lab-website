import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Placement Lab" <noreply@placementlab.com>',
      ...options,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  courseTitle: string
): Promise<boolean> {
  const subject = 'Welcome to Placement Lab 🚀';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #fff; padding: 40px; border-radius: 12px;">
      <h1 style="color: #22c55e; margin-bottom: 20px;">Welcome to Placement Lab! 🎉</h1>
      <p style="color: #94a3b8; margin-bottom: 16px;">Hi ${name || 'there'},</p>
      <p style="color: #94a3b8; margin-bottom: 16px;">
        Thank you for enrolling in <strong style="color: #fff;">${courseTitle}</strong>.
        Your journey to a successful career starts now!
      </p>
      <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #22c55e; margin-bottom: 12px;">What's Next?</h3>
        <ul style="color: #94a3b8; padding-left: 20px; line-height: 1.8;">
          <li>Access your course dashboard</li>
          <li>Complete your profile</li>
          <li>Join our WhatsApp community for daily updates</li>
          <li>Start your first module</li>
        </ul>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
         style="display: inline-block; background: #22c55e; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
        Go to Dashboard →
      </a>
      <p style="color: #475569; margin-top: 32px; font-size: 14px;">
        Best regards,<br/>The Placement Lab Team
      </p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  const subject = 'Your Placement Lab OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #fff; padding: 40px; border-radius: 12px;">
      <h1 style="color: #22c55e; margin-bottom: 20px;">Your OTP Code</h1>
      <p style="color: #94a3b8; margin-bottom: 24px;">Use the following OTP to verify your identity:</p>
      <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #22c55e;">${otp}</span>
      </div>
      <p style="color: #94a3b8; font-size: 14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
