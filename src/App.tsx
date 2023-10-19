import React, { useState } from "react";
import {
  ConnectWallet,
  Web3Button,
  useContract,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const guardianContractAddress = "0x834Edc9015b9Dc77394Cc165eA7d987AE9394CF7";
  const { contract } = useContract(guardianContractAddress);
  const walletAddress = useAddress();
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "addVerifiedGuardian"
  );

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Welcome to{" "}
            <span className="gradient-text-0">
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Thirdweb Guardian dApp.
              </a>
            </span>
          </h1>
          <div className="connect">
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
          <Web3Button
            contractAddress={guardianContractAddress}
            action={async () => { return mutateAsync({ args: [walletAddress] })}}
            onSuccess={() => {
              alert("You've been registered as a Guardian. Thank-you!");
            }}
          >
            Add as Guardian
          </Web3Button>
        </div>
      </div>
    </main>
  );
}
