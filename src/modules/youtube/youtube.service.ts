import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { PLAYLIST_MAX_RESULTS, YOUTUBE_API_URL } from '../../config'
import { YOUTUBE_CATEGORIES, YOUTUBE_PARTS } from '../../config/enums'

@Injectable()
export class YoutubeService {
  private async get(
    category: YOUTUBE_CATEGORIES,
    params: URLSearchParams,
  ): Promise<Record<string, any>> {
    let response: Response

    try {
      response = await fetch(YOUTUBE_API_URL + category + '?' + params)
    } catch (error) {
      throw new NotFoundException()
    }

    if (response.status !== HttpStatus.OK) {
      throw new NotFoundException()
    }

    const data: Record<string, any> = await response.json()

    return data.pageInfo.totalResults == 0 ? {} : data
  }

  async getChannels(key: string, forUsername: string): Promise<any> {
    const params: URLSearchParams = new URLSearchParams({
      key,
      forUsername,
      part: [
        YOUTUBE_PARTS.SNIPPET,
        YOUTUBE_PARTS.CONTENT_DETAILS,
        YOUTUBE_PARTS.STATISTICS,
      ].join(),
    })

    const data = await this.get(YOUTUBE_CATEGORIES.CHANNELS, params)
    if (!Object.keys(data).length) {
      throw new NotFoundException()
    }

    const response = {
      avatar: data.items[0].snippet.thumbnails.default.url,
      statistics: data.items[0].statistics,
    }

    const channelId = data.items[0]?.id
    if (!channelId) {
      return response
    }

    const playlists = await this.getPlaylists(key, channelId)

    return {
      ...response,
      channelId,
      playlists,
    }
  }

  async getPlaylists(
    key: string,
    channelId: string,
    pageToken?: string,
  ): Promise<any> {
    const params: URLSearchParams = new URLSearchParams({
      key,
      channelId,
      part: [YOUTUBE_PARTS.SNIPPET, YOUTUBE_PARTS.CONTENT_DETAILS].join(),
      maxResults: PLAYLIST_MAX_RESULTS.toString(),
      pageToken: pageToken ?? '',
    })

    const data = await this.get(YOUTUBE_CATEGORIES.PLAYLIST, params)
    if (!Object.keys(data).length) {
      return {}
    }

    return {
      nextPageToken: data.nextPageToken,
      items: data.items.map((item) => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default?.url ?? '',
      })),
    }
  }
}
