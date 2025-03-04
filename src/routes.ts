// routes.ts

import { handleCtx } from "@bot-whatsapp/provider-baileys";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
// import { getConnection } from "./Functions/Funciones";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import serveStatic from "serve-static";
import multer from "multer";
const upload = multer();
import dotenv from "dotenv";
import { Console } from "console";

dotenv.config();

const rutapublic = path.join(process.cwd(), "src", "public") + "/";
const baseTem = path.join(process.cwd(), "src", "Templates") + "/";

// interface Provider {
//   initHttpServer: (port: number) => void;
//   http?: {
//     server: {
//       use: (...args: any[]) => void;
//       get: (path: string, handler: any) => Promise<void>;
//       post: (path: string, handler: any) => Promise<void>;
//     }
//   };
//   store: {
//     chats: any[];
//   };
// }
let NumbersData = null;
const setupRoutes = async (Provider) => {
  Provider.initHttpServer(3001);
  Provider.http?.server.use(upload.any());
  Provider.http?.server.use("/public", serveStatic(rutapublic));

  await Provider.http?.server.get(
    "/",
    handleCtx(async (bot, req, res) => {
      try {
        const bodyContent = await fs.promises.readFile(
          baseTem + "login.html",
          "utf8"
        );
        const renderedHTML = ejs.render(bodyContent);

        res.setHeader("Content-Type", "text/html");
        res.end(renderedHTML);
      } catch (err) {
        console.error("Error:", err);
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    })
  );

  await Provider.http?.server.get(
    "/dashboard",
    handleCtx(async (bot, req, res) => {
      const bodyContent = await fs.promises.readFile(
        baseTem + "dashboard.html",
        "utf8"
      );
      const renderedHTML = ejs.render(bodyContent);

      res.setHeader("Content-Type", "text/html");
      res.end(renderedHTML);
    })
  );

  await Provider.http?.server.get(
    "/reset-password",
    handleCtx(async (bot, req, res) => {
      try {
        const bodyContent = await fs.promises.readFile(
          baseTem + "reset-password.html",
          "utf8"
        );
        const renderedHTML = ejs.render(bodyContent);

        res.setHeader("Content-Type", "text/html");
        res.end(renderedHTML);
      } catch (err) {
        console.error("Error:", err);
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    })
  );

  await Provider.http?.server.get(
    "/new-user",
    handleCtx(async (bot, req, res) => {
      try {
        const bodyContent = await fs.promises.readFile(
          baseTem + "new-user.html",
          "utf8"
        );
        const renderedHTML = ejs.render(bodyContent);

        res.setHeader("Content-Type", "text/html");
        res.end(renderedHTML);
      } catch (err) {
        console.error("Error:", err);
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    })
  );

  await Provider.http?.server.post(
    "/login",
    handleCtx(async (bot, req, res) => {
      try {
        const rutaApi = process.env.RUTA_API + "login";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
        const responseData = await response.json();

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/register-user",
    handleCtx(async (bot, req, res) => {
      try {
        // console.log(req.body);
        const rutaApi = process.env.RUTA_API + "register-user";
        // console.log(rutaApi);
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
        const responseData = await response.json();
        // console.log(responseData);

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/proveedor",
    handleCtx(async (bot, req, res) => {
      if (Provider.store.chats.length > 0) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            Type: true,
            message: "Proveedor Conectado",
            Data: "",
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            Type: false,
            message: "No hay whatsapp vinculado.",
          })
        );
      }
    })
  );

  await Provider.http?.server.get(
    "/numbers",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "numbers";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/save-number",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "save-number";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers
          ,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/save-message",
    handleCtx(async (bot, req, res) => {
      try {
        const { abbreviationMessage, textMessage, intervalMessage } = req.body;
        let rutaDestino = "";
        let media = false;
        let tiempoInterval = intervalMessage || 4;

        const archivo = req.files ? req.files[0] : null;
        if (archivo) {
          media = true;
          rutaDestino = path.join(
            process.cwd(),
            "src/public/assets/Files",
            archivo.originalname
          );
          await fs.promises.writeFile(rutaDestino, archivo.buffer);
        }

        const bodyEnvio = {
          abbreviationMessage,
          textMessage,
          media,
          rutaDestino,
          tiempoInterval
        };
        const rutaApi = process.env.RUTA_API + "save-message";

        const response = await fetch(rutaApi, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": req.headers['authorization']
          },
          body: JSON.stringify(bodyEnvio),
        });

        const responseDataNumbers = await response.json();

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/save-number-plantilla",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);

      // console.log(req.body);
      try {
        const rutaApi = process.env.RUTA_API + "save-number-plantilla";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });

        const responseDataNumbers = await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );
  await Provider.http?.server.post(
    "/delete-number",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "delete-number";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers
          ,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );


  await Provider.http?.server.post(
    "/delete-all-numbers",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "delete-all-numbers";
        console.log(req.headers)
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseData = await response.json();
        // // NumbersData = responseDataNumbers
        // console.log(responseData)

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );


  await Provider.http?.server.post(
    "/send-messages",
    handleCtx(async (bot, req, res) => {
      try {
        const rutaApi = process.env.RUTA_API + "message";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": req.headers['authorization']
          },
          body: JSON.stringify(req.body),
        });

        const responseDataMessage = await response.json();
        if (!responseDataMessage.Type) {
          res.writeHead(response.status, { "Content-Type": "application/json" });
          res.end(JSON.stringify(responseDataMessage));
        }
        //----------------------------------------------------------------
        // numbers

        const rutaApiNumbers = process.env.RUTA_API + "numbers";
        const responseNumbers = await fetch(rutaApiNumbers, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await responseNumbers.json();

        if (!responseDataNumbers.Type) {
          res.writeHead(responseNumbers.status, { "Content-Type": "application/json" });
          res.end(JSON.stringify(responseDataNumbers));
        }
        var dataNumbers = responseDataNumbers.Data;
        var dataMessage = responseDataMessage.Data;
        // console.log(dataNumbers);
        // console.log(dataMessage);
        for (let i = 0; i < dataNumbers.length; i++) {
          const row = dataNumbers[i];
          var phone = row.numero_cel;
          const regex = /^[0-9]+$/;

          // Verificar si `phone` cumple con la expresión regular
          if (regex.test(phone)) {
            var message = dataMessage.message.replace("@nombre", row.nombre);
            var urlMedia = dataMessage.media;
            console.log(dataMessage.message)
            console.log(dataMessage.urlMedia)
            let dataMedia = urlMedia
              ? { media: dataMessage.urlMedia }
              : {};
            const respuesta = await bot.sendMessage(phone, message, dataMedia);
            var intervaloTime = dataMessage.intervaloMessage * 1000;
            // console.log(intervaloTime);s
            var respestaEnvio = respuesta.messageTimestamp.unsigned;
            // console.log(respestaEnvio);
            await new Promise((resolve) => setTimeout(resolve, intervaloTime));
            // console.log("respuesta", respuesta);


            var datosEnvio = {
              phone,
              message,
              urlMedia,
              respestaEnvio,
            }
            const rutaApi = process.env.RUTA_API + "save-report";
            const responseReport = await fetch(rutaApi, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                "Authorization": req.headers['authorization']
              },
              body: JSON.stringify(datosEnvio),
            });

            const responseDataMessage = await responseReport.json();
            // console.log(responseDataMessage)
            // Puedes acceder a otros campos de la fila según la estructura de tu tabla
          }
        }



        // console.log(responseDataNumbers)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          Type: true,
          message: "Mensajes Enviados",
          Data: "",
        }));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.get(
    "/report",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "report";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseData= await response.json();

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );


  await Provider.http?.server.get(
    "/messages",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "messages";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );

  await Provider.http?.server.post(
    "/delete-message",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "delete-message";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );


  await Provider.http?.server.post(
    "/delete-report",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "delete-report";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseDataNumbers = await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseDataNumbers));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );



  await Provider.http?.server.post(
    "/delete-all-reports",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        const rutaApi = process.env.RUTA_API + "delete-all-reports";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
        });
        const responseData = await response.json();
        // NumbersData = responseDataNumbers
        // console.log(responseData)

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );



  await Provider.http?.server.post(
    "/rest-password-user",
    handleCtx(async (bot, req, res) => {
      // console.log(req.headers);
      try {
        console.log(req.body)
        const rutaApi = process.env.RUTA_API + "rest-password-user";
        const response = await fetch(rutaApi, {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        });
        const responseData= await response.json();
        // NumbersData = responseDataNumbers

        res.writeHead(response.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error al realizar la redirección:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ Type: false, message: "Error interno del servidor" })
        );
      }
    })
  );



  await Provider.http?.server.get(
    "/config-message",
    handleCtx(async (bot, req, res) => {
      res.end("Página de configuración de mensajes");
    })
  );
};
//----------------------------------------------------------------
// const setupRoutes = async (Provider) => {
//   Provider.initHttpServer(3000);
//   Provider.http?.server.use(bodyParser.json());
//   await Provider.http?.server.get(
//     "/",
//     handleCtx(async (bot, req, res) => {
//       try {
//         // Lee el archivo HTML de inicio de sesión
//         const bodyContent = await fs.promises.readFile(
//           baseTem + "login.html",
//           "utf8"
//         );
//         const renderedHTML = ejs.render(bodyContent);

