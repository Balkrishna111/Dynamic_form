"use client"
import Input from "@/components/form/input/InputField"
import { Modal } from "@/components/ui/modal"

const Page = () => {
  return (
    <Modal isOpen={true} onClose={()=>{}}>
       <div>
      <Input placeholder="email"/>
      <Input placeholder="password"/>
    </div>
    </Modal>
  )
}
export default Page