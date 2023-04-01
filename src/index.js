const express = require("express")
const app = express();
const port = 8000;

const { User , Wallet , Gold } = require ("./Mongo/Schema")   // Assuming data already store in MongoDB ; here created Schema only for understanding

app.use ( express.json() )   

app.get ( "/user" , async ( req , res ) => {

    const firstName = req.body.firstName ;                               // ID we get after LogIn

    const user   =  await User.find ( { firstName } )                  // Finding User from MongoDb from User Schema

    const wallet =  await Wallet.find ( { user } )                        // Finding/Getting user from Wallet Data

    const gold   =  await Gold.find ( { user } )                       // Finding/Getting user from Gold Data


    let currentFund = user.runningBalance.wallet ;
    
    let netFundAdd = wallet.amount ;                   // Assuming that on updation it store the updated Fund and fetch that ; in updatation it add/sub according to it

    let goldFund = gold.amount ;

    let netGrowthOrLoss =  goldFund - netFundAdd ;          // I was confused so I am Assumin If GoldFund > net fund then Profit otherwise Loss 

    let sign = ""


   // netGrowthOrLoss > 0 ? sign = "+" : sign = "-" ;      // It will itself show -ve or +ve sign otherwise we can also use ternary operator


    let percentage = (  ( netGrowthOrLoss ) / ( goldFund ) ) * 100 ;               // Assuming I am calculating correctly 

    res.status ( 200 ).json ( {
       
        netFundAdded: netFundAdd ,
        currentFund: currentFund ,
        netGrowthOrLoss: netGrowthOrLoss ,                     //If sign +/- not showing then use `${sign}${netGrowthOrLoss}`
        gainOrLossPercentage: `${percentage}%`           // For % sign otherwise use direct percentage variable
    
    } )

} )

app.listen ( port , () => console.log ( "App is working" ) )