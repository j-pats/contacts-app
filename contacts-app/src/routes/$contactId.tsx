import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import type { ContactType } from '../contactType'

// Route setup
export const Route = createFileRoute('/$contactId')({
  component: ContactComponent,
})


// ContactComponent
function ContactComponent() {
    // get contactId parameter from URL
    const contactId = useParams({
         from: '/$contactId',
          select: (params) => params.contactId,
         })
  //console.log(contactId) // Check if contact ID is being logged right

  // Use contactId in the queryKey and the fetch URL
  const fetchContact = useQuery({
    queryKey: [`getContactId=${contactId}`],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/${contactId}`,
      )
      if (response.status == 500) {
        throw new Error('Contact does not exist')
      }
      const data = await response.json()
      console.log(data)

      // Create ContactType object from received json data
    const mappedContact: ContactType = {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone
      }
      return mappedContact;

      
    },
  })

  // Loading and error handling
  if (fetchContact.isLoading) return <div>Loading contact...</div>
  if (fetchContact.error) return <div>Error: {fetchContact.error.message}</div>
  if (fetchContact.isFetching) return <div>Updating contact...</div>

  // Render the contact details
  const contact = fetchContact.data;

  return (
    <div>
      <h1>Contact Details for {contactId}</h1>
      {contact && (
        <div>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>
      )}
    </div>
  )
}
