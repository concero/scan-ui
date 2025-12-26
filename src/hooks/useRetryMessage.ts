import type { Address } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { useChainsStore } from './useChainsStore'
import { MessagingV2ABI } from '@/configuration/abi'
import { useSwitchNetwork } from './useSwitchNetwork'

export const useRetryMessage = ({
    chainId,
    messageReceipt,
    validatorLibs,
    validations,
    validationChecks,
    relayerLib,
    gasLimitOverride,
}: {
    chainId: number
    messageReceipt: string
    validatorLibs: string[]
    validations: string[]
    validationChecks: boolean[]
    relayerLib: string
    gasLimitOverride: number
}) => {
    const { chains } = useChainsStore()
    const { isConnected, address: account } = useAccount()
    const { switchNetwork } = useSwitchNetwork(chainId)
    
    const contract = chains[chainId]?.contracts.message_v2
    
    const { writeContract, data: hash, isPending, isSuccess: writeSuccess } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2,
    })

    const execute = async () => {
        if (!isConnected || !contract || !account) {
            throw new Error('Wallet not connected or contract not found')
        }
        
        await switchNetwork()
        
        await writeContract({
            address: contract as Address,
            abi: MessagingV2ABI,
            functionName: 'retryMessageSubmission',
            chainId: Number(chainId),
            account,
            args: [
                {
                    messageReceipt,
                    validatorLibs,
                    validations,
                    validationChecks,
                    relayerLib,
                },
                Number(gasLimitOverride),
            ],
        })
    }

    const isPendingState = isPending
    const isProcessingState = writeSuccess && isConfirming
    const isSuccessState = isConfirmed
    const isFailedState = !isPendingState && !isProcessingState && !isSuccessState

    return {
        execute,
        isPending: isPendingState,
        isProcessing: isProcessingState,
        isSuccess: isSuccessState,
        isFailed: isFailedState,
    }
}
