"use client"

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      formSchema={signUpSchema}
      defaultValues={{ fullName: "", email: "", address: "", password: "", idConfirmation: "", }}
      onSubmit={signUp}
    />
  );
};

export default SignUp;
