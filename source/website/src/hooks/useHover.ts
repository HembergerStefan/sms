import {MutableRefObject, useEffect, useRef, useState} from 'react'

const useHover = (): [MutableRefObject<any>, boolean] => {

    const [isHovering, setHovering] = useState<boolean>(false)

    const ref = useRef<any>(null)

    useEffect(() => {
        const handleMouseOver = () => setHovering(true)
        const handleMouseOut = () => setHovering(false)

        const node: any = ref.current

        if (node) {
            node.addEventListener('mouseover', handleMouseOver)
            node.addEventListener('mouseout', handleMouseOut)

            return () => {
                node.removeEventListener('mouseover', handleMouseOver)
                node.removeEventListener('mouseout', handleMouseOut)
            }

        }
    }, [ref.current])

    return [ref, isHovering]
}

export default useHover