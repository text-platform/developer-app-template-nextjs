import { HelpDeskDetailsProvider } from "@livechat/developer-ui-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HelpDeskDetailsProvider>{children}</HelpDeskDetailsProvider>;
}
