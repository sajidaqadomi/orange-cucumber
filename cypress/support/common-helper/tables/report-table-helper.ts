import { IkeyValue } from "../../types/generic-interface";
import { Report_Map_Header } from "./report-table-map-helper";

/**
 * ReportTableHelper class provides methods for verifying and interacting with report tables in Cypress tests.
 */
class ReportTableHelper {
  static elments = {
    upperTableHeaderRow: () => cy.get("[slot='header'] .group-rgRow"),
    lowerTableHeaderRow: () => cy.get("[slot='header'] .actual-rgRow"),
    tablebodyRows: () => cy.get("[slot='data'] .rgRow"),
    reportName: () => cy.get(".orangehrm-main-title"),
    reportPagination: () => cy.get(".oxd-report-table-header--pagination"),
  };

  /**
   * Verify the report name displayed in the report table.
   * @param {string} expectedReportName - The expected report name.
   */
  static verifyReportName(expectedReportName: string) {
    this.elments.reportName().invoke("text").should("eq", expectedReportName);
  }

  /**
   * Verify the quantity of rows in the report.
   * @param {number} expectedRowsQuantity - The expected number of rows.
   */
  static verifyRowsQuantity(expectedRowsQuantity: number) {
    this.elments
      .reportPagination()
      .invoke("text")
      .then((RowsQuantity) => {
        expect(RowsQuantity.trim()).to.equal(
          `(${expectedRowsQuantity}) Records Found`
        );
      });
  }

  /**
   * Verify the report headers including the upper and lower headers.
   * @param {string[]} upperHeader - The expected upper header labels.
   * @param {string[]} lowerHeader - The expected lower header labels.
   * @returns {Cypress.Chainable<string[]>} A Cypress chainable containing the lower header cell labels.
   */
  static verifyReportHeader(upperHeader: string[], lowerHeader: string[]) {
    let lowerHeaderCells: string[] = [];
    for (const upperHeaderCell of upperHeader) {
      this.elments
        .upperTableHeaderRow()
        .contains(".rgHeaderCell", upperHeaderCell)
        .invoke("index")
        .then((index) => {
          expect(upperHeaderCell).to.eq(upperHeaderCell);
          return cy.wrap(index);
        })
        .as("upperHeaderCellIndex");

      cy.get("@upperHeaderCellIndex").then((cellIndex: any) => {
        this.elments
          .lowerTableHeaderRow()
          .find(".rgHeaderCell")
          .eq(cellIndex)
          .invoke("text")
          .then((cellText) => {
            const currentCellText = lowerHeader[cellIndex];
            expect(cellText).to.eq(currentCellText);

            // Set the text of each cell at the corresponding index in the lowerHeaderCells array
            lowerHeaderCells[cellIndex] = currentCellText;
          });
      });
    }

    return cy.wrap(lowerHeaderCells);
  }

  /**
   * Verify the report rows based on the provided lower header cell labels and row data.
   * @param {string[]} lowerHeaderCells - The lower header cell labels.
   * @param {IkeyValue[]} rows - An array of row data.
   */
  static verifyReportRows(lowerHeaderCells: string[], rows: IkeyValue[]) {
    this.elments.tablebodyRows().each((row, index) => {
      for (let i = 0; i < lowerHeaderCells.length; i++) {
        const Header_Cell = lowerHeaderCells[i];

        // Get row cell key from Report_Map_Header object
        const Row_Cell_Key = Report_Map_Header[Header_Cell];
        let expectedValue = rows[index][Row_Cell_Key];

        cy.wrap(row)
          .find(".rgCell")
          .eq(i)
          .contains(expectedValue)
          .invoke("text")
          .should("eq", expectedValue);
      }
    });
  }

  /**
   * Verify the complete report, including report name, headers, and rows.
   * @param {string} reportName - The expected report name.
   * @param {string[]} upperHeader - The expected upper header labels.
   * @param {string[]} lowerHeader - The expected lower header labels.
   * @param {IkeyValue[]} rows - An array of row data.
   */
  static verifyReport(
    reportName: string,
    upperHeader: string[],
    lowerHeader: string[],
    rows: IkeyValue[]
  ) {
    const Expected_Rows_Quantity = rows.length;

    this.verifyReportName(reportName);
    this.verifyRowsQuantity(Expected_Rows_Quantity);
    this.verifyReportHeader(upperHeader, lowerHeader).then(
      (lowerHeaderCells) => {
        this.verifyReportRows(lowerHeaderCells, rows);
      }
    );
  }
}

export default ReportTableHelper;
