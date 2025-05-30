import LogInComp from "@/components/auth/logIn/page";
import { Suspense } from "react";

const Login = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LogInComp />
      </Suspense>
    </div>
  );
};

export default Login;
