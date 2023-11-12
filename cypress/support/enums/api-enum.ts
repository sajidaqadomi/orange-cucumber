export enum EAPIMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE"
}

export type IHttpMethod =
  | EAPIMethods.GET
  | EAPIMethods.POST
  | EAPIMethods.PUT
  | EAPIMethods.DELETE;
