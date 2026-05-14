
import { ToastContainer } from 'react-toastify';
import { RouteIndex } from './routes/routes';

function App() {
  return (
    <>
      <RouteIndex />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        limit={4}
      />
    </>
  )
}

export default App;
