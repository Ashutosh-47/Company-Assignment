const mongoose = require ( "mongoose")
const { Schema } = mongoose

const WalletSchema = new Schema ( 

    {            
   
userId: { type: ObjectId, required: true, ref: 'User' }, // To store the user id
amount: { type: Number, required: true }, // Amount of the transaction done.
type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, // Type - debit or credit.
status: {
type: String,
required: true,
enums: ['FAILED', 'SUCCESS', 'PROCESSING'],
}, 
runningBalance: { type: Number, required: true }, 
transaction: { type: ObjectId, ref: 'Transaction' }, // Gold transactions reference.
createdAt: { type: Date, required: true }, // Created At date
updatedAt: { type: Date, required: true }, // Updated At date


})


const UserSchema = new Schema ( {            

    firstName: { type: String, required: false },
lastName: { type: String, required: false },
password: { type: String, required: false },
mobileNumber: { type: String, required: true },
country: { type: String, required: true },
email: { type: String, required: true },
runningBalance: {
wallet: { type: Number, required: true }, // CURRENT FUNDS STORED
gold: { type: Number, required: true }, // CURRENT GOLD QTY IN GMS
goldPrice: { type: Number, required: true }, // CURRENT GOLD PRICE
}

})


const GoldSchema = new Schema ( {       
    userId: { type: ObjectId, required: true, ref: 'User' }, // To store the user id
    entity: { type: ObjectId, required: false, ref: 'entity' },
    quantity: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, // Type - debit or credit.
    status: {
    type: String,
    required: true,
    enums: ['FAILED', 'SUCCESS', 'WAITING' , "CANCELED" , "PENDING"],
    }, 
    runningBalance: { type: Number, required: true }, 
    createdAt: { type: Date, required: true }, // Created At date
    updatedAt: { type: Date, required: true }, // Updated At date
       
})


const User = mongoose.model ( "User" , UserSchema )  

const Wallet = mongoose.model ( "Wallet" , WalletSchema )  

const Gold = mongoose.model ( "Gold" , GoldSchema )  


module.exports = { User , Wallet , Gold }