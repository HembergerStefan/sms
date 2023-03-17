import {create} from 'zustand'

import {Role} from '../../data/data_types'

export interface RoleStore {
    roles: Role[]
    addingRole: Role
    setRoles: (entries: Role[]) => void
    addRole: (entry: Role) => void
    removeRole: (id: string) => void
    resetRole: () => void
    getRoleById: (id: string) => Role
    getRoleByName: (name: string) => Role
}

export const initialRoleState: Role = {
    id: '',
    name: 'User'
}

const useRoleStore = create<RoleStore>((set, get) => ({
        roles: [],
        addingRole: {
            id: '',
            name: ''
        },
        setRoles: (entries) => set(state => ({
            roles: state.roles = entries
        })),
        addRole: (entry) => {
            let roles = get().roles

            roles.forEach(role => {
                if (role.id === entry.id) {
                    roles = roles.filter((role) => role.id !== entry.id)
                }
            })

            roles.push(entry)

            set((state) => ({
                roles: state.roles = [...roles],
                addingRole: state.addingRole = {
                    id: '',
                    name: ''
                } // Reset, to add new data
            }))
        },
        removeRole: (id) => set((state) => ({
            roles: state.roles.filter((role) => role.id !== id)
        })),
        resetRole: () => set(state => ({
            roles: state.roles = []
        })),
        getRoleById: (id) => {
            const selectedRole = get().roles.find((role) => role.id === id)

            if (selectedRole !== undefined) {
                return selectedRole
            }

            return initialRoleState
        },
        getRoleByName: (name) => {
            const selectedRole = get().roles.find((role) => role.name === name)

            if (selectedRole !== undefined) {
                return selectedRole
            }

            return initialRoleState
        },
    })
)

export default useRoleStore