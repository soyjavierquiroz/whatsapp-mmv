import {
  createBot,
  createProvider,
  addKeyword,
  MemoryDB,
  createFlow,
  EVENTS,
} from "@bot-whatsapp/bot";

import { BaileysProvider } from "@bot-whatsapp/provider-baileys";

import setupRoutes from "./routes";
// import getConnection from "./Functions/Funciones";


const main = async () => {
  const Provider = createProvider(BaileysProvider);
//   console.log(f);
  setupRoutes(Provider);
  await createBot({
    flow: createFlow([]),
    provider: Provider,
    database: new MemoryDB(),
  });
};

main();
// export default main;