//         // Envía la respuesta
//         res.setHeader("Content-Type", "text/html");
//         res.end(renderedHTML);
//       } catch (err) {
//         console.error("Error:", err);
//         res.writeHead(500);
//         res.end("Internal Server Error");
//       }
//     })
//   );

//   await Provider.http?.server.get(
//     "/reset-password",
//     handleCtx(async (bot, req, res) => {
//       try {
//         // Lee el archivo HTML de inicio de sesión
//         const bodyContent = await fs.promises.readFile(
//           baseTem + "reset-password.html",
//           "utf8"
//         );
//         const renderedHTML = ejs.render(bodyContent);

//         // Envía la respuesta
//         res.setHeader("Content-Type", "text/html");
//         res.end(renderedHTML);
//       } catch (err) {
//         console.error("Error:", err);
//         res.writeHead(500);
//         res.end("Internal Server Error");
//       }
//     })
//   );
//   await Provider.http?.server.get(
//     "/new-user",
//     handleCtx(async (bot, req, res) => {
//       try {
//         // Lee el archivo HTML de inicio de sesión
//         const bodyContent = await fs.promises.readFile(
//           baseTem + "new-user.html",
//           "utf8"
//         );
//         const renderedHTML = ejs.render(bodyContent);

//         // Envía la respuesta
//         res.setHeader("Content-Type", "text/html");
//         res.end(renderedHTML);
//       } catch (err) {
//         console.error("Error:", err);
//         res.writeHead(500);
//         res.end("Internal Server Error");
//       }
//     })
//   );

