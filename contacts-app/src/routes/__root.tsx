import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { createRootRoute, Outlet, useNavigate} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Header
})

function Header() {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <h4 className="menu-header">
          React Contacts App 
          <button className="home-button" onClick={() => {navigate({to:"/"});}}>Contacts Home</button>
          <button className="add-button" onClick={() => {navigate({to:"/addContact"});}}>Add New Contact</button>
        </h4>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools/>
    </>
  )
}