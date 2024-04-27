import prisma from '@/config/db/dataSource';

class UserRepository {
  async findById(id: number) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (err) {
      const error = err instanceof Error;
      console.error(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (err) {
      const error = err instanceof Error;
      console.error(error);
    }
  }
}

export default new UserRepository();
