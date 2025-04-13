import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTenant = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {
        const { cognitoId } = req.params;

        const tenant = await prisma.tenant.findUnique({
            where: {cognitoId},
            include: {
                favorites: true,
            },
        });

        if (tenant){
            res.json(tenant);
        } else {
            res.status(404).json({ message: 'Tenant not found' });
        }

    } catch (error) {
       if(error instanceof Error){
        console.log('error', error)
        res.status(500).json({ message: error.message });
       } 
    }
};


export const createTenant = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;

        const tenant = await prisma.tenant.create({
           data: {
            cognitoId,
            name,
            email,
            phoneNumber,
           }, 
        });

       res.status(201).json(tenant);

    } catch (error) {
       if(error instanceof Error){
        res.status(500).json({ message: error.message });
       } 
    } 
};


export const updateTenant = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {

        const { cognitoId } = req.params;

        const {  name, email, phoneNumber } = req.body;

        const updateTenant = await prisma.tenant.update({
              where: { cognitoId },
           data: {
            name,
            email,
            phoneNumber,
           }, 
        });

       res.json(updateTenant);

    } catch (error) {
       if(error instanceof Error){
        res.status(500).json({ message: error.message });
       } 
    } 
};







