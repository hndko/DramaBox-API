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

export default {
  getVipDramas,
  getDubindoDramas,
  transformDrama,
  transformSection,
  parseVipResponse,
  parseDubindoResponse,
};
