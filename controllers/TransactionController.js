const {TravelPackage, Transaction} = require('../models');

class TransactionController {

    static async createTransaction (req,res,next) {

        try {

            const {packagesId} = req.params;
            const isPackageExist = await TravelPackage.findByPk(+packagesId);
            console.log("maskfjaksdfhakljsdfhajkdsfhaljksdfhkajdhsfkjashdfkjahdfjkahdfjhasdfhasdkfhadskfhakdjsfhalksdf")
            if (!isPackageExist) return next({ name: 'NotFound', message: 'Package not found' });
            if (!isPackageExist.available_slots) return next({name : 'BadRequest', message : 'Stocks book is empty'});
            const isPackageBought = await Transaction.findOne({where : {
                TravelPackageId : isPackageExist.id
            }});
            console.log(isPackageBought)
            if (isPackageBought) return next({name : 'BadRequest', message : 'You already buy this package please choose another Travel Package'});
            const numberOrder = await Transaction.count();
            await isPackageExist.decrement('available_slots');
            console.log(isPackageExist.id, req.user.id, numberOrder + 1);
            const newOrder = await Transaction.create({TravelPackageId : isPackageExist.id, UserId : req.user.id, OrderId : numberOrder + 1 });
            res.status(201).json(newOrder);

        } catch (error) {

            console.log(error)
            
            next(error)

        }

    }

}


module.exports = { TransactionController }