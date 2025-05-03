module.exports = function(eleventyConfig) {
  // Copy the "images" directory to the output
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/svgs");
  eleventyConfig.addPassthroughCopy("src/audio");
  // Copy the "scripts" directory to the output
  eleventyConfig.addPassthroughCopy("src/scripts");
  
  // Copy the CSS file to the output
  eleventyConfig.addPassthroughCopy("src/styles");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/styles/tailwind.css");
  
  // Watch content JSON files for changes
  eleventyConfig.addWatchTarget("src/content/**/*.json");
  
  // Helper function to load JSON without caching
  const loadJson = (path) => {
    const filePath = require.resolve(path);
    delete require.cache[filePath];
    return require(path);
  };
  
  // Add content files as global data with cache-busting
  eleventyConfig.addGlobalData("home", () => loadJson("./src/content/home.json"));
  eleventyConfig.addGlobalData("menu", () => loadJson("./src/content/menu.json"));
  eleventyConfig.addGlobalData("roost", () => loadJson("./src/content/roost.json"));
  eleventyConfig.addGlobalData("findUs", () => loadJson("./src/content/find-us.json"));
  eleventyConfig.addGlobalData("contact", () => loadJson("./src/content/contact.json"));
  
  // Fix the file output paths for pages in the pages directory
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/**/*.njk");
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "partials",
      layouts: "layouts",
      data: "content"
    },
    pathPrefix: "/",
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};