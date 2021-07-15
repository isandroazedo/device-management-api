.PHONY: build-db-image
db-image:
	@docker build -f docker/db/Dockerfile -t device-management-db .