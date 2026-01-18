import { payload } from "../config/payload";

export const CreateFn = async ({collection, data, ...props}: Parameters<typeof payload.create>["0"]) => {
  try {
    return await payload.create({
      collection, data
    })
  } catch (error: any) {
    throw new Error(error)
  }
};


// const test = CreateFn({collection: "results", data: {}})