import {create} from 'zustand'

import {User} from '../../data/data_types'

interface UserSlice {
    users: User[]
    addingUser: User
    setUsers: (entries: User[]) => void
    resetAddingUser: () => void
    getUserById: (id: string) => User | undefined
}

export const initialUserState: User = {
    id: '',
    username: '',
    role: ''
}

const useUserInfoStore = create<UserSlice>((set, get) => ({
        users: [],
        addingUser: {
            id: '',
            username: '',
            password: '',
            role: ''
        },
        setUsers: (entries) => set(state => ({
            users: state.users = entries
        })),
        resetAddingUser: () => set(state => ({
            addingUser: state.addingUser = {
                id: '',
                username: '',
                password: '',
                role: ''
            } // Reset, to add new data
        })),
        getUserById: (id) => {
            const selectedUser = get().users.find((user) => user.id === id)

            if (selectedUser !== undefined) {
                return selectedUser
            }

            return undefined
        }
    })
)

export default useUserInfoStore