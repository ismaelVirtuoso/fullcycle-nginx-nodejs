up:
	@npm install --prefix ./node mysql --save && npm install --prefix ./node express --save
	@docker compose down
	@docker compose up -d --build

push:
	@docker compose push