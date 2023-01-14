export type Client = {
    macAddress: string
    name: string
    ip: string
    lastOnline: Date
    usedDiskspace: number
    cpuUsage: number
    groups: string[]
}