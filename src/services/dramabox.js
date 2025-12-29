/**
 * DramaBox API Service
 * Handles all DramaBox-specific API calls
 */

import { get } from "./api.js";

/**
 * Fetches VIP dramas list
 * @returns {Promise<Object>} - VIP page data with columnVoList
 */
export async function getVipDramas() {
  const response = await get("/vip");
  return response;
}

/**
 * Transforms API drama data to component-friendly format
 * @param {Object} book - Drama book object from API
 * @returns {Object} - Transformed drama object
 */
export function transformDrama(book) {
  return {
    id: book.bookId,
    title: book.bookName,
    image: book.coverWap,
    episodes: book.chapterCount,
    description: book.introduction || "",
    genres: book.tags || [],
    viewCount: book.playCount || "0",
    corner: book.corner || null,
    inLibrary: book.inLibrary || false,
  };
}

/**
 * Transforms column data from API response
 * @param {Object} column - Column object from columnVoList
 * @returns {Object} - Transformed section object
 */
export function transformSection(column) {
  return {
    id: column.columnId,
    title: column.title,
    subtitle: column.subTitle || "",
    style: column.style,
    dramas: (column.bookList || []).map(transformDrama),
  };
}

/**
 * Extracts and transforms all sections from VIP API response
 * @param {Object} response - Full API response
 * @returns {Object} - Structured data with sections
 */
export function parseVipResponse(response) {
  const sections = (response.columnVoList || []).map(transformSection);

  return {
    sections,
    // Get featured dramas from first section for hero
    featured: sections.length > 0 ? sections[0].dramas.slice(0, 5) : [],
    // Banner list if available
    banners: response.bannerList || [],
    // Watch history if available
    watchHistory: response.watchHistory || [],
  };
}

/**
 * Fetches Dub Indo dramas list
 * @param {string} classify - 'terpopuler' or 'terbaru'
 * @param {number} page - Page number (1-indexed)
 * @returns {Promise<Array>} - List of dramas
 */
export async function getDubindoDramas(classify = "terpopuler", page = 1) {
  const response = await get("/dubindo", { classify, page });
  return response;
}

/**
 * Transforms Dub Indo response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parseDubindoResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformDrama);
}

/**
 * Fetches random dramas for video feed
 * @returns {Promise<Array>} - List of dramas with video data
 */
export async function getRandomDramas() {
  const response = await get("/randomdrama");
  return response;
}

/**
 * Transforms video drama data to component-friendly format
 * @param {Object} drama - Drama object from randomdrama API
 * @returns {Object} - Transformed video drama object
 */
export function transformVideoDrama(drama) {
  // Get default 720p video URL
  const defaultCdn =
    drama.cdnList?.find((cdn) => cdn.isDefault === 1) || drama.cdnList?.[0];
  const defaultVideo =
    defaultCdn?.videoPathList?.find((v) => v.isDefault === 1) ||
    defaultCdn?.videoPathList?.[1];

  return {
    id: drama.bookId,
    title: drama.bookName,
    image: drama.bookCover,
    thumbnail: drama.chapterImg,
    description: drama.introduction || "",
    genres: drama.tags || [],
    viewCount: drama.playCount || "0",
    corner: drama.corner || null,
    inLibrary: drama.inLibrary || false,
    // Video specific
    chapterId: drama.chapterId,
    chapterIndex: drama.chapterIndex,
    totalChapters: drama.totalChapterNum,
    nextChapterId: drama.nextChapterId,
    videoUrl: defaultVideo?.videoPath || drama.videoPath,
    videoQualities: defaultCdn?.videoPathList || [],
    // Performers
    performers: (drama.performers || []).map((p) => ({
      id: p.performerId,
      name: p.performerName,
      avatar: p.performerAvatar,
      videoCount: p.videoCount,
    })),
    // Share info
    shareDescription: drama.shareVo?.description || "",
  };
}

/**
 * Transforms random drama response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed video dramas array
 */
export function parseRandomDramaResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformVideoDrama);
}

/**
 * Fetches recommended dramas for user (For You)
 * @returns {Promise<Array>} - List of recommended dramas
 */
export async function getForYouDramas() {
  const response = await get("/foryou");
  return response;
}

/**
 * Transforms For You response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parseForYouResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformDrama);
}

/**
 * Fetches latest/newly released dramas
 * @returns {Promise<Array>} - List of latest dramas
 */
export async function getLatestDramas() {
  const response = await get("/latest");
  return response;
}

/**
 * Transforms Latest dramas response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parseLatestResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformDrama);
}

/**
 * Fetches trending/popular dramas
 * @returns {Promise<Array>} - List of trending dramas
 */
export async function getTrendingDramas() {
  const response = await get("/trending");
  return response;
}

/**
 * Transforms Trending dramas response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parseTrendingResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformDrama);
}

/**
 * Fetches popular search dramas (most searched keywords)
 * @returns {Promise<Array>} - List of popular search dramas
 */
export async function getPopularSearchDramas() {
  const response = await get("/populersearch");
  return response;
}

/**
 * Transforms Popular Search response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parsePopularSearchResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformDrama);
}

/**
 * Search dramas by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} - List of matching dramas
 */
export async function searchDramas(query) {
  if (!query || query.trim() === "") {
    return [];
  }
  const response = await get("/search", { query: query.trim() });
  return response;
}

/**
 * Transforms search result to component-friendly format
 * @param {Object} drama - Drama object from search API
 * @returns {Object} - Transformed drama object
 */
export function transformSearchDrama(drama) {
  return {
    id: drama.bookId,
    title: drama.bookName,
    image: drama.cover,
    description: drama.introduction || "",
    genres: drama.tagNames || [],
    protagonist: drama.protagonist || "",
    corner: drama.corner || null,
    inLibrary: drama.inLibrary || false,
  };
}

