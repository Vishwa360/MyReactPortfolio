import { profile, workExperience } from "./content/profile";

test("profile content includes key portfolio sections", () => {
  expect(profile.shortName).toMatch(/vishwajith/i);
  expect(profile.education.length).toBeGreaterThan(0);
  expect(workExperience.length).toBeGreaterThan(0);
});
