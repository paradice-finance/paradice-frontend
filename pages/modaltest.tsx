import {
  ModalBuyTicket,
  ModalBuyTicketProps,
} from "../components/modal-buy-ticket";

export async function getServerSideProps() {
  return {
    props: {
      pricePerTicket: 1,
      remainTicket: 10,
    },
  };
}

function Modal(props: ModalBuyTicketProps) {
  console.log(props);
  return (
    <>
      <ModalBuyTicket
        pricePerTicket={props.pricePerTicket}
        remainTicket={props.remainTicket}
        balance={100}
      />
    </>
  );
}

export default Modal;
