//******** KNEX E DOTENV ********//
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});
//******** SETUP EXPRESS ********//
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
