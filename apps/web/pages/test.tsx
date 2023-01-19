import UserTicket from "../components/refund";

export default function refund() {
  return (
    <UserTicket
      currency="$PRD"
      pricePerTicket={1}
      walletAddress="0x2cf6De37eCDCC8c6213Def4502a46031269B2fe2"
    />
  );
}
