import { useSwitchChain, useChainId } from "wagmi";
import { useCallback } from "react";

export const useSwitchNetwork = (chainId: number) => {
    const { switchChain } = useSwitchChain();
    const currentChainId: number = useChainId();

    const switchNetwork = useCallback(async (): Promise<boolean> => {
        if (currentChainId === chainId) return true;
        
        try {
            await switchChain({ chainId });
            return true;
        } catch (error) {
            console.error(`[Concero Scan]: Failed to switch to chain ${chainId}:`, error);
            return false;
        }
    }, [currentChainId, chainId, switchChain]);

    return {
        switchNetwork,
    };
}
