import PlatformCard from "@/features/components/server/platform-card/platform-card"

export default async function ReadPlatform({params}:any){
    return (
        <PlatformCard params={params} />
    )
}