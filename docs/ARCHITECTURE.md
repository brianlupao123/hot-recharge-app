# System Architecture & Technical Design

**Project:** HOT Recharge Next-Gen Mobile Application  
**Competition:** Computer Society of Zimbabwe (CSZ) Hackathon 2026  
**Architect:** Brian Lupao  

---

## 1. High-Level System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Presentation Layer (Android, iOS & Web)"]
        UI["React Native + Expo App"]
        NAV["Bottom Tab & Stack Navigator"]
        THEME["HOT Recharge & CSZ Design Tokens"]
    end

    subgraph OfflineResilience ["Offline-First Resilience Layer"]
        VAULT[("Encrypted Local Vault (AsyncStorage / SQLite)")]
        CACHE["Customer & Meter Directory Cache"]
        FAVS["1-Tap Quick Favorites Store"]
    end

    subgraph GatewayLayer ["API Gateway & Push Server (Node / Express)"]
        AUTH["Auth & Device Binding"]
        WS["WebSocket Push Gateway"]
        IDEM["Idempotency & Reservation Manager"]
    end

    subgraph AdapterLayer ["HOT Recharge V3 Integration Layer"]
        ADAPT["HotRechargeV3Adapter"]
        LIVE["Official Hot API V3 Client (HTTPS)"]
        MOCK["Realistic Sandbox Mock Engine"]
    end

    subgraph ExternalRails ["External Zimbabwe Payment & Telecom Rails"]
        ZETDC["ZETDC Prepaid Electricity Host"]
        MNO["Mobile Network Operators (Econet / NetOne / Telecel)"]
        MM["Mobile Money Rails (EcoCash / OneMoney / InnBucks)"]
    end

    UI --> NAV
    NAV --> THEME
    UI <--> VAULT
    UI <--> CACHE
    UI <--> FAVS

    UI <== "HTTPS / WSS" ==> GatewayLayer
    GatewayLayer --> ADAPT
    ADAPT --> LIVE
    ADAPT --> MOCK

    LIVE --> ZETDC
    LIVE --> MNO
    LIVE --> MM
```

---

## 2. Two-Stage "Reserved Recharge" Flow

The HOT Recharge V3 API natively supports two-stage transactions to safeguard against delayed mobile money USSD callbacks:

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer / Mobile App
    participant App as Mobile Client
    participant GW as API Gateway
    participant Hot as HOT Recharge V3 API
    participant Eco as EcoCash / OneMoney Rail

    User->>App: Enters Meter 04192837461 & $20 USD
    App->>GW: GET /customer/41/04192837461
    GW->>Hot: GET /query/customer/41/04192837461
    Hot-->>GW: Return "Brian Lupao, Stand 448 Fairview"
    GW-->>App: Display Verified Customer Card

    User->>App: Confirms Payment via EcoCash
    App->>GW: POST /recharge/reserve (MakeReservation: true)
    GW->>Hot: POST /recharge/product (MakeReservation: true)
    Hot-->>GW: Status RESERVED (AgentReference: APP-9921)
    GW-->>App: Display "Awaiting Payment Prompt..."

    GW->>Eco: Push USSD Prompt to Mobile Handset
    User->>Eco: Enters Mobile Money PIN on Handset
    Eco-->>GW: Webhook: Payment Settled Successfully ($20.00)

    GW->>Hot: POST /recharge/complete (AgentReference: APP-9921)
    Hot-->>GW: Status SUCCESS (Token: 4921-8832-1094-5531-2849, Units: 114.5 kWh)
    GW-->>App: WebSocket Push: "Token Dispensed!"
    App->>App: Commit Token & Receipt to Offline Vault
    App-->>User: Display High-Contrast 20-digit Keypad Screen
```

---

## 3. Security, Offline Resilience & Idempotency

### 3.1 Idempotency & Agent References
Each transaction generates an enterprise agent reference conforming to the official HOT Recharge V3 specification:
$$\text{Reference Format: } \text{HR-CBD01-APP-}[\text{Timestamp}]-[\text{UUID}]$$
This reference is tracked across the reservation, payment verification, and completion phases, preventing double charges in the event of packet loss or cellular reconnection.

### 3.2 Offline Token Storage
* Local storage uses persistent key-value mapping indexed by transaction reference and target meter number.
* Upon receiving a token response, the mobile client executes an asynchronous atomic write to local storage before presenting the token dialog.
* Users can open the **Offline Vault** at any time—even while airplane mode is active or when cellular towers are down during blackouts.

---

## 4. Design System Tokens & Typography

* **Primary Colors:** Flame Red (`#E51937`), Tagline Gold (`#F5A623`), CSZ Deep Navy (`#0A2540`).
* **Dark Background:** OLED Midnight (`#0D0F12`).
* **Surfaces:** Elevated Slate (`#1A1D24`, `#242832`).
* **Typography:** Clean sans-serif for UI navigation; Monospace 20px with 1.5 character spacing for the 20-digit token numbers.
