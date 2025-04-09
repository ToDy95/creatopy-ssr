import express from 'express';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import Renderer from '../components/Renderer';
import { template } from '../views/template';
import type { JsonDesign } from '../types/JsonDesign.types';
import React from 'react';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:hash', async (req, res) => {
  const hash = req.params.hash;
  const jsonUrl = `${process.env.API_BASE_URL}/${hash}/json`;
  try {
    const { data } = await axios.get<{ banner: JsonDesign }>(jsonUrl);
    const design = data.banner;
    const html = renderToString(React.createElement(Renderer, { design }));
    res.send(template(html));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
