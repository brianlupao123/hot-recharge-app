# HOT Recharge Next-Gen Mobile Application & API Gateway

<div align="center">

![HOT Recharge](https://img.shields.io/badge/HOT_Recharge-V3_API-E51937?style=for-the-badge&logo=fire&logoColor=white)
![CSZ Hackathon](https://img.shields.io/badge/CSZ_Hackathon-2026_National_Finalist-0A2540?style=for-the-badge&logo=shield&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-Expo_55-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-TypeScript_Enterprise_Gateway-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android_%7C_iOS_%7C_Web-orange?style=for-the-badge)

**"YOUR CODE. THE NEXT RECHARGE."**  
*An enterprise-grade, nationwide-scalable, offline-resilient utility & airtime platform built for the Computer Society of Zimbabwe (CSZ) Hackathon 2026 powered by HOT Recharge.*  

**🌐 Live Public Deployment (Vercel Production):** [https://hot-recharge-zimbabwe.vercel.app](https://hot-recharge-zimbabwe.vercel.app)

</div>

---

## 🏆 Key Architectural Innovations & Production Features

1. **Official HOT Recharge V3 API Integration:**
   - Full implementation of `https://ssl.hot.co.zw/api/v3/` specifications:
   - ZETDC Prepaid Electricity (`ProductId: 41` USD / `ProductId: 24` ZiG)
   - Econet Wireless Airtime (`ProductId: 101` USD / `ProductId: 7` ZiG)
   - NetOne Cellular Airtime (`ProductId: 102`)
   - Telecel Zimbabwe Airtime (`ProductId: 103` USD / `ProductId: 6` ZiG)
   - Official MNO Data & WhatsApp Bundles (`ProductId: 111`)

2. **Atomic UI Design System & Component Reuse:**
   - Reusable UI primitives in `src/components/ui/`: `<Container>`, `<Card>`, `<Button>`, `<Badge>`, `<Input>`, `<Tabs>`, `<PageHeader>`, `<KpiCard>`, and `<DataRow>`.
   - Domain-driven subcomponent architecture (`src/components/zesa/`, `src/components/airtime/`, `src/components/wallet/`, `src/components/analytics/`, `src/components/fleet/`, `src/components/dashboard/`, `src/components/vault/`).
   - Externalized style modules (`*.styles.ts`), eliminating monolithic screen files and inline style spaghetti.

3. **Store-and-Forward Outbox Pattern (Nationwide Offline Resiliency):**
   - Engineered specifically for Zimbabwe's intermittent cellular networks and grid blackouts.
   - When network drops occur, transactions are securely queued in `@hot_recharge_offline_outbox` while encrypted tokens and receipts are committed to the **Encrypted Offline Token Vault** (`@hot_recharge_offline_vault`).
   - Once connectivity is restored, the client automatically synchronizes queued records with the API Gateway.

4. **Zero-Corruption Atomic File Persistence & Ledger Engine:**
   - Database operations in `server/src/services/database.ts` write to a temporary file before performing an atomic operating-system rename (`saveDirect`).
   - Eliminates database corruption risks during abrupt container shutdowns or power outages.
   - In-memory concurrency locks prevent balance double-spending and ledger race conditions.

5. **Two-Stage Idempotent Reservation & Double-Billing Prevention:**
   - Implements native HOT Recharge V3 `MakeReservation` and `Complete Reserved Recharge` protocols.
   - Every transaction accepts a deterministic `agentReference`. If a network retry occurs, the API Gateway detects the duplicate and returns the existing fulfilled transaction without re-debiting.

6. **OWASP Hardened Security & Rate Limiting:**
   - Security headers enforced: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and HSTS.
   - IP-based sliding-window rate limiting (120 requests/minute per client IP) prevents brute-force credential stuffing and API exhaustion.
   - PBKDF2 with SHA-256 (10,000 iterations) and per-user unique salt PIN cryptography.
   - Stateless HMAC-SHA256 session tokens with 30-day expiries.

7. **ZIMRA S.I. 127 Fiscal Tax Compliance Engine:**
   - Automated 15% VAT calculation and breakdown across USD and Zimbabwe Gold (ZiG).
   - Generates formal fiscal tax invoices with 1-tap clipboard copying, WhatsApp/SMS sharing, and printing support.

8. **ORAC Multi-Property Meter Fleet Manager:**
   - Commercial property management console for landlords, estates, and organizations.
   - Consolidates distributed meters with live kWh balance indicators into a 1-tap batch settlement cart.

9. **Merchant & Reseller Agent Point-of-Sale (POS):**
   - Commercial walk-in voucher dispenser with live till float tracking and tiered automated commission crediting (2.5% airtime, 1.5% electricity, 2.0% broadband).

10. **Application-Wide React Error Boundary:**
    - Root `<ErrorBoundary>` prevents unhandled runtime exceptions from crashing the mobile or web application, displaying an isolated recovery UI while safeguarding the offline vault.

---

## 🧭 System Architecture Diagram

```
                                  HOT RECHARGE ENTERPRISE ARCHITECTURE
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                              MULTI-PLATFORM CLIENT RUNTIMES                            │
 │   ┌──────────────────────────┐   ┌──────────────────────────┐   ┌──────────────────┐   │
 │   │  Android (.apk / AAB)    │   │   iOS (IPA / TestFlight) │   │ Live Web Preview │   │
 │   │  (React Native + Expo)   │   │  (React Native + Expo)   │   │ (Vercel Prod)    │   │
 │   └─────────────┬────────────┘   └─────────────┬────────────┘   └────────┬─────────┘   │
 └─────────────────┼──────────────────────────────┼─────────────────────────┼─────────────┘
                   │                              │                         │
                   ▼                              ▼                         ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                           OFFLINE-FIRST CLIENT RESILIENCE LAYER                        │
 │  • Store-and-Forward Outbox Queue (@hot_recharge_offline_outbox)                       │
 │  • Encrypted Local Token Vault (HMAC-verified 20-digit ZESA tokens & receipts)         │
 │  • Root <ErrorBoundary> (zero white-screen crashes)                                    │
 │  • Atomic Design System: <Container>, <Card>, <Button>, <PageHeader>, <KpiCard>        │
 └────────────────────────────────────────┬───────────────────────────────────────────────┘
                                          │ HTTPS / WSS
                                          ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                           CORE BACKEND & SECURITY GATEWAY                              │
 │  ┌───────────────────────┐  ┌────────────────────────┐  ┌───────────────────────────┐  │
 │  │ OWASP Security & HSTS │  │ Sliding-Window Limiter │  │ Idempotency Engine        │  │
 │  │ (PBKDF2, HMAC Auth)   │  │ (120 req/min per IP)   │  │ (AgentReference Dedup)    │  │
 │  └───────────┬───────────┘  └───────────┬────────────┘  └─────────────┬─────────────┘  │
 └──────────────┼──────────────────────────┼─────────────────────────────┼────────────────┘
                │                          │                             │
                ▼                          ▼                             ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                          HOT RECHARGE V3 ADAPTER & LEDGER ENGINE                       │
 │  • Atomic Tempfile Write + Rename Engine (hot_recharge_ledger.json)                    │
 │  • Production Driver: Direct integration with HOT Recharge V3 REST API                 │
 │  • Multi-Currency Treasury: USD and Zimbabwe Gold (ZiG) instant settlement             │
 │  • Automated ZIMRA S.I. 127 15% VAT calculation and fiscal audit trail                 │
 └────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Quickstart & Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) v18+ installed on your machine.
* PowerShell (Windows) or Terminal (macOS/Linux).

### Method 1: Automated Windows PowerShell Bootstrap (Recommended)
Open PowerShell, navigate to this project, and run:
```powershell
.\start.ps1
```
*This script automatically verifies Node.js, installs server and mobile dependencies, launches the backend on `http://localhost:5000`, and opens the interactive mobile/web preview on `http://localhost:8081`!*

### Method 2: Manual Step-by-Step

#### 1. Start the API Gateway Server
```bash
cd server
npm install
npm run dev
```
*Server runs at `http://localhost:5000`.*
*Health check: `http://localhost:5000/api/health`.*
*Live test suite: `npm test`.*

#### 2. Start the Mobile Client (Expo 55)
```bash
cd mobile
npm install
npm run web
```
*Interactive mobile web application launches in your default browser at `http://localhost:8081`.*

---

## 📂 Repository Directory Layout

```
hot-recharge-app/
├── mobile/                      # Cross-Platform React Native (Expo 55) App
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Atomic UI Primitives (Button, Card, Badge, Input, Tabs,
│   │   │   │                    # Container, PageHeader, KpiCard, DataRow)
│   │   │   ├── landing/         # Modular landing components (Navbar, Hero, Grid, Stepper, Footer)
│   │   │   ├── zesa/            # MeterVerificationCard, TariffOptimizerCard, PaymentRailSelector,
│   │   │   │                    # TokenSuccessModal, zesa.styles.ts
│   │   │   ├── airtime/         # CarrierInputCard, AirtimeAmountCard, BundlePackageList, airtime.styles.ts
│   │   │   ├── wallet/          # WalletBalanceGrid, DepositFormCard, AccountProfileCard, wallet.styles.ts
│   │   │   ├── analytics/       # CategoryBreakdownCard, FiscalInvoiceCard, analytics.styles.ts
│   │   │   ├── fleet/           # MeterFleetItem.tsx
│   │   │   ├── dashboard/       # DashboardHeader, WalletBalanceBanner, ServiceGrid, EnterpriseSystemsGrid
│   │   │   ├── vault/           # VaultTokenCard.tsx
│   │   │   └── ErrorBoundary.tsx# Production React Error Boundary
│   │   ├── context/             # AuthContext.tsx, WalletContext.tsx (Global State)
│   │   ├── hooks/               # useResponsive.ts (Breakpoint management)
│   │   ├── navigation/          # AppNavigator.tsx (Stack & Bottom Tabs)
│   │   ├── screens/             # Concise coordinators (Dashboard, ZESA, Airtime, Vault,
│   │   │                        # Wallet, Fleet, Analytics, Agent, Landing, Login)
│   │   ├── services/            # api.ts (Outbox Queue, Bearer Auth, Offline Vault), auth.ts
│   │   ├── theme/               # tokens.ts (Semantic Token Dictionary), theme.ts
│   │   └── types/               # TypeScript domain interfaces
│   ├── app.json                 # Expo native application configuration
│   └── package.json
│
├── server/                      # Enterprise API Gateway & HOT Recharge V3 Simulator
│   ├── src/
│   │   ├── adapters/            # HotRechargeV3Adapter (Live REST + Sandbox Mock)
│   │   ├── routes/              # /api/v3/ (products, customer, recharge, reserve), /api/auth/
│   │   ├── services/            # database.ts (Atomic Write, Mutex, PBKDF2), mockData.ts
│   │   ├── types/               # TypeScript interfaces matching official HOT V3 specs
│   │   ├── __tests__/           # Jest & Node test suite (11/11 passing tests)
│   │   └── server.ts            # Express app with WebSockets, OWASP headers, Rate Limiting
│   ├── data/                    # hot_recharge_ledger.json (Persistent JSON database)
│   ├── Dockerfile
│   └── package.json
│
├── docs/                        # Complete Competition Deliverables Suite
│   ├── PRD_AND_SPECIFICATION.md # Full Product Requirement Document
│   ├── ARCHITECTURE.md          # Architecture diagrams & sequence flows
│   └── ENTRY_GUIDE_ALIGNMENT.md # CSZ Hackathon rubric mapping & pitch script
│
├── docker-compose.yml           # Container orchestration
├── start.ps1                    # One-click Windows PowerShell bootstrap script
└── README.md                    # This master overview
```

---

## 🧪 Testing & Verification

Run the automated backend test suite:
```bash
cd server
npm test
```
*Verifies stepped Lifeline tariffs, 20-digit token formatting, carrier prefix routing, two-stage idempotent reservation, and PBKDF2 user authentication.*

---

<div align="center">
<b>Authored by Brian Lupao (Africa University)</b><br>
<i>Department of Computer Science & IT • College of Engineering & Applied Sciences</i><br>
<i>Submitted for the Computer Society of Zimbabwe (CSZ) Hackathon 2026</i><br>
<b>"YOUR CODE. THE NEXT RECHARGE."</b>
</div>
