// Prisma
const prisma = require("../../../helpers/prisma");

exports.registerModel = async (data, image) => {
  const results = {};
  try {
    const user = await prisma.users.create({
      data: {
        username: data.username,
        password: data.password,
        role_id: data.role_id ? 1 : 0,
        pn: data.pn,
        profile: {
          create: {
            fullname: data.fullname,
            image_url: process.env.RUNNING_APP + image,
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
    console.log(error);
    results.error = error;
    return results;
  }
};

exports.loginModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.users.findFirst({
      where: { username: data.username },
    });
    results.success = user;
    return results;
  } catch (error) {
    results.error = error;
    return results;
  }
};
