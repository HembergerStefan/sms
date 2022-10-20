import {useEffect, useState} from 'react'

const useResize = (): { width: number; height: number } => {

    const [resizeSize, setResizeSize] = useState({width: window.innerWidth, height: window.innerHeight})

    useEffect(() => {
        const updateResize = () => {
            setResizeSize({width: window.innerWidth, height: window.innerHeight})
        }

        window.addEventListener('resize', updateResize)

        return () => {
            window.removeEventListener('resize', updateResize)
        }
    }, [])

    return resizeSize
}

export default useResize