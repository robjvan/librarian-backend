import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('insights')
@UseGuards(AuthGuard('jwt'))
export class InsightsController {}
