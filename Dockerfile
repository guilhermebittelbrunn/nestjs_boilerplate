FROM node:22.13 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build_server
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter=server -r install --frozen-lockfile
RUN pnpm --filter server run prisma:generate
RUN pnpm --filter server run -r build
RUN pnpm --filter server deploy --prod /prod/server
RUN cd /prod/server && pnpm prisma:generate

FROM base AS production_server
ENV NODE_ENV=production
COPY --from=build_server /prod/server /prod/server
WORKDIR /prod/server
EXPOSE ${PORT} 80
CMD [ "pnpm", "start:prod" ]