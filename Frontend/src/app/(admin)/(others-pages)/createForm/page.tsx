"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react"
import FormModalComponent from "./FormModalComponent";
import { useQuery } from "@tanstack/react-query";
import { getFormData } from "@/services/form/formQuery";
import FormElementCard from "./FormElementCard";

export type FormElementType = {
    id?: string;
    type: string;
    label: string;
    selectOptions?: string[]; // For select or radio inputs
    placeholder?: string; // For text inputs
    singleFileUpload?: boolean;
    files?: File | File[]; // For file uploads
    fileTypes?: string[]; // For file types
    radioOptions?: { name: string; value: string }[]; // For radio inputs
    checkBoxOptions?: { name: string; value: string }[]; // For radio inputs
    required?: boolean; // For validation
    value?: string; // For storing input value
    validation?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: string; // Regex pattern for validation
    };
    errorMessage?: string; // For displaying validation errors
}

export type FormElementsType = FormElementType[] | [];
const CreateForm = () => {
    const [isFormActive, setIsFormActive] = useState<boolean>(false);
    const [formElements, setFormElements] = useState<FormElementsType>([]);

    const { data: formDataFromDB, isLoading } = useQuery({
        queryKey: ['form'],
        queryFn: getFormData,
    })
    useEffect(() => {
        setFormElements(formDataFromDB?.result || [])
        if (formDataFromDB) {

            console.log(formDataFromDB)
        }
    }, [formDataFromDB?.result])

    useEffect(() => {
        console.log(formElements)
    }, [formElements])
    return (
        <div>
            <PageBreadcrumb pageTitle="View Form" />

            <div>
                <div className="flex justify-end items-center">
                    <Button variant="primary" children={"Add Element"} size="sm" onClick={() => setIsFormActive(prev => !prev)} />
                </div>
                <div className="my-8">

                    {
                        isLoading && (
                            <p>Loading...</p>
                        )
                    }

                    {formElements.length > 0 && (
                        formElements.map((element) => (
                            <FormElementCard element={element} />
                        ))
                    )}
                </div>

                {
                    <Modal children={<FormModalComponent setFormElements={setFormElements} />} isOpen={isFormActive} onClose={() => setIsFormActive(false)} className="max-w-[500px] p-8" />
                }
            </div>

            <Button children={"Create Form"} />
        </div>
    )
}
export default CreateForm