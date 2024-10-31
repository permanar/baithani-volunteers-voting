import { seedUsers, seedRoles, seedUserRoles } from "./seeders";

async function main() {
  await seedUsers();
  await seedRoles();
  await seedUserRoles();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
