import { AuthModal } from "./AuthModal";
import { WalletModal } from "./WalletModal";
import { DonationModal } from "./DonationModal";

export const ModalManager = () => {
  return (
    <>
      <AuthModal />
      <WalletModal />
      <DonationModal />
    </>
  );
};
