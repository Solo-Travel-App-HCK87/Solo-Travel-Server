const { TravelPackage } = require('../models');

class PackageController {

    static async getPackageById (req,res,next) {

        try {
            
            const {id} = req.params;
            const isPackageExist = await TravelPackage.findByPk(+id);
            if (!isPackageExist) return next({name : 'NotFound', message : 'Package not found'});
            return res.status(200).json({isPackageExist});

        } catch (error) {
            
            next(error)

        }

    }

    static async getPackageList (req,res,next) {

        try {
            
            const listPackage = await TravelPackage.findAll();
            

        } catch (error) {
            
            next(error)
            
        }

    }

}


module.exports = PackageController