"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AppointmentDetails } from "@/types/appointment";
import "./styles.css";

type SidebarProps = {
    date: string;
    errorMessage: string;
    bookedTimes: string[];
    onAdd: (appointment: AppointmentDetails) => boolean;
    onDateChange: (date: string) => void;
};

function getTimeSlots(startHour: number, endHour: number) {
    return Array.from({ length: endHour - startHour + 1 }, (_, slotIndex) =>
        `${String(startHour + slotIndex).padStart(2, "0")}:00`,
    );
}

const timePeriods = [
    { label: "Manhã", slots: getTimeSlots(9, 12) },
    { label: "Tarde", slots: getTimeSlots(13, 18) },
    { label: "Noite", slots: getTimeSlots(19, 21) },
];

const Sidebar = ({ date, errorMessage, bookedTimes, onAdd, onDateChange }: SidebarProps) => {
    const [clientName, setClientName] = useState("");
    const [time, setTime] = useState("");
    const dateInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTime("");
    }, [date]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedName = clientName.trim();

        if (!trimmedName || !time) return;

        if (onAdd({ clientName: trimmedName, date, time })) {
            setClientName("");
            setTime("");
        }
    }

    return (
        <div className="sidebar">
            <p className="brandMark">
                HairDay
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <path d="m8 7 12 10M8 17l5-5m2-2 5-5" />
                </svg>
            </p>
            <div className="sidebarIntro">
                <h1 className="title">Agende um atendimento</h1>
                <p className="subinfo">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
            </div>

            <form className="appointmentForm" onSubmit={handleSubmit}>
                <div className="formField">
                    <label htmlFor="date" className="fieldLabel">Data</label>
                    <div className="dateInputWrap">
                        <svg className="fieldIcon dateIcon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="3.5" y="5" width="17" height="16" rx="2" />
                            <path d="M7.5 3v4M16.5 3v4M4 9h16" />
                        </svg>
                        <input
                            ref={dateInputRef}
                            type="date"
                            lang="pt-BR"
                            name="date"
                            id="date"
                            className="formInput datapicker"
                            value={date}
                            onChange={(event) => {
                                onDateChange(event.target.value);
                                setTime("");
                            }}
                            required
                        />
                        <svg className="fieldIcon dateChevron" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m7 10 5 5 5-5" />
                        </svg>
                    </div>
                </div>

                <fieldset className="formField timeField">
                    <legend className="fieldLabel">Horários</legend>
                    <div className="timePeriods">
                        {timePeriods.map((period) => (
                            <div className="timePeriod" key={period.label}>
                                <p className="timePeriodLabel">{period.label}</p>
                                <div className="timeSlots" role="group" aria-label={`Horários da ${period.label.toLowerCase()}`}>
                                    {period.slots.map((slot) => {
                                        const isBooked = bookedTimes.includes(slot);

                                        return (
                                            <button
                                                className={`timeSlot${time === slot ? " isSelected" : ""}`}
                                                type="button"
                                                key={slot}
                                                aria-pressed={time === slot}
                                                disabled={isBooked}
                                                onClick={() => setTime(slot)}
                                            >
                                                {slot.slice(0, 2)}:00
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <div className="formField">
                    <label htmlFor="clientName" className="fieldLabel">Cliente</label>
                    <div className="clientInputWrap">
                        <svg className="fieldIcon clientIcon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="4" y="3.5" width="16" height="17" rx="2" />
                            <circle cx="12" cy="10" r="2.5" />
                            <path d="M8 17c.8-1.7 2.1-2.5 4-2.5s3.2.8 4 2.5" />
                        </svg>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            className="formInput clientInput"
                            placeholder="Nome do cliente"
                            value={clientName}
                            onChange={(event) => setClientName(event.target.value)}
                            maxLength={80}
                            required
                        />
                    </div>
                </div>

                {errorMessage && <p className="formError" role="alert">{errorMessage}</p>}
                <button className="submitButton" type="submit" disabled={!date || !time || !clientName.trim()}>
                    Agendar
                </button>
            </form>
        </div>
    )
}
export default Sidebar;