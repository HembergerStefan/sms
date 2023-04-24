
# Systems Management Server
[![The Unlicense](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/HembergerStefan/sms/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

## Problem Definition

Many users do not have the knowledge or authorisation to install software themselves. Therefore, it is common in organisations for qualified staff to do or arrange this task for the users. In larger organisations, software is installed unattended. Examples of this are unattended installation under Windows and unattended installation under Linux.

IT administrators are under constant pressure to do more with fewer resources, in less time and with less money - it's the nature of the profession. IT professionals are always looking for ways to optimise their workflow and make the best use of available resources. Server automation and application deployment are among these tools and can reliably eliminate many repetitive tasks from their to-do list. Implementing and managing IT environments without automation is a mistake in the modern IT environment. Automation scripts have become not just a convenience, but a necessity. Fortunately, writing automation scripts is not very complicated. (Team Ninja, ninjao-ne.com, 23.05.2022)

Software distribution is a critical process because it also involves operating system corrections and the installation of security-relevant applications such as virus scanners, browsers and email programs. Errors in software distribution can cause disruptions and failures on a large number of workstations. (o. A., o. E Wikipedia, 28.12.2022)

The fact that there are more and more devices in the private home that have a network connection and are expandable with software services makes it necessary to address the question of how and by whom such devices are managed. (Remote Configuration Management, Philip Matthias Alb, 2005, p.8)


## Implementation

In order to meet the requirements and provide a modern solution, the programme parts were realised with technologies from Meta, Oracle and the Python Software Foundation. The user interface was developed with the JavaScript framework ReactJs from Meta. The client was realised using Python and runs under both Windows and MacOS. MySQL is used as the database and the communication between the programme parts and the database is realised by the Java Quarkus server.


## Result

This diploma thesis focuses on the remote management of devices. The aim of this work is to offer the user of our system the possibility to manage all devices independent of location and time. The result of our work is aimed primarily at system administrators of smaller organisations, but also at IT-savvy private individuals who look after several devices. Programs can be installed remotely under Windows. Furthermore, there is the possibility to automate all processes by means of scripting and to be able to execute scripts remotely on all devices or even on entire device groups. The user can choose between Python, Bash and Batch.


## Authors

- [@ItIsJul1an](https://github.com/ItIsJul1an) (React-Dashboard)
- [@ChristianFreilinger](https://github.com/ChristianFreilinger) (Server + Database)
- [@HembergerStefan](https://github.com/HembergerStefan) (Client)
## Documentation

You can only access the documentation if you have access to the diploma thesis!

## Deployment

To deploy this project, have a look at the specific Markdown file for the right part.

- [Server](https://github.com/HembergerStefan/sms/blob/main/source/server/README.md)
- [Website](https://github.com/HembergerStefan/sms/blob/main/source/website/README.md)

## Environment Variables

### Website

To run the webproject, you will need to change the following environment variables in the [data/api_data/ApiConfig.ts](https://github.com/HembergerStefan/sms/blob/main/source/website/src/data/api_data/ApiConfig.ts) file.

```typescript
export const ApiConfig = {
    baseUrl: 'http://localhost',
    port: 8080,
}

export const WebsocketConfig = {
    baseUrl: 'localhost',
    port: 8080,
}

export const RoleSystemConfig = {
    adminRoleName: 'Admin',
    userRoleName: 'User'
}
```
