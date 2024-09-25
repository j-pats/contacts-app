import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import {ColumnDef,flexRender,getCoreRowModel,useReactTable,} from '@tanstack/react-table'
import { ContactType } from '../contactType'
import '../index.css'; 

// Route setup
export const Route = createFileRoute('/')({
  component: Index,
})

// Define columns for the table, with ID being a link to the focus page
const columns: ColumnDef<ContactType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (props) => {
      const value = props.getValue() as string;
      return (
        <div>
          <Link to={`/${value}`}>(Edit)</Link>    ID: {value}
        </div>
    )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (props) => {
      const value = props.getValue() as string;
      return (
        <div>
          <Link to={`mailto:`+value}><i>{value}</i></Link>
        </div>
    )
    }
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
];

function Index() {
  // Fetch contacts data
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getAllContacts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/contacts');
      const data = await response.json();

      // Map the fetched data to ContactType, filter null and undefined entries
      const mappedData: ContactType[] = data.contacts
      .filter((item: any) => item !== null && item !== undefined)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
      }));

      // Uncomment below to add extra contact that does not have a DB entry
    //   const invalidContact: ContactType = {
    //     id: "55",
    //     name: "Josh Nobody",
    //     email: "N/A",
    //     phone: "(none)"
    // }
    //   mappedData.push(invalidContact)

      return mappedData;
    },
  });

  // Create a react-table
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading and error handling
  if (isPending) return (
  <div>Loading table...</div>
)
  if (error) return (
  <div>Error: {error.message}</div>
)
  if (isFetching) return (
    <div>Updating table...</div>
  )

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
