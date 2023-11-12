/**
 * Utility class for searching and flilter grid tables in Cypress tests.
 */
import TablePagination from "./grid-table-pagination";

let headerCellArray: string[];

export default class GridTableHelper {
  static elements = {
    tableHeaderCell: () =>
      cy.get(".oxd-table .oxd-table-header .oxd-table-header-cell"),

    tableBodyRows: () => cy.get(".oxd-table .oxd-table-body .oxd-table-row"),

    tableBodyCard: () => cy.get(".oxd-table .oxd-table-body .oxd-table-card"),
  };

  /**
   * Extract table headers based on the provided mapping.
   *
   * @param {object} tableHeader - The header mapping object.
   * @returns {Promise<string[]>} An array of formatted header texts.
   */
  static async extractTableHeaders(tableHeader: {
    [key: string]: string;
  }): Promise<string[]> {
    const headerCells: string[] = [];

    // Extract header text into an array
    return new Cypress.Promise((resolve) => {
      GridTableHelper.elements
        .tableHeaderCell()
        .each(($th) => {
          const headerCellText = $th.clone().children().remove().end().text();
          const tableHeaderFormateText = tableHeader[headerCellText];
          headerCells.push(tableHeaderFormateText);
        })
        .then(() => {
          resolve(headerCells);
        });
    });
  }

  /**
   * Convert table data into row data.
   *
   * @param {object} tableHeader - The header mapping object.
   * @returns {Promise<Record<string, string>[]>} An array of row data objects.
   */
  static async convertTableToRowData(tableHeader: {
    [key: string]: string;
  }): Promise<Record<string, string>[]> {
    const rowsData: Record<string, string>[] = [];

    headerCellArray = await GridTableHelper.extractTableHeaders(tableHeader);

    return new Cypress.Promise((resolve) => {
      GridTableHelper.elements
        .tableBodyRows()
        .each(async ($row) => {
          const rowObject: any = {};

          cy.wrap($row).find(".oxd-table-cell").as("rowCells");

          cy.get("@rowCells")
            .each(($cell, cellIndex) => {
              const cellText = $cell.text();
              const cellKey = headerCellArray[cellIndex];
              rowObject[cellKey] = cellText;
            })
            .then(() => {
              rowsData.push(rowObject);
            });
        })
        .then(() => {
          resolve(rowsData);
        });
    });
  }

  /**
   * Filter the table by index and verify values based on filter data.
   *
   * @param {number} index - Index of the row to filter.
   * @param {object} filterData - Filter data to match against.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Chainable containing the filtered row.
   */
  static filterTableByIndex(
    index: number,
    filterData: { [key: string]: string }
  ) {
    //Table.elements.tableBodyCard(tableSelector).eq(index).should("exist");
    return new Cypress.Promise((resolve) => {
      GridTableHelper.elements
        .tableBodyCard()
        .eq(index)
        .should("have.length", 1)
        .then((row) => {
          cy.wrap(row).find(".oxd-table-cell").as("rowCells");

          cy.get("@rowCells").each(($cell, index) => {
            let cellKey = headerCellArray[index];
            let isFilteredCell = Object.keys(filterData).includes(cellKey);
            if (isFilteredCell) {
              let cellText = $cell.text().trim();
              let expectedValue = filterData[cellKey.trim()];

              expect(cellText, `Found the row with ${cellText}`).to.equal(
                expectedValue
              );
            }
          });
          resolve(row);
        });
    }) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
  }

  /**
   * Find the index of the row matching filter data.
   *
   * @param {object} filterData - Filter data to match against.
   * @param {object} tableHeader - The header mapping object.
   * @returns {Promise<number>} Index of the matching row or -1 if not found.
   */
  static async findIndexRow<T>(
    filterData: { [key: string]: string },
    tableHeader: { [key: string]: string }
  ) {
    const rowData: Record<string, string>[] =
      await GridTableHelper.convertTableToRowData(tableHeader);

    return new Cypress.Promise((resolve) => {
      const rowIndex = rowData.findIndex((row) => {
        const filterDataKeys = Object.keys(filterData);
        return filterDataKeys.every((cellKey: string) => {
          return filterData[cellKey].trim() === row[cellKey].trim();
        });
      });
      resolve(rowIndex);
    }) as unknown as number;
  }

  /**
   * Search the table for a specific row based on filter data.
   *
   * @param {object} filterData - Filter data to match against.
   * @param {object} tableHeader - The header mapping object.
   * @param {number} pageIndex - The current page index (default is 0).
   * @returns A promise that resolves when the search is complete.
   */
  static searchTable<T>(
    filterData: { [key: string]: string },
    tableHeader: { [key: string]: string },
    pageIndex: number = 0
  ) {
    return new Cypress.Promise(async (resolve) => {
      if (!filterData || Object.keys(filterData).length === 0) {
        cy.log("***No filter data provided. Rows not found.***");
        resolve(this.filterTableByIndex(Number.MIN_VALUE, filterData));
      }

      const rowIndex: number = await this.findIndexRow(filterData, tableHeader);

      if (rowIndex !== -1) {
        resolve(this.filterTableByIndex(rowIndex, filterData));
      } else {
        const paginationSize = await TablePagination.size();

        if (paginationSize === 0 || pageIndex === paginationSize - 1) {
          cy.log("***No matching rows found on current table.***");
          resolve(this.filterTableByIndex(Number.MIN_VALUE, filterData));
        }

        if (paginationSize > 1) {
          TablePagination.clickNextPage(pageIndex + 1).then(() => {
            return this.searchTable(
              filterData,
              tableHeader,
              pageIndex + 1
            ).then(resolve);
          });
        }
      }
    });
  }
}
