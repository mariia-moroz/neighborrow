"use client"

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

const SignIn = () => {
  return (
    <AuthForm
      type='SIGN_IN'
      formSchema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={async () => ({ success: true })}
    />
  );
};

export default SignIn;
