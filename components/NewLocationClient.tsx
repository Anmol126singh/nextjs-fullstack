"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { addLocation } from "@/lib/action/addLocation";

export default function NewLocationClient({ tripid }: { tripid: string }) {
    const [isPending, startTransition] = useTransition();
    return (
        <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center bg-gray-50 mt-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold mb-4">Add new Location </h2>

                          <form  className="space-y-3" action={(formData: FormData) => {startTransition(()=>addLocation(formData,tripid))}}>
                    <label className="block text-md font-semibold text-gray-700 mt-8 text-left "> Address</label>
                    <input name="address" type="text" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter address" />
                    <Button type="submit" className="w-full mt-4">{isPending ? "Adding..." : "Add Location"}</Button>
                </form>
                  
                </div>
              
            </div>
        </div>
    )
}