#build image
FROM node:20-alpine as build

#initializing app directory
WORKDIR /app
RUN chown -R node /app
COPY --chown=node ["./package.json","./yarn.lock", "./"]
USER node
ENV NODE_ENV production
RUN yarn install  --production=false

#creating project build
COPY --chown=node ["./tsconfig*.json", "./next.config.mjs", "./tailwind.config.ts", ".sequelizerc"  ,"./postcss.config.js" , "./"]
COPY --chown=node ["./public", "./public"]
COPY --chown=node ["./src", "./src"]

# ARG COGNITO_CLIENT_ID
# ARG COGNITO_POOL_ID
# ARG AWS_REGION

# ENV NEXT_PUBLIC_AWS_REGION $AWS_REGION
# ENV NEXT_PUBLIC_COGNITO_USER_POOL_ID $COGNITO_CLIENT_ID
# ENV NEXT_PUBLIC_COGNITO_CLIENT_ID $COGNITO_POOL_ID

RUN yarn run build \
    && yarn install \
    && rm -r .next/cache

#creating actual image of the created build
FROM node:20-alpine
WORKDIR /app
RUN chown -R node /app
COPY --chown=node --from=build [ "/app/package.json","/app/yarn.lock", "/app/.sequelizerc", "./"]
COPY --chown=node --from=build ["/app/.next", "./.next"]
COPY --chown=node --from=build ["/app/public", "./public"]
COPY --chown=node --from=build ["/app/node_modules","/app/node_modules"]
USER node
ENV NODE_ENV production
ENV PROJECT_ROOT /app
EXPOSE 3000
CMD yarn run start