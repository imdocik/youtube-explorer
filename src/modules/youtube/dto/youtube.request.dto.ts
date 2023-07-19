import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class YoutubeChannelsRequestDTO {
  @IsString()
  @IsNotEmpty()
  key: string

  @IsString()
  @IsNotEmpty()
  forUsername: string
}

export class YoutubePlaylistsRequestDTO {
  @IsString()
  @IsNotEmpty()
  key: string

  @IsString()
  @IsNotEmpty()
  channelId: string

  @IsOptional()
  @IsString()
  pageToken?: string
}
