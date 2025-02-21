
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Prediction from './components/prediction'
import Setting from './components/Setting'
import Journal from './components/Journal'


function App() {

    return (
        <div className='overflow-x-hidden font-heading'>
        <Navbar/>
        <Hero/>
        <Prediction/>
        <Journal/>
        <Setting/>
        </div>
    )
}

export default App
