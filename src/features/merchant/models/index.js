// Prisma
const prisma = require("../../../helpers/prisma");

exports.createModel = async (data, user, image) => {
  const results = {};
  try {
    const merchant = await prisma.merchant.create({
      data: {
        grup_area: data.grup_area,
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
    results.error = error;
    return results;
  }
};

exports.readModel = async (data) => {
  const results = {};
  try {
    const merchant = await prisma.merchant.findMany({
      where: {
        created_at: {
          gte: new Date(new Date(data.date).setHours(0, 0, 0, 0)),
          lte: new Date(data.date),
        },
      },
      include: {
        profile: { select: { profile: { select: { fullname: true } } } },
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

exports.listModel = async (data) => {
  const results = {};
  try {
    const page = data.page ? data.page : 0;
    const merchant = await prisma.merchant.findMany({
      skip: parseInt(page) * 10,
      take: 10,
      where: {
        created_at: {
          gte: new Date(data.fromDate),
          lte: new Date(data.toDate),
        },
      },
      include: {
        profile: { select: { profile: { select: { fullname: true } } } },
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
