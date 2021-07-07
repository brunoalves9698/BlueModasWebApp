export class CryptographyUtil {

  public static encrypt(value: any): string {
    if (!value)
      return null;

    const data = JSON.stringify(value);

    return btoa(data);
  }

  public static decrypt(value: string): any {
    if (!value)
      return null;

    const data = atob(value);

    return JSON.parse(data);
  }

}