//   await Provider.http?.server.post(
//     "/login",
//     handleCtx(async (bot, req, res) => {
//       try {
//         // Redirigir la petición al servidor localhost:4000/login
//         const rutaApi = process.env.RUTA_API + "login";
//         // Realizar la petición usando Fetch
//         const response = await fetch(rutaApi, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(req.body),
//         });
//         const responseData = await response.json();

//         // Devolver la respuesta recibida del servidor localhost:4000/login
//         res.writeHead(response.status, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(responseData));
//       } catch (error) {
//         // Manejar cualquier error que pueda ocurrir
//         console.error("Error al realizar la redirección:", error);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({ Type: false, message: "Error interno del servidor" })
//         );
//       }
//     })
//   );

//   await Provider.http?.server.post(
//     "/register-user",
//     handleCtx(async (bot, req, res) => {
//       try {
//         // Redirigir la petición al servidor localhost:4000/login
//         const rutaApi = process.env.RUTA_API + "register-user";
//         console.log(rutaApi);
//         // Realizar la petición usando Fetch
//         const response = await fetch(rutaApi, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(req.body),
//         });
//         const responseData = await response.json();
//         // console.log(responseData);
//         // Devolver la respuesta recibida del servidor localhost:4000/login
//         res.writeHead(response.status, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(responseData));
//       } catch (error) {
//         // Manejar cualquier error que pueda ocurrir
//         console.error("Error al realizar la redirección:", error);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({ Type: false, message: "Error interno del servidor" })
//         );
//       }
//     })
//   );

