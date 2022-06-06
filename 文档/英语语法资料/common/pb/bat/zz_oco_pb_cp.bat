@echo off
color 0A

:: 声明采用UTF-8编码
chcp 65001

:: 启用变量延迟
setlocal enabledelayedexpansion

echo.
echo "*****************一键解析和压缩pb *****************"

echo.
echo "nodejs 版本:" & node -v
echo.
echo "npm 版本:" & call npm.cmd npm -v
echo.
echo "npm-protobufjs 版本:" & call npm.cmd view protobufjs version
echo.

::echo "npm-protobufjs 详细信息:" & call npm.cmd view protobufjs
::echo.

::protobuf的模块ID(即require头部路径)
set protobufModuleID="protobuf"

::proto文件路径
set protoPath=./../../../../resources/zh_CN/pb

::输出.d.ts路径
set outPath=./../
	
for /r %protoPath% %%f in (*.proto) do (
	set full_path=%%f
    set file_dir=%%~dpf
	set file_name=%%~nf
    set file_ext=%%~xf
    set "file_name_not_path=%%~nxf"
    set "full_path_not_ext=%%~dpnf"
	echo "开始解析 !full_path!"
	
	::set out=!outPath!!file_name:~0,-3!
	set out=!outPath!!file_name!
	call pbjs -t static-module -w commonjs --keep-case --no-beautify --force-number --force-message --dependency !protobufModuleID! -o ./"!out!.js" ./"!full_path!"
	call pbts --no-comments -o ./"!out!.d.ts" ./"!out!.js"
	if %errorlevel% == 0 (echo "完成") else (echo "解析失败" & goto end)
)

echo.
echo "开始压缩..."
for /r %outPath% %%i in (*.js) do (
	echo %%i
	call uglifyjs %%i -o %%i
)
if %errorlevel% == 0 (echo "完成") else (echo "压缩失败")

:end
echo.
pause