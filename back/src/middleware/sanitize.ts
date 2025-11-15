import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

const deepClean = (value: any): any => {
  if (typeof value === "string") {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
  }

  if (Array.isArray(value)) {
    return value.map((v) => deepClean(v));
  }

  if (typeof value === "object" && value !== null) {
    Object.keys(value).forEach((key) => {
      value[key] = deepClean(value[key]);
    });
  }

  return value;
};

export const sanitizeHTML = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body) deepClean(req.body);
  if (req.query) deepClean(req.query);
  if (req.params) deepClean(req.params);

  next();
};
