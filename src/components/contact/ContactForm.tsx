"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { getContactMode, getMailSubject, siteConfig } from "@/config/site";
import { contactFormCopy } from "@/data/story";
import { isValidEmail } from "@/lib/utils";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  collaboration: string;
  message: string;
};

type FormErrors = Partial<Record<"name" | "phone" | "email", string>>;
type FormStatus = "idle" | "demo" | "mailto" | "sending" | "success" | "error";

const emptyValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  collaboration: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const mode = getContactMode();

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = contactFormCopy.errors.name;
    if (!values.phone.trim()) next.phone = contactFormCopy.errors.phone;
    if (values.email.trim() && !isValidEmail(values.email.trim())) next.email = contactFormCopy.errors.email;
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof FormErrors>)[0];
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      setStatus("idle");
      return;
    }

    const collaboration =
      siteConfig.contactSettings.collaborationOptions.find((option) => option.value === values.collaboration)?.label ||
      "—";
    const subject = getMailSubject();
    const body = [
      `Нэр: ${values.name.trim()}`,
      `Утас: ${values.phone.trim()}`,
      `И-мэйл: ${values.email.trim() || "—"}`,
      `Чиглэл: ${collaboration}`,
      "",
      values.message.trim(),
    ].join("\n");

    if (mode === "demo") {
      setStatus("demo");
      return;
    }

    if (mode === "mailto") {
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(siteConfig.contactSettings.formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          collaboration,
          message: values.message.trim(),
          _subject: subject,
        }),
      });

      if (!response.ok) throw new Error("Form request failed");
      setValues(emptyValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const statusMessage = {
    idle: "",
    demo: contactFormCopy.demoResult,
    mailto: contactFormCopy.mailtoResult,
    sending: contactFormCopy.sending,
    success: contactFormCopy.successResult,
    error: contactFormCopy.errorResult,
  }[status];

  return (
    <form className="mt-10 space-y-6" onSubmit={onSubmit} noValidate>
      {mode === "demo" ? (
        <p className="border border-line px-4 py-3 text-sm leading-relaxed text-ink/80">{contactFormCopy.demoNotice}</p>
      ) : null}

      <Field
        id="field-name"
        label={contactFormCopy.fields.name}
        required
        value={values.name}
        placeholder={contactFormCopy.placeholders.name}
        autoComplete="name"
        error={errors.name}
        onChange={(value) => update("name", value)}
      />
      <Field
        id="field-phone"
        label={contactFormCopy.fields.phone}
        required
        value={values.phone}
        placeholder={contactFormCopy.placeholders.phone}
        autoComplete="tel"
        inputMode="tel"
        error={errors.phone}
        onChange={(value) => update("phone", value)}
      />
      <Field
        id="field-email"
        label={contactFormCopy.fields.email}
        type="email"
        value={values.email}
        placeholder={contactFormCopy.placeholders.email}
        autoComplete="email"
        error={errors.email}
        onChange={(value) => update("email", value)}
      />

      {siteConfig.contactSettings.collaborationOptions.length > 0 ? (
        <label className="block" htmlFor="field-collaboration">
          <span className="label text-muted">{contactFormCopy.fields.collaboration}</span>
          <select
            id="field-collaboration"
            className="field"
            value={values.collaboration}
            onChange={(event) => update("collaboration", event.target.value)}
          >
            <option value="">{contactFormCopy.placeholders.collaboration}</option>
            {siteConfig.contactSettings.collaborationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="block" htmlFor="field-message">
        <span className="label text-muted">{contactFormCopy.fields.message}</span>
        <textarea
          id="field-message"
          className="field min-h-32 resize-y"
          value={values.message}
          placeholder={contactFormCopy.placeholders.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex min-h-12 items-center gap-3 bg-ink px-6 py-3 font-mono text-[11px] tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:opacity-60"
      >
        {status === "sending" ? contactFormCopy.sending : contactFormCopy.submit}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </button>

      <p role="status" className="min-h-6 text-sm leading-relaxed text-ink/80">
        {statusMessage}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  const errorId = `${id}-error`;

  return (
    <label className="block" htmlFor={id}>
      <span className="label text-muted">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </span>
      <input
        id={id}
        className="field"
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span id={errorId} role="alert" className="mt-2 block text-sm text-[#8C2F24]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
