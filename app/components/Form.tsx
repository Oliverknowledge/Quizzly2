"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserValidation } from "@/validation/user"
import FileUploader from "./FileUploader"
import { createUser } from "@/actions/user.actions"
import { useState } from "react"
import SignIn from "./ui/githubSign-in"
import { useRouter } from "next/navigation"


export default function SignupForm() {
  const [ loading, setLoading ] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: [],
      name: "",
      password: "",
      email: "",
      examboard: undefined,
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    try{
      setLoading(true);
    
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
      examboard: values.examboard,
      profile_picture:  values.profile_photo?.[0]?.name  || "/DefaultAvatar.jpeg",
    })
    setLoading(false);
    router.push("/dashboard")}
    catch(error: any){
      console.log(error.message)
    }
  }
  
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SignIn/>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Oliver Stevenson" {...field} className = "rounded-xl font-semibold hover:bg-[#e7e7e7] pl-4 focus:bg-white  bg-[#f0f0f0] text-[#222222] tracking-wide w-[30rem] h-[3rem]"/>
              </FormControl>
              <FormDescription>
                This is your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@quizzly.com" {...field} className = "rounded-xl font-semibold hover:bg-[#e7e7e7] pl-4 focus:bg-white  bg-[#f0f0f0] text-[#222222] tracking-wide w-[30rem] h-[3rem]"/>
              </FormControl>
              <FormDescription>
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
                <Button type = "button" variant="link" className="absolute translate-x-[20rem] translate-y-[3.25rem] " onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Password"
                          className={`   
                            ${!showPassword ? "text-2xl  pb-2 items-center placeholder:text-sm placeholder:tracking-wide placeholder:-translate-y-[0.25rem]" : "placeholder:text-sm placeholder:tracking-normal "}                       
                            rounded-xl 
                            font-semibold 
                            pl-4 
                            mt-4 
                            bg-[#f0f0f0] 
                            focus:bg-white 
                            hover:bg-[#e7e7e7] 
                            text-[#222222] 
                            w-[25rem] 
                            h-[3rem] 
                            
                            
                          
                            `}
                          {...field}
                 
                        />
              </FormControl>
              <FormDescription>
                Your password, keep it safe
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <div className = "flex flex-row justify-between px-12"> 
         <FormField
          control={form.control}
          name="examboard"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "text-lg ">Maths Exam Board</FormLabel>
              <FormControl>
              <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 mt-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Edexcel" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Edexcel
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 ">
                    <FormControl>
                      <RadioGroupItem value="AQA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      AQA
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="OCR" />
                    </FormControl>
                    <FormLabel className="font-normal">OCR</FormLabel>
                  </FormItem>
                </RadioGroup>        
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
            <FormLabel >
              <h1 className = "text-center">Profile photo</h1></FormLabel>
            <FormControl>

                    <FileUploader files={field.value} onChange={field.onChange} />
              
                </FormControl>
              </FormItem>
          )}
        />
        </div>
        {!loading ? (
        <Button type="submit">Get started</Button>)
        : (
          <Button
          className=" font-semibold text-white text-lg   "
          disabled
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-gray-400 rounded-full h-2 w-2 mx-0.5 animate-pulse" />
          ))}
        </Button>
        )
}   
      </form>
    </Form>
  )
}
