const mongoose = require ("mongoose")
const bcrypt = require("bcrypt")

const joi = require("joi")


const userSchema = new mongoose.Schema(
    {
        id:mongoose.Schema.Types.ObjectId,
        NomeCompleto:{
            type:String,
            required:true
        },

        Email:{
            type:String,
            required: true, 
            
        },
        Password:{
            type:String,
            required:true
            
        },

        Cep:{
            type:String ,
            required:true
        },

        Logradouro:{
            type:String,
            required:true
        },

        Bairro:{
            type:String,
            required:true
        },
        Localidade:{
            type:String,
            required:true
        },
        UF:{
            type:String,
            required:true
        }

    },
    //o timestamps, serve para que venha com a data de criação no momento de inserção do dado
    {timestamps:true}
)


//Utilização do joi para validação de usuário




//Utilização do bcrypt para hashear a senha do usuário no banco de dados(Portando há duas maneiras de se utilizar o bcrypt)
userSchema.pre('save' , async function(next){
    this.Password = await bcrypt.hash(this.Password , 10);
    next();
})


module.exports = mongoose.model("crmLobster" , userSchema)