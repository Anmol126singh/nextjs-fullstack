import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();
    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id }
    });
    const sortedTrips = [...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const upcomingTrips = sortedTrips.filter(trip => new Date(trip.startDate) >= today);

    if(!session){

        return <div className="flex bg-sky-400 items-center justify-center text-xl h-screen text-gray-700">Please log in to view your trips.</div>;
    }
    return (
        <div className="container mx-auto px-6 pt-8 space-x-6 px-42   ">
            <div className="flex items-center justify-between ">
            <h1 className="text-3xl font-bold tracking-tight ">Dashboard</h1>
            <Link href="/trips/new">
              <Button className="-mr-5">New Trip</Button>
            </Link>
            </div>
            <Card>
                <CardHeader>
                <CardTitle>Welcome Back, {session.user?.name}!</CardTitle>
                </CardHeader>
                <CardContent>{trips.length==0?'Create your first trip':`you have ${trips.length} ${trips.length > 1 ? 'trips' : 'trip'}.${upcomingTrips.length>0?` You have ${upcomingTrips.length} upcoming trips.`:''}`}</CardContent>
            </Card>
            <div>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Recent Trips </h2>
                {trips.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <h3 className="text-lg font-semibold">No trips found yet.</h3>
                            <p>
                                Start by creating a new trip to keep track of your adventures!
                            </p>
                            <Link href="/trips/new">
                                <Button className="mt-4">Create New Trip</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ):(
                    <div className="grid grid-cols-3 gap-6">
                        {sortedTrips.slice(0,6).map((trip,key) => (
                            <Link key={key} href={`/trips/${trip.id}`} className="hover:scale-105 transition-transform">
                                <Card>
                                    <CardContent>
                                        <CardTitle className="text-lg font-semibold">{trip.title}</CardTitle>
                                        <p className="text-sm text-gray-500 mt-1 text-clu">{trip.description}</p>
                                        <div className="text-sm text-gray-400 mt-1">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
