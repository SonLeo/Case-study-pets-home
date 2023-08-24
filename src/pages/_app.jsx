import '~/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from '~/components/userContext'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
