import { ApiJobsHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * Service responsible for managing job titles, including creating and updating job titles.
 */

export default class JobTitleService {
  /**
   * Creates a new job title with random data.
   * @returns A Promise that resolves with the created job title data.
   */
  static createJobTitle() {
    return cy
      .fixture("job-data")
      .its("addJobTitleData")
      .then((jobTitleData: any) => {
        jobTitleData.title = `${GenericMethods.randomString(
          jobTitleData.title
        )}`;
        //Call The API
        return ApiJobsHelper.addJobTitle(jobTitleData);
      });
  }
}
