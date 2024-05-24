import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  // adda anew constructor
  constructor(private readonly ninjasService: NinjasService) {}
  // GET /ninjsa?weapon=star --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getNinjasbyId(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinjas(
    @Param('id') id: string,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id -->{...}
  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteNinjas(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
