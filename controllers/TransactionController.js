const {TravelPackage, Transaction} = require('../models');

class TransactionController {

    static async createTransaction (req,res,next) {

        try {
            
            const {packagesId} = req.params;
            const isPackageExist = await TravelPackage.findByPk(+packagesId);
            if (!isPackageExist) return next({ name: 'NotFound', message: 'Package not found' });
            if (!isPackageExist.available_slots) return next({name : 'BadRequest', message : 'Stocks book is empty'});
            const numberOrder = await Transaction.count();
            await isPackageExist.decrement('available_slots');
            const newOrder = await Transaction.create({TravelPackageId : isPackageExist.id, UserId : req.user.id, OrderId : numberOrder + 1 });
            res.status(201).json(newOrder);

        } catch (error) {
            
            next(error)

        }

    }

}


module.exports = { TransactionController }