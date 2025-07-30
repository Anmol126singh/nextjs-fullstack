import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId: string, locationIds: string[]) {
     const session = await auth();
      if (!session || !session.user?.email) {
        throw new Error("Unauthorized");
      }

      await prisma.$transaction(locationIds.map((locationId: string, index: number) => {
          return prisma.location.update({
              where: { id: locationId },
              data: { order: index }
          })
      }));
}