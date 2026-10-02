$port = 5173
$processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($processes) {
    $processes |
        Select-Object -ExpandProperty OwningProcess |
        Sort-Object -Unique |
        ForEach-Object {
            Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
        }
}

Set-Location "$PSScriptRoot\..\client"
npm run dev -- --host 0.0.0.0
