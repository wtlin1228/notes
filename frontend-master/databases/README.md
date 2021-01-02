# Complete Intro to Databases

Course Repo: https://github.com/wtlin1228/complete-intro-to-databases

## MongoDB example

1. `docker run --name test-mongo -dit -p 27017:27017 --rm mongo:4.4.1`
2. `npm run mongo`

## Neo4j

1. `docker run -dit --rm --name=my-neo4j -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none neo4j:4.1.3`
2. `npm run neo4j`

## PostgreSQL

1. `docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d --rm postgres:13.0`
2. `npm run postgresql`

## Redis

1. `docker run -dit --rm --name=my-redis -p 6379:6379 redis:6.0.8`
2. `npm run redis`
