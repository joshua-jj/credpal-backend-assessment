export class HelperUtil {
  public static parseApiResponse = (
    statusCode: number,
    message: string,
    data: Record<string, any> = null,
  ) => {
    return { statusCode, message, data };
  };
}
