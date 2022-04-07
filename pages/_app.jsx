import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import { ChakraProvider } from '@chakra-ui/react'

const noAuthRequired = ['/', '/login', '/signup', '/signup2']

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    return (
        <AuthContextProvider>
            <ChakraProvider>
                <Navbar />
                {noAuthRequired.includes(router.pathname) ? (
                    <Component {...pageProps} />
                ) : (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                )}
            </ChakraProvider>

        </AuthContextProvider>
    )
}

export default MyApp