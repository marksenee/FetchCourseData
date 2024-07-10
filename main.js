const { fetchData } = require('./fetchData');

async function fetchAllData() {
  let pageNum = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    hasMoreData = await fetchData(pageNum);
    pageNum++;
    console.log(pageNum) // 최종 몇페이지까지 데이터가 있는지 확인 
  }
}


fetchAllData();
