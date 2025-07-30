import NewLocationClient from "@/components/NewLocationClient";

export default async function NewLocation({params}: {params: Promise<{tripid: string}>}) {
const { tripid } = await params;
return <NewLocationClient tripid={tripid} />;
}