Add-Type -AssemblyName System.Drawing

$width = 4096
$height = 512
$bitmap = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $font = [System.Drawing.Font]::new('Georgia', 336, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $format = [System.Drawing.StringFormat]::GenericTypographic
  $gradient = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Point]::new(0, 0),
    [System.Drawing.Point]::new($width, 0),
    [System.Drawing.Color]::FromArgb(255, 63, 37, 28),
    [System.Drawing.Color]::FromArgb(255, 77, 47, 35)
  )
  $gradient.InterpolationColors = [System.Drawing.Drawing2D.ColorBlend]@{
    Colors = @(
      [System.Drawing.Color]::FromArgb(255, 63, 37, 28),
      [System.Drawing.Color]::FromArgb(255, 113, 68, 45),
      [System.Drawing.Color]::FromArgb(255, 163, 106, 67),
      [System.Drawing.Color]::FromArgb(255, 77, 47, 35)
    )
    Positions = [single[]](0, 0.42, 0.70, 1)
  }

  $x = 120
  foreach ($character in 'KOSHISHEIN'.ToCharArray()) {
    $graphics.DrawString($character, $font, $gradient, $x, 72, $format)
    $x += $graphics.MeasureString($character, $font, [System.Drawing.PointF]::Empty, $format).Width + 48
  }

  $wavePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(209, 120, 72, 47), 18)
  $wavePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $wavePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $wave = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $wave.StartFigure()
  $wave.AddBezier(58, 272, 360, 132, 656, 132, 1148, 272)
  $wave.AddBezier(1148, 272, 1518, 442, 1888, 442, 2248, 272)
  $wave.AddBezier(2248, 272, 2556, 132, 2864, 132, 3244, 272)
  $wave.AddBezier(3244, 272, 3548, 412, 3848, 412, 4038, 272)
  $graphics.DrawPath($wavePen, $wave)

  $outputPath = Join-Path $PSScriptRoot '..\public\images\koshishein-wordmark-hd.png'
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  if ($wavePen) { $wavePen.Dispose() }
  if ($wave) { $wave.Dispose() }
  if ($gradient) { $gradient.Dispose() }
  if ($font) { $font.Dispose() }
  $graphics.Dispose()
  $bitmap.Dispose()
}
