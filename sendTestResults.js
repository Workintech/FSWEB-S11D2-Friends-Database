const { execSync } = require('child_process');

console.log('\nTestler çalıştırılıyor...\n');

try {
  execSync('npx vitest run', {
    stdio: 'inherit',
    cwd: __dirname,
  });
} catch (_) {
  // testler fail olsa da devam et
}

const user = require("./user.json");
const results = require("./resultz.json");

(async () => {
  const userId = user.user_id;
  const taskId = 131;

  const { numPassedTests, numTotalTests } = results;
  const score = (numPassedTests / numTotalTests).toFixed(2);

  const payload = { score, taskId, userId };

  if (userId == 1234) {
    console.error(`



!!!! DİKKAT: !!!!
User id'nizi user.json dosyasına ekleyin!
User id'nizi nextgen'de projeye tıkladığınızda görebilirsiniz.




`);
    return;
  }

  try {
    const response = await fetch(
      "https://backend.api.workintech.com.tr/nextgen/taskLog/saveJavaTasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error(`


!!! Houston bir hata aldık :(
!!! Status Code: ${response.status} !!!
Slack #teknik-yardım kanalından destek isteyebilirsin.


`);
    }

    if (response.ok) {
      console.log(`


Bu projedeki güncel score'unuz: %${Math.ceil(score * 100)}

Başarıyla kaydedildi.
Nextgen'i refresh yaparak kontrol edebilirsiniz.



`);
    }
  } catch (error) {
    console.error("\n!!! Sonuçları yollarken hata oluştu: ", error);
  }
})();
