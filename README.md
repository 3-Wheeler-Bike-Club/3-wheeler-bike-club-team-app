# 3WB Team App

A Next.js 14 TypeScript application for 3 wheeler bike club team to run hire-purchase management, including driver registration, order assignment, and member profiles.

## 🚀 Features

- **User Authentication** via Privy for secure sign-up and login
- **Driver Registration**: Register new drivers using on-chain attestation schemas
- **Order Management**: View, create, and assign ride orders to drivers
- **Profile Dashboard**: View and update user profile, membership badges, and credit scores
- **Real-time Data Fetching** with React Query
- **Interactive Tables** using TanStack React Table
- **Wallet Integration** with Vaul SDK, Wagmi, and Viem for on-chain operations
- **UI Components** built with Radix UI, Tailwind CSS, and Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript, React 18
- **Styling**: Tailwind CSS, twin.macro
- **State & Data**: React Query, Zod for schema validation
- **UI**: Radix UI components, Lucide Icons, Framer Motion
- **Auth**: @privy-io/react-auth & server-auth for user authentication
- **Blockchain**: Sign Protocol SDK, Wagmi, Viem for Celo integration
- **Backend**: Next.js API routes + Node.js
- **Database**: MongoDB via Mongoose for backend persistence

## 🔧 Prerequisites

- Node.js v18+ and npm or yarn
- MongoDB connection URI
- Celo private key for on-chain transactions
- Privy App IDs & Secrets
- Sign Protocol schema IDs for attestation and badges

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/3-Wheeler-Bike-Club/3-wheeler-bike-club-team-app.git
   cd 3-wheeler-bike-club-team-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn
   ```

3. **Environment Variables**
   Create a `.env.local` in the project root with the following keys:
   ```dotenv
   # Next.js
   NEXT_PUBLIC_PROJECT_ID=<your_project_id>
   NEXT_PUBLIC_PRIVY_APP_ID=<your_privy_auth_app_id>
   NEXT_PUBLIC_MEMBER_BADGE_SCHEMA_ID=<member_badge_schema_id>
   NEXT_PUBLIC_OWNER_PINK_SLIP_SCHEMA_ID=<owner_pink_slip_schema_id>
   NEXT_PUBLIC_HIRE_PURCHASE_SCHEMA_ID=<hire_purchase_schema_id>
   NEXT_PUBLIC_HIRE_PURCHASE_INVOICE_SCHEMA_ID=<hire_purchase_invoice_schema_id>
   NEXT_PUBLIC_HIRE_PURCHASE_CREDIT_SCORE_SCHEMA_ID=<credit_score_schema_id>

   # Server & Database
   MONGO=<your_mongodb_connection_string>
   BASE_URL=http://localhost:3000
   WHEELER_API_KEY=<your_wheeler_api_key>
   PRIVY_APP_SECRET=<your_privy_auth_secret>
   PRIVY_MEMBERS_APP_ID=<members_privy_app_id>
   PRIVY_MEMBERS_APP_SECRET=<members_privy_app_secret>
   # Blockchain
   PRIVATE_KEY=0x<your_celo_private_key>
   ATTEST_PRIVATE_KEY=0x<attestation_private_key>
   ATTESTER=0x<attester_address>
   ```

4. **Run in development**
   ```bash
   npm run dev
   # or yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```bash
/
├── app/                   # Next.js App Router (pages & API routes)
│   ├── api/               # RESTful routes: assign, drivers, orders, profile, register
│   ├── drivers/           # Driver management pages
│   ├── orders/            # Order listing and assignment pages
│   ├── profile/           # User profile and badge display
│   ├── register/          # Registration flow
│   ├── assign/            # Assignment UI
│   ├── layout.tsx         # Global layout and providers
│   └── page.tsx           # Landing page wrapper
├── components/            # Shared UI components and layouts
├── hooks/                 # Custom React hooks (e.g., useTeam, useOrders)
├── lib/                   # Library code (e.g., blockchain clients)
├── model/                 # Mongoose models (Driver, Order, User)
├── providers/             # Context providers (Auth, QueryClient)
├── utils/                 # Utilities (validation, formatters)
├── public/                # Static assets (images, icons)
├── environment.d.ts       # Type definitions for process.env
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project manifest
```

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repo and create a branch (`git checkout -b feature/...`).
2. Commit your changes with clear messages.
3. Open a Pull Request and reference any related issues.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
```

