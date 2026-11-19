# Product Requirements Document (PRD) & Technical Specification

**Project Name:** HOT Recharge Next-Generation Cross-Platform Application  
**Competition:** Computer Society of Zimbabwe (CSZ) Hackathon 2026  
**Sponsor:** HOT Recharge  
**Lead Architect & Author:** Brian Lupao (Africa University)  
**Target Platforms:** Android, iOS, and Web (React Native + Expo)  
**API Specification:** HOT Recharge V3 REST API (`https://ssl.hot.co.zw/api/v3/`)  

---

## 1. Executive Summary

In Zimbabwe's fast-paced digital economy, electronic recharge platforms must endure harsh infrastructure conditions: erratic cellular network connectivity, frequent power load-shedding, and complex multi-currency settlements (USD and Zimbabwe Gold - ZiG).

This project delivers an enterprise-grade, offline-first mobile application that connects to the **HOT Recharge V3 API** to provide instantaneous, reliable fulfillment of:
1. **ZETDC Prepaid Electricity (ZESA)** tokens with automatic meter verification and Lifeline stepped tariff calculations.
2. **Multi-Carrier Airtime** for Econet (`077/078`), NetOne (`071`), and Telecel (`073`) with automated prefix detection.
3. **Data & WhatsApp Bundles** catalog browsing and direct line top-ups.
4. **An Encrypted Offline Token Vault** guaranteeing that customers can access their 20-digit electricity tokens even during complete cellular blackouts.
5. **Multi-Rail Payments** integrating EcoCash, OneMoney, InnBucks, and an In-App Multi-Currency Wallet.

---

## 2. Market Problem Statement & Unique Value Proposition

| Traditional Problem in Zimbabwe | Our Architectural Innovation |
| :--- | :--- |
| **Lost ZESA Tokens in Blackouts:** Users buy electricity while their home is in darkness; cellular internet cuts off before the confirmation SMS arrives, leaving the customer stranded. | **Encrypted Offline Token Vault:** Every token generated is instantaneously written to local device storage (`AsyncStorage`/SQLite), viewable with zero internet connection. |
| **Double-Charging from Dropped USSD Prompts:** Network timeouts between EcoCash prompts and vendor APIs cause users to get billed twice. | **Two-Stage Reserved Recharge (`MakeReservation`):** Utilizes HOT API V3's native two-stage reservation to lock the transaction before settlement, ensuring strict idempotency. |
| **Manual Meter Input Errors in the Dark:** Typing 11 or 12 digits on a physical card in low light leads to sending electricity to a stranger's meter. | **Live Meter Verification & 1-Tap Reorder:** Queries `/query/customer/{ProductId}/{AccountNumber}` on keystroke to verify the account holder's name and address before payment. |
| **Multi-Currency Confusion:** Confusion between USD and ZiG conversion rates. | **Real-Time Dual-Currency Engine:** Instant 1-tap currency toggle (USD ⇄ ZiG) with live rate recalculation. |

---

## 3. Product Features & Functional Requirements

### 3.1 ZESA Electricity Management
* **FR-1.1 Meter Verification:** The app queries the HOT Recharge customer directory to display the account holder's name and physical address upon typing $\ge 10$ digits.
* **FR-1.2 Tariff & KWh Breakdown:** Automatically calculates estimated kilowatt-hours (kWh) according to the stepped ZETDC Lifeline tariff.
* **FR-1.3 Token Presentation:** The 20-digit token is formatted into high-contrast monospace blocks of four (`4921-8832-1094-5531-2849`).
* **FR-1.4 1-Tap Action Sheet:** Provides single-tap "Copy to Keypad" and "Share via SMS / WhatsApp" to landlords or family members.

### 3.2 Airtime & Data Bundles
* **FR-2.1 Auto-Network Detection:** Dynamically recognizes mobile operator prefixes (`077/078` for Econet, `071` for NetOne, `073` for Telecel) and highlights official carrier color badges.
* **FR-2.2 Bundle Catalogue:** Real-time retrieval and selection of WhatsApp Daily/Weekly/Monthly, SmartData, and Private WiFi bundles.
* **FR-2.3 Quick-Amount Chips:** Preset one-tap denomination chips ($1, $2, $5, $10, $20, $50).

### 3.3 Offline Token Vault
* **FR-3.1 Local Persistence:** Every completed transaction is committed to device storage with timestamp, amount, units, and receipt number.
* **FR-3.2 Search & Filter:** Instant offline search across target numbers, meter numbers, and customer names.

### 3.4 Multi-Currency In-App Wallet
* **FR-4.1 Dual Balances:** Independent USD and ZiG balances.
* **FR-4.2 Top-Up Rails:** Pushes automated payment approval prompts to EcoCash, OneMoney, or InnBucks.

---

## 4. Technology Stack Justification

* **Frontend:** React Native 0.83 + Expo 55 (TypeScript)
  * *Why:* Enables a single codebase to deploy natively to Android (`.apk`), iOS (`.ipa`), and Web (`react-native-web`) for instant browser preview during competition judging.
* **UI Design System:** React Native Paper (Material Design 3)
  * *Why:* High accessibility, customizable dark/light themes, and smooth micro-interactions.
* **Backend Gateway:** Node.js / Express 4 + TypeScript + WebSockets
  * *Why:* High-throughput asynchronous I/O, strict TypeScript contracts, and real-time event broadcasting to mobile clients.
* **Integration Adapter:** Dual-Driver Architecture (Live Hot Recharge V3 REST Client + Realistic Mock Sandbox Driver)
  * *Why:* Ensures 100% demo uptime and resilience even if external test sandbox environments experience network latency.
