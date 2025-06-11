import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();
moment.locale("pt-br");

export const urlShortner = async (req, res) => {
  const { originalUrl, expiresIn } = req.body;
  const shortCode = nanoid(10);

  if (!originalUrl) {
    return res.status(400).json({ message: "Invalid URL." });
  }

  let expireAt = null;
  let expiresAtReadable = null;
  if (expiresIn !== undefined) {
    const hours = Number(expiresIn);
    if (isNaN(hours) || hours <= 0) {
      return res
        .status(400)
        .json({ message: "expiresIn must be a positive number (in hours)." });
    }

    const expirationMoment = moment().add(hours, "hours");
    expireAt = expirationMoment.unix();
    expiresAtReadable = expirationMoment.calendar();
  }

  await prisma.ShortUrl.create({
    data: {
      originalUrl,
      shortCode,
      expireAt,
    },
  });
  return res.status(201).json({
    originalUrl,
    shortUrl: `http://localhost:3000/${shortCode}`,
    expireAt: expiresAtReadable,
    message: `Link shortened successfully!`,
  });
};

export const redirectToOriginal = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const entry = await prisma.ShortUrl.findUnique({
      where: { shortCode },
    });

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    if (entry.expireAt && moment().unix() > entry.expireAt) {
      return res.status(410).json({ message: "This link has expired." });
    }

    return res.redirect(entry.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
