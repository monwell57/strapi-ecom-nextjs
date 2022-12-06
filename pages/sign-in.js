import React, { useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";
import { useRouter } from "next/router";
import { useSignIn } from "../hooks/user";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push("/");
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid Credentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}