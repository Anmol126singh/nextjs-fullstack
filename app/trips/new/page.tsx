"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useTransition } from "react";
import { createTrip } from "@/lib/action/CreateTrip";
import { UploadButton } from "@/lib/upload-thing";
import React from "react";

export default function NewTrip(){
     const [isPending, startTransition] = useTransition();
     const [ImageURL, setImageURL] = React.useState<string | null>(null);
    return (
        <div className="container max-w-lg mt-10  mx-auto px-6 pt-8 space-x-6">

        <Card>
<CardHeader>
    <CardContent>
       
        <form className="space-y-6" action={(formData) => {
            if (ImageURL){
                formData.append("imageUrl", ImageURL);
            }
            startTransition(() => {
                createTrip(formData);
            });

        }}>
            <div>
                <label  className=" block text-sm font-medium text-gray-700 mb-1"> Title</label>
                <input type="text" name="title" placeholder="Japan..." className={cn("w-full border border-gray-300 px-3 py-2", "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")} />
            </div>
            <div>
                <label  className=" block text-sm font-medium text-gray-700 mb-1"> description</label>
                <textarea name="description" placeholder="A trip to Japan..." className={cn("w-full border border-gray-300 px-3 py-2", "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div>
                <label  className=" block text-sm font-medium text-gray-700 mb-1"> Start Date</label>
                <input type="date" name="startDate" className={cn("w-full border border-gray-300 px-3 py-2", "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")} />
            </div>
            <div>
                <label  className=" block text-sm font-medium text-gray-700 mb-1"> End Date</label>
                <input type="date" name="endDate" className={cn("w-full border border-gray-300 px-3 py-2", "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")} />
            </div>
            </div>
            <div className="text-black">
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            {ImageURL && <img src={ImageURL} alt="Trip Image" className="w-full h-48 object-cover rounded-md mb-4" width={300} height={100} />}
            <UploadButton endpoint="imageUploader" onClientUploadComplete={(res)=>{
                if(res&& res[0].ufsUrl){
                    setImageURL(res[0].ufsUrl);
                }
                
            }} className="text-black" />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Creating..." : "Create Trip"}</Button>
        </form>
    </CardContent>
</CardHeader>
        </Card>
                </div>

    )
}