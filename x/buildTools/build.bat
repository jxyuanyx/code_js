<<!
尝试用新的bus
!

/Applications/CocosCreator/Creator/2.3.3/CocosCreator.app/Contents/MacOS/CocosCreator --path ../ --build "platform=android"

echo "***********************构建完成*****************************************"
echo "***********************开始资源加密**************************************"
sh ./encode.sh
echo "***********************资源加密完成**************************************"

echo "***********************生成热更新包**************************************"

updateUrl=https://xfun1.s3-ap-southeast-1.amazonaws.com/update/

testUpdateUrl=https://xfun1.s3-ap-southeast-1.amazonaws.com/update/

<<!
testUpdateUrl=https://wfun.s3-ap-southeast-1.amazonaws.com/update/232/
!

sourceDir=jsb-default
destDir=../assets/
version=2.3.5

node version_generator.js -v $version -u $updateUrl -s $sourceDir -d $destDir -t $testUpdateUrl

cp -f $sourceDir"/main.js" $sourceDir"/tmain.js"

/Applications/CocosCreator/Creator/2.3.3/CocosCreator.app/Contents/MacOS/CocosCreator --path ../ --build "platform=android"

sh ./encode.sh

cp -f $sourceDir"/tmain.js" $sourceDir"/main.js"

rm -f $sourceDir"/tmain.js"

<<!
echo "***********************开始上传s3测试目录**************************************"

/*上传到s3*/
aws s3 sync ./jsb-default/hotUpdatePackages/2.3.4_test/ s3://wfun/update/234/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

/Applications/CocosCreator/Creator/2.3.3/CocosCreator.app/Contents/MacOS/CocosCreator --path ../ --build "autoCompile=true"

echo "***********************生成完成**************************************"
!