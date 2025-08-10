import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <Navbar></Navbar>

      <div className="content gap-8">
        <div className="text-center">
          <p className="text-[var(--neutral-color)] font-bold">
            Let's take care of our earth together!
          </p>
          <h1 className="text-[var(--primary-color)] text-3xl">
            Hi, earther! Please select your role.
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            isPrimary={true}
            text={"Admin"}
            onClick={() => navigate("/admin")}
          ></Button>
          <Button
            isPrimary={false}
            text={"User"}
            onClick={() => navigate("/user")}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
