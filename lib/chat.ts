/** The example AI chat from the brief. Product names are demo data, shown as an illustration. */
export type ChatMessage = {
  from: "customer" | "ai";
  text: string;
  link?: string;
};

export const exampleChat: ChatMessage[] = [
  { from: "customer", text: "Hi, do you have a Bluetooth speaker under 400?" },
  {
    from: "ai",
    text: "Hi! Yes, the Demo Speaker Max is AED 390 and in stock. It connects by Bluetooth and is splash-proof. Here's the link:",
    link: "yourstore.com/product/demo-speaker-max",
  },
  { from: "customer", text: "Ok send me the link of the 162 AED one too" },
  {
    from: "ai",
    text: "Sure! Here's the Demo Speaker Mini (AED 162):",
    link: "yourstore.com/product/demo-speaker-mini",
  },
];
