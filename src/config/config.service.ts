import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        if (
            process.env.NODE_ENV === 'production' ||
            process.env.NODE_ENV === 'staging'
        ) {
            this.envConfig = {
                JWT_SIGN: process.env.JWT_SIGN,
                PORT: process.env.PORT
            };
        } else {
            this.envConfig = dotenv.parse(fs.readFileSync('.env'));
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}