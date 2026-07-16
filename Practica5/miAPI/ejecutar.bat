@echo off
cd /d "%~dp0"
docker compose up -d
start http://localhost:5000/docs
exit