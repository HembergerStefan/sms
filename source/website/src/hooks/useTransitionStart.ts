import {MutableRefObject, useEffect, useRef} from 'react'

const useTransitionStart = (handler: (event: { target: any }) => void): [MutableRefObject<any>] => {

    const ref = useRef<any>(null)

    useEffect(() => {
        const listener = (event: { target: any }) => {
            handler(event)
        }

        const node: any = ref.current

        if (node) {
            node.addEventListener('transitionstart', listener)

            return () => {
                node.removeEventListener('transitionstart', listener)
            }
        }
    }, [ref.current])

    return [ref]
}

export default useTransitionStart