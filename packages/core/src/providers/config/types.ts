import type { Chains } from '../../consts'

import { ApiOptions } from '@polkadot/api/types'

export type ChainInfo = {
  name: Chains, 
  url?: string,
  options?: ApiOptions
}

export interface Config {
  chains: ChainInfo[],
  appName: string
}

export interface ConfigProviderProps {
  config: Config
}
