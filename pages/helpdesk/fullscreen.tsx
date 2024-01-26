import { useEffect, useState } from 'react'
import { Card, NumericInput } from '@livechat/design-system-react-components'
import FullScreenLoader from 'components/FullScreenLoader'
import ViewContainer from 'components/ViewContainer'
import useDeveloperApp from 'hooks/app/useDeveloperApp'
import useHelpDeskFullscreenWidget from 'hooks/products/helpdesk/useFullscreenWidget'
import { AgentConfigurationDto, LiveChatConfigurationApiError } from '@livechat/developer-studio-api'

function HelpDeskFullscreen() {
  const developerApp = useDeveloperApp()
  const fullscreenWidget = useHelpDeskFullscreenWidget()
  const [agents, setAgents] = useState<AgentConfigurationDto[] | null>(null)
  const [notificationsCount, setNotificationsCount] = useState(0)

  useEffect(() => {
    if (fullscreenWidget) {
      fullscreenWidget.setNotificationBadge(notificationsCount)
    }
  }, [fullscreenWidget, notificationsCount])

  useEffect(() => {
    if (!developerApp?.authorization) {
      return
    }

    developerApp.api.products.livechat.configuration.agents
      .getAgents()
      .then(({ data }) => {
        setAgents(data)
      })
      .catch(async (error) => {
        const apiError = error.response.data.error as LiveChatConfigurationApiError | undefined
        const eventMessage = apiError ? `${apiError.type}: ${apiError.message}` : 'Unknown error'

        await developerApp.features.reports.sendError('4xx', eventMessage)
      })
  }, [developerApp])

  if (fullscreenWidget === null || developerApp === null || agents === null) {
    return <FullScreenLoader />
  }

  return (
    <ViewContainer>
      <h1>Fullscreen widget</h1>
      <NumericInput
        min={0}
        max={99}
        id="notifications-count"
        value={String(notificationsCount)}
        onChange={(value) => setNotificationsCount(Number(value))}
      />
      <h3>Agents list:</h3>
      <div className="agents-list">
        {agents.map((agent) => (
          <Card key={agent.id} title={agent.name} src={agent.avatar}>
            {agent.role}
          </Card>
        ))}
      </div>
    </ViewContainer>
  )
}

export default HelpDeskFullscreen
