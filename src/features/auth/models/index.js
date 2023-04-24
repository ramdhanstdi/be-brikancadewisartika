const prisma = require("../../../helpers/prisma");

exports.registerModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.users.create({
      data: {
        email: data.email,
        password: data.password,
        role_id: "ca7074e2-6094-4669-859e-59dd57ab0338",
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
    console.log(error);
    results.error = error;
    return results;
  }
};
