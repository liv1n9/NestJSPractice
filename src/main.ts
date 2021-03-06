import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("NestJS-Practice")
        .setDescription("My description")
        .setVersion("1.0")
        .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });
    await app.listen(3000);
}
bootstrap();
