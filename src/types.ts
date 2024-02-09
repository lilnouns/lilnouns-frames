export type FrameSignaturePacket = {
  untrustedData: {
    fid: number
    url: string
    messageHash: string
    timestamp: number
    network: number
    buttonIndex: number
    inputText?: string
    castId: {
      fid: number
      hash: string
    }
  }
  trustedData: {
    messageBytes: string
  }
}

export interface GraphQLEnsDomainResponse {
  data: {
    domains: Array<Domain>
  }
}

interface Domain {
  id: string
  name: string
}
