import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

export type ContactType = {
  id: string
  name: string
  email: string
  phone: string
}

function Index() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/contacts',
      )
      return await response.json();
    },
  })

  if (isPending) return (
    <div>
      Loading...
    </div>
  )

  if (error) {
    console.log(data);
    return (
      <div>
        'An error has occurred: ' + {error.message}
      </div>
    )
  }
  
  return (
    <div>
        {data.contacts.map((contact:ContactType)=>{
          return (
            <div key={contact.id}>
              <p><strong>{contact.id}</strong>: {contact.name} Email: {contact.email} </p>
            </div>
          )
        })}
    </div>
  );
}
