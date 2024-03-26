import express from "express";
const router = express.Router();
import axios from "axios";
import _ from "lodash";
import chalk from "chalk";
import moment from "moment";
moment.locale("es"); //pasar moments a espanol
import { v4 as uuidv4 } from "uuid";
//le creamos una constante a la api
const randomUser = "https://randomuser.me/api";
//array para guardar usuarios
const users = [];
//date
const date = "MMMM Do YYYY: hh:mm:ss a";

///api
router.get("/usuarios", async (req, res) => {
  try {
    const apiUsers = await axios.get(randomUser);
    const gender = apiUsers.data.results[0].gender;
    const name = apiUsers.data.results[0].name.first;
    const lastname = apiUsers.data.results[0].name.last;
    const id = uuidv4().slice(0, 8);
    const dateUser = moment().format(date);
    users.push({ name, lastname, gender, id, dateUser });
    //lodash
    const userGender = _.partition(users, (person) => {
      return person.gender === "male";
    });
    const pattern = `
        <center>
        <h5>Hombres</h5>
        <ul>
         ${userGender[0]
           .map((person) => {
             return `<li><b>Nombre:</b> ${person.name}  ||  <b>Apellido:</b> ${person.lastname}  ||  <b>Genero:</b> ${person.gender}  ||  <b>RUT:</b> ${person.id}  ||  <b>Fecha Inscripcion:</b> ${person.dateUser}</li>`;
           })
           .join("")}
        </ul>
        <h5>Mujeres</h5>
        <ul>
         ${userGender[1]
           .map((person) => {
             return `<li><b>Nombre:</b> ${person.name}  ||  <b>Apellido:</b> ${person.lastname}  ||  <b>Genero:</b> ${person.gender}  ||  <b>RUT:</b> ${person.id}  ||  <b>Fecha Inscripcion:</b> ${person.dateUser}</li>`;
           })
           .join("")}
        </ul>
        </center>
         `;

    //const del pattern sin tags, con regex
    const patternWoTags = pattern.replace(/<[^>]*>?/gm, "");
    console.log(chalk.blue.bgWhite(patternWoTags));

    res.send(pattern);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al consumir la API");
  }
});

router.get("/test", (req, res) => {
  res.send("<center>Citas Medicas <br> Clinica</center>");
});

router.get("*", (req, res) => {
  res.send(
    `<center><h1>404</h1><br><h2>Pagina No Encontrada</h2></center><br><center>Recuerda agregar <b>/usurios</b> al final de la URL.</center>`
  );
});

export default router;
