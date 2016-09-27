/*
 * opengraph-scraper
 * https://github.com/thebigredgeek/opengraph-scraper
 *
 * Copyright (c) 2013 Andrew E. Rhyne
 * Licensed under the MIT license.
 */
var Promise = require('bluebird'),
    jsdom   = require('jsdom');

/**
 * This function fetchs open graph data regarding a given URL
 * @param  {String} url URL string
 * @return {Object}     A promise
 */
module.exports = function(url){
    return new Promise(function(resolve, reject){
        var openGraphData = [];
        
        jsdom.env(
            url,
            {
                done: function(error, window){
                    if(error){
                        reject(error); //reject for error
                    }else{
                        var $ = require('jquery')(window);
                        
                        $('meta[property^=og]').each(function(index, item){
                            openGraphData.push([item.getAttribute('property'), item.getAttribute('content')]);
                        });
                        
                        if(openGraphData.length < 1){
                            reject(false); //reject, for no data
                        }else{
                            resolve(openGraphData); //resolve with data
                        }
                    }
                }
            }
        );
    });
};
