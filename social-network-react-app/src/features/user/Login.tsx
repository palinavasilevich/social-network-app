import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { Button, Link } from "@nextui-org/react";
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi";
import { useNavigate } from "react-router-dom";
import { hasErrorField } from "../../utils/hasErrorField";
import ErrorMessage from "../../components/ErrorMessage";

type LoginType = {
  email: string;
  password: string;
};

type LoginPropsType = {
  setSelected: (value: string) => void;
};

const Login: React.FC<LoginPropsType> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate("/");
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Required field"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="Required field"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        <span>Don't you have an account? </span>
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default Login;
