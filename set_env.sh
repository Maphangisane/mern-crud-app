#!/bin/bash
# This script sets the NODE_ENV based on the argument (production or development)

if [ "$1" == "production" ]; then
    export NODE_ENV=production
    echo "NODE_ENV is set to production."
elif [ "$1" == "development" ]; then
    export NODE_ENV=development
    echo "NODE_ENV is set to development."
else
    echo "Usage: source set_env.sh [production|development]"
fi
