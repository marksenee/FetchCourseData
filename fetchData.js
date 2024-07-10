const env = require("dotenv"); // API_KEY가 저장된 환경변수 설정 파일
const axios = require('axios');
const { saveDataToExcel } = require("./saveDataToExcel");

env.config();

let allData = [];

const apiKey = process.env.API_KEY;
const baseUrl  = process.env.BASE_URL;
const srchTraStDt = 20220101
const srchTraEndDt = 20231231


async function fetchData(pageNum) {
  const apiUrl = `${baseUrl}?returnType=JSON&authKey=${apiKey}&pageNum=${pageNum}&pageSize=100&srchTraStDt=${srchTraStDt}&srchTraEndDt=${srchTraEndDt}&outType=1&sort=ASC&sortCol=TOT_FXNUM&crseTracseSe=C0104&srchTraArea1=00`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    var json = JSON.parse(data.returnJSON);

    // json.srchList 내 데이터가 없을 경우 
    if (!json.srchList || json.srchList.length === 0) {
      return false;
    }

    // json.srchList 내 값이 있을 경우 아래와 같이 진행 
    const dataToObject = json.srchList.map(item => ({
      titles: item.title,
      regCourseMen: item.regCourseMan,
      subTitles: item.subTitle,
      yardMen: item.yardMan,
      realMen: item.realMan,
      trprIds: item.trprId,
      instCds: item.instCd,
      traStartDates: item.traStartDate,
      traEndDates: item.traEndDate
    }));

    allData.push(...dataToObject);
    saveDataToExcel(allData)

    return true;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}



module.exports = { fetchData };
