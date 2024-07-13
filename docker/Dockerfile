FROM node:20-bookworm

# Set this build argument to change the playwright version
ARG PLAYWRIGHT_VERSION=1.45

# Install gosu for dropping privileges
ARG GOSU_VERSION=1.17
RUN dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')" \
  && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch" \
  && chmod +x /usr/local/bin/gosu \
  && gosu nobody true 

# Create user playwright - privileges will be dropped by entrypoint.sh
RUN userdel -rf node \
  && groupadd --gid=1001 playwright \
  && useradd --system --uid=1001 --gid=1001 --create-home --home-dir=/home/playwright playwright

# Install playwright and all its dependencies (browsers etc...)
USER playwright
WORKDIR /home/playwright
RUN  npm install @playwright/test \
  && npx -y playwright@${PLAYWRIGHT_VERSION} install

USER root
RUN npx playwright install-deps

# Copy entrypoint script
COPY --chmod=0755 entrypoint.sh /entrypoint.sh

# /app is the home folder of playwright tests root
RUN mkdir -p /app
WORKDIR /app


ENTRYPOINT [ "/entrypoint.sh" ]
