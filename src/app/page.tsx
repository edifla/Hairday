"use client";

import { useState } from "react";
import Agendamentos from "@/components/Agendamentos";
import Sidebar from "@/components/Sidebar";
import type { Appointment, AppointmentDetails } from "@/types/appointment";

function getToday() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(getToday);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  function addAppointment(details: AppointmentDetails) {
    const alreadyBooked = appointments.some(
      (appointment) =>
        appointment.date === details.date && appointment.time === details.time,
    );

    if (alreadyBooked) {
      setErrorMessage("Esse horário já está ocupado. Escolha outro horário.");
      return false;
    }

    setAppointments((currentAppointments) => [
      ...currentAppointments,
      { ...details, id: crypto.randomUUID() },
    ]);
    setErrorMessage("");
    return true;
  }

  function deleteAppointment(id: string) {
    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment.id !== id),
    );
  }

  return (
    <main className="appShell">
      <Sidebar
        date={selectedDate}
        errorMessage={errorMessage}
        bookedTimes={appointments
          .filter((appointment) => appointment.date === selectedDate)
          .map((appointment) => appointment.time)}
        onAdd={addAppointment}
        onDateChange={setSelectedDate}
      />
      <section className="appointmentsPanel" aria-label="Agendamentos">
        <Agendamentos
          appointments={appointments.filter(
            (appointment) => appointment.date === selectedDate,
          )}
          date={selectedDate}
          onDelete={deleteAppointment}
          onDateChange={setSelectedDate}
        />
      </section>
    </main>
  );
}