//   await Provider.http?.server.post(
//     "/rest-password-user",
//     handleCtx(async (bot, req, res) => {
//       // Código para el login...
//       // Obtener usuario y contraseña del cuerpo de la solicitud
//       const { usuario } = req.body;
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "SELECT * FROM USERS WHERE email = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(
//         queryString,
//         [usuario],
//         async (error, results, fields) => {
//           if (error) {
//             res.writeHead(500, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "Error al realizar la consulta a la base de datos.",
//               })
//             );
//           } else {
//             // Verificar si se encontraron resultados
//             if (results.length > 0) {
//               // Generar el token JWT con el ID del usuario
//               const token = jwt.sign(
//                 { id: results[0].id },
//                 process.env.JWT_SECRET ||
//                   "masmahulnsqpiw28p3273hlm23hoalms.jmqñw"
//               );
//               const contenidoHTML = fs.readFileSync(
//                 "./src/public/assets/Plantillas/send-email.html",
//                 "utf8"
//               );
//               const mailParams = {
//                 from: "MMW", // Cambia esto por tu dirección de correo electrónico
//                 to: "Enbo98@hotmail.com", // Cambia esto por la dirección de correo electrónico del destinatario
//                 subject: "Prueba de correo electrónico desde Node.js",
//                 // text: 'Hola,\nEste es un correo electrónico de prueba enviado desde Node.js.\n electron://reset-password'
//                 html: contenidoHTML,
//               };
//               const ResultadoEmail = await EnviarEmail(mailParams);
//               console.log("ResultadoEmail: " + ResultadoEmail);
//               // Enviar respuesta con el token JWT
//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: true,
//                   message: "El Cambio de Contraseña fue enviado a Su correo",
//                   Token: token,
//                   Panel: "/dashboard",
//                 })
//               );

//               res.end();
//             } else {
//               // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//               // console.log(results);
//               res.writeHead(404, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: false,
//                   message: "Usuario no encontrado.",
//                 })
//               );
//             }
//           }
//         }
//       );

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/save-number",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { name, numero_cel } = req.body;

//       console.log(req.body);
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString =
//         "INSERT INTO numbers (nombre,  numero_cel) VALUES (?,  ?)";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(
//         queryString,
//         [name, numero_cel],
//         (error, results, fields) => {
//           if (error) {
//             console.log(error);
//             res.writeHead(500, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "Error al realizar el Registro en la base de datos.",
//               })
//             );
//           } else {
//             // console.log(results)
//             // Verificar si se encontraron resultados
//             if (results.affectedRows > 0) {
//               // Enviar respuesta con el token JWT
//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: true,
//                   message: "Registro Creado Con Exito",
//                   Data: results,
//                 })
//               );

//               res.end();
//             } else {
//               // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//               // console.log(results);
//               res.writeHead(404, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: false,
//                   message: "No hay Numeros Registados.",
//                 })
//               );
//             }
//           }
//         }
//       );

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/delete-number",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { id } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "DELETE FROM numbers WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           console.log(error);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al Eliminar el Registro en la base de datos.",
//             })
//           );
//         } else {
//           console.log(results);
//           // Verificar si se encontraron resultados
//           if (results.affectedRows > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: true,
//                 message: "Registro Eliminado Con Exito",
//                 Data: results,
//               })
//             );

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados para eliminar.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/delete-message",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { id } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "DELETE FROM messages WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al Eliminar el Registro en la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.affectedRows > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: true,
//                 message: "Registro Eliminado Con Exito",
//                 Data: results,
//               })
//             );

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados para eliminar.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/delete-flows",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { id } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "DELETE FROM flujosbot WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al Eliminar el Registro en la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.affectedRows > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: true,
//                 message: "Registro Eliminado Con Exito",
//                 Data: results,
//               })
//             );

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados para eliminar.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/delete-flows-continuos",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { id } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "DELETE FROM flujosbotcontinua WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al Eliminar el Registro en la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.affectedRows > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: true,
//                 message: "Registro Eliminado Con Exito",
//                 Data: results,
//               })
//             );

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados para eliminar.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/delete-report",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { id } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "DELETE FROM reportmessage WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al Eliminar el Registro en la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.affectedRows > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: true,
//                 message: "Registro Eliminado Con Exito",
//                 Data: results,
//               })
//             );

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados para eliminar.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/save-number-plantilla",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const registros = req.body;

//       // Variable para contar el número de inserciones exitosas
//       let insercionesExitosas = 0;
//       let insercionesErronea = 0;

//       registros.forEach((registro) => {
//         const { nombre, numero_cel } = registro;

//         // Consulta SQL para insertar el registro en la base de datos
//         const queryString =
//           "INSERT INTO numbers (nombre, numero_cel) VALUES (?, ?)";

//         // Ejecutar la consulta SQL con los parámetros proporcionados
//         connection.query(
//           queryString,
//           [nombre, numero_cel],
//           (error, results, fields) => {
//             if (error) {
//               console.error("Error al insertar registro:", error);
//               insercionesErronea++;
//             } else {
//               console.log("Registro insertado con éxito:", results);
//               insercionesExitosas++;
//             }
//           }
//         );
//       });

//       // Verificar si se ha terminado de recorrer el array

