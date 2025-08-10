import { describe, it, expect, beforeEach } from "vitest";

describe("Simple Token mock", () => {
  let balances: Record<string, number>;
  const contractOwner = "STOWNER";
  const errOwnerOnly = "err-owner-only";
  const errInsufficientBalance = "err-insufficient-balance";

  function getBalance(user: string) {
    return balances[user] || 0;
  }

  function mint(amount: number, to: string, sender: string) {
    if (sender !== contractOwner) throw new Error(errOwnerOnly);
    balances[to] = getBalance(to) + amount;
    return balances[to];
  }

  function redeem(amount: number, sender: string) {
    if (getBalance(sender) < amount) throw new Error(errInsufficientBalance);
    balances[sender] -= amount; // burn
    return balances[sender];
  }

  beforeEach(() => {
    balances = {};
    balances[contractOwner] = 0;
  });

  it("allows owner to mint tokens", () => {
    const result = mint(1000, "STUSER1", contractOwner);
    expect(result).toBe(1000);
    expect(getBalance("STUSER1")).toBe(1000);
  });

  it("prevents non-owner from minting", () => {
    expect(() => mint(1000, "STUSER1", "STUSER2")).toThrow(errOwnerOnly);
  });

  it("allows user to redeem tokens", () => {
    mint(1000, "STUSER1", contractOwner);
    const result = redeem(500, "STUSER1");
    expect(result).toBe(500);
    expect(getBalance("STUSER1")).toBe(500);
  });

  it("prevents redeem if balance is too low", () => {
    mint(100, "STUSER1", contractOwner);
    expect(() => redeem(200, "STUSER1")).toThrow(errInsufficientBalance);
  });
});
