import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from '../belt/belt.guard';

@Controller('ninjas')

export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}
    // GET /ninjas?weapon=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'katana' | 'nunchucks') {
        const service = new NinjasService();
        return service.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        try{ 
        return this.ninjasService.getNinja(id);
        } catch (err) {
            throw new NotFoundException();
        }
    }

    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(+id, updateNinjaDto)
    }

    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return  this.ninjasService.removeNinja(+id)
    }

}


// GET /ninjas --> []
// GET /ninjas/:id -- {...}
// POST /ninjas 
// PUT /ninjas/:id --> {...}
//DELETE /ninjas/:id