//       // Si todas las inserciones fueron exitosas, enviar mensaje de éxito
//       // console.log("erroneas: " + insercionesErronea);
//       // console.log("Exitosas: " + insercionesExitosas);
//       if (insercionesErronea == 0) {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: true,
//             message: "Todos los registros fueron creados con éxito",
//           })
//         );
//       } else {
//         // Si no se insertó ningún registro, enviar mensaje de error
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: false,
//             message: `No se insertar Todos los registro hubo ${insercionesErronea} errores y ${insercionesExitosas} exitosos`,
//           })
//         );
//       }
//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   // await Provider.http?.server.post(
//   //   "/save-flow",
//   //   handleCtx(async (bot, req, res) => {
//   //     // Configurar la conexión a la base de datos
//   //     const connection = getConnection();
//   //     // Realizar la conexión a la base de datos
//   //     connection.connect();
//   //     let rutaDestino = ""; // Inicializa la variable de la ruta del archivo
//   //     const { botActivation, botReplyMessage, mensajeResponse, followFlow } =
//   //       req.body;
//   //     const palabra = botActivation;
//   //     const message = botReplyMessage;
//   //     var media = false;
//   //     var sigueFlujo = false;
//   //     console.log(req.body);
//   //     // console.log(req)
//   //     const archivo = req.files[0]; // Obtén el archivo de la solicitud
//   //     console.log(req.body);
//   //     if (archivo) {
//   //       // Si se proporciona un archivo, guarda el archivo en el sistema de archivos
//   //       media = true;
//   //       rutaDestino = path.join(
//   //         process.cwd(),
//   //         "src/public/assets/Files",
//   //         archivo.originalname
//   //       );
//   //       await fs.promises.writeFile(rutaDestino, archivo.buffer);
//   //     }
//   //     if (followFlow !== undefined) {
//   //       sigueFlujo = true;
//   //     } else {
//   //       sigueFlujo = false;
//   //     }
//   //     // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//   //     const queryString =
//   //       "INSERT INTO flujosBot (palabra, media, urlMedia, sigueFlujo, messageResponse)  VALUES (?, ?, ?, ?,?);";
//   //     // // Ejecutar la consulta SQL con los parámetros proporcionados
//   //     await connection.query(
//   //       queryString,
//   //       [palabra, media, rutaDestino, sigueFlujo, message],
//   //       (error, results, fields) => {
//   //         if (error) {
//   //           console.log(error);
//   //           res.writeHead(500, { "Content-Type": "application/json" });
//   //           res.end(
//   //             JSON.stringify({
//   //               Type: false,
//   //               message: "Error al realizar el Registro en la base de datos.",
//   //             })
//   //           );
//   //         } else {
//   //           console.log(results)
//   //           // Verificar si se encontraron resultados
//   //           if (results.affectedRows > 0) {

//   //             const queryInsert = "INSERT INTO flujosbotcontinua (id_flujo, variableguardar, respuestaAlGuardar) VALUES (?, ?, ?)"
//   //             // Enviar respuesta con el token JWT
//   //            for (let index = 0; index < req.body.nombreCampo.length; index++) {
//   //             var errorProcess
//   //             try {
//   //               const dataMessage = await new Promise((resolve, reject) => {
//   //                 connection.query(
//   //                   queryString,
//   //                   [results.id,req.body.nombreCampo[index],req.body.mensajeResponse[index]],
//   //                   (error, results, fields) => {
//   //                     if (error) {
//   //                       reject(error);
//   //                     } else {
//   //                       resolve(results);
//   //                     }
//   //                   }
//   //                 );
//   //               });
//   //             } catch (error) {
//   //               errorProcess = error;
//   //               console.error("Ocurrió un error:", error);
//   //             }

//   //            }
//   //             res.writeHead(200, { "Content-Type": "application/json" });
//   //             res.end(
//   //               JSON.stringify({
//   //                 Type: true,
//   //                 message: "Registro Creado Con Exito",
//   //                 Data: results,
//   //               })
//   //             );

//   //             res.end();
//   //           } else {
//   //             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//   //             // console.log(results);
//   //             res.writeHead(404, { "Content-Type": "application/json" });
//   //             res.end(
//   //               JSON.stringify({
//   //                 Type: false,
//   //                 message: "No hay Numeros Registados.",
//   //               })
//   //             );
//   //           }
//   //         }
//   //       }
//   //     );

