import Layout from './components/layout/Layout'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <section>
      <Layout>
        <Outlet />
      </Layout>
    </section>
  )
}

export default App
