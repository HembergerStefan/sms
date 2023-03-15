#!/bin/bash
if ["$EUID" -ne 0]
then
  echo "Please run as root!"
else
  echo "Installation started!"
fi

# install python3 packages
pip3 install -r ./requirements.txt

# create sms folder and move files
mkdir /etc/sms
cp *.py /etc/sms
cp ./config.ini /etc/sms

# create daemon
cp sms.plist /Library/LaunchDaemons
sudo chown root:wheel /Library/LaunchDaemons/sms.plist
launchctl load -w /Library/LaunchDaemons/sms.plist

echo "Installation complete!"