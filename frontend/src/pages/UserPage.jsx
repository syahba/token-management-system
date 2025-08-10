import { useEffect, useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useEcoToken } from "../hooks/useTokens";

function UserPage() {
  const userAddress = "ST34E8WYCXEPV7CD9AFMFGHTRRP5WPNVYF8P1XQ6S";
  const { getBalance, redeemTokens } = useEcoToken(userAddress);

  const [balance, setBalance] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);

  // Load balance on mount
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getBalance();
      setBalance(Number(result.value || result)); // handles CV or number return
    };
    fetchBalance();
  }, [getBalance]);

  const handleRedeem = async () => {
    if (redeemAmount > 0) {
      await redeemTokens(redeemAmount);
      // Optionally refresh balance
      const updated = await getBalance();
      setBalance(Number(updated.value || updated));
    }
  };

  return (
    <div className="screen">
      <Navbar></Navbar>

      <div className="content gap-10">
        <div className="text-center">
          <p className="text-[var(--neutral-color)] font-bold leading-7 mb-3">
            Congrats, Earther! You've made some good deeds today!
            <br></br> Here's your reward:
          </p>
          <h1 className="text-[var(--primary-color)] text-4xl">
            {balance} Eco tokens
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="field">
            <p>How many would you want to redeem?</p>
            <input
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(Number(e.target.value))}
            />
          </div>

          <Button
            isPrimary={true}
            text={"Redeem"}
            onClick={handleRedeem}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
