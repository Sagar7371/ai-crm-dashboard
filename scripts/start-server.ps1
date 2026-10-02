$port = 5000
$listeners = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
$processIds = $listeners | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($processId in $processIds) {
    $process = Get-CimInstance Win32_Process -Filter "ProcessId = $processId" -ErrorAction SilentlyContinue
    if ($process -and $process.Name -eq 'node.exe' -and $process.CommandLine -match '(?:crm-ai-dashboard[\\/]server[\\/])?src[\\/]server\.js') {
        Stop-Process -Id $processId -ErrorAction Stop
        Wait-Process -Id $processId -Timeout 5 -ErrorAction SilentlyContinue
    } else {
        $description = if ($process) { "$($process.Name) (PID $processId)" } else { "PID $processId" }
        throw "Port $port is already in use by $description. Stop that process or set PORT to another value, then try again."
    }
}

Set-Location "$PSScriptRoot\..\server"
node src/server.js
