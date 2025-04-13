import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getManager = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {
        const { cognitoId } = req.params;

        const manager = await prisma.manager.findUnique({
            where: {cognitoId},
           
        });

        if (manager){
            res.json(manager);
        } else {
            res.status(404).json({ message: 'Manager not found' });

        }

    } catch (error) {
       if(error instanceof Error){
        res.status(500).json({ message: error.message });
       } 
    }
};


export const createManager = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;

        console.log('req body', req.body);

        const Manager = await prisma.manager.create({
           data: {
            cognitoId,
            name,
            email,
            phoneNumber,
           }, 
        });

       res.status(201).json(Manager);

    } catch (error) {
       if(error instanceof Error){
        res.status(500).json({ message: error.message });
       } 
    } 
};


export const updateManager = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {

        const { cognitoId } = req.params;

        const {  name, email, phoneNumber } = req.body;

        const updateManager = await prisma.manager.update({
              where: { cognitoId },
           data: {
            name,
            email,
            phoneNumber,
           }, 
        });

       res.json(updateManager);

    } catch (error) {
       if(error instanceof Error){
        res.status(500).json({ message: error.message });
       } 
    } 
};




