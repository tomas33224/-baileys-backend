# Script para iniciar tanto el frontend como el backend

Write-Host "Iniciando WhatsApp API y Frontend..." -ForegroundColor Cyan

# Función para verificar que Node.js esté instalado
function Check-NodeInstalled {
    try {
        $nodeVersion = node -v
        Write-Host "Node.js encontrado: $nodeVersion" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Node.js no está instalado o no está en el PATH" -ForegroundColor Red
        return $false
    }
}

# Verificar Node.js
if (-not (Check-NodeInstalled)) {
    Write-Host "Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Iniciar el backend en segundo plano
Write-Host "Iniciando el servidor backend en el puerto 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot\Baileys-2025-Rest-API-main'; npm run start:minimal" -WindowStyle Normal

# Esperar un momento para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar el frontend
Write-Host "Iniciando el frontend en el puerto 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot\frontend'; `$env:PORT = '3000'; npm start" -WindowStyle Normal

# Abrir el navegador
Write-Host "Abriendo el navegador..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "¡Listo! La aplicación WhatsApp API está en ejecución." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend API: http://localhost:3001/api" -ForegroundColor White
Write-Host "Presiona Ctrl+C en cada ventana cuando quieras detener los servidores." -ForegroundColor Yellow
