const {Book, Writer, Reader, ReaderLikesBook } = require('../models');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.findAll({       
        include : ['writer']
      });
      res.json(books);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // getOneProduct: async (req, res) => {
  //    try {
  //       const productId = req.params.id;
  //       const product = await Product.findByPk(productId, { 
  //         order: [
  //           ['images', 'id', 'ASC']
  //         ],        
  //         include : ['category', 'images', {
  //           model: Seller,
  //           as: 'seller',
  //           attributes: { exclude: ['password'] }
  //         }]
  //         });
  //        if (product) {
  //        res.json(product);
  //    } else {
  //      res.status(404).json('Cant find product with id ' + productId);
  //    }
  //   } catch (error) {
  //    console.trace(error);
  //    res.status(500).json(error.toString());
  //   }
  // },

  // getBooksFromWriter: async (req, res) => {
  //   try {
  //     sellerId = req.params.id;
  //     const products = await Product.findAll({
  //       where : {
  //         seller_id : sellerId
  //       },
  //       include : ['category', 'images'],
  //       order: [
  //         ['id', 'ASC'],
  //         ['images', 'id', 'ASC']
  //       ], 
  //       })

  //     const seller = await Seller.findByPk(sellerId, {
  //       attributes: { exclude: ['password'] }
  //     })
  //     const result = [seller, products]
  
  //     if (products) {
  //       res.status(200).json(result)
  //     }
  //   } catch (error) {
  //     console.trace(error);
  //     res.status(500).json(error.toString());
  //   }
  // },

  addNewBook: async (request, response) => {
    try {
      writerId = request.params.id;
      
      if (writerId != request.user.userId || request.user.role !== 'writer') {
        return response.status(401).json('You have no right to make this action');
      }

      const writer = await Writer.findByPk(writerId);
      
      if (!writer) {
        return response.status(404).json('User not found');
      }


      const { title , description, picture_url} = request.body;
      
      if(title && description && picture_url && writerId ) {
        await Book.create({
          title: title,
          description: description,
          picture_url: picture_url, 
          writer_id: writerId,
        });
        
        response.status(200).json('success');
      } else {
        response.status(400).json('Données manquantes')
      }
      
    } catch (error) {
      console.trace(error);
      response.status(500).json(error.toString());
    }
  },

  saveBook: async (request, response) => {
    try {
      readerId = request.params.id;

      const { bookId } = request.body;
      
      if (readerId != request.user.userId || request.user.role !== 'reader') {
        return response.status(401).json('You have no right to make this action');
      }

      const reader = await Reader.findByPk(readerId);
      
      if (!reader) {
        return response.status(404).json('User not found');
      }

      const book = await Book.findByPk(bookId);
      
      if (!book) {
        return response.status(404).json('Book not found');
      }


      ReaderLikesBook.create ({
        reader_id: readerId,
        book_id: bookId
      })

      response.status(200).json('success');
      
      
    } catch (error) {
      console.trace(error);
      response.status(500).json(error.toString());
    }
  },

  
};

module.exports = bookController;
