#!/bin/bash

npm install
#npm run typeorm migration:run #version 2
npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run #version 3
npm run dev
