@echo off
color 0A

:: 声明采用UTF-8编码
chcp 65001

set fileName=%1
if "%fileName%" == "" (echo. & echo "非正确的启动..." & goto end)

:: pb后缀
set protoSuffix=

::protobuf的模块ID(即require头部路径)
set protobufModuleID="protobuf"

:: 解析json文件格式
::{
::    "protoSuffix": "_pk",
::    "protobufModuleID": "protobuf"
::}

::set "pathFile=zz_oco_path.json"
::if not exist "%pathFile%" (echo "%pathFile%" 路径配置文件不存在 & goto end)

::echo.
::echo "解析路径配置文件..."
::for /f tokens^=2^,4^ delims^=^{^}^:^,^" %%i in (%pathFile%) do (
::	if %%i == protoSuffix (set "protoSuffix=%%j") else if %%i == protobufModuleID (set "protobufModuleID=%%j")
::)
::if !protoSuffix! == "" (echo "%pathFile%" 路径配置不正确 & goto end) else if !protobufModuleID! == "" (echo "%pathFile%" 路径配置不正确 & goto end)
::echo "成功"
::echo.

::proto文件路径
set protoPath=./../../../../resources/zh_CN/pb/%fileName%%protoSuffix%

::输出.d.ts路径
set outPath=./../%fileName%

echo "开始解析 %protoPath%.proto"
call pbjs -t static-module -w commonjs --keep-case --no-beautify --force-number --force-message --dependency %protobufModuleID% -o ./%outPath%.js ./%protoPath%.proto
call pbts --no-comments -o ./%outPath%.d.ts ./%outPath%.js
if %errorlevel% == 0 (echo "完成") else (echo "解析失败")
echo.

echo "开始压缩 %outPath%.js"
call uglifyjs %outPath%.js -o %outPath%.js
if %errorlevel% == 0 (echo "完成") else (echo "解析失败")

:end
echo.
pause