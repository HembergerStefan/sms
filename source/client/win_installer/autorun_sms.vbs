Set WshShell = CreateObject("WScript.Shell" ) 
WshShell.Run chr(34) & "C:\Program Files\SMS\sms.exe" & Chr(34), 0 
Set WshShell = Nothing