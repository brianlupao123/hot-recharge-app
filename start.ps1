# ==============================================================================
#  HOT RECHARGE NEXT-GEN MOBILE & API GATEWAY - ONE-CLICK STARTUP SCRIPT
#  Computer Society of Zimbabwe (CSZ) Hackathon 2026
#  Author: Brian Lupao (Africa University)
# ==============================================================================

Write-Host ""
Write-Host "======================================================================" -ForegroundColor Red
Write-Host "  HOT RECHARGE - YOUR CODE. THE NEXT RECHARGE." -ForegroundColor Yellow
Write-Host "  CSZ Hackathon 2026 - Production System Bootstrap" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Red
Write-Host ""

$ROOT_DIR = $PSScriptRoot
$SERVER_DIR = Join-Path $ROOT_DIR "server"
$MOBILE_DIR = Join-Path $ROOT_DIR "mobile"

# Step 1: Verify Node.js
Write-Host "[1/4] Checking Node.js runtime..." -ForegroundColor Cyan
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed or not in PATH. Please install Node.js 18+ to proceed." -ForegroundColor Red
    Exit 1
}
$nodeVersion = node -v
Write-Host "  ✓ Found Node.js $nodeVersion" -ForegroundColor Green

# Step 2: Install Server Dependencies
Write-Host "[2/4] Setting up API Gateway & Simulator Server..." -ForegroundColor Cyan
Set-Location $SERVER_DIR
if (!(Test-Path "node_modules")) {
    Write-Host "  Installing server packages..." -ForegroundColor Yellow
    npm install --silent
} else {
    Write-Host "  ✓ Server dependencies already installed." -ForegroundColor Green
}

# Step 3: Install Mobile Dependencies
Write-Host "[3/4] Setting up Mobile (Expo 55) Application..." -ForegroundColor Cyan
Set-Location $MOBILE_DIR
if (!(Test-Path "node_modules")) {
    Write-Host "  Installing mobile packages..." -ForegroundColor Yellow
    npm install --silent
} else {
    Write-Host "  ✓ Mobile dependencies already installed." -ForegroundColor Green
}

# Step 4: Launch Systems
Write-Host "[4/4] Launching Systems..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  -> Starting Backend API Gateway on http://localhost:5000" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$SERVER_DIR'; npm run dev"

Start-Sleep -Seconds 2

Write-Host "  -> Starting Mobile App (Web & Native) on http://localhost:8081" -ForegroundColor Yellow
Write-Host ""
Write-Host "======================================================================" -ForegroundColor Green
Write-Host "  SYSTEM READY!" -ForegroundColor Green
Write-Host "  - API Health: http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  - Mobile Web: http://localhost:8081" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Green
Write-Host ""

Set-Location $MOBILE_DIR
npm run web
