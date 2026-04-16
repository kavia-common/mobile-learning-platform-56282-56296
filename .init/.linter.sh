#!/bin/bash
cd /home/kavia/workspace/code-generation/mobile-learning-platform-56282-56296/linguaspeak_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

