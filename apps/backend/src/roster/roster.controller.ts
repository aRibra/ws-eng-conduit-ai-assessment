import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RosterService } from './roster.service';
import { RosterDto } from './dto/roster.dto';

@ApiTags('roster')
@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  @ApiOperation({ summary: 'Get roster statistics' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of roster stats', type: [RosterDto] })
  async getRoster(): Promise<RosterDto[]> {
    return this.rosterService.getRosterStats();
  }
}
