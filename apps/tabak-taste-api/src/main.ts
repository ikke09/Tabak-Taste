import Config from './config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ApiError, ApiResult } from '@tabak-taste/types';
import { TobaccoService } from '@tabak-taste/db';

const app = express();
const tobaccoService = new TobaccoService();
app.use(cors());
app.use(helmet());

if (Config.NODE_ENV === 'development') {
  const configureSwaggerUI = async () => {
    const swaggerUI = await import('swagger-ui-express');
    // Generated with // https://editor.swagger.io/
    const openAPI = await import('../resources/openapi.json');
    const openAPIOptions = await import('../resources/openapi-options.json');
    app.use(
      '/api/docs',
      swaggerUI.serve,
      swaggerUI.setup(openAPI, openAPIOptions)
    );
  };
  configureSwaggerUI();
}

app.get('/api', (req, res) => {
  res.json({
    version: Config.API_VERSION,
  });
});

app.get('/api/tobaccos', (req, res) => {
  const result: ApiResult = {
    status: 500,
    error: new ApiError('/api/tobaccos', 'Search for Tobaccos failed').message,
    data: null,
  };

  if (!req.query || !req.query.search) {
    res.status(result.status);
    res.json(result);
    return;
  }
  console.log(tobaccoService);
  const searchQuery = `${req.query.search}`;
  console.log('Query:', searchQuery);
  tobaccoService.findTobaccosWithProducer(searchQuery).then((dbResponse) => {
    console.log('Service Response:', dbResponse);
    if (dbResponse instanceof ApiError) {
      result.error = dbResponse.message;
    } else {
      result.status = 200;
      result.data = dbResponse;
    }
    res.status(result.status);
    res.json(result);
    return;
  });
});

app.listen(Config.API_PORT, () => {
  console.debug(`API listening on Port ${Config.API_PORT}`);
});
