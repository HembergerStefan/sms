import {useEffect, useState} from 'react'

const useMousePosition = () => {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    useEffect(() => {
        const updateMousePosition = (ev: { clientX: any, clientY: any }) => {
            setMousePosition({x: ev.clientX, y: ev.clientY})
        }

        window.addEventListener('mousemove', updateMousePosition)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
        }
    }, [])

    return mousePosition
}

export default useMousePosition