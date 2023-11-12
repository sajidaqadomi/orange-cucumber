import { IAddJobTitleReq } from "../../api-interfaces/payloads/admin/job";
import { ISharedDeleteReq } from "../../api-interfaces/payloads/shared-payloads";
import { IAddJobTitleRes } from "../../api-interfaces/responses/admin/job";
import { ISharedDeleteRes } from "../../api-interfaces/responses/shared-reponse";
import { EAPIMethods } from "../../enums/api-enum";

/**
 * URLs for job-related API endpoints.
 */
const URLs = {
  jobTitle: () => "/api/v2/admin/job-titles",
  jobCategories: () => "api/v2/admin/job-categories",
};

/**
 * Class for interacting with job-related API endpoints.
 */
class Jobs {
  static addJobTitle(data: IAddJobTitleReq) {
    return cy.APIRequest<IAddJobTitleReq, IAddJobTitleRes>(
      EAPIMethods.POST,
      URLs.jobTitle(),
      data
    );
  }

  static deleteJobTitle(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLs.jobTitle(),
      data
    );
  }
}

export default Jobs;
