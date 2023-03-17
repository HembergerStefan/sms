import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface UserStore {
    id: string
    username: string | undefined
    token: string | undefined
    roleId: string
    roleName: string
    setUserId: (id: string) => void
    setUsername: (username: string) => void
    setUserToken: (token: string | undefined) => void
    setUserRole: (id: string) => void
    setUserRoleName: (name: string) => void
}

const useUserStore = create(
    persist<UserStore>((set, get) => ({
            id: '',
            username: '',
            token: undefined,
            roleId: '',
            roleName: 'User',
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
            setUserRoleName: (name) => set(prev => ({
                roleName: prev.roleName = name
            })),
        }), {
            name: 'user-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useUserStore