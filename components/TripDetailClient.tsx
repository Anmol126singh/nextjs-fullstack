"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { RiCalendar2Fill,RiAddFill, RiMapPinFill } from "@remixicon/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Map from "./Map";
import React from "react";
import SortableItinerary from "./Sortableitinerary";
type TripWithLocations = Trip & {
  locations: Location[];
}
interface TripDetailClientProps {
    trip: TripWithLocations;
}
export default function TripDetailClient({ trip }: TripDetailClientProps) {
    const [activeTab, setActiveTab] = React.useState("overview");
    return <div className="contain mx-auto px-4 py-8 space-y-8 ">{trip.image&& (<div className=" w-full h-72 md:h-96 overflow-hidden relative rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg "><Image src={trip.image} alt={trip.title} className="object-cover  " fill priority /></div>)}
    <div className="bg-white p-6 rounded-lg shadow-md flex  space-y-4 justify-between items-start">
       <div>
        <h1 className="text-2xl font-extrabold text-shadow-gray-900">{trip.title}</h1>
        <div className="flex items-center space-x-2 text-gray-600 mt-2">
          <RiCalendar2Fill className="w-5 h-5 text-gray-400" />
          <span className="text-lg">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
        </div>
       </div>
      <Link href={`/trips/${trip.id}/itinerary/new`}>
      <Button> <RiAddFill className="w-4 h-4 mr-1" /> Add Location</Button></Link>
    </div>
    <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6" >
                <TabsTrigger value="overview" className="text-lg" >Overview</TabsTrigger>
                <TabsTrigger value="itinerary" className="text-lg" >itinerary</TabsTrigger>
                <TabsTrigger value="Map" className="text-lg" >Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div className="text-2xl font-semibold mb-6">Trip summary</div>
                <div className="flex items-start justify-start">
                              <RiCalendar2Fill className="w-5 h-5 text-gray-400 mr-6" />
                              <div className="-mt-1">
                                Dates
          <p className="text-lg">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</p>
            <p className="text-gray-600">Duration: {Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} day(s)</p>
          

                              </div>

                </div>
                <div className="flex items-start justify-start">
                    <RiMapPinFill className="w-5 h-5 text-gray-400 mr-6" />
                    <div>
                      <p>Destinations</p>
                      <p>{trip.locations.length } {trip.locations.length === 1 ? "destination" : "destinations"}</p>
                    </div>

                </div>
             {trip.locations.length!==0 && (   <div>
             
                  <Map className="w-full h-96 mt-6 rounded-lg overflow-hidden" itineraries={trip.locations} />

                </div>)}
                {trip.locations.length===0 && (
                  <div className="text-center p-4 mt-5">
                    <p>Add Location to see them on screen</p>
      <Link href={`/trips/${trip.id}/itinerary/new`}>
      <Button> <RiAddFill className="w-4 h-4 mr-1" /> Add Location</Button></Link>
    </div>
     

                )}
                <div>
                  <p className="text-lg font-semibold mt-4">Description</p>
                  <p>{trip.description}</p>
                </div>
              
                </TabsContent>
                <TabsContent value="itinerary" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Full Itinerary</h2>
                  </div>
                                  {trip.locations.length===0 ? (
                  <div className="text-center p-4 mt-5">
                    <p>Add Location to see them on screen</p>
      <Link href={`/trips/${trip.id}/itinerary/new`}>
      <Button> <RiAddFill className="w-4 h-4 mr-1" /> Add Location</Button></Link>
    </div>
     

                ): (<SortableItinerary tripId={trip.id} locations={trip.locations} />)}


        </TabsContent>
                    <TabsContent value="Map">
                <div className="text-2xl font-semibold mb-6">Trip summary</div>
             {trip.locations.length!==0 && (   <div>
             
                  <Map className="w-full h-96 mt-6 rounded-lg overflow-hidden" itineraries={trip.locations} />

                </div>)}
                {trip.locations.length===0 && (
                  <div className="text-center p-4 mt-5">
                    <p>Add Location to see them on screen</p>
      <Link href={`/trips/${trip.id}/itinerary/new`}>
      <Button> <RiAddFill className="w-4 h-4 mr-1" /> Add Location</Button></Link>
    </div>
     

                )}
              
                </TabsContent>

        </Tabs>

    </div>
                      <div className="text-center p-4 mt-5">
                  
      <Link href={`/trips`}>
      <Button> <RiAddFill className="w-4 h-4 mr-1" /> Back to  Trips</Button></Link>
    </div>

  </div>;
}