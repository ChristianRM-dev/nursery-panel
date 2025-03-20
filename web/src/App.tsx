import { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import theme from '../config/mantine.config'
import '@mantine/core/styles.css'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import { AuthProvider, useAuth } from './auth'

import './index.css'
import './scaffold.css'
import '@mantine/carousel/styles.css'
interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <MantineProvider theme={theme}>
          <AuthProvider>
            <RedwoodApolloProvider useAuth={useAuth}>
              {children}
            </RedwoodApolloProvider>
          </AuthProvider>
        </MantineProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
