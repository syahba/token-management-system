import { useCallback } from "react";
import { clarityReadOnly, clarityCallPublic } from "../utils/clarity";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";

export function useEcoToken(userAddress?: string) {
  // Get balance
  const getBalance = useCallback(async () => {
    if (!userAddress) return 0;
    return await clarityReadOnly(
      "get-balance",
      [standardPrincipalCV(userAddress)],
      userAddress
    );
  }, [userAddress]);

  // Get total supply
  const getTotalSupply = useCallback(async () => {
    if (!userAddress) return 0;
    return await clarityReadOnly("get-total-supply", [], userAddress);
  }, [userAddress]);

  // Mint tokens (owner only)
  const mint = useCallback(
    async (amount: number, to: string) => {
      if (!userAddress) {
        alert("Please connect your wallet first.");
        return;
      }
      
      await clarityCallConnect(
        "mint",
        [uintCV(amount), standardPrincipalCV(to)],
        userAddress
      );
    },
    [userAddress]
  );

  // Redeem tokens
  const redeemTokens = useCallback(
    async (amount: number) => {
      await clarityCallPublic(
        "redeem-tokens",
        [uintCV(amount)],
        userAddress || ""
      );
    },
    [userAddress]
  );

  return {
    getBalance,
    getTotalSupply,
    mint,
    redeemTokens,
  };
}
