import { SignIn, SignInButton, SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        afterSignUpUrl="/dashboard"
        signInUrl="/login"
        unsafeMetadata={{
          name: "string",
        }}
      />
    </div>
  );
}
