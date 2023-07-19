import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  await app.listen(PORT ?? 8003)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
