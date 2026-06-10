
import { ToastContainer } from 'react-toastify';
import { RouteIndex } from './routes/routes';
import { AuthBootstrap } from './common/components/auth/authBootstrap';

function App() {
  return (
    <>
      <AuthBootstrap>
        <RouteIndex />
      </AuthBootstrap>
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
