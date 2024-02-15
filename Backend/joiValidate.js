const joi = require('joi')

const validator = (schema) => (payload) => {
   return schema.validate(payload,{abortEarly:false})
}

const userSchema = joi.object({
    username:joi.string().required(),
    password:joi.string().min(5).max(16).required()
})


exports.validateData = validator(userSchema)