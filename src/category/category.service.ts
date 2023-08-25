import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CategoryService {

    private readonly logger = new Logger('Category provider');

    getAll() {
        this.logger.debug(`jeje`)
    }

}
