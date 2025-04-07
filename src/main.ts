import 'reflect-metadata';
import 'module-alias/register';
import logger from '@common/logger';
import configuration from '@config/env.config';
import path from 'path';
import { createExpressServer } from 'routing-controllers';

const app = createExpressServer({
  routePrefix: '/api',
  controllers: [path.join(__dirname, '/core/controllers/**/*.js')],
});
app.listen(configuration.PORT || 3000);
logger.info(
  `Server started and listening on port ${configuration.PORT}, at ${new Date()}`,
);
