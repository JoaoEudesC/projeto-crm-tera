//Criação do esquema de cadastro de usuários , ou seja , os campos que serão criados

const mongoose = require ("mongoose")
const bcrypt = require("bcrypt")




const userSchema = new mongoose.Schema(
    {
        id:mongoose.Schema.Types.ObjectId,
        nome:{
            type:String,
            required:true
        },

        email:{
            type:String,
            required: true, 
            
        },
        senha:{
            type:String,
            required:true
            
        },

        cep:{
            type:String ,
            required:true
        },

        logradouro:{
            type:String,
            required:true
        },

        bairro:{
            type:String,
            required:true
        },
        localidade:{
            type:String,
            required:true
        },
        uf:{
            type:String,
            required:true
        }

    },
    //O timestamps, serve para que venha com a data de criação no momento de inserção do dado
    {timestamps:true}
)



//Utilização do bcrypt para hashear a senha do usuário no banco de dados(Portando há duas maneiras de se utilizar o bcrypt)
userSchema.pre('save' , async function(next){
    this.senha = await bcrypt.hash(this.senha , 10);
    next();
})


module.exports = mongoose.model("crmLobster" , userSchema)