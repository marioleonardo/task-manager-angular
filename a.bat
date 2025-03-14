
:: Navigate to services directory and generate a service
cd src/app/services
echo Generating Angular service...
ng g s task
if errorlevel 1 (
	echo Error: Failed to generate task service.
	pause
	exit /b 1
)

:: Navigate to models directory and create an empty file
cd ..\models
echo Creating task.model.ts...
type nul > task.model.ts
if errorlevel 1 (
	echo Error: Failed to create task.model.ts.
	pause
	exit /b 1
)

:: Go back up two levels to task-manager folder.
cd ..\..

:: Install Tailwind CSS and its dependencies
echo Installing Tailwind CSS and dependencies...
npm install -D tailwindcss postcss autoprefixer
if errorlevel 1 (
	echo Error: Failed to install Tailwind CSS dependencies.  Make sure npm is installed.
	echo Try running 'npm install' to fix potential issues, or 'npm install -g npm' to update npm.
	pause
	exit /b 1
)

:: Initialize Tailwind CSS
echo Initializing Tailwind CSS...
npx tailwindcss init -p
if errorlevel 1 (
	echo Error: Failed to initialize Tailwind CSS.
	pause
	exit /b 1
)

echo.
echo All tasks completed successfully.
pause
exit /b 0