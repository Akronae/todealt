import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import AntdConfig from "@/lib/antd-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata & NonNullable<{ title: string }> = {
  title: "Todealt",
  description: "Manage your tasks with ease.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ height: "100vh", display: "flex" }}
      >
        <StyledComponentsRegistry>
          <AntdConfig>{children}</AntdConfig>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
