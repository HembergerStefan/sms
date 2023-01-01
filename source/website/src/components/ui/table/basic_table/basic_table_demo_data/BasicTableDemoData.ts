import {Script, Package} from '../../../../../data/data_types'

export const defaultScriptData: Script[] = [
    {
        id: 1,
        name: 'Setup Windows',
        description: 'Install Windows 11 (21H2)',
        language: 'PowerShell',
        executionDate: new Date(),
        code: ''
    },
    {
        id: 2,
        name: 'AutoClicker',
        description: 'More Clicks than ever',
        language: 'Python',
        executionDate: new Date(),
        code: ''
    },
    {
        id: 3,
        name: 'DWW',
        description: 'Disable Windows Watermark',
        language: 'Python',
        executionDate: new Date('2023-01-01T19:45:13'),
        code: ''
    },
    {
        id: 4,
        name: 'DWW Test',
        description: 'Disable Windows Watermark Testing tool',
        language: 'Python',
        executionDate: new Date(),
        code: ''
    },
    {
        id: 5,
        name: 'Remove DWW',
        description: 'Disable Windows Watermark deinstaller',
        language: 'Python',
        executionDate: new Date(),
        code: ''
    },
    {
        id: 6,
        name: 'DWW 2.0',
        description: 'Disable Windows Watermark in Version 2',
        language: 'Python',
        executionDate: new Date(),
        code: ''
    },
    {
        id: 7,
        name: 'Cleanup Code',
        description: 'Script for clean upping code',
        language: 'Python',
        executionDate: new Date(),
        code: ''
    }
]

export const defaultPackageData: Package[] = [
    {
        id: 1,
        name: 'Microsoft Word',
        version: '2208',
        url: 'https://www.microsoft.com/de-at',
        installationDate: new Date(),
    },
    {
        id: 2,
        name: 'Adobe Illustrator',
        version: '26.5',
        url: 'https://www.adobe.com/at/products/illustrator.html?gclid=CjwKCAiAkrWdBhBkEiwAZ9cdcDBZSlR8lLjIZXntwvM-XPjPN1tsSHWBxn7mntWqp-j_PHAf9SooWhoCOm4QAvD_BwE&mv=search&sdid=KCJMVLF6&ef_id=CjwKCAiAkrWdBhBkEiwAZ9cdcDBZSlR8lLjIZXntwvM-XPjPN1tsSHWBxn7mntWqp-j_PHAf9SooWhoCOm4QAvD_BwE:G:s&s_kwcid=AL!3085!3!599735500011!e!!g!!adobe%20illustrator!1427319358!62904751144',
        installationDate: new Date()
    },
    {
        id: 3,
        name: 'Figma',
        version: '1.7.2022',
        url: 'https://www.figma.com/de/',
        installationDate: new Date()
    },
    {
        id: 4,
        name: 'WebStorm',
        version: '2022.2.1',
        url: 'https://www.jetbrains.com/de-de/webstorm/',
        installationDate: new Date('2023-01-01T19:45:13'),
    },
    {
        id: 5,
        name: 'Discord',
        version: '2022.2.1',
        url: 'https://discord.com/',
        installationDate: new Date(),
    },
    {
        id: 6,
        name: 'Spotify',
        version: '2022.2.1',
        url: 'https://open.spotify.com/',
        installationDate: new Date('2023-01-12T23:45:13'),
    },
]
