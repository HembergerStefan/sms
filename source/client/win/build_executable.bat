pyinstaller -n "sms" --onefile --icon=..\resources\app_icon_light.ico -w --uac-admin main.py
@RD /S /Q ".\build"
rm sms.spec