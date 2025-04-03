import serverlessExpress from "@vendia/serverless-express";
import { app } from "./app.js";

export const api = async (event, context) => {
  if (!event.requestContext) {
    event.requestContext = context; 
  }

  return serverlessExpress({ app })(event, context);
};