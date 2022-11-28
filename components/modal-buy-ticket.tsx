export interface ModalBuyTicketProps {
  pricePerTicket: number;
  remainTicket: number;
  balance: number;
}

export function ModalBuyTicket(props: ModalBuyTicketProps) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-slate-600 will-change-[opacity] text-[#BBB5D4]">
      <div
        className="absolute overflow-hidden bg-white border border-stone-200 rounded-t-[32px] w-full max-h-max z-50  min-h-max bottom-0
         md:max-w-[320px] md:relative md:rounded-[32px] md:m-auto md:mt-10 md:min-h-[300px] "
      >
        <div className="header flex items-center justify-between border-b px-3 py-6 bg-neutral-100">
          <div className=" text-[#280D5F] font-semibold">Buy Ticket</div>
          <button className=" text-[#7EDBE5] hover:text-[#bdeaef] text-[24px] mr-4">
            x
          </button>
        </div>
        {/* content */}
        <div className="content p-6 max-h-[90vh] overflow-x-hidden overflow-y-auto ">
          {/* content header*/}
          <div className="flex items-center justify-between">
            <div>Buy</div>
            <div className="text-[#280D5F]">Tickets</div>
          </div>
          {/* content input*/}
          <div className="items-center mb-6">
            {/* inout area */}
            <div className="border border-[#ED4B9E] rounded-lg outline outline-pink-500/[.25]">
              <div className="w-11/12 text-right pt-2">
                <input
                  className="text-right text-sm text-[#280D5F] focus:outline-none"
                  placeholder="0"
                ></input>
                <div className="text-right text-xs">0.00 USD</div>
              </div>
            </div>
            <div className="text-right text-xs text-[#d71e7b]">
              Insufficient USD balance
            </div>
            <div className="text-right text-xs leading-none">
              USD balance: 0.15
            </div>
          </div>
          {/* content sumary price*/}
          <div className=" border-b-2 pb-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">{"Cost (USD)"}</div>
              <div className="text-sm">15 USD</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">{"Discount"}</div>
              <div className="text-sm">0 %</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-sm">You pay</div>
            <div className="text-m text-[#280D5F]">0 USD</div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <button className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed]">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
