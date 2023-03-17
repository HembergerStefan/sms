import {MutableRefObject, useEffect, useRef} from 'react'

const useTransitionEnd = (handler: (event: { target: any }) => void): [MutableRefObject<any>] => {

    const ref = useRef<any>(null)

    useEffect(() => {
        const listener = (event: { target: any }) => {
            handler(event)
        }

        const node: any = ref.current

        if (node) {
            node.addEventListener('transitionend', listener)

            return () => {
                node.removeEventListener('transitionend', listener)
            }
        }
    }, [ref.current])

    return [ref]
}

export default useTransitionEnd