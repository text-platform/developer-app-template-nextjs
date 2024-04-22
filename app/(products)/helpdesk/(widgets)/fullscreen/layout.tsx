import { HelpDeskFullscreenProvider } from "@livechat/developer-ui-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HelpDeskFullscreenProvider>{children}</HelpDeskFullscreenProvider>;
}
