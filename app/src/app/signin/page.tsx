"use client";

import { GithubFilled } from "@ant-design/icons";
import { Flex, Button } from "antd";
import Title from "antd/es/typography/Title";
import { signIn } from "next-auth/react";

export default function Signin() {
  return (
    <Flex vertical={true} align="center">
      <Title>Manage your tasks with ease.</Title>
      <Button
        type="default"
        size="large"
        icon={<GithubFilled />}
        onClick={() => signIn("github", { callbackUrl: "/notes" })}
      >
        Sign in with GitHub
      </Button>
    </Flex>
  );
}
