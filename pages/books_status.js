let BookInstance = require('../models/bookinstance');

function get_available_books () {
  return BookInstance.find({status:"Available"})
    .populate('book');
}

exports.show_all_books_status = async(res) => {
  try {
    let available_books = await get_available_books().exec();
    return res.send(available_books.map((b) => {
      return b.book.title + " : " +b.status;
    }));
  } catch (err) {
    console.log("Could not get available books " + err)
  };
}