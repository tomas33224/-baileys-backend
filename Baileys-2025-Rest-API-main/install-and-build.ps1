# Script para instalar dependencias y compilar el proyecto

Write-Host "Comenzando instalación y compilación del proyecto Baileys-2025-Rest-API..." -ForegroundColor Cyan

# Paso 1: Instalar dependencias con --legacy-peer-deps
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Paso 2: Crear directorio dist si no existe
if (-not (Test-Path -Path ".\dist")) {
    Write-Host "Creando directorio dist..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path ".\dist"
}

# Paso 3: Intentar compilar el proyecto
Write-Host "Compilando el proyecto con TypeScript..." -ForegroundColor Yellow
npm run build

# Paso 4: Verificar si la compilación fue exitosa
if (Test-Path -Path ".\dist\app.js") {
    Write-Host "Compilación exitosa. Puedes iniciar la aplicación con 'npm start'" -ForegroundColor Green
} else {
    Write-Host "La compilación falló. Puedes usar la versión mínima con 'npm run start:minimal'" -ForegroundColor Red
}

Write-Host "Proceso completado." -ForegroundColor Cyan
