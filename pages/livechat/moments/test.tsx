import ViewContainer from 'components/ViewContainer'
import createMomentsSDK from '@livechat/moments-sdk'
import { useEffect } from 'react'

function LiveChatTestMoment() {
  useEffect(() => {
    createMomentsSDK({ title: 'My App' }).then((momentsSDK) => {
      console.log('chatId: ', momentsSDK.chatId)

      // your code
    })
  }, [])

  return (
    <ViewContainer>
      <h1>Test moment</h1>
    </ViewContainer>
  )
}

export default LiveChatTestMoment
