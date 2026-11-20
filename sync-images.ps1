$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "  DANG TU DONG QUET ANH TRONG THU MUC IMAGES..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Magenta

$targetDir = Join-Path $PSScriptRoot "images"
if (-not (Test-Path $targetDir)) {
    Write-Host "Khong tim thay thu muc images!" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $targetDir -File | Where-Object {
    $_.Extension -match '^\.(jpg|jpeg|png|webp|gif|svg)$'
}

if (-not $files -or $files.Count -eq 0) {
    Write-Host "Khong tim thay file anh nao trong thu muc images/!" -ForegroundColor Yellow
    exit 0
}

$captions = @(
    "Nụ cười rạng rỡ của Bố Mẹ 🌸",
    "Bình yên bên mái ấm gia đình 🏡",
    "Khoảnh khắc ấm áp và yêu thương 💖",
    "Dìu dắt con từng bước trưởng thành 🕊️",
    "Yêu thương đong đầy năm tháng ❤️",
    "Gia đình là điểm tựa bình yên nhất 🌷",
    "Bố Mẹ luôn là tấm gương sáng ✨",
    "Hạnh phúc giản đơn bên gia đình 🍀"
)

$items = for ($i = 0; $i -lt $files.Count; $i++) {
    $f = $files[$i]
    $cap = if ($i -lt $captions.Count) { $captions[$i] } else { "Kỷ niệm yêu thương $($i + 1) 🌸" }
    "  {`n    src: ""images/$($f.Name)"",`n    caption: ""$cap""`n  }"
}

$jsContent = "// Danh sách ảnh tự động nạp từ thư mục images/`nwindow.GALLERY_IMAGES = [`n" + ($items -join ",`n") + "`n];`n"

$outPath = Join-Path $PSScriptRoot "js\images-data.js"
[System.IO.File]::WriteAllText($outPath, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "Da cap nhat thanh cong $($files.Count) buc anh vao js/images-data.js!" -ForegroundColor Green
Write-Host "Bao gom cac file:" -ForegroundColor White
$files | ForEach-Object { Write-Host " - $($_.Name)" -ForegroundColor Gray }

Write-Host "`nHOAN TAT! Hay mo lai file index.html de ngam anh nhe!" -ForegroundColor Yellow
