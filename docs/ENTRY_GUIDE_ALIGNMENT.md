# CSZ Hackathon 2026 - Entry Guide Alignment & Judging Rubric

**Event:** HOT Recharge App Competition / CSZ Hackathon 2026  
**Organizers:** Computer Society of Zimbabwe (CSZ) & HOT Recharge  
**Prize:** $1,000 USD  
**Submission Category:** Cross-Platform Mobile Application (Android & iOS)  
**Applicant:** Brian Lupao (Africa University)  

---

## 1. Direct Alignment to Judging Criteria

| Judging Criterion | Required Benchmark | Our Implementation & Evidence |
| :--- | :--- | :--- |
| **1. HOT Recharge V3 API Integration** | Seamless connection to HOT Recharge endpoints for Airtime, Bundles, and ZESA. | • Implements official `https://ssl.hot.co.zw/api/v3/` contract.<br>• Complete support for `ProductId: 41` (ZETDC USD), `24` (ZETDC ZiG), `101` (Econet), `102` (NetOne), `103` (Telecel), and `111` (Bundles).<br>• Supports customer verification (`/query/customer/{ProductId}/{AccountNumber}`). |
| **2. Cross-Platform Deliverables (Android & iOS)** | Build working Android and iOS apps. | • Single unified codebase in **React Native (Expo 55)**.<br>• Compiles natively to **Android APK** and **iOS** via EAS.<br>• Exports a **Live Web Preview** for zero-friction browser evaluation by judges. |
| **3. Real-World Relevance & Problem Solving** | Addresses real challenges faced by Zimbabwean consumers. | • **Encrypted Offline Token Vault:** Solves lost ZESA tokens during load-shedding and blackouts.<br>• **Lifeline Tariff Calculator:** Displays estimated KWh units before payment.<br>• **Two-Stage Reserved Recharge:** Prevents double-charging during EcoCash network delays. |
| **4. UI/UX Excellence & Brand Identity** | Modern, intuitive, accessible, and aligned with HOT Recharge branding. | • Adheres to official HOT Recharge Flame Red (`#E51937`) and Tagline Gold (`#F5A623`).<br>• OLED Midnight dark mode optimized for mobile battery saving.<br>• 1-Tap Copy and formatted WhatsApp/SMS sharing. |
| **5. Technical Architecture & Engineering Maturity** | Scalable, clean, production-ready codebase. | • Layered architecture: Clean separation of presentation, local storage, API gateway, and external adapters.<br>• Full TypeScript typing end-to-end.<br>• One-click deployment script (`start.ps1`) and containerization. |

---

## 2. Submission Pitch Script (For Round 1 & Round 2 Presentations)

> *"Distinguished judges, representatives from the Computer Society of Zimbabwe, and the HOT Recharge engineering team:*
>
> *Every Zimbabwean knows the frustration of buying electricity tokens in the dark during a power blackout, only for the internet to drop before the SMS arrives. Or having an EcoCash prompt timeout, leaving you wondering if you were charged.*
>
> *We built the next-generation **HOT Recharge Mobile App** not just as a store, but as a resilient lifeline. Powered by the official **HOT Recharge V3 API**, our application introduces the **Encrypted Offline Token Vault**—ensuring that every 20-digit token is permanently accessible on the customer's phone with zero internet connection.*
>
> *With live meter verification, stepped Lifeline tariff estimations, automatic network operator detection, and two-stage reserved recharge idempotency, this application sets a new national standard for fintech reliability in Zimbabwe."*
