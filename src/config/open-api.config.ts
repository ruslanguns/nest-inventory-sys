import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Inventory SYS')
  .setDescription(
    `Creado con ♥ por [@ruslangonzalez](https://twitter.com/ruslangonzalez)`,
  )
  .setVersion('1.0')
  .build();

export default config;
