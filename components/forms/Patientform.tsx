"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormfield from "../CustomFormfield";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import {UserFormValidation} from '@/lib/validation'
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const Patientform = () => {
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
    name:'',
    email:'',
    phone:'',
    },
  });

  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
     setIsLoading(true);
     try{
       const userData={
         name,
         email,
         phone
       };
       const user=await createUser(userData);

       if(user) router.push(`/patients/${user.$id}/register`)


     }
     catch(error){
            console.log(error)
     }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi   there   👋🏻</h1>
          <p className="text-dark-700">Schedule your first appointment </p>
        </section>
        <CustomFormfield
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="assets/icons/user.svg"
          iconAlt="user"
          control={form.control}
        />

        <CustomFormfield
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="afshan@prodev.com"
          iconSrc="assets/icons/email.svg"
          iconAlt="email"
          control={form.control}
        />
        <CustomFormfield
        fieldType={FormFieldType.PHONE_INPUT}
        name='phone'
        label='Phone number'
        control={form.control}
        placeholder='+(92) - 89997 '
       />
      <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default Patientform;
