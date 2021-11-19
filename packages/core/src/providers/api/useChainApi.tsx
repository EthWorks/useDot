import type { ConnectionState, UseApi } from './types'

import { ApiRx, WsProvider } from '@polkadot/api'
import { ApiOptions } from '@polkadot/api/types'
import { useEffect, useMemo, useState } from 'react'

export const useChainApi = (chainUrl: string, options?: ApiOptions): UseApi => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')

  const api = useMemo(() => {
    const provider = new WsProvider(chainUrl)

    return new ApiRx({ ...options, provider })
  }, [])

  useEffect(() => {
    api.isReady.subscribe(() => {
      setConnectionState('connected')

      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })
  }, [api])

  if (connectionState === 'connecting') {
    return { connectionState, isConnected: false, api: undefined }
  }

  if (connectionState === 'connected') {
    return { connectionState, isConnected: true, api }
  }

  return { connectionState, isConnected: false, api }
}
