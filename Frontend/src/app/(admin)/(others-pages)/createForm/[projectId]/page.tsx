"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import Button from "@/components/ui/button/Button"
import { Modal } from "@/components/ui/modal"
import { getSingleProject } from "@/services/form/projectQuery"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import FormModalComponent from "../FormModalComponent"
import { FormElementsType } from "../page"
import FormElementCard from "../FormElementCard"
import { useParams } from "next/navigation"


const page = () => {
    const params = useParams()
    const projectId = params.projectId as string

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formElements, setFormElements] = useState<FormElementsType>([]);


    const { data: singleProjectData, isLoading } = useQuery({
        queryKey: ["project", params.projectId],
        queryFn: () => getSingleProject(projectId)
    })

    useEffect(() => {
        setFormElements(singleProjectData?.formElements ?? []);
    }, [singleProjectData])
    return (
        <>
            <PageBreadcrumb pageTitle={`Project`} />
            {isLoading ? <span>Loading...</span> : <div>
                <div className="flex justify-between items-center">

                    <h1 className="text-xl mt-8">Name: {singleProjectData?.name}</h1>
                    <Button variant="primary" size="xs" onClick={() => setIsModalOpen(prev => !prev)}>Add Element</Button>
                </div>
                <div>

                    <div className="my-8">

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            formElements.length > 0 &&
                            formElements.map((element) => (
                                <FormElementCard key={element.id} element={element} />
                            ))
                        )}
                    </div>


                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[500px] p-8">
                        <FormModalComponent setFormElements={setFormElements} projectId={singleProjectData?.id} />
                    </Modal>
                </div>


            </div>}
        </>

    )
}
export default page