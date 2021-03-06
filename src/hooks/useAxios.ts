import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

function useAxios<T = any>(url: string) {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const source = axios.CancelToken.source()
    let unmounted = false
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
          setError(err)
          setHasError(true)
        }
      } finally {
        if (!unmounted) {
          setIsLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      unmounted = true
      source.cancel()
    }
  }, [url])

  return { response, isLoading, hasError, error }
}

export default useAxios
