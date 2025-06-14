import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  return (
    <div className="wallet-adapter-button-trigger">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !text-white !font-medium !px-4 !py-2 !transition-colors" />
    </div>
  );
}
