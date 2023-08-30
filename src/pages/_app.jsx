import '~/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from '~/components/userContext'
import { ToastProvider } from '~/components/toastContext'
import '~/components/FontAwesomeConfig'
import ToastMessage from '~/components/toast/ToastMessage'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ToastProvider>
        <ToastMessage />
        <Component {...pageProps} />
      </ToastProvider>
    </UserProvider>
  )
}
