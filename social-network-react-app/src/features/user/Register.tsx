import React, { useState } from "react";
import {
  useLazyCurrentQuery,
  useRegisterMutation,
} from "../../app/services/userApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import { Button, Link } from "@nextui-org/react";
import { hasErrorField } from "../../utils/hasErrorField";
import ErrorMessage from "../../components/ErrorMessage";

type RegisterType = {
  email: string;
  name: string;
  password: string;
};

type RegisterPropsType = {
  setSelected: (value: string) => void;
};

const Register: React.FC<RegisterPropsType> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "", name: "" },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap();
      setSelected("login");
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
        name="name"
        label="Name"
        type="text"
        required="Required field"
      />

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
        <span>Don you have an account? </span>
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Sign in
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Register;
