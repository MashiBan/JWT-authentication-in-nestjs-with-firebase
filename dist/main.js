"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const firebaseAdmin = require("firebase-admin");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('User Authentication')
        .setDescription('The API details for the User Authentication Demo application using Firebase in the NestJS backend.')
        .setVersion('1.0')
        .addTag('Authentication')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const firebaseKeyFilePath = './user-authentication-b3a77-firebase-adminsdk-se7d3-7b1eea64ab.json';
    const firebaseServiceAccount = JSON.parse(fs.readFileSync(firebaseKeyFilePath).toString());
    if (firebaseAdmin.apps.length === 0) {
        console.log('Initialize Firebase Application.');
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
        });
    }
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map