// Google Sheet за въпросите към Жив Помощник (по желание - логовете на Render се пазят само 7 дни).
// 1) Нов Google Sheet -> Разширения -> Apps Script -> изтрий всичко и постави този код -> Запази
// 2) Внедряване -> Ново внедряване -> тип "Уеб приложение" -> Изпълнява се като: Аз, Достъп: Всеки -> Внедряване -> разреши достъпа
// 3) Копирай адреса на уеб приложението (завършва на /exec)
// 4) Render -> zhiv-pomoshnik -> Environment -> нова променлива LOG_WEBHOOK_URL = адреса -> Save (сървърът се рестартира сам)
// Адресът е таен: който го има, може да добавя редове. Не го слагай в GitHub.

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Време', 'Ред в разговора', 'Въпрос', 'Първи въпрос', 'Препоръчани линкове', 'Отговор']);
  }
  // Текст, който започва с = + - @, иначе Sheets го смята за формула
  const safe = v => (typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v);
  sheet.appendRow([new Date(d.t), d.turn, safe(d.q), safe(d.first), (d.links || []).join(' '), safe(d.a)]);
  return ContentService.createTextOutput('ok');
}
