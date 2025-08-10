import { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useEcoToken } from "../hooks/useTokens";

function AdminPage() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const userAddress = "ST34E8WYCXEPV7CD9AFMFGHTRRP5WPNVYF8P1XQ6S";
  const { mint } = useEcoToken(userAddress);

  const handleMint = async () => {
    const tokenAmount = Number(amount);
    const cleanRecipient = recipient.trim();

    if (!tokenAmount || !cleanRecipient) {
      alert("Please fill in both fields.");
      return;
    }
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      alert("Please enter a valid token amount.");
      return;
    }
    if (!/^ST[A-Z0-9]{1,50}$/i.test(cleanRecipient)) {
      alert("Invalid Stacks address format.");
      return;
    }

    try {
      await mint(tokenAmount, cleanRecipient);
      alert(`Successfully minted ${tokenAmount} ECO to ${cleanRecipient}`);
      setAmount("");
      setRecipient("");
    } catch (err) {
      console.error(err);
      alert("Mint failed. Check the console for details.");
    }
  };

  return (
    <div className="screen">
      <Navbar></Navbar>

      <div className="content gap-12">
        <div className="flex flex-col justify-center gap-6">
          <div className="field">
            <p className="text-[var(--neutral-color)]">
              How many tokens are you giving?
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="field">
            <p className="text-[var(--neutral-color)]">
              Who are you sending this to?
            </p>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        </div>

        <Button isPrimary={true} text={"Send"} onClick={handleMint}></Button>
      </div>
    </div>
  );
}

export default AdminPage;
