import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
      <section
        className="h-[calc(100dvh-4rem)] bg-[url('/auth_background.png')]"
        style={{ backgroundSize: "cover" }}
      >
        <div className="h-[calc(100dvh-4rem)] w-full bg-black bg-opacity-50">
          <div
            className="h-[calc(100dvh-4rem)] w-full flex items-center justify-center bg-[url('/auth_bottom.png')] bg-no-repeat bg-bottom"
            style={{ backgroundSize: "contain" }}
          >
            <RegisterForm />
          </div>
        </div>
      </section>
  );
}