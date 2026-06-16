"use client"

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      formSchema={signUpSchema}
      defaultValues={{ fullName: "", email: "", address: "", IdConfirmation: "", password: "" }}
      onSubmit={async () => ({ success: true })}
    />
  );
};

export default SignUp;
