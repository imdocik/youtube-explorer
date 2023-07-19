class YoutubePlaylistItemResponseDTO {
  readonly title: string
  readonly thumbnail: string
}

export class YoutubePlaylistsResponseDTO {
  readonly nextPageToken: string
  readonly items: YoutubePlaylistItemResponseDTO[]
}

export class YoutubeChannelsResponseDTO {
  readonly avatar: string
  readonly statistics: Record<string, unknown>
  readonly channelId?: string
  readonly playlists?: YoutubePlaylistsResponseDTO
}
