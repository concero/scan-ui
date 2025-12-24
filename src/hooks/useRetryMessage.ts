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
    
    const { writeContract, data: hash, isPending, isError: writeError, isSuccess: writeSuccess } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed, isError: receiptError } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2,
    })

    const contract = chains[chainId]?.contracts.message_v2

    const execute = async () => {
        if (!isConnected || !contract) {
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
                gasLimitOverride,
            ],
        })
    }

    const isPendingState: boolean = isPending                         
    const isProcessingState: boolean = writeSuccess && isConfirming   
    const isSuccessState: boolean = isConfirmed                       
    const isFailedState: boolean = !!writeError || !!receiptError    

    return {
        execute,
        isPending: isPendingState,     
        isProcessing: isProcessingState,
        isSuccess: isSuccessState,      
        isFailed: isFailedState,   
    }
}
