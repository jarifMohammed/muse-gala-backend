import mongoose from 'mongoose';
import logger from './src/core/config/logger.js';
import { server } from './src/app.js';
import { mongoURI, port } from './src/core/config/config.js';
import { initSlaWorker } from './src/core/cron/slaWorker.js';

mongoose
  .connect(mongoURI, {
    maxPoolSize: 10,
    autoIndex: false,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    logger.info('MongoDB connected');
    initSlaWorker();
    server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
  });
