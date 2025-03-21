import { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import theme from '../config/mantine.config'
import '@mantine/core/styles.css'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import { AuthProvider, useAuth } from './auth'

import './index.css'
import './scaffold.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <AuthProvider>
              <RedwoodApolloProvider useAuth={useAuth}>
                {children}
              </RedwoodApolloProvider>
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
