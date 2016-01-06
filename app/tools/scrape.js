var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');  

module.exports = function() {
      
          // The URL we will scrape from - in our example Anchorman 2.
          var url = 'http://www.imdb.com/title/tt1229340/';
            
          // The structure of our request call
          // The first parameter is our URL
          // The callback takes 3 parameters, an error, response status code and the html
          request(url, function(error, response, html){
              
            var json = { title : "", release : "", rating : ""};
                  
              // check no error
             if(!error){
                // Next, we'll utilize the cheerio library on the returned html with jquery
                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture
                var title, release, rating;
                 
                 // we'll use the unique header class as a starting point
                 $('.header').filter(function(){
                     var data = $(this);
                     title = data.children().first().text();
                     release = data.children().last().children().text();
                     
                     json.title = title;
                     json.release = release;
                 })
                 
                 $('.star-box-giga-star').filter(function(){
                    var data = $(this);
                    rating = data.text();
                    json.rating = rating;
                })
                 
                 
                 
             }
              
            // To write to the system we will use the built in 'fs' library.
            // In this example we will pass 3 parameters to the writeFile function
            // Parameter 1 :  this is what the created filename will be called
            // Parameter 2 :  JSON.stringify to make our JSON easier to read
            // Parameter 3 :  callback function to let us know the status of our function
              fs.writeFile('./upload/output.json', JSON.stringify(json, null, 4), function(err){
                  console.log('File successfully written! - Check your project directory for the output.json file');

              });
              
          });
}
                