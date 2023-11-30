import { cleanupVaccination } from "./cleanupVaccination"
import { resetIntake } from "./resetIntake"
import { resetVaccination } from "./resetVaccination"

export const customRules = [ resetIntake, resetVaccination, cleanupVaccination ]