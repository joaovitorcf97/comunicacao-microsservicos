import bcrypt from 'bcryptjs';
import prisma from './dataSource';

export async function createInitialData() {
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: 'john@email.com',
      },
    });

    // await prisma.user.create({
    //   data: {
    //     name: 'John 2',
    //     email: 'john2@email.com',
    //     password: await bcrypt.hash('123456', 10),
    //   },
    // });

    if (userExist) {
      return;
    }

    await prisma.user.create({
      data: {
        name: 'John',
        email: 'john@email.com',
        password: await bcrypt.hash('123456', 10),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error');
  }
}