/**
 * Transforms Search response to component-friendly format
 * @param {Array} response - Array of dramas from API
 * @returns {Array} - Transformed dramas array
 */
export function parseSearchResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformSearchDrama);
}

/**
 * Fetches drama detail by bookId
 * @param {string} bookId - The drama's book ID
 * @returns {Promise<Object>} - Drama detail data
 */
export async function getDramaDetail(bookId) {
  if (!bookId) {
    throw new Error("bookId is required");
  }
  const response = await get("/detail", { bookId });
  return response;
}

/**
 * Transforms performer data
 * @param {Object} performer - Performer from API
 * @returns {Object} - Transformed performer
 */
export function transformPerformer(performer) {
  return {
    id: performer.performerId,
    name: performer.performerName,
    avatar: performer.performerAvatar,
    videoCount: performer.videoCount || 0,
  };
}

/**
 * Transforms chapter data
 * @param {Object} chapter - Chapter from API
 * @returns {Object} - Transformed chapter
 */
export function transformChapter(chapter) {
  return {
    id: chapter.id,
    name: chapter.name,
    index: chapter.index,
    indexStr: chapter.indexStr,
    unlocked: chapter.unlock || false,
    cover: chapter.cover,
    videoUrl: chapter.mp4 || null,
    hlsUrl: chapter.m3u8Url || null,
    duration: chapter.duration || 0,
    durationFormatted: formatDuration(chapter.duration),
    price: chapter.chapterPrice || 0,
    isNew: chapter.new || false,
    updateDate: chapter.utime,
  };
}

/**
 * Format duration from ms to mm:ss
 * @param {number} ms - Duration in milliseconds
 * @returns {string} - Formatted duration
 */
function formatDuration(ms) {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Transforms detail book data
 * @param {Object} book - Book from API detail response
 * @returns {Object} - Transformed book
 */
export function transformDetailBook(book) {
  return {
    id: book.bookId,
    title: book.bookName,
    image: book.cover,
    description: book.introduction || "",
    viewCount: book.viewCount || 0,
    viewCountFormatted: formatViewCount(book.viewCount),
    followCount: book.followCount || 0,
    chapterCount: book.chapterCount || 0,
    genres: book.typeTwoNames || [],
    tags: book.tags || book.labels || [],
    language: book.language,
    shelfTime: book.shelfTime,
    performers: (book.performerList || []).map(transformPerformer),
  };
}

/**
 * Format view count to readable format
 * @param {number} count - View count
 * @returns {string} - Formatted count
 */
function formatViewCount(count) {
  if (!count) return "0";
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

/**
 * Parses drama detail response
 * @param {Object} response - API response
 * @returns {Object} - Parsed detail data
 */
export function parseDetailResponse(response) {
  if (!response || !response.data) {
    return null;
  }

  const { book, chapterList, recommends } = response.data;

  return {
    book: book ? transformDetailBook(book) : null,
    chapters: (chapterList || []).map(transformChapter),
    recommendations: (recommends || []).map(transformDetailBook),
  };
}

/**
 * Fetches all episodes with streaming links
 * @param {string} bookId - The drama's book ID
 * @returns {Promise<Array>} - List of episodes with streaming URLs
 */
export async function getAllEpisodes(bookId) {
  if (!bookId) {
    throw new Error("bookId is required");
  }
  const response = await get("/allepisode", { bookId });
  return response;
}

/**
 * Transforms streaming episode data
 * @param {Object} episode - Episode from allEpisode API
 * @returns {Object} - Transformed episode with quality options
 */
export function transformStreamingEpisode(episode) {
  // Get default CDN
  const defaultCdn =
    episode.cdnList?.find((cdn) => cdn.isDefault === 1) || episode.cdnList?.[0];

  // Extract video URLs by quality
  let videoUrls = {};
  if (defaultCdn?.videoPathList) {
    defaultCdn.videoPathList.forEach((video) => {
      videoUrls[video.quality] = {
        url: video.videoPath,
        isDefault: video.isDefault === 1,
        isVip: video.isVipEquity === 1,
      };
    });
  }

  return {
    id: episode.chapterId,
    index: episode.chapterIndex,
    name: episode.chapterName,
    cover: episode.chapterImg,
    isPaid: episode.chargeChapter || episode.isCharge === 1,
    videos: {
      sd: videoUrls[540]?.url || null,
      hd: videoUrls[720]?.url || null,
      fhd: videoUrls[1080]?.url || null,
    },
    defaultQuality:
      defaultCdn?.videoPathList?.find((v) => v.isDefault === 1)?.quality || 720,
  };
}

/**
 * Parses all episodes response
 * @param {Array} response - Array of episodes from API
 * @returns {Array} - Parsed episodes with streaming URLs
 */
export function parseAllEpisodesResponse(response) {
  if (!Array.isArray(response)) {
    return [];
  }
  return response.map(transformStreamingEpisode);
}

export default {
  getVipDramas,
  getDubindoDramas,
  getRandomDramas,
  getForYouDramas,
  getLatestDramas,
  getTrendingDramas,
  getPopularSearchDramas,
  searchDramas,
  getDramaDetail,
  getAllEpisodes,
  transformDrama,
  transformVideoDrama,
  transformSearchDrama,
  transformDetailBook,
  transformChapter,
  transformPerformer,
  transformStreamingEpisode,
  transformSection,
  parseVipResponse,
  parseDubindoResponse,
  parseRandomDramaResponse,
  parseForYouResponse,
  parseLatestResponse,
  parseTrendingResponse,
  parsePopularSearchResponse,
  parseSearchResponse,
  parseDetailResponse,
  parseAllEpisodesResponse,
};
