import { IHttpMethod } from "../../enums/api-enum";

export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      APIRequest: typeof APIRequest;
    }
  }
}

const APIRequest = <IReq, IRes>(
  method: IHttpMethod,
  url: string,
  data: IReq | {}
): Cypress.Chainable<IRes> => {
  return cy
    .api({
      method,
      url,
      body: data as any,
      failOnStatusCode: false,
    })
    .its("body");
};

Cypress.Commands.add("APIRequest", APIRequest);
