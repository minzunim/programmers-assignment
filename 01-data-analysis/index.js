const fs = require("fs");
const path = require("path");

// 폴더 경로, 파일 경로 만들기
const dirPath = "./data/output";
const customerCntPath = path.join(dirPath, "problem_1.json");
const dormantIdPath = path.join(dirPath, "problem_2.json");

// 디렉토리가 존재하지 않을 경우 생성
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// customer.json 파일 읽기
const jsonString = fs.readFileSync("./data/input/customer.json");
const jsonData = JSON.parse(jsonString);

// 전체 고객의 수
const customerCnt = { total: jsonData.length };
const customerCntString = JSON.stringify(customerCnt); // JSON으로 변환

// 휴면 상태 고객 id 리스트를 오름차순으로 정렬
const dormantCustomer = jsonData.filter((value) => value.status === "dormant");
const dormantIdList = dormantCustomer
  .map((value) => value.customer_id)
  .sort((a, b) => a - b);
const dormantIdListString = JSON.stringify(dormantIdList); // JSON으로 변환

fs.writeFileSync(customerCntPath, customerCntString);
fs.writeFileSync(dormantIdPath, dormantIdListString);
