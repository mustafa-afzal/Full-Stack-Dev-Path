import { createRoot } from 'react-dom/client'
import Header from './components/header.jsx'
import About from './components/about.jsx'
import Interests from './components/interests.jsx'
import Footer from './components/footer.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
    <div className='inner-container'>
        <Header />
        <About />
        <Interests />
        <Footer />
    </div>
)