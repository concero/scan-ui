import type { Address } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useAccount, useChainId } from 'wagmi'
import { useChainsStore } from './useChainsStore'
import { MessagingV2ABI } from '@/configuration/abi'
import { useCallback, useMemo } from 'react'

export type UseRetryMessageParams = {
	chainId: number
	messageReceipt: string
	validatorLibs: string[]
	validations: string[]
	validationChecks: boolean[]
	relayerLib: string
	gasLimitOverride: number
}

export const useRetryMessage = ({
	chainId,
	messageReceipt,
	validatorLibs,
	validations,
	validationChecks,
	relayerLib,
	gasLimitOverride,
}: UseRetryMessageParams) => {
	const { chains } = useChainsStore()
	const { switchChain } = useSwitchChain()
	const { isConnected, address: account } = useAccount()
	const currentChainId = useChainId()

	const contractAddress = chains[chainId]?.contracts.message_v2

	const writeConfig = useMemo(
		() => ({
			address: contractAddress as Address,
			abi: MessagingV2ABI,
			functionName: 'retryMessageSubmission',
			chainId: Number(chainId),
			args: [
				{
					messageReceipt,
					validatorLibs,
					validations,
					validationChecks,
					relayerLib,
				},
				gasLimitOverride,
			] as const,
			account,
		}),
		[
			contractAddress,
			messageReceipt,
			validatorLibs,
			validations,
			validationChecks,
			relayerLib,
			gasLimitOverride,
			account,
			chainId,
		],
	)

	const { writeContractAsync, data: hash, isPending, error: writeError } = useWriteContract()

	const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
		hash,
		confirmations: 2,
	})

	const switchChainIfNeeded = useCallback(async () => {
		if (currentChainId !== chainId) {
			try {
				await switchChain({ chainId: Number(chainId) })
			} catch (error) {
				throw new Error(`Failed to switch chain: ${error}`)
			}
		}
	}, [currentChainId, chainId, switchChain])

	const executeTransaction = useCallback(async () => {
		console.log('📋 EXECUTION PARAMS:', {
			chainId,
			contractAddress: contractAddress?.slice(0, 10) + '...',
			account: account?.slice(0, 10) + '...',
			messageReceipt: messageReceipt.slice(0, 10) + '...',
			validatorLibs: validatorLibs.map(l => l.slice(0, 8) + '...'),
			validations: validations.map(v => v.slice(0, 8) + '...'),
			validationChecks,
			relayerLib: relayerLib.slice(0, 10) + '...',
			gasLimitOverride,
			writeConfigKeys: Object.keys(writeConfig),
		})

		try {
			return await writeContractAsync(writeConfig)
		} catch (error) {
			throw new Error(`Transaction failed: ${error}`)
		}
	}, [
		chainId,
		contractAddress,
		account,
		messageReceipt,
		validatorLibs,
		validations,
		validationChecks,
		relayerLib,
		gasLimitOverride,
		writeConfig,
		writeContractAsync,
	])

	const execute = useCallback(async () => {
		if (!isConnected) throw new Error('Wallet not connected')
		if (!contractAddress) throw new Error('Contract address not found')

		try {
			await switchChainIfNeeded()
			return await executeTransaction()
		} catch (error) {
			throw new Error(`Execution failed: ${error}`)
		}
	}, [isConnected, contractAddress, switchChainIfNeeded, executeTransaction])

	const isLoading = isPending || isConfirming
	const isError = !!writeError
	const isSuccess = isConfirmed && !!hash

	return {
		execute,
		isLoading,
		isError,
		isSuccess,
	}
}
