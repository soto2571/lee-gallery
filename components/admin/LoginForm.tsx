"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream-50 transition-colors duration-200 hover:bg-forest-500 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Entrando…" : "Entrar"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-3xl border border-cream-300/70 bg-cream-50 p-8 shadow-[0_20px_60px_-40px_rgba(30,58,47,0.6)]"
    >
      <h1 className="font-display text-3xl font-light tracking-tightest text-forest">
        Lee&apos;s Gallery
      </h1>
      <p className="mt-1 text-sm text-ink-muted">Panel de fotos</p>

      <label className="mt-8 block text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
        Usuario
        <input
          name="user"
          autoComplete="username"
          autoCapitalize="none"
          required
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-ink outline-none transition-colors focus:border-forest"
        />
      </label>

      <label className="mt-4 block text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
        Contraseña
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-ink outline-none transition-colors focus:border-forest"
        />
      </label>

      {state.error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
