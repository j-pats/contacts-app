import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h1>Contacts</h1>
      <p>This is where contacts go in a table</p>
    </div>
  )
}
