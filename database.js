import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
  })
  .promise();

export async function getMoods() {
  const [moods] = await pool.query("SELECT * FROM moods");
  // console.log(moods);
  return moods;
}

export async function getMood(id) {
  let query = `
      SELECT *
      FROM moods
      WHERE id = ?
      `;
  const [mood] = await pool.query("SELECT * FROM moods WHERE id = ?", [id]);
  console.log(mood[0]);
  return mood[0];
}

export async function addMood(notes, rating, created) {
  console.log(notes, rating, created);
  let query = `
      INSERT INTO moods (notes, rating, created)
      VALUE (?, ?, ?)
      `;
  const [rows] = await pool.query(query, [notes, rating, created]);
  const mood = getMood(rows.insertId);
  return mood;
}

export async function updateMood(notes, rating, id) {
  let query = `
      UPDATE moods
      SET notes = ?,
      rating = ?
      WHERE id = ?
      `;
  const [mood] = await pool.query(query, [notes, rating, id]);
  return mood;
}

export async function deleteMood(id) {
  let query = `
      DELETE 
      FROM moods 
      WHERE id = ?
      `;
  const [mood] = await pool.query(query, [id]);
  return mood;
}
