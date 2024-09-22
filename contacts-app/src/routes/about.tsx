import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <h1>Edit Contact</h1>
      <p>This is where a single contact details go</p>
    </div>
  )
}
