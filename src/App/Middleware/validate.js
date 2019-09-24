const schema = require('../../Utils/schemaJoi');

const signUp = async (request, response, next) => {
    const { name, email, password,  phone } = request.body
      try {
          const { error } =  await schema.signUp.validateAsync({name, email, password, phone})
          if(error !== null)
          return next()

      } catch (error) {
            //console.log('error >>>>>' , error)
          return response.status(400).json({error}).send()
      }

}

const signIn = async (request, response, next) => {
    const { email, password} = request.body

    try {
        const { error } =  await schema.singIn.validateAsync({ email, password })

        if(error !== null)
        return next()
    }
    catch(err){
        return response.status(400).json(err).send()
    }

}

module.exports = {
    signUp,
    signIn
}
