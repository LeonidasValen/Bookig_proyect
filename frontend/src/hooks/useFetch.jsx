import { useEffect, useState } from "react"
import axios from "axios"

export const useFecth = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url)
                setData(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError("error en los datos")
            }
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return{data, loading, error, reFetch}
}