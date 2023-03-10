export type Client = {
    macAddress: string
    name: string
    ip: string
    os: string
    lastOnline: Date
    usedDiskspace: number
    cpuUsage: number
    ramUsage: number
    scripts: string[]
    packages: string[]
}