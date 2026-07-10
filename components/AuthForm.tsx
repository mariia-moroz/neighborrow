"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Controller, DefaultValues, FieldValues, Path, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import Link from "next/link";
import { useState } from "react";
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from "@/constants";
import { Spinner } from "./ui/spinner";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  formSchema: ZodType<T, T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string; redirect?: string }>;
}

const AuthForm = <T extends FieldValues>({ type, formSchema, defaultValues, onSubmit }: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const result = await onSubmit(data);

    if (result.success) {
      toast.success("Success", {
        description: isSignIn ? "You have successfully signed in!" : "You have successfully signed up!",
      });
      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
        description: result.error ?? "An error occured",
      });
      if (result.redirect) {
        router.push(result.redirect);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col gap-5 md:gap-8'>
      <h1 className='text-2xl sm:text-3xl! font-bold'>
        {isSignIn ? "Welcome Back!" : "Create Your Account"}
      </h1>
      <p className='text-md lg:text-lg'>
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
                  {field.name === "idConfirmation" ? (
                    <ImageUpload value={field.value} onFileChange={field.onChange} />
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
      <Button type='submit' form='auth-form' className='main-button' disabled={isLoading}>
        {isSignIn ? "Sing In" : "Sign Up"}
        {isLoading && <Spinner data-icon='inline-start' />}
      </Button>
      <p className='text-center font-medium'>
        {isSignIn ? "Don't have an account yet? " : "Have an account already? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} prefetch={false} className='text-secondary font-bold'>
          {isSignIn ? "Register" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
