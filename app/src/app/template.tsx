"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Avatar, Button, Divider, Flex, Layout, Tooltip } from "antd";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

export default function Template({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Flex gap="middle" wrap="wrap" flex={1}>
          <PageLayout>
            <div>
              <PageHeader />
              <Divider style={{ margin: 0 }} />
            </div>
            <Content>{children}</Content>
            <Footer>Todealt ©{new Date().getFullYear()}</Footer>
          </PageLayout>
        </Flex>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const PageLayout = styled(Layout)`
  flex: 1;
  padding: 0 30px;
  gap: 50px;
`;

const Content = styled(Layout.Content)`
  flex: 1;
`;

const Footer = styled(Layout.Footer)`
  text-align: center;
`;

function PageHeader() {
  const { data: session } = useSession();

  return (
    <Header>
      <Image src={"/favicon.ico"} alt="Todealt" width={30} height={30} />
      <HeaderTitle>Todealt</HeaderTitle>
      {session && (
        <Flex style={{ marginLeft: "auto" }} gap={5}>
          <Avatar src={session.user?.image} />
          <Tooltip placement="bottom" title="Sign out">
            <Button type="text" danger size="middle" onClick={() => signOut()}>
              <LogoutOutlined />
            </Button>
          </Tooltip>
        </Flex>
      )}
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  margin-bottom: 0;
`;
