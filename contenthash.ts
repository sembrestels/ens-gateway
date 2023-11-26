import { decode } from '@ensdomains/content-hash'
import { namehash, normalize } from 'viem/ens'
import { parseAbi } from 'viem/abi'

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  transport: http(),
  chain: mainnet,
})


const abi = parseAbi([
  'function contenthash(bytes32 node) external view returns (bytes memory)',
])

export const getContentHash = async (ens: string) => {
  const node = namehash(normalize(ens))

  const contenthash = await publicClient.readContract({
    abi,
    functionName: 'contenthash',
    address: '0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41',
    args: [node],
  })

  const hash = decode(contenthash)
  return `http://ipfs.ens.site/ipfs/${hash}`
}