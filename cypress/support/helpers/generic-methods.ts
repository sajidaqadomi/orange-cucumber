import moment from "moment";
import { EDateOption } from "../enums/date-enum";

export class GenericMethods {
  /**
   * Generate a random integer within a specified range.
   *
   * @param {number} min - The minimum value of the range .
   * @param {number} max - The maximum value of the range .
   * @returns {number} A random integer within the specified range.
   */
  static randomNumberFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Generate a random string by appending a random number to a given word.
   *
   * @param {string} word - The word to which the random number will be appended.
   * @returns {string} A random string combining the word and a random number.
   */
  static randomString = (word: string): string => {
    return `${word}${GenericMethods.randomNumberFromInterval(1, 200)}`;
  };

  /**
   * Get a formatted date string based on the specified date option and number of days.
   *
   * @param {EDateOption} dateOption - The date option (e.g., EDateOption.NOW, EDateOption.FUTURE).
   * @param {number} days - The number of days to add or subtract (default: 0).
   * @returns {string} A formatted date string in "YYYY-MM-DD" format.
   */
  static getDateInFormat = (
    dateOption: EDateOption,
    days: number = 0
  ): string => {
    let dateToReturn: moment.Moment = moment();

    if (dateOption === EDateOption.NOW) {
      dateToReturn = moment();
    } else if (dateOption === EDateOption.FUTURE) {
      dateToReturn = moment().add(days, "days");
    } else if (dateOption === EDateOption.DAYS_IN_FUTURE) {
      dateToReturn = moment().add(days, "days");
    } else if (dateOption === EDateOption.DAYS_IN_PAST) {
      dateToReturn = moment().subtract(days, "days");
    } else if (dateOption === EDateOption.PAST) {
      dateToReturn = moment().subtract(days, "days");
    }

    return dateToReturn.format("YYYY-MM-DD");
  };
}
