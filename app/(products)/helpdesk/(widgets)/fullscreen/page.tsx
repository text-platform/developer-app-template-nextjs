"use client";

import { NumericInput } from "@livechat/design-system-react-components";
import { useApp, useHelpDeskFullscreen } from "@livechat/developer-ui-react";
import { useEffect, useState } from "react";

export default function Page() {
  const { app } = useApp();
  const { widget } = useHelpDeskFullscreen();

  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    widget.setNotificationBadge(notificationsCount);
  }, [widget, notificationsCount]);

  return (
    <div>
      <h1>Fullscreen widget</h1>
      <NumericInput
        min={0}
        max={99}
        id="notifications-count"
        value={String(notificationsCount)}
        onChange={(value) => setNotificationsCount(Number(value))}
      />
    </div>
  );
}
