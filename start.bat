@echo off
cd /d "%~dp0"

echo Starting the Django backend server...
call .\myenv\Scripts\activate
cd backend
start /b python manage.py runserver
cd ..

echo Starting the React frontend server...
cd frontend
npm start

pause