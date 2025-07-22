import Input from "@/components/form/input/InputField"
import Button from "@/components/ui/button/Button"
import { postProject } from "@/services/form/projectQuery"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const AddProjectForm = () => {
    const queryClient = useQueryClient()
    const [projectName, setProjectName] = useState("")
    const {mutate: addProjectMutation} = useMutation({
        mutationFn: () => postProject({name: projectName}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ["project"]
            })
        }
    })
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            addProjectMutation()
        }}>

        <Input placeholder="Project Name" required={true}  onChange={(e)=>setProjectName(e.target.value)}/>
        <Button className="mt-3" size="xs">Add Project</Button>
        </form>
    </div>
  )
}
export default AddProjectForm