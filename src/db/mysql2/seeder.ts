import { seedUsers, seedRoles, seedUserRoles, seedVolunteerCategories, seedVolunteers } from "./seeders";

async function main() {
  await seedUsers();
  await seedRoles();
  await seedUserRoles();
  await seedVolunteerCategories();
  await seedVolunteers();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