//   //     // Cerrar la conexión a la base de datos
//   //     connection.end();
//   //   })
//   // );

//   await Provider.http?.server.post(
//     "/save-flow",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       let rutaDestino = ""; // Inicializa la variable de la ruta del archivo
//       const { botActivation, botReplyMessage, mensajeResponse, followFlow } =
//         req.body;
//       const palabra = botActivation;
//       const message = botReplyMessage;
//       var media = false;
//       var sigueFlujo = false;
//       console.log(req.body);
//       // console.log(req)
//       const archivo = req.files[0]; // Obtén el archivo de la solicitud
//       console.log(req.body);
//       if (archivo) {
//         // Si se proporciona un archivo, guarda el archivo en el sistema de archivos
//         media = true;
//         rutaDestino = path.join(
//           process.cwd(),
//           "src/public/assets/Files",
//           archivo.originalname
//         );
//         await fs.promises.writeFile(rutaDestino, archivo.buffer);
//       }
//       if (followFlow !== undefined) {
//         sigueFlujo = true;
//       } else {
//         sigueFlujo = false;
//       }
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString =
//         "INSERT INTO flujosBot (palabra, media, urlMedia, sigueFlujo, messageResponse)  VALUES (?, ?, ?, ?,?);";
//       // // Ejecutar la consulta SQL con los parámetros proporcionados
//       var dataFlouInsert;
//       var errorProcess;
//       try {
//         dataFlouInsert = await new Promise((resolve, reject) => {
//           connection.query(
//             queryString,
//             [palabra, media, rutaDestino, sigueFlujo, message],
//             (error, results, fields) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(results);
//               }
//             }
//           );
//         });
//       } catch (error) {
//         errorProcess = error;
//         console.error("Ocurrió un error:", error);
//       }

//       if (sigueFlujo) {
//         const queryInsert =
//           "INSERT INTO flujosbotcontinua (id_flujo, variableguardar, respuestaAlGuardar) VALUES (?, ?, ?)";
//         var dataNumbers;
//         try {
//           // Iterar sobre los elementos de req.body.nombreCampo
//           for (let i = 0; i < req.body.nombreCampo.length; i++) {
//             // Ejecutar la consulta SQL para insertar el registro actual
//             await new Promise((resolve, reject) => {
//               connection.query(
//                 queryInsert,
//                 [
//                   dataFlouInsert.insertId,
//                   req.body.nombreCampo[i],
//                   req.body.mensajeResponse[i],
//                 ],
//                 (error, results, fields) => {
//                   if (error) {
//                     reject(error);
//                   } else {
//                     resolve(results);
//                   }
//                 }
//               );
//             });
//           }
//         } catch (error) {
//           errorProcess = error;
//           console.error("Ocurrió un error:", error);
//         }
//       }

//       if (errorProcess !== undefined) {
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: false,
//             message: "Error al realizar Envios: " + errorProcess,
//           })
//         );
//       } else {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: true,
//             message: "Flujos Guardados con Exito",
//             Data: "Flujos Guardados",
//           })
//         );
//       }
//     })
//   );

