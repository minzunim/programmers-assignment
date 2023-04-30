const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = 5678;

const getTotalPostCnt = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const userData = JSON.parse(data);
    const userDataPostCnt = userData.map((value) => value.post_count);
    const totalPostCnt = userDataPostCnt.reduce((sum, cur) => sum + cur, 0);
    return totalPostCnt;
  } catch (err) {
    console.error(err);
    return null;
  }
};

app.get("/", async (req, res) => {
  res.json({ message: "server check" });
});

app.get("/sum", async (req, res) => {
  const filePath = "./data/input/user.json";
  const totalPostCnt = await getTotalPostCnt(filePath);
  if (totalPostCnt === null) {
    res.status(500).json({ message: "Internal Server Error" });
  } else {
    res.json({ sum: totalPostCnt });
  }
});

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://0.0.0.0:${port}`);
});
