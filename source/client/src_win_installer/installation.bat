set "params=%*"
cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )

if exist "C:\Program Files\SMS" (
  if not "%1" == "-S" (
    msg "%username%" "'C:\Program Files\SMS' already exists!" ^

"Installation canceled!"
  )

) else (
  mkdir "C:\Program Files\SMS"
  cp ".\config.ini" "C:\Program Files\SMS"
  cp ".\sms.exe" "C:\Program Files\SMS"
  cp ".\autorun_sms.vbs" "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

  if not "%1" == "-S" (
    msg "%username%" "SMS Client installed successfully!" ^

"Now configure 'C:\Program Files\SMS\config.ini'"
  )
)
exit