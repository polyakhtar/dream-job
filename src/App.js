import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes/Routes';
function App() {
  return (
    <div className="bg-blue-50">
      <RouterProvider router={router}>
     <Toaster></Toaster>
      </RouterProvider>
    </div>
  );
}

export default App;
