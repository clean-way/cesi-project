"use client";
import { SessionProvider } from "next-auth/react";
import { NewUserForm } from "./form"

export default function RegisterPage() {
  return (
      <section
        className="h-screen bg-[url('/auth_background.png')]"
        style={{ backgroundSize: "cover" }}
      >
        <div className="h-screen w-full bg-black bg-opacity-50">
          <div
            className="h-screen w-full flex items-center justify-center bg-[url('/auth_bottom.png')] bg-no-repeat bg-bottom"
            style={{ backgroundSize: "contain" }}
          >
            <SessionProvider>
              <NewUserForm />
            </SessionProvider>
          </div>
        </div>
      </section>
  );
}
