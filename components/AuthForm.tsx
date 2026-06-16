"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { object, z, ZodType } from "zod";
import { Controller, DefaultValues, FieldValues, Path, useForm } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  formSchema: ZodType<T, T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({ type, formSchema, defaultValues, onSubmit }: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    console.log(data);
  };

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-3xl font-bold'>
        {isSignIn ? "Welcome Back to NeighBorrow!" : "Create Your Account"}
      </h1>
      <p className='text-lg'>
        {isSignIn
          ? "Access the vast collection of items, and stay updated :)"
          : "Please complete all fields and upload a valid ID to explore and borrow items :)"}
      </p>
      <form id='auth-form' className='w-full' onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup className='w-full gap-5'>
          {Object.keys(defaultValues).map(fieldName => (
            <Controller
              key={fieldName}
              name={fieldName as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='auth-form-username' className='form-label'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FieldLabel>
                  {field.name === "IdConfirmation" ? (
                    <ImageUpload />
                  ) : (
                    <Input
                      {...field}
                      required
                      id={`auth-form-${fieldName}`}
                      aria-invalid={fieldState.invalid}
                      placeholder={FIELD_PLACEHOLDERS[field.name as keyof typeof FIELD_PLACEHOLDERS]}
                      className='form-input'
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    />
                  )}

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
      </form>
      <Button type='submit' form='auth-form' className='main-button'>
        {isSignIn ? "Sing In" : "Sign Up"}
      </Button>
      <p className='text-center font-medium'>
        {isSignIn ? "Don't have an account yet? " : "Have an account already? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className='text-secondary font-bold'>
          {isSignIn ? "Register here" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
