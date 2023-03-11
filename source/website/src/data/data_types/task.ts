import {Script} from './script'
import {Package} from './package'

export type Task = {
    id: string
    clientId: string
    task: Script | Package
}