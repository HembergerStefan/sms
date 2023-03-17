import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface WebsiteStore {
    interfaceStyle: string
    setInterfaceStyle: (style: string) => void
}

const useWebsiteStore = create(
    persist<WebsiteStore>((set, get) => ({
            interfaceStyle: 'moderna-light',

            setInterfaceStyle: (style) => set(state => ({
                interfaceStyle: state.interfaceStyle = style
            })),
        }), {
            name: 'website-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
)


export default useWebsiteStore