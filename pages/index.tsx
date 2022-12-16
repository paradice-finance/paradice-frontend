import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { motion, Variants } from "framer-motion";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Container from "../components/container";
import { ModalBuyTicket } from "../components/modal-buy-ticket/modal";
import { useNetwork } from "wagmi";
import useSWR from "swr";
import { LotteryInfo } from "../components/smart-contract/type";

interface DataType {
  key: string;
  hash: string;
  totalWin: number;
  date: string;
}

const variants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const { chain } = useNetwork();

  const { data: currentLotteryData, error: currentLotteryError } =
    useSWR<LotteryInfo>(
      "http://localhost:3000/api/sc/lottery/current",
      fetcher
    );
  const ticketNumbers = Array.from({ length: 19 }, () =>
    Math.floor(Math.random() * 20)
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  const openModal = () => {
    setIsShowModal(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Wallet Address",
      dataIndex: "hash",
      key: "hash",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total Win",
      dataIndex: "totalWin",
      key: "totalWin",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const dataSource: DataType[] = [
    {
      key: "1",
      hash: "0x ... f464",
      totalWin: 20,
      date: new Date().toISOString(),
    },
    {
      key: "2",
      hash: "0x ... 022d",
      totalWin: 50,
      date: new Date().toISOString(),
    },
    {
      key: "3",
      hash: "0x ... 58e9",
      totalWin: 100,
      date: new Date().toISOString(),
    },
  ];

  return (
    <>
      {hydrated && (
        <Layout home>
          <Head>
            <title>{siteTitle}</title>
          </Head>
          <Container className="flex flex-wrap justify-center md:p-8 md:pt-0">
            <svg height="0" width="0">
              <defs>
                <clipPath id="ticket-path" clipPathUnits="objectBoundingBox">
                  <path d="M0.252,0.999 C0.054,0.998,0.044,0.998,0.039,0.995 C0.027,0.987,0.015,0.971,0.009,0.954 C0.007,0.949,0.004,0.939,0.003,0.931 L0,0.916,0,0.804,0,0.691,0.008,0.685 C0.026,0.673,0.038,0.659,0.052,0.633 C0.084,0.574,0.091,0.484,0.07,0.41 C0.057,0.366,0.033,0.329,0.007,0.313 L0,0.309,0,0.196 C0,0.105,0,0.082,0.002,0.074 C0.007,0.038,0.025,0.008,0.045,0.002 C0.049,0,0.2,0,0.503,0 C0.946,0.001,0.955,0.001,0.96,0.004 C0.978,0.016,0.991,0.039,0.997,0.069 C0.999,0.082,0.999,0.084,1,0.195 L1,0.309,0.994,0.312 C0.976,0.322,0.956,0.347,0.942,0.377 C0.936,0.388,0.929,0.411,0.926,0.425 C0.919,0.455,0.918,0.467,0.918,0.5 C0.918,0.527,0.918,0.533,0.921,0.549 C0.93,0.611,0.955,0.66,0.99,0.684 L0.999,0.691,0.999,0.803 C0.999,0.924,0.999,0.923,0.994,0.944 C0.986,0.971,0.973,0.989,0.955,0.998 C0.95,1,0.627,1,0.252,0.999"></path>
                </clipPath>
              </defs>
            </svg>

            {ticketNumbers.map((num, index) => (
              <motion.div
                key={index}
                className={`${utilStyles.ticketCover} w-2/5 md:w-48 m-2`}
                initial={{ y: 10, opacity: 0 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
              >
                <div className={`${utilStyles.ticket} w-full h-20`}></div>
                <div className={`${utilStyles.ticketNumber} text-white`}>
                  {num}
                </div>
              </motion.div>
            ))}
          </Container>
          <Container className="p-0">
            <h1 className={`${utilStyles.poolSize} font-bold my-5`}>
              Sold <span className={utilStyles.gold}>19 Tickets, 1 Ticket</span>{" "}
              left to draw the prize
            </h1>
            <h1 className={`${utilStyles.displayTitle} font-bold my-5`}>
              Simple to Buy, Hold and Win
            </h1>
            <Button
              className="text-center rounded-md lg:ml-5 dark:text-gray-100 text-xl"
              size="large"
              onClick={openModal}
            >
              Buy Ticket
            </Button>
          </Container>
          <Container className="p-4">
            <div
              className={`${utilStyles.sectionBorder} w-75 w-100-mobile py-5`}
            ></div>
            <h1 className="mt-10 text-2xl">Statistic</h1>
            <Card className="p-1" bodyStyle={{ padding: 0 }}>
              <Table columns={columns} dataSource={dataSource} />
            </Card>
          </Container>
          <Container className="p-4">
            <div
              className={`${utilStyles.sectionBorder} w-75 w-100-mobile py-5`}
            ></div>
            <h1 className="mt-10 text-2xl">How to Play</h1>
            <h2 className="text-xl font-light">
              Keep it simple!, You will won the prize if the digits match with
              winning number
            </h2>
            <div className="md:flex gap-4 justify-center">
              <Card className="p-1 sm:w-full mt-5 bg-gray-100">
                <h1 className="text-xl text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  Step 1. Buy Tickets.
                </h1>
                <h2 className="text-lg font-light">
                  Buy more ticket get more chance to win
                </h2>
              </Card>

              <Card className="p-1 sm:w-full mt-5 bg-gray-100">
                <h1 className="text-xl text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  Step 2. Wait for the Draw.
                </h1>
                <h2 className="text-lg font-light">
                  Drawing when ticket sold out for that pull prize
                </h2>
              </Card>

              <Card className="p-1 sm:w-full mt-5 bg-gray-100">
                <h1 className="text-xl text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  Step 3. Claim the prize.
                </h1>
                <h2 className="text-lg font-light">
                  Click Claim button to get the prize
                </h2>
              </Card>
            </div>
          </Container>
        </Layout>
      )}
      {isShowModal && currentLotteryData && (
        <div>
          <ModalBuyTicket
            decimals={currentLotteryData.currecyDecimals}
            pricePerTicket={currentLotteryData.ticketPrice}
            tokenAddress={currentLotteryData.tokenAddress}
            currency={currentLotteryData.currency}
            remainTicket={10}
            onCloseModal={() => setIsShowModal(false)}
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
