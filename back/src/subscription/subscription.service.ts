import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'rxjs/internal/Subscription';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {

    constructor(@InjectRepository(Subscription) private subscriptionRepo:Repository<Subscription>){}

    add(){
        
    }

}