//   await Provider.http?.server.get(
//     "/flows",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       // const queryString = "SELECT * FROM flujosbot";
//       const queryString = "SELECT * FROM flujosbot";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, (error, results, fields) => {
//         if (error) {
//           console.log(error);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al realizar la consulta a la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.length > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ Type: true, message: "", Data: results }));

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Numeros Registados.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/flows-continuos",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const { id } = req.body;
//       console.log(id);
//       // const queryString = "SELECT * FROM flujosbot";
//       const queryString =
//         "SELECT * FROM flujosbot AS fb JOIN flujosbotcontinua AS fbc ON fb.id = fbc.id_flujo  WHERE fb.id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, [id], (error, results, fields) => {
//         if (error) {
//           console.log(error);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al realizar la consulta a la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.length > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ Type: true, message: "", Data: results }));

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Registros de Flujo continuo.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.get(
//     "/messages",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "SELECT * FROM messages";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, (error, results, fields) => {
//         if (error) {
//           console.log(error);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al realizar la consulta a la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.length > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ Type: true, message: "", Data: results }));

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Mensajes Registados.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/save-message",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       let rutaDestino = ""; // Inicializa la variable de la ruta del archivo
//       const { abbreviationMessage, textMessage, intervalMessage } = req.body;

//       var media = false;
//       console.log(req.body);
//       var tiempoInterval = 0;
//       if (intervalMessage !== undefined) {
//         tiempoInterval = intervalMessage;
//       }
//       const archivo = req.files[0]; // Obtén el archivo de la solicitud
//       console.log(archivo);
//       if (archivo) {
//         // Si se proporciona un archivo, guarda el archivo en el sistema de archivos
//         media = true;
//         rutaDestino = path.join(
//           process.cwd(),
//           "src/public/assets/Files",
//           archivo.originalname
//         );
//         await fs.promises.writeFile(rutaDestino, archivo.buffer);
//       }
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString =
//         "INSERT INTO messages (abreviacion, message, media, urlmedia, intervaloMessage) VALUES (?, ?, ?, ?, ?);";
//       // // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(
//         queryString,
//         [abbreviationMessage, textMessage, media, rutaDestino, tiempoInterval],
//         (error, results, fields) => {
//           if (error) {
//             console.log(error);
//             res.writeHead(500, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "Error al realizar el Registro en la base de datos.",
//               })
//             );
//           } else {
//             // console.log(results)
//             // Verificar si se encontraron resultados
//             if (results.affectedRows > 0) {
//               // Enviar respuesta con el token JWT
//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: true,
//                   message: "Registro Creado Con Exito",
//                   Data: results,
//                 })
//               );

//               res.end();
//             } else {
//               // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//               // console.log(results);
//               res.writeHead(404, { "Content-Type": "application/json" });
//               res.end(
//                 JSON.stringify({
//                   Type: false,
//                   message: "No hay Numeros Registados.",
//                 })
//               );
//             }
//           }
//         }
//       );

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/send-messages",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();

//       const { Abreviacion } = req.body;

//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "SELECT * FROM messages WHERE id = ?";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       var dataMessage;
//       var errorProcess;
//       try {
//         dataMessage = await new Promise((resolve, reject) => {
//           connection.query(
//             queryString,
//             [Abreviacion],
//             (error, results, fields) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(results);
//               }
//             }
//           );
//         });
//       } catch (error) {
//         errorProcess = error;
//         console.error("Ocurrió un error:", error);
//       }
//       const queryNumbers = "SELECT * FROM numbers";
//       var dataNumbers;
//       try {
//         dataNumbers = await new Promise((resolve, reject) => {
//           connection.query(queryNumbers, (error, results, fields) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(results);
//             }
//           });
//         });
//       } catch (error) {
//         errorProcess = error;
//         console.error("Ocurrió un error:", error);
//       }

//       if (errorProcess !== undefined) {
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: false,
//             message: "Error al realizar Envios: " + errorProcess,
//           })
//         );
//       }

//       if (dataNumbers && dataNumbers.length > 0) {
//         for (let i = 0; i < dataNumbers.length; i++) {
//           const row = dataNumbers[i];
//           var phone = row.numero_cel;
//           const regex = /^[0-9]+$/;

//           // Verificar si `phone` cumple con la expresión regular
//           if (regex.test(phone)) {
//             var message = dataMessage[0].message.replace("@nombre", row.nombre);
//             let dataMedia = dataMessage[0].media
//               ? { media: dataMessage[0].urlMedia }
//               : {};
//             const respuesta = await bot.sendMessage(phone, message, dataMedia);
//             var intervaloTime = dataMessage[0].intervaloMessage * 1000;
//             // console.log(intervaloTime);s
//             await new Promise((resolve) => setTimeout(resolve, intervaloTime));
//             // console.log("respuesta", respuesta);

//             const queryString =
//               "INSERT INTO reportmessage ( numero_cel, message, urlMedia, estadoEnvio) VALUES (?, ?, ?, ?)";

//             // Ejecutar la consulta SQL con los parámetros proporcionados
//             connection.query(
//               queryString,
//               [
//                 row.numero_cel,
//                 message,
//                 dataMessage[0].urlMedia,
//                 respuesta.messageTimestamp.unsigned,
//               ],
//               (error, results, fields) => {
//                 if (error) {
//                   console.error("Error al insertar datos:", error);
//                   // Manejar el error según sea necesario
//                 } else {
//                   console.log("Datos insertados correctamente.");
//                   // Realizar acciones adicionales si es necesario
//                 }
//               }
//             );
//             // Puedes acceder a otros campos de la fila según la estructura de tu tabla
//           }
//         }

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: true,
//             message: "Mensajes Enviados",
//             Data: "Mensajes Enviados",
//           })
//         );
//       } else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: false,
//             message: "No hay de Numeros para enviar Mensajes Registados.",
//           })
//         );
//       }

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.get(
//     "/report",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       // Convertir el objeto a formato JSON

//       // const jsonData = JSON.stringify(Provider, null, 2);

//       // // Guardar el JSON en un archivo
//       // fs.writeFileSync('provider.json', jsonData);
//       const connection = getConnection();
//       // Realizar la conexión a la base de datos
//       connection.connect();
//       // Consulta SQL para obtener el usuario correspondiente a la contraseña proporcionada
//       const queryString = "SELECT * FROM reportmessage";
//       // Ejecutar la consulta SQL con los parámetros proporcionados
//       connection.query(queryString, (error, results, fields) => {
//         if (error) {
//           console.log(error);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               Type: false,
//               message: "Error al realizar la consulta a la base de datos.",
//             })
//           );
//         } else {
//           // Verificar si se encontraron resultados
//           if (results.length > 0) {
//             // Enviar respuesta con el token JWT
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ Type: true, message: "", Data: results }));

