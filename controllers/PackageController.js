const { TravelPackage } = require('../models');
const { GoogleGenAI } = require('@google/genai');
class PackageController {
    
    static async getPackageById(req, res, next) {
        try {
            const { id } = req.params;
            const isPackageExist = await TravelPackage.findByPk(+id);
            if (!isPackageExist) return next({ name: 'NotFound', message: 'Package not found' });
            if (!isPackageExist.prepartion_docs) {
                const ai = new GoogleGenAI({})
            const prompt = `You are a travel expert AI. Generate preparation recommendations for travelers based on the travel package data provided.
**Travel Package Data**:
\`\`\`json
${JSON.stringify(isPackageExist, null, 2)}
\`\`\`

**Task**: Based on the destination, travel categories, departure date, and planned activities, generate realistic preparation items.

**Required Output Format** - Respond with ONLY this JSON structure:
\`\`\`json
{
  "preparation_docs": ["document1", "document2", "document3"],
  "preparation_clothing": ["clothing1", "clothing2", "clothing3", "clothing4", "clothing5"],
  "preparation_essentials": ["essential1", "essential2", "essential3", "essential4", "essential5"],
  "preparation_electronics": ["electronic1", "electronic2", "electronic3", "electronic4", "electronic5"]
}
\`\`\`

**Requirements**:
- preparation_docs: Travel documents needed (exactly 3 items)
- preparation_clothing: Weather-appropriate clothing (exactly 5 items)
- preparation_essentials: Essential items for activities and climate (exactly 5 items)
- preparation_electronics: Electronics for photography and activities (exactly 5 items)

Respond with ONLY the JSON object. No additional text.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{
                    role : 'user',
                    parts : [{
                        text : prompt
                    }]
                }],
            });

             const splitting = JSON.parse(response.text.split('```')[1].split('json')[1]);
             const preparation_docs = splitting.preparation_docs;
             const preparation_clothing = splitting.preparation_clothing;
             const preparation_essentials = splitting.preparation_essentials;
             const preparation_electronics = splitting.preparation_electronics;
             await isPackageExist.update({preparation_docs, preparation_clothing, preparation_essentials, preparation_electronics});
             await isPackageExist.reload()
            }

            res.status(200).json(isPackageExist);

        } catch (error) {

            next(error)

        }

    }

    static async getPackageList(_req, res, next) {

        try {

            const listPackage = await TravelPackage.findAll();
            res.status(200).json(listPackage);

        } catch (error) {

            next(error)

        }

    }

}

module.exports = PackageController