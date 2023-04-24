const prisma = require("../../../helpers/prisma");

exports.createRoleModel = async (data) => {
  const results = {};
  try {
    const role = await prisma.roles.create({
      data,
    });
    results.success = role;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
