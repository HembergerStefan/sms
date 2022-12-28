import {Script, Package} from '../basic_table_types/BasicTableTypes'

export const defaultScriptData: Script[] = [
    {
        id: 1,
        title: 'Setup Windows',
        description: 'Install Windows 11 (21H2)',
        language: 'PowerShell',
        executionDate: '3rd August 2022',
        status: 'Execution Pending'
    },
    {
        id: 2,
        title: 'AutoClicker',
        description: 'More Clicks than ever',
        language: 'Python',
        executionDate: '5rd December 2022',
        status: 'Execution Pending'
    },
    {
        id: 3,
        title: 'DWW',
        description: 'Disable Windows Watermark',
        language: 'Python',
        executionDate: '3rd August 2022',
        status: 'Executed'
    },
    {
        id: 4,
        title: 'DWW Test',
        description: 'Disable Windows Watermark Testing tool',
        language: 'Python',
        executionDate: '3rd August 2022',
        status: 'Execution Pending'
    },
    {
        id: 5,
        title: 'Remove DWW',
        description: 'Disable Windows Watermark deinstaller',
        language: 'Python',
        executionDate: '3rd August 2022',
        status: 'Execution Pending'
    },
    {
        id: 6,
        title: 'DWW 2.0',
        description: 'Disable Windows Watermark in Version 2',
        language: 'Python',
        executionDate: '3rd August 2022',
        status: 'Executed'
    },
    {
        id: 7,
        title: 'Cleanup Code',
        description: 'Script for clean upping code',
        language: 'Python',
        executionDate: '3rd August 2022',
        status: 'Executed'

    }
]

export const defaultPackageData: Package[] = [
    {
        id: 1,
        title: 'Microsoft Word',
        version: '2208',
        installationDate: '3rd August 2022',
        status: 'Installation Pending'
    },
    {
        id: 2,
        title: 'Adobe Illustrator',
        version: '26.5',
        installationDate: '3rd August 2022',
        status: 'Installed'
    },
    {
        id: 3,
        title: 'Figma',
        version: '1.7.2022',
        installationDate: '3rd August 2022',
        status: 'Installation Pending'
    },
    {
        id: 4,
        title: 'WebStorm',
        version: '2022.2.1',
        installationDate: '3rd August 2022',
        status: 'Installed'
    },
    {
        id: 5,
        title: 'Discord',
        version: '2022.2.1',
        installationDate: '3rd August 2022',
        status: 'Installed'
    },
    {
        id: 6,
        title: 'Spotify',
        version: '2022.2.1',
        installationDate: '3rd August 2022',
        status: 'Installation Pending'
    },
]
