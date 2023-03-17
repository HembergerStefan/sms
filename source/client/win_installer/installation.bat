set "params=%*"
cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
if exist "C:\Program Files\SMS" (
  echo "'C:\Program Files\SMS' already exists!"
) else (
  mkdir "C:\Program Files\SMS"
  copy ".\config.ini" "C:\Program Files\SMS"
  copy ".\sms.exe" "C:\Program Files\SMS"
  copy ".\autorun_sms.vbs" "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
  echo "SMS Client installed successfully!"
)
if "%1" == "-S" (
  exit
)