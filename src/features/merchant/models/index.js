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
        url_image: process.env.RUNNING_APP + image,
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

exports.editModel = async (data, image) => {
  const results = {};
  try {
    const merchant = await prisma.merchant.update({
      where: { id: data.id },
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
        url_image: process.env.RUNNING_APP + image,
        visit_date: new Date(parseInt(data.visit_date)),
      },
    });
    results.success = merchant;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};

exports.readModel = async () => {
  const results = {};
  try {
    const merchant = await prisma.merchant.findMany({
      include: {
        profile: {
          select: { profile: { select: { fullname: true, image_url: true } } },
        },
      },
    });
    results.success = merchant;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};

exports.listModel = async (data) => {
  const results = {};
  try {
    const page = data.page ? data.page : 0;
    const totalData = await prisma.merchant.count({
      where: {
        visit_date: {
          gte: new Date(new Date(data.fromDate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(data.toDate).setHours(23, 59, 59, 0)),
        },
      },
    });
    const merchant = await prisma.merchant.findMany({
      skip: parseInt(page) * 10,
      take: 10,
      where: {
        visit_date: {
          gte: new Date(new Date(data.fromDate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(data.toDate).setHours(23, 59, 59, 0)),
        },
      },
      include: {
        profile: { select: { profile: { select: { fullname: true } } } },
      },
      orderBy: { created_at: "desc" },
    });
    results.success = merchant;
    results.totalData = totalData;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};

exports.listByIdModel = async (data, user) => {
  const results = {};
  try {
    const page = data.page ? data.page : 0;
    const totalData = await prisma.merchant.count({
      where: {
        profile_id: user.id,
        visit_date: {
          gte: new Date(new Date(data.fromDate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(data.toDate).setHours(23, 59, 59, 0)),
        },
      },
    });
    const merchant = await prisma.merchant.findMany({
      skip: parseInt(page) * 10,
      take: 10,
      where: {
        profile_id: user.id,
        visit_date: {
          gte: new Date(new Date(data.fromDate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(data.toDate).setHours(23, 59, 59, 0)),
        },
      },
      include: {
        profile: { select: { profile: { select: { fullname: true } } } },
      },
      orderBy: { created_at: "desc" },
    });
    results.success = merchant;
    results.totalData = totalData;
    return results;
  } catch (error) {
    console.log(error);
    results.error = error;
    return results;
  }
};
