import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
 import TripDetailClient from "@/components/TripDetailClient";
export default async function TripDetail({params,}:{params:Promise<{tripid:string}>}) {
const { tripid } = await params;
    const session = await auth();
        if (!session) {
        return <div className="flex bg-sky-400 items-center justify-center text-xl h-screen text-gray-700">Please log in to view trip details.</div>;
    }

    const trip = await prisma.trip.findFirst({
        where: { id: tripid,userId: session.user?.id },
        include: {
            locations: true
        }
    });
    if (!trip) {
        return <div className="flex bg-red-400 items-center justify-center text-xl h-screen text-gray-700">Trip not found.</div>;
    }

    return <TripDetailClient trip={trip} />;

}