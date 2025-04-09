import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { template } from '../views/template';
import Renderer from '../components/Renderer';
import type { JsonDesign } from '../types/JsonDesign.types';

jest.mock('axios');
jest.mock('../views/template');
jest.mock('../components/Renderer', () => () => 'Mocked Renderer');

const app = express();
app.get('/:hash', async (req, res) => {
  const hash = req.params.hash;
  const jsonUrl = `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/${hash}/json`;

  try {
    const { data } = await axios.get(jsonUrl);
    const design = data.banner;
    const html = template('Mocked Renderer');
    res.send(html);
  } catch (err) {
    res.status(500).send('Something went wrong.');
  }
});

describe('GET /:hash', () => {
  it('returns rendered HTML for a valid hash', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        banner: { properties: { width: 800, height: 600 }, elements: [] },
      },
    });
    (template as jest.Mock).mockReturnValue('<html>Mocked HTML</html>');

    const response = await request(app).get('/test-hash');
    expect(response.status).toBe(200);
    expect(response.text).toBe('<html>Mocked HTML</html>');
  });

  it('returns 500 for an invalid hash', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Not Found'));

    const response = await request(app).get('/invalid-hash');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Something went wrong.');
  });
});
