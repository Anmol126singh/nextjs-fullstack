"use client";
import { Location } from "@/app/generated/prisma";
import {GoogleMap, LoadScript, Marker, useLoadScript} from '@react-google-maps/api';


interface MapProps {
  itineraries: Location[];
    className?: string;
}

export default function Map({ itineraries, className }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! || '',
  });
  if(!isLoaded) return <div>Loading...</div>;
  if(loadError) return <div>Error loading map</div>;
  const center = { lat: itineraries[0]?.latitude , lng: itineraries[0]?.longitude};
  return (
    <div className="w-full h-[500px]">

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={8}
      >
        {itineraries.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.latitude, lng: location.longitude }}
            title={location.Locationname}
          />
        ))}
    

      </GoogleMap>
    </div>
  );
}
