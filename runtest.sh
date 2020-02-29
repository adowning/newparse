#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
BOLD='\033[1m'
CHECK="${GREEN}\xE2\x9C\x93${NC}"
DEFAULT_MONGODB_URI='mongodb://127.0.0.1:27017/parse'

echo $MASTER_KEY


ts-node test/user.ts

