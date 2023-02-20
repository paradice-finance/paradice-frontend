import Claim from "../components/claim";
import BuySection from "../components/landingpage/buy";
import CheckSection from "../components/landingpage/check";
import { Welcome } from "../components/landingpage/welcome";
import Navbar from "../components/navbar";

import UserTicket from "../components/refund";

export default function refund() {
  return (
    // <div>
    //   <div>
    //     <UserTicket
    //       currency="$PRD"
    //       pricePerTicket={1}
    //       walletAddress="0x2cf6De37eCDCC8c6213Def4502a46031269B2fe2"
    //     />
    //   </div>
    //   <div>
    //     <Claim />
    //   </div>
    // </div>
    <div>
      <Navbar />
      <section className=" lg:mb-28 lg:mt-10">
        <Welcome />
      </section>

      <section className=" lg:mb-28">
        <BuySection />
      </section>

      <section className=" lg:mb-28">
        <CheckSection />
      </section>
    </div>
  );
}
