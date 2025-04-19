import express from 'express';
import { PrismaClient } from '@prisma/client';
import { wktToGeoJSON } from '@terraformer/wkt';

const prisma = new PrismaClient();

export const getTenant = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: 'Tenant not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('error', error);
      res.status(500).json({ message: error.message });
    }
  }
};

export const createTenant = async (req: express.Request, res: express.Response): Promise<void> => {
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
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateTenant = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const { name, email, phoneNumber } = req.body;

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
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getCurrentResidence = async (req: express.Request, res: express.Response) => {
  try {
    const { cognitoId } = req.params;

    const properites = await prisma.property.findMany({
      where: { tenants: { some: { cognitoId } } },
      include: {
        location: true,
      },
    });

    const residenceWithFormattiedLocation = await Promise.all(
      properites.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || '');
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      }),
    );

    res.json(residenceWithFormattiedLocation);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};


export const addFavoriteProperty = async (req: express.Request, res: express.Response) => {
  try {
    const { cognitoId, propertyId } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];

    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prisma.tenant.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });
      res.json(updatedTenant);
    } else {
      res.status(409).json({ message: 'Property already added as foverites' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};




export const removeFavoriteProperty = async (req: express.Request, res: express.Response) => {
  try {
    const { cognitoId, propertyId } = req.params;

    const propertyIdNumber = Number(propertyId);

    const updatedTenant = await prisma.tenant.update({
      where: {cognitoId},
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: {favorites: true}
    });

   res.json(updatedTenant);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};
