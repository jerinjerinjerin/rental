import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLeases = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const leases = await prisma.lease.findMany({
        include: {
            tenant: true,
            property: true,
        }
    })

    res.json(leases);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getLeasesPayments = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { id } = req.params;

      const payments = await prisma.payment.findMany({
         where: {leaseId: Number(id)}
    })
  
      res.json(payments);
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };