import { Controller, Get, Query } from '@nestjs/common'
import { YoutubeService } from './youtube.service'
import {
  YoutubeChannelsRequestDTO,
  YoutubePlaylistsRequestDTO,
} from './dto/youtube.request.dto'
import {
  YoutubeChannelsResponseDTO,
  YoutubePlaylistsResponseDTO,
} from './dto/youtube.response.dto'

@Controller('/v1')
export class YoutubeController {
  constructor(private readonly service: YoutubeService) {}

  @Get('/channels')
  getChannels(
    @Query() request: YoutubeChannelsRequestDTO,
  ): Promise<YoutubeChannelsResponseDTO> {
    return this.service.getChannels(request.key, request.forUsername)
  }

  @Get('/playlists')
  getPlaylists(
    @Query() request: YoutubePlaylistsRequestDTO,
  ): Promise<YoutubePlaylistsResponseDTO> {
    return this.service.getPlaylists(
      request.key,
      request.channelId,
      request.pageToken,
    )
  }
}
