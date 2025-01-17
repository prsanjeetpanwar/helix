"use client"
import { useRouter } from "next/navigation"
import * as Z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpload } from "@/components/file-upload"

import axios from "axios"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = Z.object({
    name: Z.string().min(1, {
        message: "Server Name is required"
    }),
    imageUrl: Z.string().min(1, {
        message: "Server Image Url is required"
    })
})



export const InitialModal = () => {
    const router=useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: Z.infer<typeof formSchema>) => {
      try {
         await axios.post('/api/servers',values)  
         form.reset()
         router.refresh()
         window.location.reload()

      }
      catch(error){
        console.log(error)
      }
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white  text-black p-0 
        
             overflow-hidden ">
                <DialogHeader className="pt-8 px-6 ">
                    <DialogTitle className="text-center  text-2xl font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 ">
                        Bring your server to life with a unique name and custom image! Personalize it now and make it stand out. Don't worry, you can easily update it anytime.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                              <FormField
                              control={form.control}
                              name="imageUrl"
                              render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                       <FileUpload
                                       endpoint="serverImage"
                                       value={field.value}
                                       onChange={field.onChange}
                                       />
                                    </FormControl>
                                </FormItem>
                              )}
                              />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 
                                    dark:text-secondary/70"
                                        >Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0
                                                focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4" >
                            <Button variant='primary' disabled={isLoading} className="
                       " >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}