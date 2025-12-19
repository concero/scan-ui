import type { Address, Hex } from "viem";
import { 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useSwitchChain,
  useAccount 
} from "wagmi";
import { useChainsStore } from "./useChainsStore";
import { MessagingV2ABI } from "@/configuration/abi";
import { useCallback, useMemo } from 'react';

type UseRetryMessageParams = {
  chainId: number;
  messageReceipt: Hex;
  validatorLibs: Address[];
  validations: Hex[];
  validationChecks: boolean[];
  relayerLib: Address;
  gasLimitOverride?: number;
};

export const useRetryMessage = ({
  chainId,
  messageReceipt,
  validatorLibs,
  validations,
  validationChecks,
  relayerLib,
  gasLimitOverride = 0,
}: UseRetryMessageParams) => {
  const { chains } = useChainsStore();
  const address = chains[chainId]?.contracts.message_v2;
  const { switchChainAsync } = useSwitchChain();
  const { isConnected } = useAccount();

  const config = useMemo(() => ({
    address: address as Address,
    abi: MessagingV2ABI,
    functionName: 'retryMessageSubmission',
    args: [{
      messageReceipt,
      validatorLibs,
      validations,
      validationChecks,
      relayerLib,
    }, gasLimitOverride] as const,
  }), [address, messageReceipt, validatorLibs, validations, validationChecks, relayerLib, gasLimitOverride]);

  const { writeContractAsync, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
    confirmations: 2 
  });

  const execute = useCallback(async () => {
    if (!isConnected) throw new Error('Wallet not connected');
    if (!address) throw new Error('Contract address not found');
    
    try {
      await switchChainAsync({ chainId });
      return await writeContractAsync(config);
    } catch (err) {
      throw new Error(`Retry failed Failed `);
    }
  }, [switchChainAsync, chainId, writeContractAsync, config, isConnected, address]);

  return {
    execute,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    isLoading: isPending || isConfirming,
    error: writeError,
    isReady: !!address && isConnected,
  };
};
