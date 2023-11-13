import { SnackbarProvider } from 'notistack'
import QueryProvider from './providers/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App(): JSX.Element {
  return (
    <SnackbarProvider>
      <QueryProvider>
        <h1 className="center text-3xl font-bold underline">Hello world a!</h1>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </SnackbarProvider>
  )
}

export default App
