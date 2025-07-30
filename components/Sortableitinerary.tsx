"use client";
import { Location } from "@/app/generated/prisma";
import {DndContext,closestCenter,DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy,useSortable} from "@dnd-kit/sortable";
import { useId, useState } from "react";
import {CSS} from "@dnd-kit/utilities";
import { reorderItinerary } from "@/lib/action/reorder-itinerary";
function SortableItem({ item }: { item: Location }) {
        const{attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: item.id});

    return(
        <div {...attributes} ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="bg-white p-4 flex justify-between items-center rounded shadow hover:shadow-lg transition-shadow duration-200">
            <div>
                <h3 className="text-lg font-semibold">{item.Locationname}</h3>
                <p className="text-gray-600">{`lat:${item.latitude}, long:${item.longitude}`}</p>
            </div>
            <div className="text-gray-800 font-semibold text-lg mt-2">
                Day {item.order}
            </div>
            
        </div>
    )
}


export default  function SortableItinerary({ locations, tripId }: { locations: Location[]; tripId: string }) {
const id = useId();
const [localLocation, setLocalLocation] = useState<Location[]>(locations);
const handleDragEnd = (event: DragEndEvent) => {
    const{active, over} = event;
    if(active.id !== over?.id) {
        const oldIndex = localLocation.findIndex((location) => location.id === active.id);
        const newIndex = localLocation.findIndex((location) => location.id === over?.id);
        const newLocations = arrayMove(localLocation, oldIndex, newIndex).map((location, index) => ({
            ...location,
            order: index
        }));
        setLocalLocation(newLocations);
     reorderItinerary(tripId, newLocations.map((location) => (location.id)));
    }
}
return(
    <DndContext id={id} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
    <SortableContext items={localLocation.map((location) => location.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 ">
          {localLocation.map((item,key) => (
            <SortableItem key={key} item={item} />
          ))}
        </div>
    </SortableContext>
  </DndContext>
)

}