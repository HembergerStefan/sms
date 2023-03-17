import {MutableRefObject, useEffect, useRef} from 'react'

const useOnClickOutside = (handler: (event: { target: any }) => void, ref?: MutableRefObject<any>): [MutableRefObject<any>] => {

    const generatedRef = useRef<any>(null)

    if (ref === undefined) {
        ref = generatedRef
    }

    useEffect(() => {
        const listener = (event: { target: any }) => {
            // Do nothing if clicking ref's element or descendent elements
            if (ref !== undefined) {
                if (!ref.current || ref.current.contains(event.target)) {
                    return
                }
            }

            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])

    return [ref]
}

export default useOnClickOutside