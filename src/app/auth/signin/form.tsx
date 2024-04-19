"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const queryParameters = new URLSearchParams(window.location.search)
  const errorName = queryParameters.get("error")
  const callbackUrl = queryParameters.get("callbackUrl")

  const errors : {[key: string]: string} = {
    "CredentialsSignin": "Invalid email or password",
  }

  const [error, setError] = useState(errorName ? errors[errorName] : "");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      callbackUrl: callbackUrl || "/",
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && (
          <text color="red.500">{error}</text>
        )}
        <link href="/auth/signup">
        </link>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <div>
        <button
          onClick={() => signIn("apple")}
        >
          Sign in with Apple
        </button>
        <button
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
        </div>
    </div>
  );
};
