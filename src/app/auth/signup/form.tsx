"use client";

import register from "@/actions/register";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    status: 0,
    name: "",
    message: "",
    details: {
      errors: [
        {
          message: "",
          path: [""],
          name: "",
        },
      ],
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formValues.password !== formValues.confirmPassword) {
      setError({
        status: 400,
        name: "Bad Request",
        message: "Passwords do not match",
        details: {
          errors: [
            {
              message: "Passwords do not match",
              path: ["password", "confirmPassword"],
              name: "password",
            },
          ],
        },
      });
      setLoading(false);
      return;
    }

    try {
      const result = await register(
        formValues.email,
        formValues.password,
        formValues.name
      );

      setLoading(false);
      if (result.status === "error") {
        console.log(result);
        return;
      }

      signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      setLoading(false);
      setError({
        status: 500,
        name: "Internal Server Error",
        message: error.message,
        details: {
          errors: [],
        },
      });
    }
  };

  const getError = (field: string) => {
    if (error.status === 0) {
      return "";
    }

    if (error.details.errors) {
      const errorField = error.details.errors.find(
        (e: any) => e.path.includes(field)
      );

      if (errorField) {
        return errorField.message;
      }
    }

    return "";
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
          type="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {error && getError("username") && (
          <text color="red.500">{getError("username")}</text>
        )}
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        {error && getError("email") && (
          <text color="red.500">{getError("email")}</text>
        )}
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && getError("password") && (
          <text color="red.500">{getError("password")}</text>
        )}
        <input
          required
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {error && getError("confirmPassword") && (
          <text color="red.500">{getError("confirmPassword")}</text>
        )}
        {error && (!error.details.errors || error.details.errors.length == 0) && (
          <text color="red.500">{error.message}</text>
        )}
        <link href="/auth/signin">
        </link>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
