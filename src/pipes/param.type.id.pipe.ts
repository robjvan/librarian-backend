import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ParamTypeIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        let outValue: number = null;

        try {
            if (isNullOrUndefined(value)) throw new Error('Value is null');
            outValue = parseInt(value, 10);
            if (isNaN(outValue)) throw new Error('Value is NaN');
        } catch (error) {
            throw new HttpException('Unexpected parameter', HttpStatus.BAD_REQUEST);
        }

        return outValue;
    }
}