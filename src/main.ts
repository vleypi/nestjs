import { NestFactory } from "@nestjs/core"
import { DocumentBuilder } from "@nestjs/swagger"
import { SwaggerModule } from "@nestjs/swagger/dist"
import { AppModule } from "./app.module"

async function start(){
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Nestjs study')
        .setDescription('Nestjs')
        .setVersion('1.0.0')
        .addTag('Vleypi')
        .build()

    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('/api/docs',app,document)

    await app.listen(PORT,()=> console.log(`Server Started on port = ${PORT}`))
}

start()