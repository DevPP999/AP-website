/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next-sitemap').IConfig} */

// ดึงไฟล์ JSON เข้ามา
const productsTH = require("./src/data/product/products-th.json");
const productsEN = require("./src/data/product/products-en.json");

module.exports = {
  // 1. ใส่โดเมนจริง
  siteUrl: "https://www.iampong.com",
  generateRobotsTxt: true,

  // 2.  เพิ่มส่วนนี้: เพื่อบอกให้ robots.txt รู้จักไฟล์ manual ที่เราสร้างเอง
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.iampong.com/sitemap-edit.xml', // ไฟล์ manual (Article + Project)
    ],
  },

  additionalPaths: async () => {
    const result = [];

    // ------------------------------------------
    // ส่วนสินค้าภาษาไทย (TH)
    // ------------------------------------------
    productsTH.forEach((product) => {
      // URL จริง: https://www.iampong.com/th/product/GRS-16180
      result.push({
        loc: `/th/product/${product.id}`, 
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // ------------------------------------------
    // ส่วนสินค้าภาษาอังกฤษ (EN)
    // ------------------------------------------
    productsEN.forEach((product) => {
      // URL จริง: https://www.iampong.com/en/product/GRS-16180
      result.push({
        loc: `/en/product/${product.id}`, 
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },
};