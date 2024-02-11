import { GraphQLEnsDomainResponse } from '../types'

const ENS_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/ensdomains/ens'

export async function checkENSExists(domain: string): Promise<boolean> {
  const query = `
    query {
      domains(where: {name: "${domain}"}) {
        id
        name
      }
    }
  `

  const response = await fetch(ENS_SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  const { data } = await response.json<GraphQLEnsDomainResponse>()

  return data.domains.length > 0
}
