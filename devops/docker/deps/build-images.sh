imageName="movies-demo-2"
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

docker build $DOCKER_BUILD_PARAMS \
    $COMMON_ARGS \
    $COMMON_DOCKER_CACHE_SOURCES \
     --build-arg COGNITO_CLIENT_ID=$COGNITO_CLIENT_ID \
     --build-arg COGNITO_POOL_ID=$COGNITO_POOL_ID \
     --build-arg AWS_REGION=$AWS_REGION \
    $COMMON_DOCKER_CACHE_SOURCES \
    -f devops/docker/deps/Dockerfile \
    -t $imageName \
    .
