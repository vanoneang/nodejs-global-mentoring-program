import HttpException from "../expection"

export const checkParams = (result) => {
  if (result.error) {
    throw new HttpException({
      code: 10030,
      message: result.error.details[0].message
    })
  }
}