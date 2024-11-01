CREATE TABLE `voters` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`voted` bigint unsigned NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `voters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `voters` ADD CONSTRAINT `voters_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `voters` ADD CONSTRAINT `voters_voted_users_id_fk` FOREIGN KEY (`voted`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;