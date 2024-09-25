import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import "../Index.css"

export const Route = createRootRoute({
  component: () => (
    <>
      <div id="menu">
        <h4><Link to="/" style={{ marginRight: '10px' }}>Contacts App Home</Link></h4>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})