import {
  fetchCallReadOnlyFunction,
  cvToJSON,
  uintCV,
  standardPrincipalCV,
  makeContractCall,
} from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

// Hardcoded values for your deployed contract
const contractAddress = "ST34E8WYCXEPV7CD9AFMFGHTRRP5WPNVYF8P1XQ6S"; // <-- replace with your real one
const contractName = "eco-token";

/**
 * Read-only function helper
 */
export async function clarityReadOnly(functionName: string, functionArgs: any[] = [], senderAddress: string) {
  const result = await fetchCallReadOnlyFunction({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network: STACKS_TESTNET,
    senderAddress,
  });

  return cvToJSON(result).value;
}

/**
 * Public function call helper
 * (Private key signing is for backend — for frontend use Hiro Wallet)
 */
export async function clarityCallPublic(functionName: string, functionArgs: any[] = [], privateKey: string) {
  return await makeContractCall({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderKey: privateKey,
    network: STACKS_TESTNET,
  });
}

// Example CV argument helpers
export const cv = {
  uint: uintCV,
  principal: standardPrincipalCV,
};
