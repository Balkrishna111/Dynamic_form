"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormElementType } from "./page"
import { deleteFormElement } from "@/services/form/formQuery"
import EditFormModalComponent from "./EditFormModalComponent"
import { useState } from "react"

const FormElementCard = ({element} : {element: FormElementType}) => {
    const queryClient = useQueryClient()
const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const {mutate: deleteFormElementMutation} = useMutation({
        mutationFn: () => deleteFormElement(element.id || ""),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['form']
            })
        }

    })
  return (
       <div className=" shadow-lg w-full px-8 py-4 bg-white flex flex-col gap-2 mb-4 relative" key={element.id}>
        <div className="flex">
            <p className="font-bold text-xl">{element.label}</p>{element.required && <span className="text-red-500">*</span>}
        </div>
            <p>Data Type: {element.type}</p>

            <div className="absolute right-0 top-0 flex flex-col gap-4 justify-center p-3">
                <button className="bg-yellow-300 text-black px-4 text-md rounded-md" onClick={() => setIsEditModalOpen(!isEditModalOpen)}>Edit</button>
                <button className="bg-red-500 text-white px-4 text-md rounded-md" onClick={()=>deleteFormElementMutation()}>Delete</button>
            </div>

{isEditModalOpen && 
<div className="bg-gray-100 px-4 py-2">
    <EditFormModalComponent element={element}/>
    </div>}
            
    </div>
  )
}
export default FormElementCard