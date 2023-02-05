import create from 'zustand'
import {persist} from 'zustand/middleware'

export interface UserStore {
    username: string | undefined
    token: string | undefined
    setUsername: (username: string) => void
    setUserToken: (token: string) => void
}

const useUserStore = create(
    persist<UserStore>((set, get) => ({
            username: '',
            token: undefined,
            setUsername: (username) => set(prev => ({
                username: prev.username = username
            })),
            setUserToken: (token) => set(prev => ({
                token: prev.token = token
            })),
        }), {
            name: 'user-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useUserStore