import PlatformCardView from "../../client/platform-card/platform-card.view";

export default async function PlatformCard({params}: any) {
  
  const {id} = params;
  
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${id}`
  const token = process.env.NEXT_PUBLIC_SECRET_API_KEY

  const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
  });
    
  const data = await response.json()
  
  return (
    <PlatformCardView data={data} />
  )
}