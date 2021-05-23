import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

function useAxios<T = any>(url: string) {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setHasError(false)
        const resp: AxiosResponse<T> = await axios.get(url, {
          cancelToken: source.token,
        })
        setResponse(resp.data)
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          setHasError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    return () => source.cancel()
  }, [url])

  return { response, isLoading, hasError }
}

export default useAxios