//             res.end();
//           } else {
//             // Enviar respuesta indicando que no se encontró ningún usuario con las credenciales proporcionadas
//             // console.log(results);
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 Type: false,
//                 message: "No hay Datos de Reporte Registados.",
//               })
//             );
//           }
//         }
//       });

//       // Cerrar la conexión a la base de datos
//       connection.end();
//     })
//   );

//   await Provider.http?.server.post(
//     "/import-numbers-whatsapp",
//     handleCtx(async (bot, req, res) => {
//       // Configurar la conexión a la base de datos
//       // Convertir el objeto a formato JSON
//       // console.log(Provider.store.contacts)
//       // const jsonData = JSON.stringify(Provider.store.contacts, null, 2);

//       // // Guardar el JSON en un archivo
//       // fs.writeFileSync('provider_contacts.json', jsonData);

//       // Obtener la cantidad de claves (objetos) en el objeto principal
//       const cantidadObjetos = Object.keys(Provider.store.contacts).length;
//       var importados = 0;

//       try {
//         for (const key of Object.keys(Provider.store.contacts)) {
//           const object = Provider.store.contacts[key];
//           const name = object.name || "No name";
//           const numero_cel = object.id.replace(/\D/g, "");
//           // console.log("name:", name);
//           // console.log("numero_cel:", numero_cel);
//           // Esperar 1 segundo antes de llamar a insertNumber
//           //  await new Promise(resolve => setTimeout(resolve, 1000));
//           const res = await insertNumber(name, numero_cel);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//       if (cantidadObjetos > 0) {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: true,
//             message: `Se estan importando los Contactos Esto Puede Tardar un Poco ya que son ${cantidadObjetos} contactos, Para visualizar los cambios recarga la pagina `,
//             Data: "",
//           })
//         );

//         res.end();
//       } else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             Type: false,
//             message: "No hay whatsapp vinculado.",
//           })
//         );
//       }
//     })
//   );

//   // Ruta para el panel
//   await Provider.http?.server.get(
//     "/dashboard",
//     handleCtx(async (bot, req, res) => {
//       console.log(bot);
//       const bodyContent = await fs.promises.readFile(
//         baseTem + "dashboard.html",
//         "utf8"
//       );
//       const renderedHTML = ejs.render(bodyContent);

//       // Envía la respuesta
//       res.setHeader("Content-Type", "text/html");
//       res.end(renderedHTML);
//     })
//   );

//   // Ruta para la configuración de mensajes
//   await Provider.http?.server.get(
//     "/config-message",
//     handleCtx(async (bot, req, res) => {
//       // Código para la configuración de mensajes...
//       res.end("Página de configuración de mensajes");
//     })
//   );
// };

// const connection = getConnection();

// async function insertNumber(name, numero_cel) {
//   try {
//     const queryString =
//       "INSERT INTO numbers (nombre, numero_cel) VALUES (?, ?)";

//     connection.query(
//       queryString,
//       [name, numero_cel],
//       (error, results, fields) => {
//         if (error) {
//           return false;
//         } else {
//           // Obtener el ID del nuevo usuario insertado

//           // console.log(results)
//           const affectedRows = results.affectedRows;

//           if (affectedRows > 0) {
//             return true; // Insertado con éxito
//           } else {
//             return false; // No se insertó ningún registro
//           }
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error al insertar el número:", error);
//     return false; // Ocurrió un error durante la inserción
//   }
// }

//----------------------------------------------------------------
export default setupRoutes;
