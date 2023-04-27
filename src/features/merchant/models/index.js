// Prisma
const prisma = require("../../../helpers/prisma");

exports.createModel = async (data, user, image) => {
  const results = {};
  try {
    const merchant = await prisma.merchant.create({
      data: {
        address: data.address,
        category: data.category,
        conclusion: data.conclusion,
        lat: data.lat,
        lng: data.lng,
        name_merchant: data.name_merchant,
        rating: data.rating,
        realitaion_date: new Date(parseInt(data.realitaion_date)),
        url_image: image,
        visit_date: new Date(parseInt(data.visit_date)),
        profile_id: user.id,
      },
    });
    results.success = merchant;
    return results;
  } catch (error) {
    console.log(error);
    results.error = error;
    return results;
  }
};
