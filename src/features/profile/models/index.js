// Prisma
const prisma = require("../../../helpers/prisma");

exports.getDetailModel = async (data) => {
  const results = {};
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        user_id: data.id,
      },
      select: {
        fullname: true,
        users: { select: { role_id: true } },
      },
    });
    results.success = profile;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
