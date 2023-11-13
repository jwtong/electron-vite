import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { ReactElement, ReactNode, useMemo } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

function QueryProvider({ children }: QueryProviderProps): ReactElement {
  const { enqueueSnackbar } = useSnackbar()

  const queryClient = useMemo(() => {
    const client = new QueryClient({
      defaultOptions: {
        // queries: {
        //   refetchOnWindowFocus: false,
        //   refetchOnMount: false,
        //   refetchOnReconnect: false
        // }
      },

      // queryCache/mutationCache onError will always be called on every error
      // to default with option override locally, use defaultOptions.queries.onError
      queryCache: new QueryCache({
        // done globally so only triggered once per query
        onError: (error, query): void => {
          // show error toasts if we already have data in the cache
          // which indicates a failed background update
          if (query.state.data !== undefined) {
            let errorMessage = 'Query error: '
            if (error instanceof Error) {
              errorMessage += error.message
            }
            console.error(errorMessage)

            if (process.env.NODE_ENV === 'development') {
              enqueueSnackbar(errorMessage, { variant: 'error' })
            }
          }
        }
      }),
      mutationCache: new MutationCache({
        onError: (error): void => {
          let errorMessage = 'Mutation error: '
          if (error instanceof Error) {
            errorMessage += error.message
          }
          console.error(errorMessage)
        }
      })
    })

    if (typeof window === 'undefined') {
      return client
    }

    return client
  }, [enqueueSnackbar])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
