"use client";

import { Card } from "@livechat/design-system-react-components";
import { useApp, useHelpDeskDetails } from "@livechat/developer-ui-react";

export default function Page() {
  const { app } = useApp();
  const { widget, ticketInfo } = useHelpDeskDetails();

  return (
    <div>
      <h1>Ticket Details widget</h1>

      <Card title="Ticket info">
        {ticketInfo ? (
          <ul>
            <li>Ticket ID: {ticketInfo.id}</li>
          </ul>
        ) : (
          "Loading ticket info ..."
        )}
      </Card>
    </div>
  );
}
