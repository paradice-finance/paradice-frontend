declare module "remark-html" {
  const html: any;
  export default html;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    LOTTERY_ADDRESS: string;
    CHAIN_ID: number;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
