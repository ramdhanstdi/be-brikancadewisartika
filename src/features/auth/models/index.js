// Prisma
const prisma = require("../../../helpers/prisma");

exports.registerModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.users.create({
      data: {
        email: data.email,
        password: data.password,
        role_id: 1,
        profile: {
          create: {
            fullname: data.fullname,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    results.success = user;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};

exports.loginModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.users.findFirst({
      where: { email: data.email },
    });
    results.success = user;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
