import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const useInput = (defaultValue, where) => {
    const [value, setValue] = useState(defaultValue)

    const onChange = useCallback((e) => {
        if (where === 'no_space') {
            setValue(e.target.value.replace(/(^\s*)|(\s*$)/g, ''))
        } else {
            setValue(e.target.value)
        }
    }, [])

    return { value, onChange, setValue }
}

export const useDebounce = (defaultValue, delay) => {
    const [value, setValue] = useState('')
    const [state, setState] = useState(defaultValue)

    useEffect(() => {
        if (value === state) return
        const timeout = setTimeout(() => setValue(state), delay)

        return () => clearTimeout(timeout)
    }, [value, state])

    return [value, setState]
}

export const useLazyAxios = () => {
    const [loading, setLoading] = useState(false)

    const call = useCallback(
        async (options) => {
            const result = {}
            setLoading(true)
            try {
                const { data } = await axios(options)
                result.data = data
            } catch (error) {
                result.error = error
            }
            setLoading(false)
            return result
        },
        [loading]
    )

    return { loading, call }
}
