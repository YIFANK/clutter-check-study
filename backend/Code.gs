// Google Apps Script backend: appends every submission to the first sheet of the bound spreadsheet.
// One row per save; a participant is saved several times, so keep the last row per sid when analysing.
var SHEET_ID = ''; // spreadsheet id for a standalone script; leave empty when the script is bound to the sheet
var CHUNK = 40000; // a cell holds at most 50,000 characters

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var raw = e.postData.contents;
    if (raw.length > 400000) throw new Error('too large');
    var d = JSON.parse(raw);
    var sheet = (SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet()).getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(['received', 'sid', 'group', 'complete', 'nTrials', 'json…']);
    var row = [new Date(), String(d.sid || ''), d.group, !!d.complete, (d.trials || []).length];
    for (var i = 0; i < raw.length; i += CHUNK) row.push(raw.substring(i, i + CHUNK));
    sheet.appendRow(row);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out({ ok: true, service: 'clutter-check' }); }

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
