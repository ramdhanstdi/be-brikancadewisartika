// Prisma
const prisma = require("../../../helpers/prisma");

exports.createModel = async (data) => {
  const results = {};
  try {
    const data = await prisma.merchant.create({
      data,
    });
    results.success = data;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
