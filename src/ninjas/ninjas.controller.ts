import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { get } from 'http';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
    // GET /ninjas?type=fast --> []
    @Get()
    getNinjas(@Query('type') type: string) {
        return [{type }];
    }

    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        return {
            id,
        };
    }

    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return {
            name: createNinjaDto.name,
        };
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return {
            id,
        };
    }

    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return {
            id,
        };
    }

}


// GET /ninjas --> []
// GET /ninjas/:id -- {...}
// POST /ninjas 
// PUT /ninjas/:id --> {...}
//DELETE /ninjas/:id