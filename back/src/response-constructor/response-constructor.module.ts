import { Global, Module } from '@nestjs/common';
import { ResponseConstructorService } from './response-constructor.service';

@Global()
@Module({
    providers:[ResponseConstructorService],
    exports:[ResponseConstructorService]
})
export class ResponseConstructorModule {}
