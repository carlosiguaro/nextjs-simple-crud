import DataTableView from "../../client/data-table/data-table.view";

export default async function DataTable() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
    const token = process.env.NEXT_PUBLIC_SECRET_API_KEY

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store'
    });
    const data = await response.json()
    
    return (
      <DataTableView data={data} />
    )
}1