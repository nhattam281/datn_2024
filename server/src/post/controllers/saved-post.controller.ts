// import {
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   Post,
//   Query,
// } from '@nestjs/common';
// import { ApiParam, ApiTags } from '@nestjs/swagger';
// import {
//   AuthenticateUser,
//   CurrentJwtPayload,
// } from 'src/common/decorators/auth.decorator';
// import { JwtPayload } from 'src/common/types/jwt-payload.type';
// import { GetListReactedPostReqDto } from '../dtos/req/post-reaction.req.dto';
// import { SavedPostService } from '../services/saved-post.service';

// @Controller('saved-post')
// @ApiTags('Saved Post')
// @AuthenticateUser()
// export class SavedPostController {
//   constructor(private savedPostService: SavedPostService) {}

//   @Get()
//   getList(
//     @Query() query: GetListReactedPostReqDto,
//     @CurrentJwtPayload() jwtPayload: JwtPayload,
//   ) {
//     return this.savedPostService.getList(query, jwtPayload);
//   }

//   @Post(':id')
//   @AuthenticateUser()
//   react(
//     @Param('id', ParseIntPipe) id: number,
//     @CurrentJwtPayload() jwtPayload: JwtPayload,
//   ) {
//     return this.savedPostService.savePost(id, jwtPayload);
//   }

//   @Delete(':id')
//   @AuthenticateUser()
//   @ApiParam({ name: 'id', description: 'PostId to un-react' })
//   deleteSingle(
//     @Param('id', ParseIntPipe) id: number,
//     @CurrentJwtPayload() jwtPayload: JwtPayload,
//   ) {
//     return this.savedPostService.deleteSingle(id, jwtPayload);
//   }
// }
