'use server';

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


async function geoCodeadress(address:string){
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();
    const {lat,lng} = data.results[0].geometry.location;
    return {lat,lng};

}

export async function addLocation(formData: FormData, tripid: string) {
    const session = await auth()
    if (!session) {
        throw new Error("Unauthorized");
    }
    const address = formData.get("address")?.toString();
    if (!address) {
        throw new Error("Address is required");
    }
    const { lat, lng } = await geoCodeadress(address);
    const count = await prisma.location.count({
        where: { tripId: tripid }
    });
    await prisma.location.create({
        data: {
            Locationname: address,
            latitude: lat,
            longitude: lng,
            tripId: tripid,
            order:count,
        }
    });
    return redirect(`/trips/${tripid}`);
        }