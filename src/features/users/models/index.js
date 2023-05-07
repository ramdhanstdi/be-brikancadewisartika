// Prisma
const prisma = require("../../../helpers/prisma");

exports.deleteAllUser = async () => {
  const results = {};
  try {
    const [merchant, user] = await prisma.$transaction([
      prisma.merchant.deleteMany({}),
      prisma.users.deleteMany({ where: { role_id: 0 } }),
    ]);
    results.success = user;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
