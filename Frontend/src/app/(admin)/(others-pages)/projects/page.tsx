"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import Button from "@/components/ui/button/Button"
import { Modal } from "@/components/ui/modal"
import { getProjectsData } from "@/services/form/projectQuery"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddProjectForm from "./AddProjectForm"

type ProjectT = {
    id: string,
    name: string
}
const page = () => {
    const [isProjectFormActive, setIsProjectFormActive] = useState(false)
    const {data: projectsData, isLoading} = useQuery({
        queryKey: ["project"],
        queryFn: getProjectsData
    })
    useEffect(()=>{
        console.log(projectsData)
    }, [projectsData])
  return (
    <div>
        <PageBreadcrumb pageTitle="Projects" />
            <div className="flex justify-end items-center w-full">

            <Button size="xs" onClick={()=>setIsProjectFormActive(!isProjectFormActive)}>Add Project</Button>
            </div>
        <div className="my-12 grid grid-cols-12 gap-5">
            { isLoading ? <span>Loading...</span> :
             projectsData?.result.map((item : ProjectT) => (
                <div className="px-4 col-span-4">
                <div className="bg-white shadow-xl px-4 py-4">
                    <h1 className="text-xl">{item.name}</h1>
                    <Link href={`/createForm/${item.id}`}><Button size="xs" className="mt-4">Details</Button></Link> 
                    <Link href={`/viewForm/${item.id}`}><Button size="xs" variant="primary" className="mt-4 ms-3">View Form</Button></Link> 
                </div>
                </div>
            ))}

            <Modal className="max-w-[500px] p-8" isOpen={isProjectFormActive} onClose={()=>setIsProjectFormActive(false)} ><AddProjectForm/></Modal>
           
        </div>
    </div>
  )
}
export default page