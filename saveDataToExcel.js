const xlsx = require('xlsx');

function saveDataToExcel(data) {
    const workSheet = xlsx.utils.json_to_sheet(data);
    const workBook = xlsx.utils.book_new();
  
    xlsx.utils.book_append_sheet(workBook, workSheet, 'All Course Data');
  
    xlsx.writeFile(workBook, 'all_course_data.xlsx');  
  }

  module.exports = { saveDataToExcel };
