import create from 'zustand'
import {persist} from 'zustand/middleware'

export interface UserStore {
    id: string
    username: string | undefined
    token: string | undefined
    roleId: string
    setUserId: (id: string) => void
    setUsername: (username: string) => void
    setUserToken: (token: string) => void
    setUserRole: (id: string) => void
}

const useUserStore = create(
    persist<UserStore>((set, get) => ({
            id: '',
            username: '',
            token: undefined,
            roleId: '',
            setUserId: (id) => set(prev => ({
                id: prev.id = id
            })),
            setUsername: (username) => set(prev => ({
                username: prev.username = username
            })),
            setUserToken: (token) => set(prev => ({
                token: prev.token = token
            })),
            setUserRole: (id) => set(prev => ({
                roleId: prev.roleId = id
            })),
        }), {
            name: 'user-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useUserStore