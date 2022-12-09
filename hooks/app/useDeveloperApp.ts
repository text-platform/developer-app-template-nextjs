import { useEffect, useState } from 'react'
import { DeveloperApp, DeveloperAppConfig } from '@livechat/developer-sdk'
import lcConfig from '../../livechat.config.json'

function useDeveloperApp() {
  const [developerApp, setDeveloperApp] = useState<DeveloperApp | null>(null)

  useEffect(() => {
    DeveloperApp.init(lcConfig as DeveloperAppConfig).then(setDeveloperApp)
  }, [])

  return developerApp
}

export default useDeveloperApp
