/**
 * Created by Nicolas on 6/19/15.
 */
/**
 *  Modified by Dreadfull on 8/09/17
 */
/**
 *  Modified by Khai Phan on 1/11/19
 */
(function(Plugin) {
  "use strict";

  var slugify = require("slugify");

  function convert(url) {
    var slug = url.toString().toLowerCase();

    if (slug.match(/\/(.*)/)) {
      var content = slug.replace(/(.+\/)(.*)$/, "$2");
      content = slugify(content);
      slug = slug.replace(/(.+\/)(.*)$/, `$1${content}`);
    }
    return slug;
  }

  //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
  Plugin.hooks = {
    filters: {
      categoryCreate: function(categoryData, callback) {
        categoryData.category.slug = convert(categoryData.category.slug);
        callback(null, categoryData);
      },

      categoryUpdate: function(categoryData, callback) {
        if ("slug" in categoryData.category) {
          categoryData.category.slug = convert(categoryData.category.slug);
        }
        callback(null, categoryData);
      },

      topicCreate: function(topicData, callback) {
        topicData.topic.slug = convert(topicData.topic.slug);
        callback(null, topicData);
      },

      topicEdit: function(topicData, callback) {
        //Here was a problem
        topicData.topic.slug = convert(topicData.topic.slug);
        callback(null, topicData);
      },

      userCreate: function(userData, callback) {
        //If there will be username collision, userslug will be overridden by NodeBB...
        userData.userslug = convert(userData.userslug);
        callback(null, userData);
      }
    }
  };
})(module.exports);
