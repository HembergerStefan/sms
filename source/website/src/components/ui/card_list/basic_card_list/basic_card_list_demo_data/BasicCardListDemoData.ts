import {Client} from '../../../../../data/data_types'

export const defaultClientData: Client[] = [
    {
        macAddress: '3476zt-745dff',
        name: 'Client 1',
        ip: '10.0.0.1',
        lastOnline: new Date('2023-01-02T15:39'),
        usedDiskspace: 21,
        cpuUsage: 78,
        groups: [],
        scripts: [],
        packages: []
    },
    {
        macAddress: '3uzew-745dff',
        name: 'Client 2',
        ip: '10.0.0.2',
        lastOnline: new Date('2022-01-02T15:39'),
        usedDiskspace: 65,
        cpuUsage: 11,
        groups: ['Home Office'],
        scripts: [1, 2],
        packages: [1]
    },
    {
        macAddress: '324-80998089',
        name: 'Client 3',
        ip: '10.0.0.3',
        lastOnline: new Date('2022-12-23T12:45'),
        usedDiskspace: 14,
        cpuUsage: 56,
        groups: ['Home Office', 'Work'],
        scripts: [4, 5],
        packages: []
    },
    {
        macAddress: '432242-745dff',
        name: 'Client 4',
        ip: '10.0.0.4',
        lastOnline: new Date(),
        usedDiskspace: 21,
        cpuUsage: 78,
        groups: ['Home Office', 'Gaming', 'School', 'Bug', 'Feature', 'Sommer Vibes', 'Stay Tuned'],
        scripts: [1, 2, 3, 6],
        packages: [1, 2, 3]
    }
]