# 打印出所有快速访问的文件&文件夹的绝对路径
$quickAccessFilesAndFolders = New-Object -ComObject shell.application
$quickAccessNamespace = $quickAccessFilesAndFolders.Namespace('shell:::{679f85cb-0220-4080-b29b-5540cc05aab6}')
$quickAccessNamespace.Items() | ForEach-Object {
  $_.Path
}

