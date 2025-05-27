# Script para iniciar tanto la API como el frontend

Write-Host "Iniciando WhatsApp API con Supabase Frontend" -ForegroundColor Cyan

# Iniciar el servidor API
Write-Host "Iniciando el servidor API en el puerto 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot\Baileys-2025-Rest-API-main'; npm run start:minimal" -WindowStyle Normal

# Esperar un momento para que la API inicie
Start-Sleep -Seconds 3

# Iniciar el frontend
Write-Host "Iniciando el frontend en el puerto 3005..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command cd '$PSScriptRoot\frontend'; `$env:PORT = '3005'; npm start" -WindowStyle Normal

# Abrir el navegador
Start-Sleep -Seconds 5
Write-Host "Abriendo el navegador..." -ForegroundColor Green
Start-Process "http://localhost:3005/login"

Write-Host "¡Listo! La aplicación está en ejecución." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3005" -ForegroundColor White
Write-Host "API: http://localhost:3001/api" -ForegroundColor White
Write-Host "Credenciales de prueba:" -ForegroundColor White
Write-Host "  - Email: test@example.com" -ForegroundColor White
Write-Host "  - Contraseña: password" -ForegroundColor White
Write-Host "Presiona Ctrl+C en cada ventana cuando quieras detener los servidores." -ForegroundColor Yellow
