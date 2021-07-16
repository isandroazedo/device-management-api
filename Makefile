.PHONY: build-db-image
db-image:
	@docker build -f docker/db/Dockerfile -t github.com/isandroazedo/device-management-db .

.PHONY: build-api-image
api-image:
	@docker build -f docker/api/Dockerfile -t github.com/isandroazedo/device-management-api .

.PHONY: build-api-base-image
api-base-image:
	@docker build -f docker/api/Dockerfile.base -t github.com/isandroazedo/device-management-api-base .

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate