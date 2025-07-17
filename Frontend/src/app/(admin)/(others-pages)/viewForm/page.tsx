"use client"
import { getFormData } from "@/services/form/formQuery"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FormElementsType } from "../createForm/page"
import Label from "@/components/form/Label"
import Input from "@/components/form/input/InputField"
import Select from "@/components/form/Select"

const ViewPage = () => {

  const [formElements, setFormElements] = useState<FormElementsType>([])

  const {data: formData, isLoading} = useQuery({
    queryKey: ['formData'],
    queryFn: getFormData
  })

  useEffect(()=>{
    setFormElements(formData?.result || [])
  })
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">Form</h1>
      { isLoading && (
        <p>Loading...</p>)}
<div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

{
  formElements?.map((element, index) => (
    <div key={index} className="col-span-1 w-full px-8 py-4 bg-white flex flex-col gap-2 mb-4">

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
    <Label>{element.label}</Label>

{     element.radioOptions.map((option)=>(
       <div className="flex items-center gap-4 justify-start">
     <input type="radio" id={element.label} name={element.label} />
      <label>{option.value}{element.required && <span className="text-red-500">*</span>}</label>
      </div>
     ))  }

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
{     element.checkBoxOptions.map((option)=>(
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
            <input type="file" multiple={!element.singleFileUpload}  placeholder={element.placeholder} required={element.required} accept={element.fileTypes?.join(",")} />
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
  </div>
    </div>
  )
}
export default ViewPage