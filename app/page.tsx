import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 12,
    }}
  >
    <ConnectButton />
  </div>
  );
}
