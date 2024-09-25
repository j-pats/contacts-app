import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import type { ContactType } from '../contactType'
import { useState } from 'react'
import "../index.css"

// Route setup
export const Route = createFileRoute('/$contactId')({
  component: ContactComponent,
})


// ContactComponent used for rendering Focus page
function ContactComponent() {
  const navigate = useNavigate()
  // isChanged state used to enable/disable update button
  const [isChanged, setIsChanged] = useState(false)

    // get contactId parameter from URL
    const contactId = useParams({
      from: '/$contactId',
      select: (params) => params.contactId,
    })

  // Use contactId in the queryKey and the fetch URL
  const fetchContact = useQuery({
    queryKey: [`getContactId=${contactId}`],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/${contactId}`,
      )
      if (response.status == 500) {
        throw new Error('Contact does not exist')
      }
      const data = await response.json()

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

  // Save received contact data
  const contact = fetchContact.data;

  // deletes contact and stores response
  const deleteContact=(async (id:string)=>{
    // Show confirmation window
    if(window.confirm("Are you sure you want to delete this contact?")){
      // make delete api call
      const response = await fetch(`http://localhost:3000/${id}`,
        {method:'DELETE'}
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        // Go back to contacts home
        navigate({to:"/"});
      }
    }
  })

  // Initialize JSON data object for sending PUTs data
  const updateData = {"id":contactId,
    "name":"",
    "email":"",
    "phone":""
  };


  // deletes contact and stores response
  const updateContact=(async (id:string)=>{
       // Define the request options for the PUT
   const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData)
  };
    const response = await fetch(`http://localhost:3000/${id}`,
      requestOptions,
    )
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    } else {
      // Set useState hook to disable Update button and force Component rerender
      setIsChanged(false)
    }
  })

  const updateIsChanged=(() => {
    console.log("Textfield was changed")
    // logic for enabling/disabling the update contact information button
    updateData.name = (document.getElementById("nameInput") as HTMLInputElement)?.value;
    updateData.email = (document.getElementById("emailInput") as HTMLInputElement)?.value;
    updateData.phone = (document.getElementById("phoneInput") as HTMLInputElement)?.value;
    // Set is changed value based on the status of the text input boxes
    // Changed = false if any field is empty, or if all fields match
    // the original field values
    setIsChanged(((updateData.name != null && updateData.name !== "")? true:false &&
      (updateData.email != null && updateData.email !== "")? true:false &&
      (updateData.phone != null && updateData.phone !== "")? true:false)
      &&
      (updateData.name !== contact?.name ||
        updateData.email !== contact?.email ||
        updateData.phone !== contact?.phone
      )
    )

  })

  

  return (
<div>
  <h3>Contact (Id:{contactId})</h3>
  {contact && (
    <div>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="nameInput">Name:</label></td>
            <td><input id="nameInput" type="text" defaultValue={contact.name} onChange={() => updateIsChanged()} /></td>
          </tr>
          <tr>
            <td><label htmlFor="emailInput">Email Address:</label></td>
            <td><input id="emailInput" type="text" defaultValue={contact.email} onChange={() => updateIsChanged()} /></td>
          </tr>
          <tr>
            <td><label htmlFor="phoneInput">Phone Number:</label></td>
            <td><input id="phoneInput" type="text" defaultValue={contact.phone} onChange={() => updateIsChanged()} /></td>
          </tr>
        </tbody>
      </table>
      <button className="delete-button" onClick={() => deleteContact(contactId)}>
        Delete
      </button>
      <button className="focus-update-button" disabled={!isChanged} onClick={() => updateContact(contactId)}>
        Update
      </button>
    </div>
  )}
</div>

  )
}
