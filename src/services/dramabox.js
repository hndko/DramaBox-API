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

export default {
  getVipDramas,
  getDubindoDramas,
  getRandomDramas,
  transformDrama,
  transformVideoDrama,
  transformSection,
  parseVipResponse,
  parseDubindoResponse,
  parseRandomDramaResponse,
};
