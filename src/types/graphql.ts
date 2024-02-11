export interface GraphQLEnsDomainResponse {
  data: {
    domains: Array<Domain>
  }
}

interface Domain {
  id: string
  name: string
}
