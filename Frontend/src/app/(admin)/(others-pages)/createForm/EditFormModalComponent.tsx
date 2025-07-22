"use client";
import Input from "@/components/form/input/InputField"
import Radio from "@/components/form/input/Radio";
import Label from "@/components/form/Label"
import Select from "@/components/form/Select"
import {useEffect, useState } from "react";
import { FormElementType } from "./page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFormElement } from "@/services/form/formQuery";

type SingleFormElement = {
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

const EditFormModalComponent = ({element} : {element : FormElementType}) => {
    const queryClient = useQueryClient()
    const [selectOption, setSelectOption] = useState<string>("")
    const [radioOption, setRadioOption] = useState<{name: string, value: string}>()
    const [checkBoxOption, setCheckBoxOption] = useState<{name: string, value: string}>()
    const [fileUpload, setFileUpload] = useState<File | File[]>()
    const [formElement, setFormElement] = useState<SingleFormElement>({
        type: "text",
        label: "",
        selectOptions: [],
        placeholder: "",
        required: false,
        files : [],
        fileTypes: [],
        singleFileUpload: false,
        value: "",
        checkBoxOptions: [],
        radioOptions: [],
        validation: {
            required: false,
            minLength: 0,
            maxLength: 0,
            pattern: ""
        },
        errorMessage: ""
    });

    useEffect(() => {
        if (element) {
            setFormElement(element);
        }
    }, [element]);

const {mutate: mutateFormElement, isPending} = useMutation({
    mutationFn: () => updateFormElement(formElement),
    onSuccess : () =>{
          queryClient.invalidateQueries({ queryKey: ["form"] });
  queryClient.invalidateQueries({ queryKey: ["project"] });
    }
})

  return (
    <form onSubmit={(e)=> {
        e.preventDefault()

    mutateFormElement()

    }} >
    <div className="w-4/6 ">
        <div>
            <Label children={"Enter form label"}/>
            <Input defaultValue={formElement.label}  placeholder="label" onChange={(e)=> {setFormElement({...formElement, label : e.target.value})}}/>
        </div>
        <div>
            <Label children={"Data Type"}/>
           <Select defaultValue={element.type}  onChange={(e) => setFormElement({ ...formElement, type: e })} 
                    options={[
                {
                    label: "Text",
                    value: "text"
                },
                {
                    label: "Number",
                    value: "number"
                },
                {
                    label: "Email",
                    value: "email"
                },
                {
                    label: "Password",
                    value: "password"
                },
                {
                    label: "Select",
                    value: "select"
                },
                {
                    label: "Radio",
                    value: "radio"
                },
                {
                    label: "Checkbox",
                    value: "checkbox"
                },
                {
                    label: "Textarea",
                    value: "textarea"
                },
                {
                    label: "File Upload",
                    value: "file"
                }
        ]}
           />
        </div>
        {
            formElement.type === "select" &&  (
    <div className="my-4">
        <div className="flex justify-between items-center ">

        <Label className="text-sm">Add Option</Label>
    </div>
    <ul>
    {
        formElement.selectOptions?.map((item, index)=> (
            <li className="list-disc"><p>{item}</p></li>
        ))
    }
    </ul>
    <div className="flex items-center">
    <input placeholder="Option" className="border-2 px-4 py-2 rounded-lg" value={selectOption} onChange={(e)=> {
       setSelectOption(e.target.value)
    }
}/>
    <button className="px-4 py-1 bg-blue-500 text-white" type="button" onClick={()=> {
        setFormElement({
            ...formElement,
            selectOptions: [...(formElement.selectOptions ?? []), selectOption]
        });
        setSelectOption("")
    }}>Add</button>
</div>

</div>
            )
        }
{/* 
        #####################
        For Radio Inputs
        ##################### */}

         {
            formElement.type === "radio" &&  (
    <div className="my-4">
        <div className="flex justify-between items-center ">

        <Label className="text-sm">Add Option</Label>
    </div>
    <ul>
    {
        formElement.radioOptions?.map((item, index)=> (
            <li className="list-disc"><p>{item.value}</p></li>
        ))
    }
    </ul>
    <div className="flex items-center">
    <input placeholder="Option" className="border-2 px-4 py-2 rounded-lg" value={radioOption?.value} onChange={(e)=> {
       setRadioOption({
        name: formElement.label,
        value: e.target.value
       })
    }
}/>
    <button className="px-4 py-1 bg-blue-500 text-white" type="button" onClick={()=> {
        if(radioOption)
        setFormElement({
            ...formElement,
            radioOptions: [...(formElement.radioOptions ?? []), radioOption]
        });
        setRadioOption({ name: formElement.label, value: "" })
    }}>Add</button>
</div>

</div>
            )
        }
{/* 
        #####################
        Radio Inputs End
        ##################### */}

        {/* 
        #####################
        For Checkbox Inputs
        ##################### */}
                 {
            formElement.type === "checkbox" &&  (
    <div className="my-4">
        <div className="flex justify-between items-center ">

        <Label className="text-sm">Add checkbox options:</Label>
    </div>
    <ul>
    {
        formElement.checkBoxOptions?.map((item, index)=> (
            <li className="list-disc"><p>{item.value}</p></li>
        ))
    }
    </ul>
    <div className="flex items-center">
    <input placeholder="Option" className="border-2 px-4 py-2 rounded-lg" value={checkBoxOption?.value} onChange={(e)=> {
       setCheckBoxOption({
        name: formElement.label,
        value: e.target.value
       })
    }
}/>
    <button className="px-4 py-1 bg-blue-500 text-white" type="button" onClick={()=> {
        if(checkBoxOption)
        setFormElement({
            ...formElement,
            checkBoxOptions: [...(formElement.checkBoxOptions ?? []), checkBoxOption]
        });
        setCheckBoxOption({ name: formElement.label, value: "" })
    }}>Add</button>
</div>

</div>
            )
        }
        {/* 
        #####################
        Checkbox Inputs End
        ##################### */}

                {/* 
        #####################
        For File Uploads
        ##################### */}
{
  formElement.type === "file" && (
    <div className="my-4">
      <div className="flex justify-between items-center px-4 py-6 bg-gray-200 rounded-lg mb-4">
        <input
          type="radio"
          name="allowFile"
          id="allowSingleFile"
          checked={formElement.singleFileUpload}
          onChange={() =>
            setFormElement({ ...formElement, singleFileUpload: true, files: undefined })
          }
        />
        <label htmlFor="allowSingleFile" className="text-sm me-4">
          Allow Single File
        </label>
        <input
          type="radio"
          name="allowFile"
          id="allowMultipleFiles"
          checked={!formElement.singleFileUpload}
          onChange={() =>
            setFormElement({ ...formElement, singleFileUpload: false, files: [] })
          }
        />
        <label className="text-sm" htmlFor="allowMultipleFiles">
          Allow Multiple Files
        </label>
      </div>

      <div className="flex items-center px-4 py-6 bg-gray-200 rounded-lg mb-4">
        <input
          type="checkbox"
          name="fileType"
          onChange={() => {
            const fileType = ".jpg, .jpeg, .png, .gif";
            if (formElement.fileTypes?.includes(fileType)) {
              setFormElement({
                ...formElement,
                fileTypes: formElement.fileTypes?.filter((type) => type !== fileType),
              });
            } else {
              setFormElement({
                ...formElement,
                fileTypes: [...(formElement.fileTypes ?? []), fileType],
              });
            }
          }}
        />
        <label className="text-sm me-4">Images</label>

        <input
          type="checkbox"
          name="fileType"
          onChange={() => {
            const fileType = ".pdf, .doc, .docx, .txt";
            if (formElement.fileTypes?.includes(fileType)) {
              setFormElement({
                ...formElement,
                fileTypes: formElement.fileTypes?.filter((type) => type !== fileType),
              });
            } else {
              setFormElement({
                ...formElement,
                fileTypes: [...(formElement.fileTypes ?? []), fileType],
              });
            }
          }}
        />
        <label className="text-sm me-4">Files/ Documents</label>
      </div>

    </div>
  )
}

        {/* 
        #####################
        File uploads End
        ##################### */}

        

        <div>
            <Label children={"Enter form placeholder"}/>
            <Input defaultValue={formElement.placeholder} placeholder="placeholder" onChange={e=> setFormElement({...formElement, placeholder: e.target.value})}/>
        </div>
        <div className="my-2">
            <Label children={"Is Required"}/>
            <div className="flex gap-2 items-center">

            <Radio name="required" value="Yes" checked={formElement.required === true} id="1" label="Yes" onChange={(e)=> {setFormElement({...formElement, required : true})}}/>
            <Radio name="required" value="No" checked={formElement.required === false} id="2" label="No" onChange={(e)=> {setFormElement({...formElement, required : false})}}/>
            </div>
        </div>
        <div>
            <Label children={"Enter default value"}/>
            <Input placeholder="Default value" defaultValue={formElement.value} onChange={(e)=> setFormElement({...formElement, value: e.target.value})}/>
        </div>
<button type="submit" disabled={isPending} className="button border w-full py-1 bg-blue-500 text-white mt-4 rounded-md">{isPending ? "Loading...": "Submit"}</button>
    </div>
    </form>
  )
}
export default EditFormModalComponent