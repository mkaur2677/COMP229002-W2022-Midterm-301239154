// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    });
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    res.render("movie/add_edit", {
        title: "AddMovie",
        movie: {},
      });
};

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {
    let m = Movie({
      Title: req.body.Title,
      Synopsis: req.body.Synopsis,
      Year: req.body.Year,
      Director: req.body.Director,
      Genre: req.body.Genre,
    });
    Movie.create(m, (err, movie) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.redirect("/movie/list");
      }
    });
  };
  
  module.exports.displayEditPage = (req, res, next) => {
    let i = req.params.id;
    Movie.findById(i, (err, movie) => {
      if (err) {
        res.end(err);
      } else {
        res.render("movie/add_edit", {
          title: "EditMovie",
          movie: movie,
        });
      }
    });
  };
  
  // Processes the data submitted from the Edit form to update a movie
  module.exports.processEditPage = (req, res, next) => {
    // edit movie
    let i = req.params.id;
  
    let m = Movie({
      _id: req.body.id,
      Title: req.body.Title,
      Synopsis: req.body.Synopsis,
      Year: req.body.Year,
      Director: req.body.Director,
      Genre: req.body.Genre,
    });
  
    Movie.updateOne({ _id: i }, m, (err) => {
      if (err) {
        res.end(err);
      } else {
        res.redirect("/movie/list");
      }
    });
  };
  
  module.exports.performDelete = (req, res, next) => {
    let i = req.params.id;
  
    Movie.remove({ _id: i }, (err) => {
      if (err) {
        res.end(err);
      } else {
        res.redirect("/movie/list");
      }
    });
  };
  