import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

function useAxios<T = any>(url: string) {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const resp: AxiosResponse<T> = await axios.get(url)
        setResponse(resp.data)
      } catch (err) {
        console.error(err)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { response, isLoading, hasError }
}

export default useAxios
