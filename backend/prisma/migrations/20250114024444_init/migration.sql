-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "shiftDayOfWeekId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftDayOfWeek" (
    "id" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "dayOfWeekId" INTEGER NOT NULL,

    CONSTRAINT "ShiftDayOfWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOfWeek" (
    "id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,

    CONSTRAINT "DayOfWeek_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftDayOfWeek" ADD CONSTRAINT "ShiftDayOfWeek_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftDayOfWeek" ADD CONSTRAINT "ShiftDayOfWeek_dayOfWeekId_fkey" FOREIGN KEY ("dayOfWeekId") REFERENCES "DayOfWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
