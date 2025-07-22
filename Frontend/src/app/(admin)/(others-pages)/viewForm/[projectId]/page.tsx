"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import { getSingleProject } from "@/services/form/projectQuery"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FormElementsType } from "../../createForm/page"
import Label from "@/components/form/Label"
import Input from "@/components/form/input/InputField"
import { useParams } from "next/navigation"


const Page = () => {
    const params = useParams();
    const projectId = params.projectId as string;
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formElements, setFormElements] = useState<FormElementsType>([]);


    const { data: singleProjectData, isLoading } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getSingleProject(projectId)
    })

    useEffect(() => {
        setFormElements(singleProjectData?.formElements ?? []);
    }, [singleProjectData])
    return (
        <>
            <PageBreadcrumb pageTitle={`View Form`} />
            {isLoading ? <span>Loading...</span> : <div>
                <div className="flex justify-between items-center">

                    <h1 className="text-xl mt-8">Name: {singleProjectData?.name}</h1>
                </div>
                <div>

                    <div className="my-8">

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                {
                                    formElements?.map((element) => (
                                        <div key={element.id} className="col-span-1 w-full px-8 py-4 bg-white flex flex-col gap-2 mb-4">

                                            {element.type === "select" && (
                                                <>
                                                    <Label>{element.label}{element.required && <span className="text-red-500">*</span>}</Label>
                                                    <select name="" id="">
                                                        {element.selectOptions?.map((option, index) => (
                                                            <option key={index} value={option}>{option}</option>
                                                        ))}

                                                    </select>
                                                </>
                                            )}

                                            {/* ######################## */}
                                            {/* For Radio Inputs */}
                                            {/* ######################## */}
                                            {element.type === "radio" && element.radioOptions && (
                                                <>
                                                    <Label>{element.label}{element.required && <span className="text-red-500">*</span>}</Label>

                                                    {element.radioOptions.map((option) => (
                                                        <div className="flex items-center gap-4 justify-start">
                                                            <input type="radio" id={element.label} name={element.label} />
                                                            <label>{option.value}</label>
                                                        </div>
                                                    ))}

                                                </>
                                            )}

                                            {/* ######################## */}
                                            {/* Radio Inputs end */}
                                            {/* ######################## */}

                                            {/* ######################## */}
                                            {/* Checkbox Inputs */}
                                            {/* ######################## */}
                                            {/* <Label>{element.label}</Label> */}
                                            {element.type === "checkbox" && element.checkBoxOptions && (

                                                <>
                                                    <Label>{element.label}</Label>
                                                    {element.checkBoxOptions.map((option) => (
                                                        <div className="flex items-center gap-4 justify-start">
                                                            <input type="checkbox" id={element.label} name={element.label} />
                                                            <label>{option.value}{element.required && <span className="text-red-500">*</span>}</label>
                                                        </div>
                                                    ))}

                                                </>

                                            )}
                                            {/* ######################## */}
                                            {/* Checkbox Inputs end */}
                                            {/* ######################## */}

                                            {/* ######################## */}
                                            {/* text Inputs start */}
                                            {/* ######################## */}
                                            {
                                                (element.type == "text" || element.type == "number" || element.type == "email" || element.type == "password") && (
                                                    <>
                                                        <Label>{element.label}{element.required && <span className="text-red-500">*</span>}</Label>
                                                        <Input placeholder={element.placeholder} required={element.required} type={element.type} defaultValue={element.value} />
                                                    </>
                                                )
                                            }

                                            {/* ######################## */}
                                            {/* text Inputs end */}
                                            {/* ######################## */}

                                            {/* ######################## */}
                                            {/* textarea start */}
                                            {/* ######################## */}
                                            {
                                                (element.type == "textarea") && (
                                                    <>
                                                        <Label>{element.label}{element.required && <span className="text-red-500">*</span>}</Label>
                                                        <textarea rows={3} placeholder={element.placeholder} required={element.required} defaultValue={element.value} />
                                                    </>
                                                )
                                            }

                                            {/* ######################## */}
                                            {/* textarea end */}
                                            {/* ######################## */}


                                            {/* ######################## */}
                                            {/* file upload start */}
                                            {/* ######################## */}
                                            {
                                                (element.type == "file") && (
                                                    <>
                                                        <Label>{element.label}{element.required && <span className="text-red-500">*</span>}</Label>
                                                        <input type="file" multiple={!element.singleFileUpload} placeholder={element.placeholder} required={element.required} accept={element.fileTypes?.join(",")} />
                                                    </>
                                                )
                                            }

                                            {/* ######################## */}
                                            {/* file upload end */}
                                            {/* ######################## */}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>


                </div>


            </div>}
        </>

    )
}
export default Page