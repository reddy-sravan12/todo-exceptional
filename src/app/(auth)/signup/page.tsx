// This is a server component by default (no "use client")
import { Metadata } from "next";
import SignUpComp from "@/components/auth/signUp/page"; // This is a client component


export const metadata: Metadata = {
  title: "Todo App",
  keywords: ["Todo", "Next.js", "React", "App"],
  description: "A simple Todo app built with Next.js",
  authors: [{ name: "Sravan" }],
};

export default function SignUpPage() {
  return (
    <div>
      <SignUpComp /> 
    </div>
  );
}
