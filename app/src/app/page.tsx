"use client";

import { Flex, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/signin");
    }

    if (status == "authenticated") {
      router.push("/notes");
    }
  });

  return (
    <Flex flex={1} align="center" justify="center">
      <Spin size="large" fullscreen />
    </Flex>
  );
  7;
}
