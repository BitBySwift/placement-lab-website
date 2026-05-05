# Placement Lab Website

A modern, job-oriented learning platform built with Next.js 14, TypeScript, Tailwind CSS, Firebase, and Razorpay.

## 🚀 Features

- **OTP-based Authentication** via Firebase Phone Auth
- **Course Catalog** with 4 career packs (Essential, Professional, Advanced, Job Guaranteed)
- **Razorpay Payment Integration** with order creation & signature verification
- **User Dashboard** with enrolled courses and purchase history
- **Glassmorphism UI** with Framer Motion animations
- **Countdown Timer** for limited-time deals
- **Mobile-responsive** layout with animated navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom glassmorphism utilities
- **Auth**: Firebase Phone Auth (OTP)
- **Database**: Firestore (Firebase)
- **Payments**: Razorpay
- **State**: Zustand (with persistence)
- **Animations**: Framer Motion
- **Toasts**: react-hot-toast

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Firebase and Razorpay credentials in `.env.local`.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `RAZORPAY_KEY_ID` | Razorpay key ID (server-side) |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret (server-side) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID (client-side) |
| `EMAIL_USER` | Gmail address for Nodemailer |
| `EMAIL_PASS` | Gmail app password |
| `NEXT_PUBLIC_APP_URL` | Your app URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for contact |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/          # API routes (auth, payment, user)
│   ├── auth/         # Auth page
│   ├── courses/      # Course detail pages
│   ├── dashboard/    # User dashboard
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Page sections
│   └── ui/           # Reusable UI components
├── lib/              # Firebase config
├── store/            # Zustand stores
├── styles/           # Global CSS
├── types/            # TypeScript types
└── utils/            # Constants, helpers
```

## 🏗️ Build

```bash
npm run build
```

## ⚠️ Disclaimer

The "Pay After Placement" model and salary guarantee for the Job Guaranteed Program are subject to terms and conditions. Results may vary based on individual effort and market conditions.
