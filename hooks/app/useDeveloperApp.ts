import { useEffect, useState } from 'react'
import { DeveloperApp, DeveloperAppConfig } from '@livechat/developer-sdk'
import lcConfig from '../../livechat.config.json'

const config = lcConfig as DeveloperAppConfig;

function useDeveloperApp() {
  const [developerApp, setDeveloperApp] = useState<DeveloperApp | null>(null)

  useEffect(() => {
    DeveloperApp.init(config as DeveloperAppConfig)
      .then(async (app) => {
        if (config.auth?.clientId) {
          await app.authorize()
        }

        return app
      })
      .then(setDeveloperApp)
  }, [])

  return developerApp
}

export default useDeveloperApp
