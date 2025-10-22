/**
 * Google Apps Script for syncing Google Sheets data to GitHub Gist
 */

// Configuration - Set these in Script Properties
function getConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const gistUrl = scriptProperties.getProperty('GIST_URL');
  
  let gistId = null;
  if (gistUrl) {
    const match = gistUrl.match(/gist\.github\.com\/(?:[^\/]+\/)?([a-f0-9]+)/i);
    if (match) {
      gistId = match[1];
    }
  }
  
  return {
    GIST_TOKEN: scriptProperties.getProperty('GIST_TOKEN'),
    GIST_ID: gistId,
    GIST_URL: gistUrl,
  };
}

const SHEET_NAMES = {
  company: 'companies.json',
  JobFinal: 'jobs.json',
};

/**
 * Convert a sheet to JSON array
 */
function sheetToJson(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    Logger.log(`Sheet "${sheetName}" not found`);
    return null;
  }
  
  const data = sheet.getDataRange().getValues();
  
  if (data.length === 0) {
    return [];
  }
  
  const headers = data[0];
  const rows = data.slice(1);
  
  const json = rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      const value = row[i];
      
      // Handle empty cells
      if (value === '' || value === null || value === undefined) {
        obj[header] = '';
        return;
      }
      
      // Try to parse JSON strings/arrays/objects
      if (typeof value === 'string') {
        const trimmed = value.trim();
        
        // Skip Google Sheets error values
        if (trimmed.startsWith('#') && (
          trimmed === '#N/A' || 
          trimmed === '#REF!' || 
          trimmed === '#VALUE!' || 
          trimmed === '#DIV/0!' || 
          trimmed === '#NAME?' || 
          trimmed === '#NUM!' || 
          trimmed === '#NULL!'
        )) {
          obj[header] = '';
          return;
        }
        
        // More aggressive JSON detection - check for JSON patterns
        const looksLikeJson = 
          trimmed.startsWith('{') || 
          trimmed.startsWith('[') || 
          /["']\{.*\}["']/.test(trimmed) || // Quoted JSON
          /\{[^}]*:\s*(TRUE|FALSE|true|false)/i.test(trimmed); // Contains key:TRUE/FALSE pattern
        
        if (looksLikeJson) {
          try {
            // Handle different JSON formats:
            let jsonString = trimmed;
            
            // Remove wrapping quotes if present (both single and double)
            while ((jsonString.startsWith('"') && jsonString.endsWith('"')) ||
                   (jsonString.startsWith("'") && jsonString.endsWith("'"))) {
              jsonString = jsonString.slice(1, -1);
            }
            
            // Normalize ALL types of quotes (including curly quotes from Google Sheets)
            // Replace curly double quotes with straight quotes
            jsonString = jsonString.replace(/[\u201C\u201D]/g, '"');
            // Replace curly single quotes/apostrophes with straight apostrophe
            jsonString = jsonString.replace(/[\u2018\u2019]/g, "'");
            
            // Handle escaped quotes
            jsonString = jsonString.replace(/\\"/g, '"');
            
            // Replace TRUE/FALSE with proper boolean values (more comprehensive)
            jsonString = jsonString
              .replace(/:\s*TRUE\b/gi, ': true')
              .replace(/:\s*FALSE\b/gi, ': false')
              .replace(/,\s*TRUE\b/gi, ', true')
              .replace(/,\s*FALSE\b/gi, ', false')
              .replace(/\[\s*TRUE\b/gi, '[true')
              .replace(/\[\s*FALSE\b/gi, '[false')
              .replace(/\{\s*TRUE\b/gi, '{true')
              .replace(/\{\s*FALSE\b/gi, '{false');
            
            // Try to parse
            obj[header] = JSON.parse(jsonString);
            Logger.log(`Successfully parsed ${header} for row`);
          } catch (e) {
            // If parsing fails, log and keep as string
            Logger.log(`Failed to parse ${header}: ${e.message} - Value: ${trimmed}`);
            obj[header] = value;
          }
        } else {
          obj[header] = value;
        }
      } else {
        obj[header] = value;
      }
    });
    return obj;
  }).filter(obj => {
    // Filter out completely empty rows
    return Object.values(obj).some(val => val !== '' && val !== null && val !== undefined);
  });
  
  return json;
}

/**
 * Update GitHub Gist with new data
 */
function updateGist(files) {
  const config = getConfig();
  
  if (!config.GIST_TOKEN) {
    throw new Error('Missing GIST_TOKEN in Script Properties');
  }
  
  if (!config.GIST_ID) {
    throw new Error('Missing or invalid GIST_URL in Script Properties. Please provide a valid Gist URL.');
  }
  
  const url = `https://api.github.com/gists/${config.GIST_ID}`;
  
  const payload = {
    files: files
  };
  
  const options = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${config.GIST_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();
  
  if (statusCode !== 200) {
    throw new Error(`Failed to update Gist: ${statusCode} ${response.getContentText()}`);
  }
  
  return response.getContentText();
}

/**
 * Update a single sheet to Gist
 */
function updateSheetToGist(sheetName) {
  const fileName = SHEET_NAMES[sheetName];
  
  if (!fileName) {
    Logger.log(`Sheet "${sheetName}" is not configured for sync`);
    return;
  }
  
  const jsonData = sheetToJson(sheetName);
  
  if (jsonData === null) {
    Logger.log(`Skipping "${sheetName}" - sheet not found`);
    return;
  }
  
  const files = {};
  files[fileName] = {
    content: JSON.stringify(jsonData, null, 2)
  };
  
  updateGist(files);
  Logger.log(`Updated ${fileName} in Gist`);
}

/**
 * Update all sheets to Gist
 */
function updateAllSheets() {
  const files = {};
  
  for (const [sheetName, fileName] of Object.entries(SHEET_NAMES)) {
    const jsonData = sheetToJson(sheetName);
    
    if (jsonData === null) {
      Logger.log(`Skipping "${sheetName}" - sheet not found`);
      continue;
    }
    
    files[fileName] = {
      content: JSON.stringify(jsonData, null, 2)
    };
  }
  
  if (Object.keys(files).length === 0) {
    Logger.log('No sheets found to update');
    return;
  }
  
  updateGist(files);
  Logger.log(`Updated ${Object.keys(files).length} files in Gist: ${Object.keys(files).join(', ')}`);
}

/**
 * Trigger function - runs when sheet is edited
 * This updates only the changed sheet for efficiency
 */
function updateGistOnEdit(e) {
  try {
    // Get the sheet that was edited
    const sheet = e.source.getActiveSheet();
    const sheetName = sheet.getName();
    
    // Check if this sheet should be synced
    if (SHEET_NAMES.hasOwnProperty(sheetName)) {
      updateSheetToGist(sheetName);
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `Updated ${SHEET_NAMES[sheetName]} in Gist`,
        'Sync Complete',
        3
      );
    }
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `Error: ${error.message}`,
      'Sync Failed',
      5
    );
  }
}

/**
 * Manual trigger function - updates all sheets at once
 */
function syncAllSheetsToGist() {
  try {
    updateAllSheets();
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'All sheets synced successfully',
      'Sync Complete',
      3
    );
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `Error: ${error.message}`,
      'Sync Failed',
      5
    );
  }
}
