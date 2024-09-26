import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ContactType } from '../contactType'
import { useState } from 'react'

// Route setup
export const Route = createFileRoute('/addContact')({
  component: AddContact,
})

function AddContact() {
  const navigate = useNavigate()
  // isChanged state used to enable/disable update button
  const [canSubmit, setCanSubmit] = useState(false)

  // Initialize JSON data object for sending PUTs data
  const updateData = {"id":"",
    "name":"",
    "email":"",
    "phone":""
  };

  // creates a new contact
  const createContact=(async ()=>{
    // Define the request options for the POST
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    };

    console.log(`Trying to add contact:${updateData.name}`)

  const response = await fetch(`http://localhost:3000/addContact`,
    requestOptions,
  )
  
  if (!response.ok) {
   throw new Error(`Error: ${response.statusText}`);
  } else {
   // Set useState hook to disabl;e Update button and force Component rerender
   setCanSubmit(false)
   navigate({to:"/"});
  }})

  const updateIsChanged=(() => {
    console.log("Textfield was changed")
    // logic for enabling/disabling the update contact information button
    updateData.name = (document.getElementById("newNameInput") as HTMLInputElement)?.value;
    updateData.email = (document.getElementById("newEmailInput") as HTMLInputElement)?.value;
    updateData.phone = (document.getElementById("newPhoneInput") as HTMLInputElement)?.value;
    // Set is changed value based on the status of the text input boxes
    // Changed = false if any field is empty, or if all fields match
    // the original field values
    setCanSubmit(updateData.name !== "" && updateData.email !== "" && updateData.phone !== "")})

  return (
    <div>
      <h3>Add New Contact</h3>
        <div>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="newNameInput">Name:</label></td>
                <td><input id="newNameInput" type="text" defaultValue={""} onChange={() => updateIsChanged()} /></td>
              </tr>
              <tr>
                <td><label htmlFor="newEmailInput">Email Address:</label></td>
                <td><input id="newEmailInput" type="text" defaultValue={""} onChange={() => updateIsChanged()} /></td>
              </tr>
              <tr>
                <td><label htmlFor="newPhoneInput">Phone Number:</label></td>
                <td><input id="newPhoneInput" type="text" defaultValue={""} onChange={() => updateIsChanged()} /></td>
              </tr>
            </tbody>
          </table>
          <button className="create-button" disabled={!canSubmit} onClick={() => createContact()}>
            Create
          </button>
        </div>
    </div>
    
  )
}
