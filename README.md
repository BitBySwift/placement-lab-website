# Placement Lab Website

A production-ready career guidance and job placement platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Quick Start (VS Code)

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → [nodejs.org](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **VS Code** → [code.visualstudio.com](https://code.visualstudio.com/)

### 1. Clone the repository

```bash
git clone https://github.com/BitBySwift/placement-lab-website.git
cd placement-lab-website
```

### 2. Open in VS Code

```bash
code .
```

VS Code will suggest installing the recommended extensions automatically. Click **Install All**.

### 3. Install dependencies

Open the integrated terminal in VS Code (**Terminal → New Terminal**) and run:

```bash
npm install
```

### 4. Set up environment variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your API keys (see [Environment Variables](#-environment-variables) below).

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
placement-lab-website/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── api/
│   │   │   ├── auth/           # send-otp, verify-otp, logout
│   │   │   ├── courses/        # course by ID
│   │   │   ├── emails/         # welcome email
│   │   │   ├── payments/       # create-order, verify-payment
│   │   │   ├── user/           # profile, enrollments
│   │   │   └── webhooks/       # razorpay webhook
│   │   ├── about/
│   │   ├── contact/
│   │   ├── courses/
│   │   │   └── [id]/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable React components
│   ├── contexts/               # AuthContext, CartContext
│   ├── hooks/                  # useAuth, useCountdown, useFetch
│   ├── services/               # authService, emailService, paymentService, etc.
│   ├── styles/                 # globals.css
│   ├── types/                  # TypeScript interfaces
│   └── utils/                  # constants, razorpay helpers
├── .env.example                # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Your app URL (default: `http://localhost:3000`) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase project config (for OTP auth) |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay Key (used on frontend) |
| `SMTP_HOST` | SMTP server host (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP email address |
| `SMTP_PASS` | SMTP app password |
| `EMAIL_FROM` | Sender email address |

> **Note:** The site works without credentials in development — payment and email features will show errors until keys are added.

---

## 🧰 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type check |

---

## 🎨 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer-motion.com/) | Animations |
| [React Hot Toast](https://react-hot-toast.com/) | Notifications |
| [Razorpay](https://razorpay.com/) | Payment gateway |
| [Nodemailer](https://nodemailer.com/) | Email service |

---

## 📄 Pages

| Page | URL |
|---|---|
| Home | `/` |
| All Courses | `/courses` |
| Course Detail | `/courses/[id]` (1–4) |
| Dashboard | `/dashboard` |
| About | `/about` |
| Contact | `/contact` |

---

## 🔧 Setting Up Third-Party Services

### Razorpay (Payments)
1. Create an account at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys** and generate a key pair
3. Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID` to `.env.local`

### Email (SMTP)
1. For Gmail: enable 2FA, then generate an **App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Add your Gmail and the app password to `SMTP_USER` and `SMTP_PASS`

---

## 📝 License

MIT — feel free to use, modify, and distribute.
