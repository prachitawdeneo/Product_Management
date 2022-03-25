import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { lazy, Suspense } from 'react';
import './App.css';

// import {ToastContainer} from 'react-toastify'

const Home=lazy(()=>import('./components/Home'))
const Category=lazy(()=>import('./components/Category'))
const ShowCategory=lazy(()=>import('./components/ShowCategory'))
const Product=lazy(()=>import('./components/Product'))

function App() {
  return (
    <div className="App">
    <Suspense fallback={<div style={{height:'100%',width:'100%'}}><img src='./load.gif' alt='Lazy Loading' style={{height:'100%',width:'100%'}}/></div>}>
    {/* <ToastContainer position="top-right"
hideProgressBar={false}
autoClose={5000}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
      // style={{color:'#669fb2'}}
    /> */}
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/category' exact element={<Category/>}/>
          <Route path='/showcategory' exact element={<ShowCategory/>}/>
          <Route path='/product' exact element={<Product/>}/>
        </Routes>
      </Router>

</Suspense>
      
    </div>
  );
}

export default App;
