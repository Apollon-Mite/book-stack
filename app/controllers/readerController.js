const {Reader, Book} = require('../models');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const readerController = {
    readerHandleLoginForm: async (request, response) => {
        try {
            // on cherche à identifier le reader à partir de son email
            // we are trying to identify a reader from his email
            const email = request.body.email;

            if (!validator.validate(email)) {
              // the email given has not valid format 
              return response.status(403).json('Le format de l\'email est incorrect'); 
            }

            const reader = await Reader.findOne({
              where: { 
                  email
              },
            })
                
            if (!reader) {
              return response.status(403).json('Email ou mot de passe incorrect')
              // no reader found with this email => error
            }
            // the reader with this email exists, let's compare received password with the hashed one in database
            
            // bcrypt can check if 2 passwords are the same, the password entered by user and the one in database 
            const validPwd = await bcrypt.compare(request.body.password, reader.dataValues.password);

            if (!validPwd) {
              // password is not correct, we send an error
              return response.status(403).json('Email ou mot de passe incorrect')
            }

            // this seller exists and identified himself, we send him his data (witout password)
            const updatedReader = await Reader.findOne({
              where: { 
                  email
              },
              attributes: { exclude: ['password'] } // we don't want the password to be seen in the object we will send
      
            })

            const jwtContent = { 
              userId: updatedReader.id, 
              role: "reader" 
            };
            const jwtOptions = { 
              algorithm: 'HS256', 
              expiresIn: '3h' 
            };

            response.json({ 
              logged: true, 
              role: "reader",
              user: updatedReader,
              token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
            });

            
        } catch (error) {
          response.status(500).json(error.toString())
        }

    },


   readerHandleSignupForm: async (request, response) => {
    try {

      const { lastname, firstname, email, password, passwordConfirm} = request.body;

      if ( !email || !password || !passwordConfirm || !lastname || !firstname ) {
        return response.status(403).json('Vous n\'avez pas rempli tous les champs');  
      }
      if ( email.trim().length<4 || password.trim().length<5 || passwordConfirm.trim().length<5 || lastname.trim().length<3 || firstname.trim().length<3 ) {
        
        return response.status(403).json('Vous n\'avez pas rempli tous les champs correctement');  
      } // trim() verifies if data is not composed of spaces only, in fact it deletes all spaces at the beginning and at the end of a string
      
        //on checke si un utilisateur existe déjà avec cet email
        const reader = await Reader.findOne({
          where: {
              email: email
          }
        });

        if (reader) {           
          // there is already a reader with this email  
          return response.status(403).json('Un compte existe déjà avec cet email, veuillez réessayer avec un autre email');
        }
        //on checke que l'email a un format valide
        if (!validator.validate(email)) {
          // the email given has not valid format 
          return response.status(403).json('Le format de l\'email est incorrect'); 
        }
        // let's check that password and password-confirmation are the same
        if (password !== passwordConfirm) {
          // they are not the same;
          return response.status(403).json('La confirmation du mot de passe a échoué');
        }
        // we hash password
        const hashedPwd = await bcrypt.hash(password, 10)
        
        // we add the new writer in database       
        await Reader.create({
            email,
            password: hashedPwd,
            lastname,
            firstname,
        });
        
        response.status(200).json('success');
    } catch(error) {
      response.status(500).json(error.toString())
    }
  },


    getAllReaders: async (request, response) => {
    try {
      const readers = await Reader.findAll({ 
        attributes: { exclude: ['password'], // we don't want the password to be seen in the object we will send
          order: [['id', 'ASC']],  
        },
        include: 'books'
      });

      if (!readers) {
        return response.status(404).json('Cant find sellers');
      }
      
      response.json(readers);

    } catch (error) {
      console.trace(error);
      response.status(500).json(error.toString());
    }
  },

  
};

module.exports = readerController;


