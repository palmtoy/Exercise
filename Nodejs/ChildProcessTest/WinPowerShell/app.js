#!/usr/bin/env node

const { exec } = require('child_process');

// PowerShell script path
const scriptPath = './quickAccess.ps1';

// execute PowerShell script by exec
exec(`powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr output: ${stderr}`);
    return;
  }
  console.log(stdout);
});

