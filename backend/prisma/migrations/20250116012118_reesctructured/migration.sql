/*
  Warnings:

  - You are about to drop the column `shiftDayOfWeekId` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the `DayOfWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShiftDayOfWeek` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employeeName` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeatCicleIn` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeatCount` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftDayOfWeek" DROP CONSTRAINT "ShiftDayOfWeek_dayOfWeekId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftDayOfWeek" DROP CONSTRAINT "ShiftDayOfWeek_shiftId_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "shiftDayOfWeekId",
ADD COLUMN     "ShiftDayOfWeek" TEXT[],
ADD COLUMN     "employeeName" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "repeatCicleIn" TEXT NOT NULL,
ADD COLUMN     "repeatCount" INTEGER NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- DropTable
DROP TABLE "DayOfWeek";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "ShiftDayOfWeek";
