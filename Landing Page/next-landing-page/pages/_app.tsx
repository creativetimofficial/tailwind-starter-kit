import { AppProps } from 'next/app'
import "../assets/styles/index.css"
import "../assets/styles/main.scss"
import '@fortawesome/fontawesome-free/css/all.min.css'
function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />

}

export default App